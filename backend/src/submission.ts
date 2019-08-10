import {
    MakeSubmissionResponse,
    BackendError,
    Language,
    ChallengeId,
    MakeSubmissionRequest,
    missingKeys,
    Match,
    Submission
} from "../../shared";
import { RedisClient } from "redis";
import { getMatchById, addMatch, getChallengeIdFromMatchId } from "./db";

import * as fs from "fs";
import * as cp from "child_process";
import { promisify } from "util";
import { readMeta, metaPath } from "./challenge";

// Maybe move this to shared

interface TestResult {
    stdout: string;
    stderr: string;
    numTestsFailed: number;
};

async function getTestsPassed(code: string, language: Language, id: ChallengeId): Promise<TestResult> {
    // TODO: Hard coded for python right now
    fs.writeFileSync(`./data/challenges/${id}/user/Solution.py`, code);

    let result: Submission;

    try {
        let ret = await promisify(cp.exec)(`./main/python3`, { cwd: `./data/challenges/${id}` });
        return {
            stdout: ret.stdout,
            stderr: ret.stderr,
            numTestsFailed: 0
        };
    } catch (e) {
        return {
            numTestsFailed: e.code,
            stdout: e.stdout,
            stderr: e.stderr
        }
    }
}

export async function makeSubmission(req, res, dbClient: RedisClient): Promise<MakeSubmissionResponse | BackendError> {
    let body: MakeSubmissionRequest = req.body;
    const missing: string[] = missingKeys(body, ["userId", "matchId", "submittedCode", "submittedLanguage"]);
    if (missing.length > 0) {
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }

    try {
        const id = await getChallengeIdFromMatchId(dbClient, body.matchId);

        const results = await getTestsPassed(req.body.submittedCode, req.body.language,
            await getChallengeIdFromMatchId(dbClient, body.matchId));

        const metaFile = readMeta(metaPath(id));

        // Update the match in the DB with the new submission.
        const match: Match = await getMatchById(dbClient, body.matchId);

        const s: MakeSubmissionResponse = {
            userId: body.userId,
            testsFailed: results.numTestsFailed,
            testsTotal: metaFile.tests,
            stdout: results.stdout,
            stderr: results.stderr
        };

        match.submissions.push(s);
        if(s.testsFailed == 0){ // We won
            match.matchStatus = "ENDED";
        }
        addMatch(dbClient, match);
        return s;

    } catch(e) {
        let err: BackendError = {
            reason: e.toString()
        };

        console.error(e.toString());

        return err;
    }
}
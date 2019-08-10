import { 
    MakeSubmissionResponse, 
    BackendError, 
    Language, 
    ChallengeId, 
    MakeSubmissionRequest,
    missingKeys,
    Match,
    Submission} from "../../shared";
import { RedisClient } from "redis";
import { getMatchById, addMatch, getChallengeIdFromMatchId } from "./db";

import * as fs from "fs";
import * as cp from "child_process";
import { promisify } from "util";

// Maybe move this to shared

async function getTestsPassed(code: string, language: Language, id: ChallengeId): Promise<Submission> {
    // TODO: Hard coded for python right now
    fs.writeFileSync(`./data/challenges/${id}/user/Solution.py`, code);

    let result: Submission;

    let ret = await promisify(() => 
        cp.exec(`./data/challenges/${id}/main/python3`, {
            cwd: `./data/challenges/${id}`,
        })
    );

    console.log(ret);

    return {} as Submission;
}

export async function makeSubmission(req, res, dbClient: RedisClient): Promise<MakeSubmissionResponse | BackendError> {
    let body: MakeSubmissionRequest = req.body;
    const missing: string[] = missingKeys(body, ["userId", "matchId", "submittedCode", "submittedLanguage"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }

    // Update the match in the DB with the new submission.
    let match: Match = await getMatchById(dbClient, body.matchId);

    let results = await getTestsPassed(req.body.submittedCode, req.body.language,
                                       await getChallengeIdFromMatchId(dbClient, match.matchId));

    match.submissions.push(results);
    addMatch(dbClient, match);
    return results;
}
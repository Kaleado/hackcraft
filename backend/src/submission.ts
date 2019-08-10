import { 
    SubmissionResponse, 
    BackendError, 
    Language, 
    ChallengeId,
    hasKeys } from "../../shared";
import { RedisClient } from "redis";

import * as fs from "fs";
import * as cp from "child_process";
import { promisify } from "util";

// Maybe move this to shared
export interface Result {
    testsPassed: number;
    programOutput: string;
};

async function getTestsPassed(code: string, language: Language, id: ChallengeId): Promise<Result> {
    // TODO: Hard coded for python right now
    fs.writeFileSync(`./data/challenges/${id}/user/Solution.py`, code);

    let result: Result;

    let ret = await promisify(() => 
        cp.exec(`./data/challenges/${id}/main/python3`, {
            cwd: `./data/challenges/${id}`,
        })
    );

    console.log(ret);

    return {} as Result;
}

export async function makeSubmission(req, res, dbClient: RedisClient): Promise<SubmissionResponse | BackendError> {
    if (hasKeys(req.body, ["userId", "matchId", "submittedCode", "submittedLanguage"])) {
        return { reason: "Keys missing in request" };
    }
    
    let result = await getTestsPassed(req.body.submittedCode, req.body.language, );

    return {
        testsPassed: 12,
        testsTotal: 15
    };
}
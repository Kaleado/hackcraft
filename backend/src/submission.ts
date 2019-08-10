import { 
    SubmissionResponse, 
    BackendError, 
    Language, 
    ChallengeId } from "../../shared";
import { RedisClient } from "redis";

function getTestsPassed(code: string, language: Language, id: ChallengeId): number {
    // Run tests here.
    return 0;
}

export async function makeSubmission(req, res, dbClient: RedisClient): Promise<SubmissionResponse | BackendError> {
    return {
        testsPassed: 12,
        testsTotal: 15
    };
}
import { 
    SubmissionResponse, 
    BackendError, 
    Language, 
    ChallengeId } from "../../shared";
import { RedisClient } from "redis";

export async function makeSubmission(req, res, dbClient: RedisClient): Promise<SubmissionResponse | BackendError> {
    return {
        testsPassed: 12,
        testsTotal: 15
    };
}
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
import { getMatchById, addMatch } from "./db";

function getTestsPassed(code: string, language: Language, id: ChallengeId): number {
    // Run tests here.
    return 0;
}

export async function makeSubmission(req, res, dbClient: RedisClient): Promise<MakeSubmissionResponse | BackendError> {
    let body: MakeSubmissionRequest = req.body;
    const missing: string[] = missingKeys(body, ["userId", "matchId", "submittedCode", "submittedLanguage"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }
    let submission: Submission = {
        userId: body.userId,
        testsPassed: 12,
        testsTotal: 15
    };// TODO: replace with real data.
    // Update the match in the DB with the new submission.
    let match: Match = await getMatchById(dbClient, body.matchId);
    match.submissions.push(submission);
    addMatch(dbClient, match);
    return submission;
}
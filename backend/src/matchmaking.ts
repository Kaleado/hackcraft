import { 
    StartMatchmakingResponse, 
    BackendError, 
    StartMatchmakingRequest, 
    Match, 
    MatchStatusResponse,
    MatchStatusRequest,
    hasKeys,
    ChallengeId,
    missingKeys
} from "../../shared";
import { RedisClient } from "redis";
import { getNextAvailableMatchId, updateNextAvailableMatchId, addMatch, getAllMatches, getMatchById, mapMatchIdToChallengeId } from "./db";
import { chooseRandomChallenge } from "./challenge";

async function joinMatch(userId: number, match: Match, dbClient: RedisClient): Promise<void> {
    // Update the match to include us.
    match.playerIds.push(userId);
    if(match.playerIds.length == match.maxPlayers){
        match.matchStatus = "STARTED";
        // Select a challenge.
        let challengeId: ChallengeId = chooseRandomChallenge();
        mapMatchIdToChallengeId(dbClient, match.matchId, challengeId);
    }
    addMatch(dbClient, match);
}

export async function startMatchmaking(req, res, dbClient: RedisClient) : Promise<StartMatchmakingResponse | BackendError> {
    let body: StartMatchmakingRequest = req.body;
    const missing: string[] = missingKeys(body, ["userId", "matchCategory", "maxPlayers", "isRanked"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }
    //Add ourselves to a match that exists that meets our criteria.
    let matches: Match[] = await getAllMatches(dbClient);
    let joinableMatch: Match | undefined = matches.find((m: Match) => {
        return m.matchCategory == body.matchCategory &&
               m.playerIds.length < m.maxPlayers &&
               m.isRanked == body.isRanked;
    });
    if(joinableMatch !== undefined){
        joinMatch(body.userId, joinableMatch, dbClient);
        return {
            matchId: joinableMatch.matchId
        };
    }

    // Otherwise, make a new match
    let matchId: number = await getNextAvailableMatchId(dbClient);
    let match: Match = {
        matchId: matchId,
        maxPlayers: body.maxPlayers,
        playerIds: [ ],
        submissions: [ ],
        isRanked: body.isRanked,
        matchStatus: "SEARCHING",
        matchCategory: body.matchCategory,
    };
    updateNextAvailableMatchId(dbClient);
    addMatch(dbClient, match);
    joinMatch(body.userId, match, dbClient);
    console.log("Created new match with matchId ", matchId);
    return { 
        matchId: matchId
    };
}

export async function getMatchStatus(req, res, dbClient: RedisClient) : Promise<MatchStatusResponse | BackendError> {
    let body: MatchStatusRequest = req.body;
    const missing: string[] = missingKeys(body, ["matchId"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }
    let match: Match | undefined = await getMatchById(dbClient, body.matchId);
    if(match !== undefined) return match;
    else return { reason: "Match with id " + body.matchId + " does not exist" };
}
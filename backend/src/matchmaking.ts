import { 
    StartMatchmakingResponse, 
    BackendError, 
    StartMatchmakingRequest, 
    Match, 
    MatchStatusResponse,
    MatchStatusRequest,
    hasKeys,
    ChallengeId
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
    let reqBody: StartMatchmakingRequest = req.body;
    if(!hasKeys(reqBody, ["userId", "matchCategory", "maxPlayers", "isRanked"])){
        return {
            reason: "Missing required parameters"
        };
    }
    //Add ourselves to a match that exists that meets our criteria.
    let matches: Match[] = await getAllMatches(dbClient);
    let joinableMatch: Match | undefined = matches.find((m: Match) => {
        return m.matchCategory == reqBody.matchCategory &&
               m.playerIds.length < m.maxPlayers &&
               m.isRanked == reqBody.isRanked;
    });
    if(joinableMatch !== undefined){
        joinMatch(reqBody.userId, joinableMatch, dbClient);
        return {
            matchId: joinableMatch.matchId
        };
    }

    // Otherwise, make a new match
    let matchId: number = await getNextAvailableMatchId(dbClient);
    let match: Match = {
        matchId: matchId,
        maxPlayers: reqBody.maxPlayers,
        playerIds: [ reqBody.userId ],
        isRanked: reqBody.isRanked,
        matchStatus: (reqBody.maxPlayers == 1 ? "STARTED" : "SEARCHING"),
        matchCategory: reqBody.matchCategory,
    };
    updateNextAvailableMatchId(dbClient);
    addMatch(dbClient, match);
    console.log("Created new match with matchId ", matchId);
    return { 
        matchId: matchId
    };
}

export async function getMatchStatus(req, res, dbClient: RedisClient) : Promise<MatchStatusResponse | BackendError> {
    let reqBody: MatchStatusRequest = req.body;
    if(!hasKeys(reqBody, ["matchId"])) {
        return {
            reason: "Missing required parameters"
        };
    }
    let match: Match | undefined = await getMatchById(dbClient, reqBody.matchId);
    if(match !== undefined) return match;
    else return { reason: "Match with id " + reqBody.matchId + " does not exist" };
}
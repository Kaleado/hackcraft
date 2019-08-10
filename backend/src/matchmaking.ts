import { 
    StartMatchmakingResponse, 
    BackendError, 
    StartMatchmakingRequest, 
    Match, 
    MatchStatusResponse,
    MatchStatusRequest,
    hasKeys
} from "../../shared";
import { RedisClient } from "redis";
import { getNextAvailableMatchId, updateNextAvailableMatchId, addMatch, getAllMatches, getMatchById } from "./db";

export async function startMatchmaking(req, res, dbClient: RedisClient) : Promise<StartMatchmakingResponse | BackendError> {
    let reqBody: StartMatchmakingRequest = req.body;
    if(!hasKeys(reqBody, ["userId", "challengeCategory", "maxPlayers"])){
        return {
            reason: "Missing required parameters"
        };
    }
    //Add ourselves to a match that exists that meets our criteria.
    let matches: Match[] = await getAllMatches(dbClient);
    let joinableMatch: Match | undefined = matches.find((m: Match) => {
        return m.challengeCategory == reqBody.challengeCategory &&
               m.playerIds.length < m.maxPlayers;
    });
    if(joinableMatch !== undefined){
        // Update the match to include us.
        joinableMatch.playerIds.push(reqBody.userId);
        if(joinableMatch.playerIds.length == joinableMatch.maxPlayers){
            joinableMatch.matchStatus = "STARTED";
        }
        addMatch(dbClient, joinableMatch);
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
        matchStatus: "SEARCHING",
        challengeCategory: reqBody.challengeCategory,
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
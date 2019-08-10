import { 
    StartMatchmakingResponse, 
    BackendError, 
    StartMatchmakingRequest, 
    Match 
} from "../../shared";
import { RedisClient } from "redis";
import { getNextAvailableMatchId, updateNextAvailableMatchId, addMatch } from "./db";

export async function startMatchmaking(req, res, dbClient: RedisClient) : Promise<StartMatchmakingResponse | BackendError> {
    let reqBody: StartMatchmakingRequest = req.body;
    if(reqBody.userId === undefined || reqBody.challengeCategory === undefined){
        return {
            reason: "Missing required parameters"
        };
    }
    let matchId: number = await getNextAvailableMatchId(dbClient);
    console.log("matchId is ", matchId);
    let match: Match = {
        matchId: matchId,
        playerIds: [ reqBody.userId ],
        challengeCategory: reqBody.challengeCategory,
    };
    updateNextAvailableMatchId(dbClient);
    addMatch(dbClient, match);
    return { 
        matchId: matchId
    };
}
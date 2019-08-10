import { StartMatchmakingResponse, BackendError } from "../../shared";
import { RedisClient } from "redis";

export async function startMatchmaking(req, res, dbClient: RedisClient) : Promise<StartMatchmakingResponse | BackendError> {
    return {
        matchId: 0 // dummy response for now
    };
}
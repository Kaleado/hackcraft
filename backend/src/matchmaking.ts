import { StartMatchmakingResponse, BackendError } from "../../shared";

export async function startMatchmaking() : Promise<StartMatchmakingResponse | BackendError> {
    return {
        matchId: 0 // dummy response for now
    };
}
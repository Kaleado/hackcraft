import { RedisClient } from "redis";

import { getAsync, setAsync } from "./common";

///////////////////// MATCHID

export async function getNextAvailableMatchId(dbClient: RedisClient): Promise<number> {
    try {
        let result: string = await getAsync(dbClient, "maxMatchId");
        if(result === null){
            return 0;
        }
        console.log("Result is " + result);
        let maxMatchId: number = parseInt(result);
        return maxMatchId + 1;
    }
    catch(exc) {
        console.error("Error in getNextAvailableMatchId(): " + exc);
        return 1;
    }
}

export async function updateNextAvailableMatchId(dbClient: RedisClient): Promise<void> {
    try {
        let maxMatchId: string = await getAsync(dbClient, "maxMatchId");
        if(maxMatchId == null){
            await setAsync(dbClient, "maxMatchId", "1");
            return;
        }
        let num = parseInt(maxMatchId) + 1;
        setAsync(dbClient, "maxMatchId", num.toString());
    }
    catch(exc) {
        console.error(exc);
        setAsync(dbClient, "maxMatchId", "1");
    }
}

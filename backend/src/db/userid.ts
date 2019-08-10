import { RedisClient } from "redis";

import { getAsync, setAsync } from "./common";

///////////////////// USER IDS

export async function getNextAvailableId(dbClient: RedisClient): Promise<number> {
    try {
        let result: string = await getAsync(dbClient, "maxUserId");
        if(result === null){
            await setAsync(dbClient, "maxUserId", "0");
            result = "0";
        }
        console.log("Result is " + result);
        let maxUserId: number = parseInt(result);
        return maxUserId + 1;
    }
    catch(exc) {
        console.error("Error in getNextAvailableId(): " + exc);
        return 1;
    }
}

export async function updateNextAvailableId(dbClient: RedisClient): Promise<void> {
    try {
        let maxUserId: string = await getAsync(dbClient, "maxUserId");
        if(maxUserId == null){
            setAsync(dbClient, "maxUserId", "1");
            return;
        }
        let num = parseInt(maxUserId) + 1;
        setAsync(dbClient, "maxUserId", num.toString());
    }
    catch(exc) {
        console.error(exc);
        setAsync(dbClient, "maxUserId", "1");
    }
}

export async function mapUsernameToId(dbClient: RedisClient, username: string, userId: number): Promise<void> {
    setAsync(dbClient, "userId_" + username, userId.toString());
}

export async function getIdByUserame(dbClient: RedisClient, username: string) : Promise<number> {
    return parseInt(await getAsync(dbClient, "userId_" + username));
}
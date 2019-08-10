import { User } from "../../shared";
import { promisify } from "util";
import { RedisClient } from "redis";

// function get(key, cb) {
//     this.get(key, (resp, err) => {
//         cb(err, resp);
//     });
// }

// function set(key, value, cb) {
//     this.get(key, value, (resp, err) => {
//         cb(err, resp);
//     });
// }

async function getAsync(dbClient: RedisClient, key: string): Promise<string | null> {
    // return promisify(get).bind(dbClient)(key);
    return promisify(dbClient.get).bind(dbClient)(key);
}

async function setAsync(dbClient: RedisClient, key: string, value: string): Promise<void> {
    // return promisify(set).bind(dbClient)(key, value);
    return promisify(dbClient.set).bind(dbClient)(key, value);
}

export async function getNextAvailableId(dbClient: RedisClient): Promise<number> {
    try {
        let result: string = await getAsync(dbClient, "maxUserId");
        if(result === null){
            return 1;
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

export async function mapUsernameToId(dbClient: RedisClient, username: string, userId: number) {
    setAsync(dbClient, "userId_" + username, userId.toString());
}

export async function getIdByUserame(dbClient: RedisClient, username: string) : Promise<number> {
    return parseInt(await getAsync(dbClient, "userId_" + username));
}

export async function updateNextAvailableId(dbClient: RedisClient): Promise<void> {
    try {
        let maxUserId: string = await getAsync(dbClient, "maxUserId");
        if(maxUserId == null){
            await setAsync(dbClient, "maxUserId", "2");
            return;
        }
        let num = parseInt(maxUserId) + 1;
        setAsync(dbClient, "maxUserId", num.toString());
    }
    catch(exc) {
        console.error(exc);
        setAsync(dbClient, "maxUserId", "2");
    }
}

export async function getUserById(dbClient: RedisClient, userId: number): Promise<User> {
    let user: User = JSON.parse(await getAsync(dbClient, userId.toString()));
    return user;
}

export async function getUserByUsername(dbClient: RedisClient, username: string): Promise<User> {
    let userId: number = await getIdByUserame(dbClient, username);
    console.error("userId is " + userId)
    let user: User = JSON.parse(await getAsync(dbClient, userId.toString()));
    console.error("user is " + user)
    return user;
}

export async function addUser(dbClient: RedisClient, user: User): Promise<void> {
    setAsync(dbClient, user.userId.toString(), JSON.stringify(user));
}
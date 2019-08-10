import { User, Match, ChallengeId } from "../../shared";
import { promisify } from "util";
import { RedisClient } from "redis";

async function getAsync(dbClient: RedisClient, key: string): Promise<string | null> {
    return promisify(dbClient.get).bind(dbClient)(key);
}

async function mgetAsync(dbClient: RedisClient, keys: string[]): Promise<string[] | null> {
    return promisify(dbClient.mget).bind(dbClient)(keys);
}

async function setAsync(dbClient: RedisClient, key: string, value: string): Promise<void> {
    return promisify(dbClient.set).bind(dbClient)(key, value);
}

async function keysAsync(dbClient: RedisClient, pattern: string): Promise<string[] | null> {
    return promisify(dbClient.keys).bind(dbClient)(pattern);
}

///////////////////// USER IDS

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

export async function mapUsernameToId(dbClient: RedisClient, username: string, userId: number) {
    setAsync(dbClient, "userId_" + username, userId.toString());
}

export async function getIdByUserame(dbClient: RedisClient, username: string) : Promise<number> {
    return parseInt(await getAsync(dbClient, "userId_" + username));
}

///////////////////// USER

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

///////////////////// MATCH

export async function getMatchById(dbClient: RedisClient, matchId: number): Promise<Match> {
    let rawString: string | null = await getAsync(dbClient, "match_" + matchId.toString());
    if(rawString === null) return undefined;
    let match: Match = JSON.parse(rawString);
    return match;
}

export async function addMatch(dbClient: RedisClient, match: Match): Promise<void> {
    setAsync(dbClient, "match_" + match.matchId.toString(), JSON.stringify(match));
}

export async function getAllMatches(dbClient: RedisClient): Promise<Match[]> {
    let keys: string[] = await keysAsync(dbClient, "match_*");
    if(keys.length == 0){
        return [];
    }
    let matches: Match[] = (await mgetAsync(dbClient, keys)).map(
        (str: string) => JSON.parse(str)
    );
    return matches;
}

export async function mapMatchIdToChallengeId(dbClient: RedisClient, matchId: number, challengeId: ChallengeId): Promise<void> {
    setAsync(dbClient, "challengeForMatch_" + matchId.toString(), challengeId);
}

export async function getChallengeIdFromMatchId(dbClient: RedisClient, matchId: number): Promise<ChallengeId> {
    return getAsync(dbClient, "challengeForMatch_" + matchId.toString());
}

///////////////////// CHALLENGE

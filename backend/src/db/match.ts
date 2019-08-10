import { RedisClient } from "redis";

import { Match, ChallengeId } from "../../../shared";

import { getAsync, setAsync, keysAsync, mgetAsync } from "./common";

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
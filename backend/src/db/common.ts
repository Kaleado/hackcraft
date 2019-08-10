import { promisify } from "util";
import { RedisClient } from "redis";

export async function getAsync(dbClient: RedisClient, key: string): Promise<string | null> {
    return promisify(dbClient.get).bind(dbClient)(key);
}

export async function mgetAsync(dbClient: RedisClient, keys: string[]): Promise<string[] | null> {
    return promisify(dbClient.mget).bind(dbClient)(keys);
}

export async function setAsync(dbClient: RedisClient, key: string, value: string): Promise<void> {
    return promisify(dbClient.set).bind(dbClient)(key, value);
}

export async function keysAsync(dbClient: RedisClient, pattern: string): Promise<string[] | null> {
    return promisify(dbClient.keys).bind(dbClient)(pattern);
}
import { RedisClient } from "redis";
import { User } from "../../../shared";
import { getAsync, setAsync } from "./common";
import { getIdByUserame } from ".";

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
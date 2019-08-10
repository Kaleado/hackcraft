import { SignupResponse, BackendError, User, LoginResponse, hasKeys, missingKeys } from '../../shared';
import { addUser, updateNextAvailableId, getNextAvailableId, getUserByUsername, mapUsernameToId } from "./db";

export async function signup(req, res, dbClient): Promise<SignupResponse | BackendError> {
    let body = req.body;
    const missing: string[] = missingKeys(body, ["username", "password"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }
    let newUser: User = {
        userId: await getNextAvailableId(dbClient),
        username: req.body.username,
        password: req.body.password,
    };
    updateNextAvailableId(dbClient);
    addUser(dbClient, newUser);
    mapUsernameToId(dbClient, newUser.username, newUser.userId);
    return {
        userId: newUser.userId
    };
}

export async function login(req, res, dbClient): Promise<LoginResponse | BackendError> {
    let body = req.body;
    const missing: string[] = missingKeys(body, ["username", "password"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }
    let user: User = await getUserByUsername(dbClient, req.body.username);
    return {
        userId: user.userId
    };
}
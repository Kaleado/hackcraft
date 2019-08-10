import { SignupResponse, BackendError, User, LoginResponse, hasKeys } from '../../shared';
import { addUser, updateNextAvailableId, getNextAvailableId, getUserByUsername, mapUsernameToId } from "./db";

export async function signup(request, response, dbClient): Promise<SignupResponse | BackendError> {
    if(!hasKeys(request.body, ["username", "password"])){
        return {
            reason: "Missing required parameters"
        };
    }
    let newUser: User = {
        userId: await getNextAvailableId(dbClient),
        username: request.body.username,
        password: request.body.password,
    };
    updateNextAvailableId(dbClient);
    addUser(dbClient, newUser);
    mapUsernameToId(dbClient, newUser.username, newUser.userId);
    return {
        userId: newUser.userId
    };
}

export async function login(request, response, dbClient): Promise<LoginResponse | BackendError> {
    if(!hasKeys(request.body, ["username", "password"])){
        return {
            reason: "Missing required parameters"
        };
    }
    let user: User = await getUserByUsername(dbClient, request.body.username);
    return {
        userId: user.userId
    };
}

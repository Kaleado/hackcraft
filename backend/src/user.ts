import { SignupResponse, BackendError, User, LoginResponse } from '../../shared';
import { addUser, updateNextAvailableId, getNextAvailableId, getUserByUsername, mapUsernameToId } from "./db";

export async function signup(request, response, dbClient): Promise<SignupResponse | BackendError> {
    console.log(request.body);
    if(request.body.username === undefined || request.body.password === undefined){
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
    if(request.body.username === undefined || request.body.password === undefined){
        return {
            reason: "Missing required parameters"
        };
    }
    let user: User = await getUserByUsername(dbClient, request.body.username);
    return {
        userId: user.userId
    };
}

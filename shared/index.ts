export const serverUrl  = "http://localhost";
export const serverPort = 8080;

export let makeServerURL: (() => string) =  () => {
    return `${serverUrl}:${serverPort}`;
};

export type ChallengeCategory = "FUNCTIONAL" | "PROCEDURAL" | "SCRIPTING" | "FREE";

export type BackendError = {
    reason: string,
};

export type LoginRequest = {
    username: string,
    password: string,
};

export type LoginResponse = {
    userId: number,
};

export type SignupRequest = {
    username: string,
    password: string,
};

export type SignupResponse = {
    userId: number,
};

export type User = {
    userId: number,
    username: string,
    password: string,
};

export type PublicUser = {
    userId: number,
    username: string,
};

export type StartMatchmakingRequest = {
    userId: number,
    challengeCategory: ChallengeCategory,
};

export type StartMatchmakingResponse = {
    matchId: number // Identifies the game that you've just made.
};

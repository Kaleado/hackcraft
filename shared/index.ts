const serverUrl  = "TODO";
const serverPort = 8080;

const frontendPort = "TODO";

export type ChallengeCategory = "FUNCTIONAL" | "PROCEDURAL" | "SCRIPTING" | "FREE";

export type BackendError = {
    reason: string,
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

export type Match = {
    matchId: number,
    playerIds: number[],
    challengeCategory: ChallengeCategory,
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

export type StartMatchmakingRequest = {
    userId: number,
    challengeCategory: ChallengeCategory,
};

export type StartMatchmakingResponse = {
    matchId: number // Identifies the game that you've just made.
};
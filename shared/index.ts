export const serverUrl  = "http://localhost";
export const serverPort = 8080;

const ServerURL: string = `${serverUrl}:${serverPort}`;
export const LoginURL: string = `${ServerURL}/user/login`;

export function hasKeys(obj: any, keys: string[]): boolean {
    return keys.some((k: string) => {
        return obj[k] == undefined;
    });
}

// DEPRECATED
export type ChallengeCategory = "FUNCTIONAL" | "PROCEDURAL" | "SCRIPTING" | "FREE";

export type MatchCategory = ChallengeCategory;

export type MatchStatus = "SEARCHING" | "STARTED" | "ENDED";

export type BackendError = {
    reason: string,
};

export type Challenge = {
    name: string,
    description: string,
    numTests: number,
    starterCode: {[key: string]: string}
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
    maxPlayers: number, // number of players in the game
    challengeCategory: ChallengeCategory,
    matchStatus: MatchStatus,
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
    maxPlayers: number,
    challengeCategory: ChallengeCategory,
};

export type StartMatchmakingResponse = {
    matchId: number // Identifies the game that you've just made.
};

export type MatchStatusRequest = {
    matchId: number,
};

export type MatchStatusResponse = Match;

export type GetChallengeRequest = {
    matchId: number
};

export type GetChallengeResponse = Challenge;
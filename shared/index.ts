export const serverUrl  = "http://localhost";
export const serverPort = 8080;

const ServerURL: string = `${serverUrl}:${serverPort}`;
export const LoginURL: string = `${ServerURL}/user/login`;
export const ChallengeUrl: string = `${ServerURL}/matchmaking/challenge`;
export const FindMatchURL: string = `${ServerURL}/matchmaking/start`;

export function hasKeys(obj: any, keys: string[]): boolean {
    return !keys.some((k: string) => {
        return obj[k] == undefined;
    });
}

export type Language = "python3" | "c++";

export type MatchCategory = "FUNCTIONAL" | "PROCEDURAL" | "SCRIPTING" | "FREE";

export type MatchStatus = "SEARCHING" | "STARTED" | "ENDED";

export type BackendError = {
    reason: string,
};

export type ChallengeId = string;

export type Challenge = {
    name: string,
    description: string,
    numTests: number,
    starterCode: {[key: string]: string} // Here string should be a language
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
    isRanked: boolean,
    maxPlayers: number, // number of players in the game
    matchCategory: MatchCategory,
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
    isRanked: boolean,
    maxPlayers: number,
    matchCategory: MatchCategory,
};

export type StartMatchmakingResponse = {
    matchId: number, // Identifies the game that you've just made.
};

export type MatchStatusRequest = {
    matchId: number,
};

export type MatchStatusResponse = Match;

export type GetChallengeRequest = {
    matchId: number,
    language: Language,
};

export type GetChallengeResponse = Challenge;

export type SubmissionRequest = {
    userId: string,
    matchId: number,
    submittedCode: string,
    submittedLanguage: Language,
};

export type SubmissionResponse = {
    testsPassed: number,
    testsTotal: number,
};
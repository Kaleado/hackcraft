export const serverUrl  = "http://localhost";
export const serverPort = 8080;

const ServerURL: string = `${serverUrl}:${serverPort}`;
export const LoginURL: string = `${ServerURL}/user/login`;

export function hasKeys(obj: any, keys: string[]): boolean {
    return !keys.some((k: string) => {
        return obj[k] == undefined;
    });
}

// Returns the keys in keys that are missing from obj.
export function missingKeys(obj: any, keys: string[]): string[] {
    let missing: string[] = [];
    for(let i in keys){
        let k: string = keys[i];
        if(obj[k] === undefined) missing.push(k);
    }
    return missing;
}

export const PATH_LOGIN = "user/login";
export const PATH_SIGNUP = "user/signup";
export const PATH_MATCHMAKING_START = "matchmaking/start";
export const PATH_MATCH_STATUS = "matchmaking/status";
export const PATH_GET_CHALLENGE = "matchmaking/challenge";
export const PATH_MAKE_SUBMISSION = "submission/make";

export type Language = "python3" | "c++";

export type MatchCategory = "FUNCTIONAL" | "PROCEDURAL" | "SCRIPTING" | "FREE";;

export type MatchStatus = "SEARCHING" | "STARTED" | "ENDED";

export type BackendError = {
    reason: string,
};

export type Submission = {
    userId: number,
    testsPassed: number,
    testsTotal: number,
};

export type ChallengeId = string;

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
    isRanked: boolean,
    maxPlayers: number, // number of players in the game
    matchCategory: MatchCategory,
    matchStatus: MatchStatus,
    submissions: Submission[]
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

export type MakeSubmissionRequest = {
    userId: number,
    matchId: number,
    submittedCode: string,
    submittedLanguage: Language,
};

export type MakeSubmissionResponse = Submission;
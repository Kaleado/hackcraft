export const serverUrl  = "TODO";
export const serverPort = 8080;

export let makeServerURL: (() => string) =  () => {
    return `${serverUrl}:${serverPort}`;
};

export type BackendError = {
    reason: String
}

export type LoginResponse = {
    userId: number
};
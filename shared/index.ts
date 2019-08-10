const serverUrl  = "TODO";
const serverPort = 8080;

const frontendPort = "TODO";

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
import { LoginResponse, BackendError } from '../shared';

export function mockLogin(): LoginResponse | BackendError {
    return {
        userId: 0
    };
}
import { LoginResponse, BackendError } from '../../shared';

export function mockLogin(request, response, dbClient): LoginResponse | BackendError {
    return {
        userId: 0
    };
}
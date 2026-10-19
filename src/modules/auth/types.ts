export interface AuthUser {
    id: number | string;
    username: string;
    nameDisplay: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
    message?: string;
}
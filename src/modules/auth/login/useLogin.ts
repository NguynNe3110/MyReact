import { useState } from "react";
import { AppError, mapApiError } from "../../../api/AppError";
import { LoginInput } from "./types";
import { AuthResponse } from "../types";
import { loginApi } from "../auth/authApi";
import { tokenStorage } from "../../../api/tokenStorage";

export function useLogin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AppError | null>(null);

    async function login(input : LoginInput): Promise<AuthResponse | null> {
        setLoading(true);
        setError(null);

        try {
            const data = await loginApi(input);

            if(data.tokens) { // luu token
                await tokenStorage.saveTokens(data.tokens);
                console.log('AccessToken:', data.tokens);
            }

            return data;
        } catch (e : unknown) {
            const appError = mapApiError(e);
            setError(appError);
            return null;

        } finally {
            setLoading(false);
        }
    }

    function resetError() {
        setError(null);
    }

    return {
        loading,
        error, 
        login, 
        resetError,
    }

}
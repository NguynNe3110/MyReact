import { useState } from "react";
import { AppError, mapApiError } from "../../../api/AppError";
import { RegisterInput } from "./types";
import { AuthResponse } from "../types";
import { registerApi } from "../auth/authApi";

export function useRegister() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AppError | null>(null);

    async function register(input: RegisterInput): Promise<AuthResponse | null> {
        setLoading(true);
        setError(null);

        try {
            const data = await registerApi(input);
            return data;
        } catch (e: unknown) {
            const appError = mapApiError(e);
            setError(appError);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, register };
}

// {
//   "name": "string",
//   "email": "user@example.com",
//   "password": "Password123!"
// }
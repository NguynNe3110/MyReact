import { apiClient } from "../../../api/client";
import { BaseResponse } from "../../../common/BaseResponse";
import { LoginInput } from "../login/types";
import { RegisterInput } from "../register/types";
import { AuthResponse } from "../types";


export async function loginApi(input: LoginInput): Promise<AuthResponse> {
    const response = await apiClient.post<BaseResponse<AuthResponse>>('/auth/login', input);
    return response.data.data;
}

export async function registerApi(input : RegisterInput): Promise<AuthResponse> {
    const response = await apiClient.post<BaseResponse<AuthResponse>>('/auth/register', input);
    return response.data.data;    
}
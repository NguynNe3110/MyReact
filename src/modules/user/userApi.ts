import { apiClient } from "../../api/client";
import { User } from "./types";


export async function getUsers() : Promise<User[]> {
    // cách chuẩn phải bọc trong apiResult & phải bóc dữ liệu ra*(dữ liệu trả về từ backend)
    const response = await apiClient.get<User[]>('/users');
    // va phai map tu dto sang domain de app dung
    return response.data;
}

export async function getUserById(userId: number) : Promise<User> {
    const response = await apiClient.get<User>(`/users/${userId}`);
    
    return response.data;
}
import { apiClient } from "../../../api/client";
import { BaseResponse } from "../../../common/BaseResponse";
import { Product, ProductListResponse } from "../types";


export async function getProductsApi(): Promise<Product[]> {
    const response = await apiClient.get<BaseResponse<ProductListResponse>>('/products');
    return response.data.data.items;
}


//laasy item
export async function getProductById(id : string) : Promise<Product> {
    const response = await apiClient.get<BaseResponse<Product>>(`/products/${id}`);
    return response.data.data;
}
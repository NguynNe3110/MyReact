export class BaseResponse<T> {
    data?: T;
    success?: boolean;
    message?: string;
    code?: number;
}
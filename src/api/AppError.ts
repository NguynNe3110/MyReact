import axios from "axios";


export type AppErrorKind = 'http' | 'network' | 'timeout' | 'cancelled' | 'unknown';

export class AppError extends Error {
    readonly kind: AppErrorKind;
    readonly status?: number;

    constructor(
        kind: AppErrorKind,
        message: string, 
        status?: number, 
    ){
        super(message);
        this.name = 'AppError';
        this.kind = kind;
        this.status = status;
    }
}

export function mapApiError(error: unknown): AppError {
    if(error instanceof AppError) {
        return error;
    }

    if(axios.isCancel(error)) {
        return new AppError('cancelled', 'Yeu cau da duoc huy');
    }

    if(axios.isAxiosError(error)) {
        if(error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
            return new AppError(
                'timeout',
                'Yeu cau qua thoi gian cho. Vui long thu lai',
            );
        }

        if(error.response) {
            const status = error.response.status;

            const message = status === 404 ? 'Khong tim thay du lieu' : 'Khong the tai du lieu. Vui long thu lai';
            return new AppError('http', message, status);
        }

        if(error.code === 'ERR_NETWORK' || error.request) {
            return new AppError(
                'network',
                'Khong the ket noi den server. Kiem tra ket noi mang',
            );
        }
    }

    return new AppError(
        'unknown',
        'Da xay ra loi, vui long thu lai',
    );
}
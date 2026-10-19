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
        return new AppError('cancelled', 'Yêu cầu đã được hủy!');
    }

    if(axios.isAxiosError(error)) {
        if(error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
            return new AppError(
                'timeout',
                'Quá thời gian chờ, vui lòng thử lại!',
            );
        }

        if(error.response) {
            const status = error.response.status;

            const message = status === 404 ? 'Không tìm thấy dữ liệu' : 'Không thể tải dữ liệu, vui lòng thử lại';
            return new AppError('http', message, status);
        }

        if(error.code === 'ERR_NETWORK' || error.request) {
            return new AppError(
                'network',
                'Không thể kết nối tới server. vui lòng xem lại kết nối',
            );
        }
    }

    return new AppError(
        'unknown',
        'Đã xảy ra lỗi, vui lòng thử lại',
    );
}
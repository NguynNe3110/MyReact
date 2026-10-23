export interface BaseResponse<T, M = Record<string, any>> {
    data: T; //data
    meta?: M; // phaan trang, timestamp, version,....
    message?: string; // thong diep tu server
    success?: boolean; // co trang thai
    code?:number;   // ma code, chekc htu bản thân
}
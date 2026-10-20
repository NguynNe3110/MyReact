

// dữ liệu nhận từ server
export interface AuthResponse {
    tokens: Tokens;
    user: AuthUser;
    message?: string;
}

// dữ liệu của người dùng
export interface AuthUser {
    id: number | string;
    name: string;
    email: string;
    role: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
}

// {
//   "data": {
//     "user": {
//       "id": "usr_demo",
//       "name": "Nguyễn An",
//       "email": "user@example.com",
//       "role": "user",
//       "profile": {
//         "avatarUrl": "string",
//         "phone": "string",
//         "address": {
//           "street": "string",
//           "city": "string",
//           "country": "string"
//         },
//         "preferences": {
//           "language": "vi",
//           "notifications": true
//         }
//       },
//       "createdAt": "2026-10-20T02:41:09.225Z",
//       "updatedAt": "2026-10-20T02:41:09.225Z"
//     },
//     "tokens": {
//       "accessToken": "string",
//       "refreshToken": "string",
//       "tokenType": "Bearer",
//       "expiresIn": 0,
//       "refreshExpiresIn": 0
//     }
//   },
//   "meta": {
//     "requestId": "string"
//   }
// }
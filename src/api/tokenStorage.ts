import * as Keychain from 'react-native-keychain';
import { Tokens } from '../modules/auth/types';

//về bản chất đây là 1 biến có các thuộc tính là hàm, vậy nên cần dấu , để ngăn cách
export const tokenStorage = {
  // lưu cả bộ token (access & refresh) vào keystore / keychain
  async saveTokens(tokens: Tokens): Promise<void> {
    await Keychain.setGenericPassword('auth_tokens', JSON.stringify(tokens));
  },

  // lấy cả bộ tokens
  async getTokens(): Promise<Tokens | null> {
    const credentials = await Keychain.getGenericPassword();

    if(credentials && credentials.password) {
      try {
        return JSON.parse(credentials.password) as Tokens;
      } catch {
        return null;
      }
    }

    return null;
  },

  // lấy riêng accessToken
  async getAccessToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens ? tokens.accessToken : null;
  },

  // lấy riêng refreshToken (để lấy mà k cần login)
  async getRefreshToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens ? tokens.refreshToken : null;
  },

  // xoas token
  async clearTokens():Promise<void> {
    await Keychain.resetGenericPassword();
  }
};
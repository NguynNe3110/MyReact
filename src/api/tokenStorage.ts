import * as Keychain from 'react-native-keychain';

export const tokenStorage = {
  async saveAccessToken(token: string): Promise<void> {
    await Keychain.setGenericPassword('accessToken', token);
  },

  async getAccessToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword();

    return credentials ? credentials.password : null;
  },

  async clearAccessToken(): Promise<void> {
    await Keychain.resetGenericPassword();
  },
};
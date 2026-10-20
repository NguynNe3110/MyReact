import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

if (__DEV__) {
  Reactotron.setAsyncStorageHandler?.(AsyncStorage)
    .configure({
      name: 'MyReact App',
      host: '192.168.0.147', // IP máy tính của bạn để điện thoại kết nối qua Wi-Fi
    })
    .useReactNative({
      asyncStorage: true,
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect();

  Reactotron.clear?.();
  console.tron = Reactotron;
}

export default Reactotron;

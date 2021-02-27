import NetInfo from '@react-native-community/netinfo';

export function verifyIsInternet() {
  return new Promise((resolve) => {
    NetInfo.addEventListener((connection) => {
      resolve(connection.isConnected);
    });
  });
}

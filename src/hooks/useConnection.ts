import {useState, useLayoutEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

const useConnection = () => {
  const [status, setStatus] = useState<NetInfoState>();

  useLayoutEffect(() => {
    NetInfo.fetch().then((connectionInfo) => {
      setStatus(connectionInfo);
    });
    const subscription = NetInfo.addEventListener((connectionInfo) => {
      setStatus(connectionInfo);
    });
    return subscription;
  }, []);

  return {status};
};

export default useConnection;

import React, {useState, useEffect, useCallback} from 'react';
import SplashScreen from 'react-native-splash-screen';

import Home from 'screens/Home';
import OnBoarding from 'screens/OnBoarding';
import {
  getHasAppBeenOpenedPreviously,
  setHasAppBeenOpenedPreviously,
} from '../services/AsyncStore';

const useAppLoad = () => {
  const [hideOnBoarding, setHideOnBoarding] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const status: boolean = await getHasAppBeenOpenedPreviously();
      setHideOnBoarding(status);
    })().then(() => SplashScreen.hide());
  }, []);

  const updateHideOnBoarding = useCallback(() => {
    setHasAppBeenOpenedPreviously(true).then(() => setHideOnBoarding(true));
  }, []);

  return {hideOnBoarding, updateHideOnBoarding};
};

const MainFlow = () => {
  const {hideOnBoarding, updateHideOnBoarding} = useAppLoad();

  if (!hideOnBoarding) {
    return <OnBoarding onGetStarted={updateHideOnBoarding} />;
  }

  return <Home />;
};

export default MainFlow;

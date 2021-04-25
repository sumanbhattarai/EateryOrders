import React, {useState, useEffect, useCallback} from 'react';

import Home from 'screens/Home';
import OnBoarding from 'screens/OnBoarding';
import {
  getHasAppBeenOpenedPreviously,
  setHasAppBeenOpenedPreviously,
} from '../services/AsyncStore';

const MainFlow = () => {
  const [hideOnBoarding, setHideOnBoarding] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const status: boolean = await getHasAppBeenOpenedPreviously();
      setHideOnBoarding(status);
    })();
  }, []);

  const handleGetStarted = useCallback(() => {
    setHasAppBeenOpenedPreviously(true).then(() => setHideOnBoarding(true));
  }, []);

  if (!hideOnBoarding) {
    return <OnBoarding onGetStarted={handleGetStarted} />;
  }

  return <Home />;
};

export default MainFlow;

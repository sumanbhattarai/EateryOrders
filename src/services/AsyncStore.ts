import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStoreConstant = {
  HasAppBeenOpenedPreviously: 'hasAppBeenOpenedPreviously',
};

const getHasAppBeenOpenedPreviously = async (): Promise<boolean> => {
  const response: null | string = await AsyncStorage.getItem(
    AsyncStoreConstant.HasAppBeenOpenedPreviously,
  );
  return response !== null; // gives false for the firstRun else true
};

const setHasAppBeenOpenedPreviously = async (
  value: string | boolean = true,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      AsyncStoreConstant.HasAppBeenOpenedPreviously,
      String(value),
    );
  } catch (e) {
    console.log(e);
  }
};

export {getHasAppBeenOpenedPreviously, setHasAppBeenOpenedPreviously};

import {showMessage, MessageOptions} from 'react-native-flash-message';

import Fonts from 'utils/Fonts';

const customStyling: Partial<MessageOptions> = {
  floating: true,
  titleStyle: {
    fontFamily: Fonts.regular,
  },
  textStyle: {
    fontFamily: Fonts.regular,
  },
};

type toastType = 'success' | 'danger' | 'warning' | 'info';

const getConfig = (
  param: Partial<MessageOptions> | string,
  type: toastType,
) => {
  let config: Partial<MessageOptions> = {...customStyling, type};
  if (typeof param === 'string') {
    return {...config, message: param} as MessageOptions;
  }
  return {...config, ...param} as MessageOptions;
};

const showSuccess = (param: Partial<MessageOptions> | string) => {
  const config = getConfig(param, 'success');
  showMessage(config);
};

const showError = (param: Partial<MessageOptions> | string) => {
  const config = getConfig(param, 'danger');
  showMessage(config);
};

const showWarning = (param: Partial<MessageOptions> | string) => {
  const config = getConfig(param, 'warning');
  showMessage(config);
};

const showInfo = (param: Partial<MessageOptions> | string) => {
  const config = getConfig(param, 'info');
  showMessage(config);
};

export {showError, showSuccess, showInfo, showWarning};

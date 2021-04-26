import {showMessage, MessageOptions} from 'react-native-flash-message';

import Fonts from 'utils/Fonts';

const customStyling: Partial<MessageOptions> = {
  floating: true,
  titleStyle: {
    fontFamily: Fonts.bold,
  },
  textStyle: {
    fontFamily: Fonts.regular,
  },
};

const showSuccess = (options: MessageOptions) =>
  showMessage({
    ...options,
    ...customStyling,
    type: 'success',
  });

const showError = (options: MessageOptions) =>
  showMessage({
    ...options,
    ...customStyling,
    type: 'danger',
  });

const showWarning = (options: MessageOptions) =>
  showMessage({
    ...options,
    ...customStyling,
    type: 'warning',
  });

const showInfo = (options: MessageOptions) =>
  showMessage({
    ...options,
    ...customStyling,
    type: 'info',
  });

export {showError, showSuccess, showInfo, showWarning};

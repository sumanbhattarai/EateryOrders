import {useState} from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {showError} from 'utils/Toast';

const useImagePicker = () => {
  const [pickedImage, setPickedImage] = useState<ImagePickerResponse>();

  const openImageLibrary = () =>
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorMessage) {
        showError({message: response.errorMessage});
      }
      setPickedImage(response);
    });

  return {openImageLibrary, pickedImage};
};

export default useImagePicker;

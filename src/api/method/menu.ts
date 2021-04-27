import {ImagePickerResponse} from 'react-native-image-picker';

import {makeRequest, Routes} from 'api/';
import {IApiResponse, IMenu} from 'api/utils';

const apiGetMenu = () =>
  makeRequest<IApiResponse<IMenu[]>>({
    url: Routes.GetMenu,
    method: 'GET',
  });

const apiAddFood = (data: {
  name: string;
  selectedCategory: string;
  price: string;
  image: ImagePickerResponse;
  description: string;
}) =>
  makeRequest({
    url: Routes.AddFood,
    method: 'POST',
    data,
  });

export {apiGetMenu, apiAddFood};

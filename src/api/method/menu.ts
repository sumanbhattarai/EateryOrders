// import {ImagePickerResponse} from 'react-native-image-picker';

import {makeRequest, Routes} from 'api/';
import {IApiResponse, IFoodItem, IMenu} from 'api/utils';

const apiGetMenu = () =>
  makeRequest<IApiResponse<IMenu[]>>({
    url: Routes.GetMenu,
    method: 'GET',
  });

const apiAddFood = (data: {
  name: string;
  category: string;
  price: string;
  photo: string; // TODO: Have to change it to ImagePickerResponse
  description: string;
}) =>
  makeRequest<IApiResponse<{message: string; model: IFoodItem}>>({
    url: Routes.AddFood,
    method: 'POST',
    data,
  });

export {apiGetMenu, apiAddFood};

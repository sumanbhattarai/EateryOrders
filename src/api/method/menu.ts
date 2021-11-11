// import {ImagePickerResponse} from 'react-native-image-picker';

import {EntityId} from '@reduxjs/toolkit';
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

const apiDeleteFood = (id: EntityId) =>
  makeRequest<IApiResponse<{message: string}>>({
    url: Routes.DeleteFood(id),
    method: 'DELETE',
  });

const apiEditFood = (
  id: EntityId,
  data: {
    name: string;
    category: string;
    price: string;
    photo: string; // TODO: Have to change it to ImagePickerResponse
    description: string;
  },
) =>
  makeRequest<IApiResponse<IFoodItem>>({
    url: Routes.EditFood(id),
    method: 'POST',
    data,
  });

export {apiGetMenu, apiAddFood, apiDeleteFood, apiEditFood};

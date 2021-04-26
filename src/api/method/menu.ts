import {makeRequest, Routes} from 'api/';
import {IApiResponse, IMenu} from 'api/utils';

const apiGetMenu = () =>
  makeRequest<IApiResponse<IMenu[]>>({
    url: Routes.GetMenu,
    method: 'GET',
  });

const apiAddFood = (data: any) =>
  makeRequest({
    url: Routes.AddFood,
    method: 'POST',
    data,
  });

export {apiGetMenu, apiAddFood};

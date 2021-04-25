import {makeRequest, Routes} from 'api/';

const apiGetMenu = () =>
  makeRequest({
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

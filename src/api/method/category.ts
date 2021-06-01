import {makeRequest, Routes} from 'api/';
import {IApiResponse, ICategory} from 'api/utils';

const apiAddCategory = (name: string) =>
  makeRequest<IApiResponse<ICategory>>({
    url: Routes.AddCategory,
    method: 'POST',
    data: {name},
  });

const apiGetCategory = () =>
  makeRequest<IApiResponse<ICategory[]>>({
    url: Routes.GetCategory,
    method: 'GET',
  });

export {apiAddCategory, apiGetCategory};

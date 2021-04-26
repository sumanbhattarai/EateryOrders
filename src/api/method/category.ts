import {makeRequest, Routes} from 'api/';
import {IApiResponse, ICategory} from 'api/utils';

const apiAddCategory = (data: {name: string}) =>
  makeRequest<IApiResponse<ICategory>>({
    url: Routes.AddCategory,
    method: 'POST',
    data,
  });

const apiGetCategory = () =>
  makeRequest<IApiResponse<ICategory[]>>({
    url: Routes.GetCategory,
    method: 'GET',
  });

export {apiAddCategory, apiGetCategory};

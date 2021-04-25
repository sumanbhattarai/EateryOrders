import {makeRequest, Routes} from 'api/';

const apiAddCategory = (data: any) =>
  makeRequest({
    url: Routes.AddCategory,
    method: 'POST',
    data,
  });

const apiGetCategory = () =>
  makeRequest({
    url: Routes.GetCategory,
    method: 'GET',
  });

export {apiAddCategory, apiGetCategory};

import {IApiResponse, IOrder} from 'api/utils';
import {makeRequest, Routes} from 'api/';

const apiGetOrders = () =>
  makeRequest<IApiResponse<IOrder[]>>({
    url: Routes.GetOrder,
    method: 'GET',
  });

export {apiGetOrders};

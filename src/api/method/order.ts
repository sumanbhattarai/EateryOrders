import {EntityId} from '@reduxjs/toolkit';

import {IApiResponse, IOrder} from 'api/utils';
import {makeRequest, Routes} from 'api/';
import {OrderStatus} from 'store/utils';

const apiGetOrders = () =>
  makeRequest<IApiResponse<IOrder[]>>({
    url: Routes.GetOrder,
    method: 'GET',
  });

const apiUpdateOrderStatus = (data: {_id: EntityId; status: OrderStatus}) =>
  makeRequest<IApiResponse<{message: string}>>({
    url: Routes.UpdateOrderStatus,
    method: 'POST',
    data,
  });

export {apiGetOrders, apiUpdateOrderStatus};

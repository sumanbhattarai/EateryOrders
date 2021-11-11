import {EntityId} from '@reduxjs/toolkit';

import {IApiResponse, IOrder, IStatus} from 'api/utils';
import {makeRequest, Routes} from 'api/';

const apiGetOrders = () =>
  makeRequest<IApiResponse<IOrder[]>>({
    url: Routes.GetOrder,
    method: 'GET',
  });

const apiUpdateOrderStatus = (data: {_id: EntityId; status: IStatus}) =>
  makeRequest<IApiResponse<{message: string}>>({
    url: Routes.UpdateOrderStatus,
    method: 'POST',
    data,
  });

export {apiGetOrders, apiUpdateOrderStatus};

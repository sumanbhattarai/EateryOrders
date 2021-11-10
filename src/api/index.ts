import axios, {AxiosRequestConfig} from 'axios';

import Logger from 'utils/Logger';

const APP_URL = 'https://minorii.herokuapp.com';

const client = axios.create({
  baseURL: APP_URL,
});

const Routes = {
  GetCategory: '/listCategory',
  AddCategory: '/addCategory',
  AddFood: '/create',
  GetMenu: '/list',
  Login: '/signin',
  GetOrder: '/order',
  UpdateOrderStatus: '/orderStatus',
};

/*
TODO: Handling something before sending an api request.
 Like: setting the bearer token before request.
 */

axios.interceptors.request.use(async (request) => {
  if (request.url?.includes('signin')) {
    return request;
  }
  // TODO: Set bearer token except for signin
  return request;
});

const makeRequest = async <R>(config: AxiosRequestConfig): Promise<R> => {
  try {
    const response = await client.request(config);
    return ({
      success: true,
      data: response.data,
    } as any) as R;
  } catch (error: any) {
    Logger.error(error.message);
    return ({
      success: false,
      message: error.message,
    } as any) as R;
  }
};

export {client, Routes, makeRequest};

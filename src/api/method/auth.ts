import {IApiResponse} from 'api/utils';
import {makeRequest, Routes} from 'api/';

const apiLogin = (data: {email: string; password: string}) =>
  makeRequest<IApiResponse<{token: string}>>({
    url: Routes.Login,
    method: 'POST',
    data,
  });

export {apiLogin};

import {makeRequest, Routes} from 'api/';

const apiLogin = (data: {email: string; password: string}) =>
  makeRequest({
    url: Routes.Login,
    method: 'POST',
    data,
  });

export {apiLogin};

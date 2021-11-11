import {IApiResponse} from 'api/utils';
import {makeRequest, Routes} from 'api/';

const apiIsOpen = () =>
  makeRequest<IApiResponse<Array<{isOpen: boolean}>>>({
    url: Routes.IsOpen,
    method: 'GET',
  });

const apiToggleIsOpen = (status: boolean) =>
  makeRequest<IApiResponse<{}>>({
    url: Routes.IsOpen,
    method: 'POST',
    data: {
      isOpen: status,
    },
  });
export {apiIsOpen, apiToggleIsOpen};

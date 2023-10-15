import API from 'adapters/rest';
import { Response } from 'types';
import { DasboardData } from '../types';
import { AxiosResponse } from 'axios';

export const getDashBoardData = (query = ''): Promise<Response<DasboardData>> => {
  const url = `/dashboarddata${query || ''}`;
  return API.get<Response<DasboardData>>(url).then((response:AxiosResponse<Response<DasboardData>>) => {
    return response.data;
  });
};

import API from 'adapters/rest';
import { ListResponse } from 'types';
import { Car } from '../types';
import { AxiosResponse } from 'axios';

export const getCarsData = (query = ''): Promise<ListResponse<Car>> => {
  const url = `/cars${query || ''}`;
  return API.get<ListResponse<Car>>(url).then((response:AxiosResponse<ListResponse<Car>>) => {
    console.log("response", response)
    return response.data;
  });
};

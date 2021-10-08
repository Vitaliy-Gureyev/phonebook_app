import axios, { AxiosResponse } from 'axios';
import { IPhonebook } from '../models/IPhonebook';

const getPhonebook = (): Promise<AxiosResponse<IPhonebook[]>> => {
  try {
    return axios.get<IPhonebook[]>('./phonebook.json');
  } catch (error: any) {
    return error.message;
  }
};

export const api = {
  getPhonebook,
};

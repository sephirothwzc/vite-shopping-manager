import { AxiosResponse } from 'axios';
import service from '../../utils/axios-helper';

export interface FormState {
  code: string;
  nickname: string;
  realname: string;
  phone: string;
}

export const queryData = (id: string): Promise<AxiosResponse<FormState>> => {
  if (!id) {
    return Promise.resolve({ data: {} }) as any;
  }
  return service.get<FormState>(`/api/app-user/${id}`);
};

/**
 * 保存
 * @param formData
 * @returns
 */
export const mutatioinSave = (formData: FormState) => {
  return service.post<string>(`/api/app-user`, formData);
};

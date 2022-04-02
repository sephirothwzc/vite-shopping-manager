import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/ts-helper';
import { MallGoodsType } from '../shopping-goods';

/**
 * 保存
 * @param value
 */
export const runSave = (value: MallGoodsType, id?: Maybe<string>) => {
  if (id) {
    return service.put(`/api/mall-goods/${id}`, value);
  }
  return service.post('/api/mall-goods', value);
};

/**
 * 获取修改
 * @param id
 * @returns
 */
export const runGet = (id: string) => {
  return service.get<MallGoodsType>(`/api/mall-goods/${id}`);
};

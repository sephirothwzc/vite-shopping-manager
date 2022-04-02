import { pickBy, keys, omit } from 'lodash';
import Flattener from 'flattener';
/**
 * 处理分页
 * @param params
 * @returns
 */
export const findSearchParams = (params: {
  search?: any;
  page?: number;
  size?: number;
  sort?: string;
  descend?: 'ascend' | 'descend' | number | string;
}) => {
  params?.search && (params.search = pickBy(params.search, (p) => p));
  params?.descend && (params.descend = params.descend === 'ascend' ? 'ASC' : 'DESC');
  if (keys(params?.search).length <= 0) {
    return omit(params, 'search');
  }
  // 对象拼接处理
  const search = Flattener.flatten(params?.search);
  params.search = keys(search)
    .map((p) => `${p}:'${search[p]}'`)
    .join(' and ');
  return params;
};

/**
 * 默认必填约束
 * @returns
 */
export const getRulesRequired = () => {
  return [{ required: true, message: '请输入' }];
};

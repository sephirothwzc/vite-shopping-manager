import { pickBy, keys, omit } from 'lodash';

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
  params?.search && (params.search = searchToQuery(pickBy(params.search, (p) => p)));
  params?.descend && (params.descend = params.descend === 'ascend' ? 'ASC' : 'DESC');
  if (keys(params?.search).length <= 0) {
    return omit(params, 'search');
  }
  return params;
};

export const searchToQuery = (params: any) => {
  const value = keys(params)
    .map((p) => `${p}:${params[p]}`)
    .join(' OR ');
  console.log(value);
  return value;
};

import { APIParams } from '@/components/schema-control/schema-table';
import { findSearchParams } from '@/utils/antd-helper';
import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/ts-helper';
import { pickBy, toNumber, set } from 'lodash';

/**
 * 商品价格明细
 */
export type MallGoodsSpecificationsType = {
  /**
   * 用户id
   */
  id?: number;
  /**
   * 创建时间
   */
  createdAt?: Date;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 更新时间
   */
  updatedAt?: Date;
  /**
   * 商品库存
   */
  goodsCount?: number;
  /**
   * 商品价格 分
   */
  goodsPrice?: number;
  /**
   * 商品规格
   */
  goodsUnit?: string;
  /**
   * 商品售价 分
   */
  realityPrice?: number;
  /**
   * 用户id
   */
  mallGoodsId?: number;
};

/**
 * 根据id 加载 商品价格列表
 * @param mallGoodsId
 * @param params
 * @returns
 */
export const getListByMallGoodsId = async (mallGoodsId: string, params: APIParams) => {
  const search = pickBy(params.filters, (p) => p);
  if (mallGoodsId) {
    set(search, 'mallGoods.id', mallGoodsId);
  }
  const res = await service.get<Array<MallGoodsSpecificationsType>>(
    '/api/mall-goods-specifications/page',
    {
      params: findSearchParams({
        search,
        page: toNumber(params.current) - 1,
        size: params.pageSize,
        sort: params.sortField,
        descend: params.sortOrder,
      }),
    }
  );
  return res.data;
};

/**
 * 获取修改
 * @param id
 * @returns
 */
export const runGet = (id: string) => {
  return service
    .get<MallGoodsSpecificationsType>(`/api/mall-goods-specifications/${id}`)
    .then((res) => res.data);
};

/**
 * 保存
 * @param value
 */
export const runSave = (
  value: MallGoodsSpecificationsType,
  id?: Maybe<string>,
  mallGoodsId?: any
) => {
  if (id) {
    return service.put(`/api/mall-goods-specifications/${id}`, value);
  }
  return service.post(`/api/mall-goods-specifications/`, value).then((res) => {
    return service.put(
      String(res.data._links.mallGoods.href).replace(String(import.meta.env.VITE_JPA_REST_URL), ''),
      `${import.meta.env.VITE_JPA_REST_URL}/api/mall-goods/${mallGoodsId}`,
      {
        headers: {
          'Content-Type': 'text/uri-list',
        },
      }
    );
  });
};

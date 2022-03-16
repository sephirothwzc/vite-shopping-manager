import { APIParams } from '@/components/schema-control/schema-table';
import { findSearchParams } from '@/utils/antd-helper';
import service from '@/utils/axios-helper';
import { pickBy, toNumber } from 'lodash';

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
export const getListByMallGoodsId = (mallGoodsId: string, params: APIParams) => {
  const search = pickBy(params.filters, (p) => p);
  if (mallGoodsId) {
    search.mallGoodsId = mallGoodsId;
  }
  return service
    .get<Array<MallGoodsSpecificationsType>>('/api/mall-goods-specifications/page', {
      params: findSearchParams({
        search,
        page: toNumber(params.current) - 1,
        size: params.pageSize,
        sort: params.sortField,
        descend: params.sortOrder,
      }),
    })
    .then((res) => {
      return res.data;
    });
};

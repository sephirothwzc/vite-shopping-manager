/**
 * 商品
 */
export type MallGoodsType = {
  /**
   * id
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
   * 商品编号
   */
  code?: string;
  /**
   * 商品图片
   */
  goodsImage?: string;
  /**
   * 商品编号
   */
  goodsName?: string;
  /**
   * 商品详情
   */
  goodsDetails?: string;
  /**
   * 商品参数
   */
  goodsParams?: string;
  /**
   * 商品标签
   */
  goodsTag?: string;
  /**
   * 商品分类
   */
  goodsType?: string;
};

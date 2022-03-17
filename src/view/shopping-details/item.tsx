import { MallGoodsType } from '@/service/shopping-goods';
import service from '@/utils/axios-helper';
import { Divider, Skeleton, Button, Card } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute } from 'vue-router';
import DetailsList from './details-list';

export type ItemPropsType = {};

/**
 * 获取修改
 * @param id
 * @returns
 */
const runGet = (id: string) => {
  return service.get<MallGoodsType>(`/api/mall-goods/${id}`).then((res) => res.data);
};

/**
 *
 * @returns
 */
const Item = defineComponent({
  // props: {},
  setup() {
    const { id } = useRoute().params;
    const { data, loading: getLoading } = useRequest(runGet, {
      defaultParams: [String(id)],
    });

    return () => (
      <div>
        <Skeleton active loading={getLoading.value}>
          <Card title={data.value?.goodsName}>
            <p>商品分类：{data.value?.goodsType}</p>
            <Divider></Divider>
            <Button type="link">新增</Button>
            <DetailsList></DetailsList>
          </Card>
        </Skeleton>
      </div>
    );
  },
});
export type ItemType = typeof Item;
export default Item;

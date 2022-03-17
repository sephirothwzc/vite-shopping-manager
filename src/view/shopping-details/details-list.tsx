import SchemaTable, {
  APIParams,
  BodyCellType,
  SchemaTablePropOptionType,
} from '@/components/schema-control/schema-table';
import {
  getListByMallGoodsId,
  MallGoodsSpecificationsType,
} from '@/service/mall-goods-specifications';
import { APIPageResult } from '@/utils/ts-helper';
import { Button, message, Popconfirm } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export type DetailsListPropsType = {};

/**
 * 价格列表
 * @returns
 */
const DetailsList = defineComponent({
  // props: {},
  setup() {
    const { id } = useRoute().params;

    const router = useRouter();
    const renderBody: BodyCellType<MallGoodsSpecificationsType> = ({
      text,
      record,
      index,
      column,
    }) => {
      if (column.key === 'operation') {
        return (
          <span>
            <Button type="link" onClick={() => router.push(`shopping-goods/item/${record.id}`)}>
              修改
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => deleteItem(record)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </span>
        );
      } else {
        return text;
      }
    };

    /**
     * 删除
     * @param record
     */
    const deleteItem = (record: MallGoodsSpecificationsType) => {
      message.success(`${record.goodsUnit}删除成功！`);
    };

    const option: SchemaTablePropOptionType<MallGoodsSpecificationsType> = {
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '商品规格',
          dataIndex: 'goodsUnit',
          key: 'goodsUnit',
        },
        {
          title: '商品价格',
          dataIndex: 'goodsPrice',
          key: 'goodsPrice',
        },
        {
          title: '商品售价',
          dataIndex: 'realityPrice',
          key: 'realityPrice',
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          formItem: {
            controlType: 'DatePicker',
            label: '日期',
            keyId: 'createdAt',
          },
          advanced: true,
        },
        /**
         * 操作固定右侧
         */
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          sorter: false,
          width: 200,
        },
      ],
      slots: {
        bodyCell: renderBody,
      },
      rowKey: 'id',
      queryData: (params: APIParams) => getListByMallGoodsId(String(id), params),
      formatResult: (res: APIPageResult<MallGoodsSpecificationsType>) => {
        return { data: res.content, total: res.totalElements };
      },
      notShowAdvanced: true,
      notShowSearch: true,
    };

    // const pagination = computed(() => pagination);
    return () => (
      <div>
        <SchemaTable option={option as any}></SchemaTable>
      </div>
    );
  },
});
export default DetailsList;

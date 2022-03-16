import { defineComponent } from 'vue';
import service, { APIResult } from '../../utils/axios-helper';
import SchemaTable, {
  APIParams,
  BodyCellType,
  SchemaTablePropOptionType,
} from '@/components/schema-control/schema-table';
import { MallGoodsType } from '@/service/shopping-goods';
import { Button, message, Popconfirm } from 'ant-design-vue';
import { APIPageResult } from '@/utils/ts-helper';
import { pickBy, toNumber } from 'lodash';
import { findSearchParams } from '@/utils/antd-helper';
import { useRouter } from 'vue-router';

/**
 * 商品管理
 * @returns
 */
const List = defineComponent({
  props: {},
  setup() {
    const router = useRouter();
    const renderBody: BodyCellType<MallGoodsType> = ({ text, record, index, column }) => {
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
    const deleteItem = (record: MallGoodsType) => {
      message.success(`${record.goodsName}删除成功！`);
    };

    const option: SchemaTablePropOptionType<MallGoodsType> = {
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '商品分类',
          dataIndex: 'goodsType',
          key: 'goodsType',
          /**
           * 允许拖拽 需要设置 列宽度
           */
          // resizable: true,
          formItem: {
            controlType: 'Input',
            keyId: 'goodsType',
            label: '商品分类',
          },
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          key: 'goodsName',
          formItem: {
            controlType: 'Input',
          },
        },
        {
          title: '商品标签',
          dataIndex: 'goodsTag',
          key: 'goodsTag',
          sorter: false,
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
      queryData: (params: APIParams) => {
        const search = pickBy(params.filters, (p) => p);
        return service
          .get('/api/mall-goods/page', {
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
      },
      formatResult: (res: APIPageResult<MallGoodsType>) => {
        return { data: res.content, total: res.totalElements };
      },
    };

    // const pagination = computed(() => pagination);
    return () => (
      <div>
        <SchemaTable option={option as any}></SchemaTable>
      </div>
    );
  },
});
export default List;

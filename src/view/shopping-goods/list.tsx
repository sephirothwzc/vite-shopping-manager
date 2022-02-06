import { computed, defineComponent, FunctionalComponent } from 'vue';
import { Table, TableProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import service, { APIResult } from '../../utils/axios-helper';

const columns = [
  {
    title: '商品编号',
    dataIndex: 'code',
    sorter: true,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    sorter: true,
  },
  {
    title: '商品分类',
    dataIndex: 'goodsName',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};

const queryData = (params: APIParams) => {
  return service.get<APIResult<Array<any>>>('/api/mall-goods', { params });
};

/**
 * 商品管理
 * @returns
 */
const List: FunctionalComponent = () => {
  const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
  } = usePagination(queryData, {
    formatResult: (res) => res.data.data,
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'results',
    },
  });

  const pagination = computed(() => ({
    total: 200,
    current: current.value,
    pageSize: pageSize.value,
  }));

  const handleTableChange: TableProps['onChange'] = (
    pag: { pageSize?: any; current?: any },
    filters: any,
    sorter: any
  ) => {};

  // const pagination = computed(() => pagination);
  return () => (
    <Table
      columns={columns}
      row-key={(record: any) => record.id}
      data-source="dataSource"
      pagination={pagination as any}
      loading={loading.value}
      onChange={handleTableChange}
    ></Table>
  );
};
export default defineComponent(List);

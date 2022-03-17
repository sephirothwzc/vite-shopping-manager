import { Button, PageHeader, Table, TableProps } from 'ant-design-vue';
import { computed, defineComponent, FunctionalComponent } from 'vue';
import { usePagination } from 'vue-request';
import service, { APIRestResult } from '../../utils/axios-helper';

const columns = [
  {
    title: '编号',
    dataIndex: 'code',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    sorter: true,
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    sorter: true,
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
    sorter: true,
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
  return service.get<APIRestResult<Array<any>>>('/api/app-user', { params });
};

/**
 *
 * @returns
 */
const List: FunctionalComponent = () => {
  const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
    total,
  } = usePagination(queryData, {
    formatResult: (res) => res.data._embedded.appUsers,
    pagination: {
      currentKey: 'page.number',
      pageSizeKey: 'page.size',
      totalKey: 'page.totalElements',
      totalPageKey: 'page.totalPages',
    },
  });

  const pagination = computed(() => ({
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
  }));

  const handleTableChange: TableProps['onChange'] = (
    pag: { pageSize?: any; current?: any },
    filters: any,
    sorter: any
  ) => {
    run({
      results: pag.pageSize,
      page: pag?.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  return () => (
    <>
      <PageHeader title="用户管理" sub-title="">
        <router-link to="app-user/item">
          <Button>新增</Button>
        </router-link>
      </PageHeader>
      <Table
        columns={columns}
        // row-key={(record: any) => record.id}
        data-source={dataSource.value}
        pagination={pagination.value}
        loading={loading.value}
        onChange={handleTableChange}
      ></Table>
    </>
  );
};
export type ListType = typeof List;
export default defineComponent(List);

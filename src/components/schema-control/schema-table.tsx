import { Maybe } from '@/utils/ts-helper';
import { Layout, LayoutContent, LayoutHeader, LayoutSider, Table } from 'ant-design-vue';
import { ColumnsType, TablePaginationConfig, TableProps } from 'ant-design-vue/lib/table';
import { computed, defineComponent, PropType } from 'vue';
import { usePagination } from 'vue-request';
import { isString } from 'lodash';
import SchemaForm, { SchemaFormItemSettingType, SchemaFType } from './schema-form';

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};

/**
 * 参数
 */
export type SchemaTablePropOptionType = {
  /**
   * 数据列指定
   */
  columns: Array<ColumnsType<any> & { formItem?: SchemaFormItemSettingType }>;
  /**
   * 查询方法
   */
  queryData: (params: APIParams) => Promise<any>;
  /**
   * 主键
   */
  rowKey: string | ((item: any) => any);
};

/**
 * 通用table组件
 * @returns
 */
const SchemaTable = defineComponent({
  props: {
    option: Object as PropType<SchemaTablePropOptionType>,
  },
  setup(props) {
    if (!props.option?.queryData) {
      throw new Error('请绑定queryData=ajax方法');
    }
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(props.option.queryData, {
      formatResult: (res) => res.data.results,
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

    const handleTableChange = (pag: TablePaginationConfig, filters: any, sorter: any) => {
      run({
        results: pag.pageSize!,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };

    /**
     * 普通搜索
     */
    const searchForm: SchemaFType = {
      layout: 'inline',
      formName: 'search',
      wrapperColSpan: 8,
      initValue: {},
      formItems: props.option.columns.filter((p) => p.formItem)?.map?.((p) => p.formItem) as any,
    };

    return () => (
      <Layout>
        <Layout>
          <LayoutHeader>
            <SchemaForm schema={searchForm}></SchemaForm>
          </LayoutHeader>
          <LayoutContent>
            <Table
              columns={props.option?.columns as any}
              dataSource={dataSource.value}
              onChange={handleTableChange}
              pagination={pagination.value}
              loading={loading.value}
              rowKey={props.option?.rowKey}
            ></Table>
          </LayoutContent>
        </Layout>
        <LayoutSider></LayoutSider>
      </Layout>
    );
  },
});
export type SchemaTableType = typeof SchemaTable;
export default SchemaTable;

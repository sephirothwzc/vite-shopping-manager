import { Maybe } from '@/utils/ts-helper';
import {
  Button,
  Col,
  Drawer,
  Layout,
  LayoutContent,
  Row,
  Table,
  TableColumnType,
} from 'ant-design-vue';
import { ColumnType, TablePaginationConfig } from 'ant-design-vue/lib/table';
import { omit, set } from 'lodash';
import { computed, defineComponent, PropType, ref, toRaw } from 'vue';
import { usePagination } from 'vue-request';
import SchemaForm, { SchemaFormItemSettingType, SchemaFormType, SchemaFType } from './schema-form';
import styles from './schema-table.module.less';
import { FilterOutlined } from '@ant-design/icons-vue';

/**
 * 查询params
 */
export type APIParams = {
  /**
   * 行数
   */
  current: number;
  /**
   * 当前页数
   */
  pageSize?: number;
  sortField?: string;
  sortOrder?: number | string;
  filters: { [k: string]: any };
};

/**
 * 单元格自定义
 */
export type BodyCellType<T> = (param: {
  text: any;
  record: T;
  index: number;
  column: ColumnType<T>;
}) => any;

/**
 * 参数
 */
export type SchemaTablePropOptionType<T extends {} = {}> = {
  /**
   * 数据列指定
   */
  columns: Array<
    ColumnType<T> & {
      /**
       * 搜索表单配置项目
       */
      formItem?: SchemaFormItemSettingType<T>;
      /**
       * hidden 标识隐藏不生成 列
       */
      hidden?: boolean;
      /**
       * 高级搜索
       */
      advanced?: boolean;
    }
  >;
  /**
   * slots
   */
  slots?: {
    /**
     * 头部单元格
     */
    headerCell?: ({ title, column }: { title: string; column: ColumnType<T> }) => any;
    /**
     * 表格单元格
     */
    bodyCell?: BodyCellType<T>;
    // customFilterDropdown;
    // customFilterIcon;
  };
  /**
   * 不显示高级搜索 默认false 显示
   */
  notShowAdvanced?: boolean;
  /**
   * 不显示搜索表单 默认false 显示
   */
  notShowSearch?: boolean;
  /**
   * 查询方法 useRequest 使用
   */
  queryData: (params: APIParams) => Promise<any>;
  /**
   * 点击查询参数捕捉函数钩子
   */
  searchHook?: (value: T) => T;
  /**
   * 主键 默认值 id
   */
  rowKey?: string | ((item: any) => any);
  /**
   * 返回值 格式化 useRequest 使用
   */
  formatResult?: (res: any) => { data: Array<any>; total: number };
  /**
   * 普通查询 初始化
   */
  searchFormInitValue?: T;
  /**
   * 高级查询 初始化
   */
  searchAdvancedFormInitValue?: T;
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
    // #region data
    /**
     * 查询条件
     */
    const filteredInfo = ref();

    /**
     * 高级查询条件
     */
    const filteredAdvancedInfo = ref();
    /**
     * 排序条件
     */
    const sortedInfo = ref();

    /**
     * 高级筛选关闭
     */
    const advancedVisible = ref(false);

    /**
     * 表单 ref
     */
    const schemaFromRef = ref<Maybe<SchemaFormType>>(null);

    /**
     * 高级搜索表单 ref
     */
    const advancedSchemaFromRef = ref<Maybe<SchemaFormType>>(null);
    // #endregion

    // #region method
    /**
     * 分页订阅声明
     */
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(props.option.queryData, {
      formatResult: props.option.formatResult ? props.option.formatResult : (res) => res,
    });
    const pagination = computed(() => ({
      total: dataSource.value?.total || 0,
      current: current.value,
      pageSize: pageSize.value,
    }));

    /**
     * table 变成事件
     * @param pag
     * @param filters
     * @param sorter
     */
    const handleTableChange = (pag: TablePaginationConfig, filters: any, sorter: any) => {
      sortedInfo.value = sorter;
      run({
        /**
         * 每页行数 对应 返回值解构中的 pageSize 可以通过 option.pageSizeKey 指定 入参（直接返回）
         */
        pageSize: pag.pageSize!,
        /**
         * 当前页 对应 返回解构中的 current 可以通过 option.current 指定 入参（直接返回）
         */
        current: pag?.current || 0,
        sortField: sorter?.field,
        sortOrder: sorter?.order,
        filters: { ...filters, ...filteredInfo.value, ...filteredAdvancedInfo.value },
      });
    };

    /**
     * 根据列生成普通查询的表单
     * @returns
     */
    const findColumnsByForm = (): SchemaFormItemSettingType[] => {
      const columns: SchemaFormItemSettingType[] =
        (props?.option?.columns
          .filter((p) => p.formItem && !p.advanced)
          ?.map?.((p) => {
            return {
              label: p.title,
              keyId: p.key,
              ...p.formItem,
            };
          }) as any) || [];
      props.option?.notShowAdvanced ||
        columns?.push({
          controlType: 'Button',
          label: '高级搜索',
          controlPropery: {
            type: 'text',
            slots: {
              icon: () => <FilterOutlined />,
            },
            onClick: () => (advancedVisible.value = true),
          },
        });
      return columns;
    };

    /**
     * 根据列生成高级查询的表单
     * @returns
     */
    const findAdvancedColumnsByForm = (): SchemaFormItemSettingType[] => {
      const columns: SchemaFormItemSettingType[] =
        (props?.option?.columns
          .filter((p) => p.formItem && p.advanced)
          ?.map?.((p) => {
            return {
              label: p.title,
              keyId: p.key,
              ...p.formItem,
            };
          }) as any) || [];
      return columns;
    };

    /**
     * 查询数据组织
     */
    const findSearchInitValue = (columns: () => SchemaFormItemSettingType[]) => {
      const formItems = columns();
      const initValue = {};
      formItems
        .filter((p) => p.keyId)
        .forEach((p) => {
          set(initValue, String(p.keyId), undefined);
        });
      return { formItems, initValue };
    };

    /**
     * 普通搜索
     */
    const searchForm: SchemaFType = {
      // layout: 'inline',
      rowCol: 6,
      formName: 'search',
      ...findSearchInitValue(findColumnsByForm),
    };

    /**
     * 高级搜索
     */
    const advancedSearchForm: SchemaFType = {
      layout: 'horizontal',
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      formName: 'advancedSearch',
      ...findSearchInitValue(findAdvancedColumnsByForm),
    };

    /**
     * 查询
     * @param value
     */
    const handleFinish = (value: any) => {
      const formData = props.option?.searchHook?.(value) || value;
      filteredInfo.value = formData;
      handleTableChange(pagination.value, toRaw(formData), toRaw(sortedInfo.value));
    };

    /**
     * 重置 普通搜索
     */
    const handleReset = () => {
      schemaFromRef?.value?.resetFields();
      filteredInfo.value = undefined;
    };

    /**
     * 重置 高级搜索
     */
    const handleAdvancedReset = () => {
      advancedSchemaFromRef?.value?.resetFields();
      filteredAdvancedInfo.value = undefined;
    };

    /**
     * 高级查询
     * @param value
     */
    const handleAdvancedFinish = (value: any) => {
      const formData = props.option?.searchHook?.(value) || value;
      filteredAdvancedInfo.value = formData;
      handleTableChange(pagination.value, toRaw(formData), toRaw(sortedInfo.value));
    };
    // #endregion

    // #region computed
    /**
     * 数据列组织
     */
    const columns = computed<TableColumnType[]>(() => {
      const filtered = filteredInfo.value || {};
      const sorted = sortedInfo.value || {};
      return (
        props.option?.columns
          ?.filter((p) => !p.hidden)
          .map?.((p) => {
            const colItem = omit(p, 'formItem');
            return {
              sorter: true,
              sortOrder: sorted.columnKey === p.key && sorted.order,
              filteredValue: filtered?.[String(p.key)] || null,
              filtered: !!filtered?.[String(p.key)],
              ...colItem,
            };
          }) || []
      );
    });
    // #endregion

    return () => (
      <Layout>
        <Layout>
          {props.option?.notShowSearch || (
            // 普通查询
            <LayoutContent class={styles.layoutItem}>
              <SchemaForm
                key="search"
                schema={searchForm}
                ref={schemaFromRef}
                onHandleFinish={handleFinish}
              ></SchemaForm>
              <Row gutter={24} type="flex" justify="end">
                <Col>
                  <Button type="primary" onClick={schemaFromRef.value?.onSubmit}>
                    查询
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleReset}>重置</Button>
                </Col>
              </Row>
            </LayoutContent>
          )}
          <LayoutContent>
            <Table
              columns={columns.value}
              dataSource={dataSource.value?.data}
              onChange={handleTableChange}
              pagination={pagination.value}
              loading={loading.value}
              rowKey={props.option?.rowKey || 'id'}
              v-slots={props.option?.slots}
            ></Table>
          </LayoutContent>
        </Layout>
        {/* 高级查询 */}
        <Drawer v-model:visible={advancedVisible.value} width="550" destroyOnClose={true}>
          <SchemaForm
            key="advancedSearch"
            schema={advancedSearchForm}
            ref={advancedSchemaFromRef}
            onHandleFinish={handleAdvancedFinish}
          ></SchemaForm>
          <Row gutter={24} type="flex" justify="end">
            <Col>
              <Button type="primary" onClick={advancedSchemaFromRef.value?.onSubmit}>
                查询
              </Button>
            </Col>
            <Col>
              <Button onClick={handleAdvancedReset}>重置</Button>
            </Col>
          </Row>
        </Drawer>
      </Layout>
    );
  },
});
export type SchemaTableType = typeof SchemaTable;
export default SchemaTable;

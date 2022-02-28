import { Maybe } from '@/utils/ts-helper';
import { useExpose } from '@/utils/use-expose';
import { Button, Form, InputNumberProps, Skeleton, Spin } from 'ant-design-vue';
import { FormItem } from 'ant-design-vue/lib/form';
import { Props } from 'ant-design-vue/lib/form/useForm';
import { computed, defineComponent, PropType, reactive, toRaw } from 'vue';
import SchemaFormItem from './schema-form-item';
const useForm = Form.useForm;

/**
 * 日期控件
 */
type DatePickerProps = {
  valueFormat: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM';
  picker: 'month' | 'day';
};

type SelectProps = {
  /**
   * 支持清除
   */
  allowClear?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 设置 Select 的模式为多选或标签
   */
  mode?: 'multiple' | 'tags' | 'combobox';
  /**
   * options 数据，如果设置则不需要手动构造 selectOption 节点
   */
  options: Array<{ value: any; label: string; disabled: boolean; key: string; title: string }>;
};

type CascaderProps = {
  /**
   * 是否支持清除
   */
  allowClear: boolean;
  /**
   * 当此项为 true 时，点选每级菜单选项值都会发生变化
   */
  changeOnSelect: boolean;
  /**
   * 自定义 options 中 label name children 的字段
   */
  fieldNames: { label: 'label'; value: 'value'; children: 'children' };
  /**
   * 可选项数据源
   */
  options: Array<unknown>;
  /**
   * 输入框占位文本
   */
  placeholder: string;
  /**
   * 一次性选择多个选项。
   */
  multiple: boolean;
  /**
   * 在选择框中显示搜索框
   */
  showSearch: boolean | object;
};

type InputProps = {
  /**
   * 是否显示清空按钮
   */
  allowClear: boolean;
};

type ImageUploadProps = {
  /**
   * 上传地址
   */
  action?: string;
  /**
   * 照片墙数量
   */
  maxLength?: number;
};

type RangePickerProps = {
  /**
   * 增加时间选择功能
   */
  showTime: boolean;
  /**
   * 当设定了 showTime 的时候，面板是否显示“此刻”按钮
   */
  showNow: boolean;
  picker: 'week' | 'month' | 'year' | 'quarter';
};

type TransferProps = {
  /**
   * 源
   */
  targetKeys: Array<string>;
  /**
   * 选中
   */
  selectedKeys: Array<string>;
  /**
   * 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
   */
  dataSource: Array<{
    key: string;
    title: string;
    description?: string;
    disabled?: boolean;
  }>;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 展示为单向样式
   */
  oneWay: boolean;
  /**
   * 是否显示搜索框
   */
  showSearch: boolean;
  /**
   * 是否展示全选勾选框
   */
  showSelectAll: boolean;
  /**
   * 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 element。或者返回一个普通对象，其中 label 字段为 element，value 字段为 title	Function(record)| slot
   */
  render: (item: { key: string; title: string; description?: string; disabled?: boolean }) => any;
};

/**
 * select options\checkbox
 */
export type ChildrenListItemType = {
  /**
   * value
   */
  value: string | number;
  /**
   * key name
   */
  name: string;
  /**
   * 显示项目
   */
  display: string;
};

export type SchemaFormItemSettingType<T extends {} = {}> = {
  /**
   * 控件类型
   */
  controlType:
    | 'Input'
    | 'Password'
    | 'CheckboxGroup'
    | 'RadioGroup'
    | 'Select'
    | 'Cascader'
    | 'Switch'
    | 'Slider'
    | 'Transfer'
    | 'InputNumber'
    | 'Textarea'
    | 'Button'
    | 'Submit'
    | 'ImageUpload'
    | 'DatePicker'
    | 'TimePicker'
    | 'TimeRangePicker'
    | 'RangePicker';
  /**
   * key v-model
   */
  keyId?: keyof T;
  /**
   * 默认同keyId
   */
  rulesKey?: keyof T & string;
  /**
   * 其他属性 解构使用 用于form-item
   */
  propertyObject?: InputNumberProps;
  /**
   * controler property  例如：onChange=()=>{}
   */
  controlPropery?: Maybe<
    | DatePickerProps
    | SelectProps
    | InputProps
    | ImageUploadProps
    | RangePickerProps
    | CascaderProps
    | TransferProps
    | { [k: string]: any }
  >;
  /**
   * 显示文本
   */
  label?: string;
  /**
   * default 默认同 keyId
   */
  controlName?: string;
  /**
   * 控件明细 用于 map
   */
  childrenList?: Maybe<Array<ChildrenListItemType>>;
  /**
   * 多级联动 SchemaFormItem
   */
  ProFormDependency?: <V>(itemValue: V, formValue?: T) => boolean;
};

export type SchemaFType<T extends {} = {}> = {
  /**
   * 表单名称
   */
  formName: string;
  /**
   * 初始化对象
   */
  initValue?: T;
  /**
   * rule
   */
  ruleRefs?: {
    [k in keyof T]?: Array<{}>;
  };
  /**
   * 表单项目
   */
  formItems: Maybe<Array<SchemaFormItemSettingType<T>>>;
  /**
   * 是否自动完成 default off
   */
  autocomplete?: 'off' | 'on';
  /**
   * default 8
   */
  labelColSpan?: number;
  /**
   * default 16
   */
  wrapperColSpan?: number;
  /**
   * 表单布局 default horizontal
   */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /**
   * 提交表单且数据验证成功后回调事件
   */
  handleFinish?: (values: T) => any;
  /**
   * 提交表单且数据验证失败后回调事件
   */
  handleFinishFailed?: (errorInfo: any) => any;
};

export type SchemaFormPropsType<T extends {} = {}> = {
  shema: SchemaFType<T>;
  transitionLoadProps: TransitionLoadPropsType;
};

/**
 * 过渡、加载 属性
 */
type TransitionLoadPropsType = {
  /**
   * 骨架加载
   */
  skeletonLoading?: boolean;
  /**
   * 行数 默认8
   */
  skeletonRows?: number;
  /**
   * 是否为加载中状态	boolean	true
   */
  spinning?: boolean;
};

/**
 * schema to form
 * 根据schema生成form表单
 * @returns
 */
const SchemaForm = defineComponent({
  emits: ['handleFinish'],
  props: {
    schema: { type: Object as PropType<SchemaFType>, required: true },
    transitionLoadProps: Object as PropType<TransitionLoadPropsType>,
  },
  setup(props, { emit }) {
    // useForm
    // form model
    const formValue = reactive<any>(props.schema.initValue);
    const ruleRefs = reactive(props.schema.ruleRefs || {});
    const { resetFields, validate, validateInfos } = useForm(formValue, ruleRefs, {
      onValidate: (...args) => console.log(...args),
    });
    const onSubmit = async () => {
      return validate()
        .then(() => {
          const value = toRaw(formValue);
          return props.schema?.handleFinish?.(value) || emit('handleFinish', value);
        })
        .catch((err) => {
          console.log('error', err);
          return err;
        });
    };

    useExpose({
      resetFields,
    });

    const formItemLayout = computed(() => {
      return props.schema.layout === 'horizontal'
        ? {
            labelCol: { span: props.schema.labelColSpan },
            wrapperCol: { span: props.schema.wrapperColSpan },
          }
        : {};
    });

    return () => (
      <Skeleton
        active
        loading={props.transitionLoadProps?.skeletonLoading === true}
        paragraph={{ rows: props.transitionLoadProps?.skeletonRows || 8 }}
      >
        <Spin spinning={props.transitionLoadProps?.spinning}>
          <Form name={props.schema.formName} layout={props.schema.layout} {...formItemLayout}>
            {props.schema.formItems?.map((p) => {
              /**
               * 是否联动组件
               */
              if (p.keyId && p.ProFormDependency) {
                const show = p.ProFormDependency(formValue[p.keyId], formValue);
                if (!show) {
                  return null;
                }
              }
              if (p.controlType === 'Submit') {
                return (
                  <FormItem wrapper-col={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={onSubmit}>
                      {p.label || '提交'}
                    </Button>
                  </FormItem>
                );
              } else if (p.keyId) {
                return (
                  <SchemaFormItem
                    getFormValue={() => formValue}
                    item={p}
                    rules={validateInfos[p.rulesKey || p.keyId]}
                    v-model={formValue[p.keyId]}
                  ></SchemaFormItem>
                );
              } else {
                return <SchemaFormItem getFormValue={() => formValue} item={p}></SchemaFormItem>;
              }
            })}
          </Form>
        </Spin>
      </Skeleton>
    );
  },
});
export type SchemaFormType = typeof SchemaForm & {
  resetFields: (newValues?: Props | undefined) => void;
};
export default SchemaForm;

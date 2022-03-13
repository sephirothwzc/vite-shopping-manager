import SchemaForm, { SchemaFormType, SchemaFType } from '@/components/schema-control/schema-form';
import { MallGoodsType } from '@/service/shopping-goods';
import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/ts-helper';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRequest } from 'vue-request';
import styles from './item.module.less';

export type itemPropsType = {};

/**
 * 保存
 * @param value
 */
const runSave = (value: MallGoodsType) => {
  return service.post('/api/mall-goods', value);
};

/**
 * 商品新增
 * @returns
 */
const Item = defineComponent({
  props: {},
  setup() {
    const { run, loading } = useRequest(runSave, { manual: true });

    const handleFinish = (value: MallGoodsType) => {
      run(value).then((res) => {
        message.success('保存成功！');
      });
    };

    const schemaForm: SchemaFType<MallGoodsType> = {
      layout: 'horizontal',
      // rowCol: 6,
      formName: '商品分类',
      ruleRefs: {
        goodsType: [{ required: true, message: '请输入' }],
        goodsName: [{ required: true, message: '请输入' }],
      },
      initValue: { goodsType: '', goodsName: '', goodsDetails: '### 我是标题' },
      formItems: [
        {
          controlType: 'Input',
          keyId: 'goodsType',
          label: '商品分类',
          controlPropery: {
            allowClear: true,
          },
        },
        {
          controlType: 'Input',
          keyId: 'goodsName',
          label: '商品名称',
          controlPropery: {
            allowClear: true,
          },
        },
        {
          controlType: 'CheckboxGroup',
          keyId: 'goodsTag',
          label: '商品标签',
          childrenList: [
            {
              value: '1',
              name: 'top',
              display: '热销',
            },
            {
              value: '2',
              name: 'bk',
              display: '爆款',
            },
            {
              value: '3',
              name: 'yh',
              display: '优惠',
            },
            {
              value: '4',
              name: 'zk',
              display: '折扣',
            },
          ],
        },
        {
          controlType: 'MdEditor',
          keyId: 'goodsDetails',
          label: '商品详情',
        },
        {
          controlType: 'SubmitRest',
        },
      ],
    };

    /**
     * 表单 ref
     */
    const schemaFromRef = ref<Maybe<SchemaFormType>>(null);

    const schemaValue = reactive(schemaForm);

    return () => (
      <div class={styles.layout}>
        <SchemaForm
          transitionLoadProps={{ spinning: loading.value }}
          ref={schemaFromRef}
          schema={schemaValue as any}
          onHandleFinish={handleFinish}
        ></SchemaForm>
      </div>
    );
  },
});
export default Item;

import SchemaForm, { SchemaFormType, SchemaFType } from '@/components/schema-control/schema-form';
import { MallGoodsType } from '@/service/shopping-goods';
import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/ts-helper';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute } from 'vue-router';
import styles from './item.module.less';

export type itemPropsType = {};

/**
 * 保存
 * @param value
 */
const runSave = (value: MallGoodsType, id?: Maybe<string>) => {
  if (id) {
    return service.put(`/api/mall-goods/${id}`, value);
  }
  return service.post('/api/mall-goods', value);
};

/**
 * 获取修改
 * @param id
 * @returns
 */
const runGet = (id: string) => {
  return service.get(`/api/mall-goods/${id}`);
};

/**
 * 商品新增
 * @returns
 */
const Item = defineComponent({
  props: {},
  setup() {
    const { id } = useRoute().params;
    const { run, loading } = useRequest(runSave, { manual: true });
    const { data, loading: getLoading } = useRequest(runGet, {
      defaultParams: [String(id)],
      manual: !id,
    });

    watch(data, () => schemaFromRef.value?.setFormFields?.(data.value?.data));

    const handleFinish = (value: MallGoodsType) => {
      run(value, String(id)).then((res) => {
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
      initValue: (data.value || {
        goodsType: '',
        goodsName: '',
        goodsDetails: '### 我是标题',
      }) as MallGoodsType,
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

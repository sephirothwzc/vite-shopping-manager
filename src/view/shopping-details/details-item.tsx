import SchemaForm, { SchemaFormType, SchemaFType } from '@/components/schema-control/schema-form';
import { MallGoodsSpecificationsType, runGet, runSave } from '@/service/mall-goods-specifications';
import { getRulesRequired } from '@/utils/antd-helper';
import { Maybe } from '@/utils/ts-helper';
import { Card, message } from 'ant-design-vue';
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute } from 'vue-router';
import styles from './details-item.module.less';
import { set } from 'lodash';

export type DetailsItemPropsType = {};

/**
 *
 * @returns
 */
const DetailsItem = defineComponent({
  // props: {},
  setup() {
    const { id, specificationsId } = useRoute().params; // id 商品id , specificationsId
    const { run, loading } = useRequest(runSave, { manual: true });
    const { data, loading: getLoading } = useRequest(runGet, {
      defaultParams: [String(specificationsId)],
      manual: !specificationsId,
    });

    watch(data, () => schemaFromRef.value?.setFormFields?.(data.value));

    const handleFinish = (value: MallGoodsSpecificationsType) => {
      run(value, specificationsId as any, id).then((res) => {
        message.success('保存成功！');
      });
    };

    const schemaForm: SchemaFType<MallGoodsSpecificationsType> = {
      layout: 'horizontal',
      // rowCol: 6,
      formName: '商品分类',
      ruleRefs: {
        goodsUnit: getRulesRequired(),
      },
      initValue: (data.value || {}) as MallGoodsSpecificationsType,
      formItems: [
        {
          controlType: 'Input',
          keyId: 'goodsUnit',
          label: '商品规格',
          controlPropery: {
            allowClear: true,
          },
        },
        {
          controlType: 'InputNumber',
          keyId: 'goodsPrice',
          label: '商品价格',
          controlPropery: {
            allowClear: true,
          },
        },
        {
          controlType: 'MdEditor',
          keyId: 'remark',
          label: '商品描述',
          controlPropery: {
            allowClear: true,
          },
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
      <Card title="">
        <div class={styles.layout}>
          <div style={{ width: '60vw' }}>
            <SchemaForm
              transitionLoadProps={{ spinning: loading.value }}
              ref={schemaFromRef}
              schema={schemaValue as any}
              onHandleFinish={handleFinish}
            ></SchemaForm>
          </div>
        </div>
      </Card>
    );
  },
});
export default DetailsItem;

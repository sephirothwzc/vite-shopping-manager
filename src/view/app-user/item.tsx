import SchemaForm, { SchemaFType } from '@/components/schema-control/schema-form';
import { defineComponent, FunctionalComponent, reactive, ref } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute } from 'vue-router';
import { FormState, mutatioinSave, queryData } from '../../service/app-user/item';

const rules = {
  code: [{ required: true }],
  nickname: [{ required: true }],
};

/**
 * 用户编辑
 * @returns
 */
const Item: FunctionalComponent = () => {
  const { id } = useRoute().params;
  const { data, loading, error, run } = useRequest(queryData, {
    formatResult: (res) => res.data,
    manual: true,
  });
  const { run: mutationRun, loading: mutationLoading } = useRequest(mutatioinSave, {
    manual: true,
  });

  const handleFinish = (value: FormState) => {
    mutatioinSave(value);
  };

  const schema = reactive<SchemaFType<FormState>>({
    formName: 'appUsers',
    initValue: data.value,
    ruleRefs: rules,
    formItems: [
      {
        controlType: 'Input',
        keyId: 'phone',
      },
      {
        controlType: 'Input',
        keyId: 'code',
      },
      {
        controlType: 'Input',
        keyId: 'realname',
      },
      {
        controlType: 'Input',
        keyId: 'nickname',
      },
    ],
  });

  return () => <SchemaForm schema={schema as any} onHandleFinish={handleFinish}></SchemaForm>;
};
export type ItemType = typeof Item;
export default defineComponent(Item);

import SchemaForm, { SchemaFormType, SchemaFType } from '@/components/schema-control/schema-form';
import service from '@/utils/axios-helper';
import { Maybe } from '@/utils/ts-helper';
import { message } from 'ant-design-vue';
import { defineComponent, FunctionalComponent, reactive, ref } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute } from 'vue-router';
import { FormState, mutatioinSave, queryData } from '../../service/app-user/item';

const rules = {
  code: [{ required: true }],
  nickname: [{ required: true }],
};

/**
 * 保存
 * @param value
 */
const runSave = (value: any, id?: Maybe<string>) => {
  debugger;
  if (id) {
    return service.put(`/api/app-user/${id}`, value);
  }
  return service.post('/api/app-user', value);
};

/**
 * 用户编辑
 * @returns
 */
const Item: FunctionalComponent = () => {
  const { id } = useRoute().params;
  const { data, loading, error, run } = useRequest(queryData, {
    formatResult: (res) => res.data,
    manual: !id,
  });
  const { run: mutationRun, loading: mutationLoading } = useRequest(runSave, {
    manual: true,
  });

  const handleFinish = (value: FormState) => {
    mutationRun(value, id as string).then((res) => {
      message.success('保存成功！');
    });
  };

  const schema = reactive<SchemaFType<FormState>>({
    formName: 'appUsers',
    initValue: (data.value || {
      phone: '',
      code: '',
      realname: '',
      nickname: '',
    }) as FormState,
    ruleRefs: rules,
    formItems: [
      {
        controlType: 'Input',
        keyId: 'phone',
        label: '手机号',
        controlPropery: {
          allowClear: true,
        },
      },
      {
        controlType: 'Input',
        keyId: 'code',
        label: '编号',
        controlPropery: {
          allowClear: true,
        },
      },
      {
        controlType: 'Input',
        keyId: 'realname',
        label: '真实姓名',
        controlPropery: {
          allowClear: true,
        },
      },
      {
        controlType: 'Input',
        keyId: 'nickname',
        label: '昵称',
        controlPropery: {
          allowClear: true,
        },
      },
      {
        controlType: 'SubmitRest',
      },
    ],
  });

  /**
   * 表单 ref
   */
  const schemaFromRef = ref<Maybe<SchemaFormType>>(null);

  return () => (
    <SchemaForm
      schema={schema as any}
      onHandleFinish={handleFinish}
      transitionLoadProps={{ spinning: loading.value }}
      ref={schemaFromRef}
    ></SchemaForm>
  );
};
export type ItemType = typeof Item;
export default defineComponent(Item);

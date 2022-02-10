import { Button, Card, Form, FormInstance, FormItem, Input, Spin } from 'ant-design-vue';
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
  });
  const { run: mutationRun, loading: mutationLoading } = useRequest(mutatioinSave, {
    manual: true,
  });

  id && run(id as string);
  const formRef = ref<FormInstance>();
  const formState = reactive<FormState>({
    code: '',
    nickname: '',
    realname: '',
  });

  const handleFinish = (value: FormState) => {
    mutatioinSave(value);
  };

  return () => (
    <>
      <Spin spinning={loading.value}>
        <Card>
          <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            ref={formRef}
            model={formState}
            rules={rules}
            onFinish={handleFinish}
          >
            <FormItem label="编号" name="code">
              <Input v-model:value={formState.code} />
            </FormItem>
            <FormItem label="用户昵称" name="nickname">
              <Input v-model:value={formState.nickname} />
            </FormItem>
            <FormItem label="真实姓名" name="realname">
              <Input v-model:value={formState.realname} />
            </FormItem>
            <FormItem>
              <Button type="primary" html-type="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </Spin>
    </>
  );
};
export type ItemType = typeof Item;
export default defineComponent(Item);

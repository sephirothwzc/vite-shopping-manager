import { Form, FormItem, Input, Button } from 'ant-design-vue';
import { useForm } from 'ant-design-vue/lib/form';
import { defineComponent, reactive } from 'vue';
import service from '../utils/axios-helper';
import { useAppStore } from '../stores/app';
import { useRouter } from 'vue-router';
const userStore = useAppStore();

const Login = () => {
  const router = useRouter();

  const userRef = reactive({
    username: 'admin',
    password: '123456',
  });

  const rulesRef = reactive({
    username: [
      {
        required: true,
        message: 'Please input username',
      },
    ],
    password: [
      {
        required: true,
        message: 'Please input password',
      },
    ],
  });

  const { validate, validateInfos } = useForm(userRef, rulesRef);

  const handleSubmit = async (value: any) => {
    validate()
      .then(() =>
        service.get<{ id: string }>(
          `/v1/api/app-user/login?username=${userRef.username}&password=${userRef.password}`
        )
      )
      .then(({ data }) => {
        userStore.increment(data);
        router.push('/index');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * setup
   */
  return () => (
    <Form
      v-model={userRef}
      label-col={{ span: 8 }}
      wrapper-col={{ span: 16 }}
      onSubmit={handleSubmit}
    >
      <FormItem label="用户名" name="username" {...validateInfos.username}>
        <Input v-model:value={userRef.username}></Input>
      </FormItem>
      <FormItem label="密码" name="password" {...validateInfos.password}>
        <Input v-model:value={userRef.password}></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </FormItem>
    </Form>
  );
};

export default defineComponent(Login);

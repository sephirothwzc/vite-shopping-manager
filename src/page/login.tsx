import { Form, FormItem, Input, Button, message } from 'ant-design-vue';
import { useForm } from 'ant-design-vue/lib/form';
import { defineComponent, reactive, ref } from 'vue';

const Login = () => {
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
      .then(() => {
        console.log(value);
        console.log(userRef);
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

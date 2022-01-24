import { Form, FormItem, Input, Button, Card } from 'ant-design-vue';
import { useForm } from 'ant-design-vue/lib/form';
import { defineComponent, reactive } from 'vue';

const Login = () => {
  const userRef = reactive({
    username: 'admin',
    password: '123456',
  });

  const rulesRef = reactive({
    username: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
  });

  const from = useForm(userRef, rulesRef);
  const { validate, validateInfos } = from;

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

  const handleReset = async () => {
    from.resetFields({ username: '', password: '' });
  };

  /**
   * setup
   */
  return () => (
    <Card>
      <Form label-col={{ span: 8 }} wrapper-col={{ span: 8 }} onSubmit={handleSubmit}>
        <FormItem label="用户名" name="username" {...validateInfos.username}>
          <Input v-model:value={userRef.username}></Input>
        </FormItem>
        <FormItem label="密码" name="password" {...validateInfos.password}>
          <Input v-model:value={userRef.password}></Input>
        </FormItem>
        <FormItem wrapper-col={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button style="margin-left: 40px" onClick={handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default defineComponent(Login);

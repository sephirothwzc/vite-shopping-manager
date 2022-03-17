import { defineComponent, reactive, toRaw } from 'vue';
import { Button, Form, FormItem, Input } from 'ant-design-vue';
import { set } from 'lodash';
const useForm = Form.useForm;

export type FormDemoPropsType = {};

/**
 * 动态表单数据
 * @returns
 */
const FormDemo = defineComponent({
  props: {},
  setup() {
    const modelRef = reactive({
      formData: {
        name: '',
        region: undefined,
        type: [],
      },
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef.formData, rulesRef, {
      onValidate: (...args) => console.log(...args),
    });
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    const testClick = () => {
      // modelRef.formData['name'] = '123';
      set(modelRef.formData, 'name', '123');
    };
    return () => (
      <div>
        <Form>
          <FormItem label="Activity name" {...validateInfos.name}>
            <Input v-model:value={modelRef.formData['name']}></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={onSubmit}>
              提交
            </Button>
            <Button onClick={testClick}>test</Button>
          </FormItem>
        </Form>
      </div>
    );
  },
});
export type FormDemoType = typeof FormDemo;
export default FormDemo;

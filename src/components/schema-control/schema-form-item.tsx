import {
  Input,
  FormItem,
  Button,
  InputPassword,
  DatePicker,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  InputNumber,
  Select,
  TimePicker,
  TimeRangePicker,
  RangePicker,
  Cascader,
  Slider,
  Transfer,
  TransferProps,
} from 'ant-design-vue';
import { UploadFile } from 'ant-design-vue/lib/upload/interface';
import { Dayjs } from 'dayjs';
import { defineComponent, ref, PropType, toRefs, watch } from 'vue';
import ImageUpload from './image-upload';
import type { SchemaFormItemSettingType } from './schema-form';
import styles from './schema-form-item.module.less';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

type ModelValue = Object | String | Number | Boolean | Array<UploadFile> | Dayjs;

export type SchemaFormItemPropsType = {
  modelValue: ModelValue;
  item: SchemaFormItemSettingType;
  rules: Object;
};

/**
 * item 控件处理
 * @returns
 */
const SchemaFormItem = defineComponent({
  props: {
    modelValue: [String, Number, Boolean, Array, Object],
    item: { type: Object as PropType<SchemaFormItemSettingType>, required: true },
    rules: Object,
    /**
     * 获取form表单数据
     */
    getFormValue: { type: Function as PropType<<T>() => T>, required: true },
  },
  setup(props, { emit }) {
    const { item } = toRefs(props);
    const itemValue = ref(props.modelValue);
    watch(itemValue, () => {
      emit('update:modelValue', itemValue.value);
    });
    watch(
      () => props.modelValue,
      (value) => {
        itemValue.value = props.modelValue;
      }
    );
    if (item.value?.controlType === 'Input') {
      return () => (
        <>
          <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
            <Input {...item.value.controlPropery} v-model:value={itemValue.value}></Input>
          </FormItem>
        </>
      );
    } else if (item.value?.controlType === 'InputNumber') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <InputNumber {...item.value.controlPropery} v-model:value={itemValue.value}></InputNumber>
        </FormItem>
      );
    } else if (item.value?.controlType === 'MdEditor') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <MdEditor
            modelValue={String(itemValue.value)}
            onChange={(v: string) => (itemValue.value = v)}
          />
        </FormItem>
      );
    } else if (item.value?.controlType === 'Button') {
      return () => (
        <FormItem {...item.value.propertyObject}>
          <Button {...(item.value.controlPropery as any)}>{item.value.label}</Button>
        </FormItem>
      );
    } else if (item.value.controlType === 'Password') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <InputPassword
            {...item.value.controlPropery}
            v-model:value={itemValue.value}
          ></InputPassword>
        </FormItem>
      );
    } else if (item.value.controlType === 'DatePicker') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <DatePicker
            {...(item.value.controlPropery as any)}
            v-model:value={itemValue.value}
          ></DatePicker>
        </FormItem>
      );
    } else if (item.value.controlType === 'CheckboxGroup') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <CheckboxGroup {...(item.value.controlPropery as any)} v-model:value={itemValue.value}>
            {item.value.childrenList?.map((p) => (
              <Checkbox value={p.value} name={p.name}>
                {p.display}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FormItem>
      );
    } else if (item.value.controlType === 'RadioGroup') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <RadioGroup {...(item.value.controlPropery as any)} v-model:value={itemValue.value}>
            {item.value.childrenList?.map((p) => (
              <Radio value={p.value} name={p.name}>
                {p.display}
              </Radio>
            ))}
          </RadioGroup>
        </FormItem>
      );
    } else if (item.value.controlType === 'Select') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <Select
            class={styles.itemDefault}
            {...(item.value.controlPropery as any)}
            v-model:value={itemValue.value}
          ></Select>
        </FormItem>
      );
    } else if (item.value.controlType === 'Cascader') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <Cascader
            class={styles.itemDefault}
            {...(item.value.controlPropery as any)}
            v-model:value={itemValue.value}
          ></Cascader>
        </FormItem>
      );
    } else if (item.value.controlType === 'Switch') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <Switch v-model:checked={itemValue.value}></Switch>
        </FormItem>
      );
    } else if (item.value.controlType === 'ImageUpload') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <ImageUpload v-model={itemValue.value} {...item.value.controlPropery}></ImageUpload>
        </FormItem>
      );
    } else if (item.value.controlType === 'TimePicker') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <TimePicker
            v-model:value={itemValue.value}
            {...(item.value.controlPropery as any)}
          ></TimePicker>
        </FormItem>
      );
    } else if (item.value.controlType === 'TimeRangePicker') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <TimeRangePicker
            v-model:value={itemValue.value}
            {...(item.value.controlPropery as any)}
          ></TimeRangePicker>
        </FormItem>
      );
    } else if (item.value.controlType === 'RangePicker') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <RangePicker
            v-model:value={itemValue.value}
            {...(item.value.controlPropery as any)}
          ></RangePicker>
        </FormItem>
      );
    } else if (item.value.controlType === 'Slider') {
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <Slider v-model:value={itemValue.value} {...(item.value.controlPropery as any)}></Slider>
        </FormItem>
      );
    } else if (item.value.controlType === 'Transfer') {
      const transferValue = ref<{ targetKeys: Array<string>; selectedKeys: Array<string> }>({
        targetKeys: (item.value.controlPropery as TransferProps).targetKeys || [],
        selectedKeys: (item.value.controlPropery as TransferProps).selectedKeys || [],
      });
      watch(transferValue, () => {
        emit('update:modelValue', transferValue.value);
      });
      return () => (
        <FormItem label={item.value.label} {...(item.value.propertyObject, props.rules)}>
          <Transfer
            v-model:targetKeys={transferValue.value.targetKeys}
            v-model:selectedKeys={transferValue.value.selectedKeys}
            {...(item.value.controlPropery as any)}
          ></Transfer>
        </FormItem>
      );
    }
    return () => <div>Hello,{item.value.controlType}</div>;
  },
});
export type SchemaFormItemType = typeof SchemaFormItem;
export default SchemaFormItem;

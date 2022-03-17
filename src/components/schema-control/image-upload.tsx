import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, PropType } from 'vue';
import { Modal, Upload, UploadChangeParam, UploadProps } from 'ant-design-vue';
import { UploadFile } from 'ant-design-vue/lib/upload/interface';
import { Maybe } from '@/utils/ts-helper';

export type ImageUploadPropsType = {
  /**
   * 上传地址
   */
  action?: string;
  /**
   * 照片墙数量
   */
  maxLength?: number;
};

/**
 * image base64
 * @param file
 * @returns
 */
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * 照片墙
 * @returns
 */
const ImageUpload = defineComponent({
  props: {
    modelValue: Array as PropType<Maybe<Array<UploadFile>>>,
    operation: Object as PropType<ImageUploadPropsType>,
  },
  setup(props, { emit }) {
    /**
     * 预览加载
     */
    const previewVisible = ref<boolean>(false);
    /**
     * 预览图片
     */
    const previewImage = ref<string | undefined>('');
    /**
     * 文件列表
     */
    const fileList = ref<UploadProps['fileList']>(props?.modelValue || []);
    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = ({ fileList: newFileList }: UploadChangeParam) => {
      fileList.value = newFileList;
      emit('update:modelValue', fileList.value);
    };
    return () => (
      <div class="clearfix">
        <Upload
          v-model:file-list={fileList.value}
          action={props.operation?.action}
          list-type="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {(fileList?.value?.length || 0) < (props.operation?.maxLength || 1) && (
            <div>
              <PlusOutlined />
              <div class="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
        <Modal visible={previewVisible.value} footer={null} onCancel={handleCancel}>
          <img alt="example" style="width: 100%" src={previewImage.value} />
        </Modal>
      </div>
    );
  },
});
export type ImageUploadType = typeof ImageUpload;
export default ImageUpload;

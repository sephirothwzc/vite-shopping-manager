import { defineComponent } from 'vue';

export type itemPropsType = {};

/**
 *
 * @returns
 */
const item = defineComponent({
  props: {},
  setup() {
    return () => <div>Hello,index</div>;
  },
});
export type itemType = typeof item;
export default item;

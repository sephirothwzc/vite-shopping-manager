import { getCurrentInstance } from 'vue';

export const extend = Object.assign;

/**
 * expose public api
 * @param apis
 */
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}

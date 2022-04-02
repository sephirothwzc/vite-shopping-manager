declare module 'flattener' {
  /**
   * Transform any deep nested object in a flat object of keypath values. You can specify a custom path delimiter (defaults to .)
   */
  export const flatten: (object: any, separator?: string) => any;
  /**
   * Transform a flattened object into a regular object.
   */
  export const unflatten: (object: any, separator?: string) => any;
}

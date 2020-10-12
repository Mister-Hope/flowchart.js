export const merge = <T = Record<string, any>, U extends T = T>(
  options: U,
  defaultOptions: T
): U => {
  if (!options || typeof options === "function") return defaultOptions as U;

  const merged: Partial<U> = {};

  for (const attrname in defaultOptions)
    merged[attrname] = defaultOptions[attrname] as any;

  for (const attrname in options) {
    if (options[attrname]) {
      if (typeof merged[attrname] === "object") {
        merged[attrname] = merge(merged[attrname] as any, options[attrname]);
      } else {
        merged[attrname] = options[attrname];
      }
    }
  }
  return merged as U;
};

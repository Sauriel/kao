export type CustomProperty = `--${string}`;
export type CustomProperties = Record<CustomProperty, string | CSSStyleValue>;

export function customProperties(el: HTMLElement, customProperties: CustomProperties) {
  const usedCustomProperties = new Set<CustomProperty>();

  function addCustomProperties(cps: CustomProperties) {
    for (const [key, value] of Object.entries(cps)) {
      el.attributeStyleMap.set(key, value);
      usedCustomProperties.add(key as CustomProperty);
    }
  }

  function removeCustomProperties() {
    for (const p of usedCustomProperties) {
      el.attributeStyleMap.delete(p);
    }
  }

  addCustomProperties(customProperties);

  return {
    update(newCustomProperties: CustomProperties) {
      removeCustomProperties();
      addCustomProperties(newCustomProperties);
    },
    destroy() {
      removeCustomProperties();
    },
  };
}

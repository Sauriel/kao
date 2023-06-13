declare type UiSettings = {
  previewAspectRatio: number;
  gridView: boolean;
}

const DEFAULT_SETTINGS: UiSettings = {
  previewAspectRatio: 3 / 4,
  gridView: false
};

export default UiSettings;

export {
  DEFAULT_SETTINGS
};
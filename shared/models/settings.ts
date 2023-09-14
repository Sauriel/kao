declare type UiSettings = {
  previewAspectRatio: number;
  gridView: boolean;
  openInDialog: boolean;
}

const DEFAULT_SETTINGS: UiSettings = {
  previewAspectRatio: 3 / 4,
  gridView: false,
  openInDialog: true
};

export default UiSettings;

export {
  DEFAULT_SETTINGS
};
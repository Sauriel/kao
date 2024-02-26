export type SortBy =
  | 'nameASC'
  | 'nameDESC'
  | 'missingCoverASC'
  | 'missingCoverDESC'
  | 'contentLengthASC'
  | 'contentLengthDESC';

export type Settings = {
  basePath: string | null;
  aspectRatio: number;
  gridView: boolean;
  sortBy: SortBy;
  showLog: boolean;
  showOnlyImages: boolean;
};

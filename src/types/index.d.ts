declare type NetWorthAssetsCollection = {
  [key: string]: any;
  date: string;
  cash?: number;
  stocks?: number;
  "401k"?: number;
  ira?: number;
  hsa?: number;
  crypto?: number;
  cd?: number;
  bonds?: null;
  vehicles?: number;
  realEstate?: null;
  other?: null;
  $id?: string;
};

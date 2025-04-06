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

declare type APIResponse = {
  error?: string;
  success?: any;
};

declare type RetirementData = {
  [key: string]: any;
  total_balance_goal_short_term?: number;
  total_balance_goal_long_term?: number;
  hsa_balance_goal_short_term?: number;
  hsa_balance_goal_long_term?: number;
  retirement_assets?: string[];
  hsa_assets?: string[];
};

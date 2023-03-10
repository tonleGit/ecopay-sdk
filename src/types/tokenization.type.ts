export interface IInitTokenizationData extends Record<string, unknown> {
  merchant_user_id: string;
  redirect_url: string;
  description: string;
  platform: string;
  bank_type: string;
  bank_code?: string;
  store_code?: string;
  merchant_transid?: string;
}

export interface IUpdateTokenizationData extends Record<string, unknown> {
  merchant_user_id: string;
  bank_type: string;
  status: string;
}

export interface IGetTokenization extends Record<string, unknown> {
  merchant_user_id: string;
  bank_type: string;
  pageSize?: number;
  currentPage?: number;
  status?: string;
}

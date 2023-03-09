export interface ITransactionRequired extends Record<string, unknown> {
  merchant_code: string;
  platform: string;
  payment_channel: string;
  merchant_order_id: string;
  amount: number;
  description: string;
  redirect_url: string;
  currency: string;
  store_label: string;
  store_code: string;
  terminal_label: string;
  terminal_code: string;
  req_time: number;
}

export interface ITransactionExtra extends Record<string, unknown> {
  purpose_of_transaction?: string;
  extra_data?: any;
  bank_type?: string;
  partner_code?: string;
  bank_code?: string;
  payment_type: string;
  installment_info?: any;
}

export interface ITransactionDetail
  extends ITransactionRequired,
    ITransactionExtra {}

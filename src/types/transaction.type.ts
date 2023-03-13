export interface IInitTransactionRequiredData extends Record<string, unknown> {
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
}

export interface IInitTransactionExtraData extends Record<string, unknown> {
  purpose_of_transaction?: string;
  extra_data?: any;
  bank_type?: string;
  bank_code?: string;
  payment_type?: string;
  installment_info?: IInstallmentInfo;
}

interface IInstallmentInfo {
  products: IProduct[];
}
interface IProduct {
  code: string;
  name: string;
  category: string;
  quantity: number;
  unit_price: number;
}

export interface ICheckTransaction extends Record<string, unknown> {
  merchant_order_id: string;
  req_time: number;
  merchant_code: string;
}

export interface IInitTransactionData
  extends IInitTransactionRequiredData,
    IInitTransactionExtraData {
  merchant_code: string;
  req_time: number;
}

export interface IGetSupportBanks extends Record<string, unknown> {
  disabled_paging?: boolean;
  page_size?: number;
  page?: number;
  code?: string;
  partner_code?: string;
  sort?: string;
  status?: 'active' | 'inactive';
  type?: string;
}

export * from './transaction.type';
export * from './tokenization.type';
export interface IInitSdkConfig extends Record<string, unknown> {
  secretKey: string;
  merchantCode: string;
  gateway?: string;
}

export interface IInitTokenizationConfig
  extends Record<string, unknown>,
    IInitSdkConfig {}
export interface ICommonResponseData extends Record<string, unknown> {
  result_code: string;
  message_key: string;
  message: string;
  data?: any;
  signature?: string;
}

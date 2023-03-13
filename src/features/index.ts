/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
// export * from './init-transaction';
import {
  ICommonResponseData,
  IInitSdkConfig,
  ICheckTransaction,
  IInitTransactionRequiredData,
  IInitTransactionExtraData,
  IInitTransactionData,
  IInitTokenizationData,
  IUpdateTokenizationData,
  IGetTokenization,
  IGetSupportBanks,
} from '../types';
import { getFinalData, makeRequest } from '../utils';
import { TokenizationSDK } from './tokenization';
export { TokenizationSDK };
export class EcoPaySDK {
  merchantCode = '';
  secretKey = '';
  gateway = '';
  basePath = '';
  bankBasePath = '';
  static Tokenization = TokenizationSDK;
  #tokenization;

  constructor(initConfig: IInitSdkConfig) {
    this.secretKey = initConfig.secretKey;
    this.merchantCode = initConfig.merchantCode;
    this.gateway = 'https://mgw-test.finviet.com.vn:6868/api/v1';
    this.basePath = '/payment';
    this.bankBasePath = '/bank';
    this.#tokenization = new TokenizationSDK({
      ...initConfig,
      gateway: this.gateway,
    });
  }

  // features
  initTransaction(
    data: IInitTransactionRequiredData & IInitTransactionExtraData
  ): Promise<ICommonResponseData> {
    const initData = this.validateInitTransactionData({
      ...data,
      merchant_code: this.merchantCode,
      req_time: Date.now(),
    });
    const finalData = getFinalData(initData, this.secretKey);

    return makeRequest(
      `${this.gateway}${this.basePath}/init`,
      'POST',
      finalData,
      this.secretKey
    );
  }

  checkTransaction(merchantCodeId: string): Promise<ICommonResponseData> {
    const checkTransData: ICheckTransaction = {
      merchant_code: this.merchantCode,
      req_time: Date.now(),
      merchant_order_id: merchantCodeId,
    };
    const finalData = getFinalData(checkTransData, this.secretKey);
    return makeRequest(
      `${this.gateway}${this.basePath}/checktrans`,
      'POST',
      finalData,
      this.secretKey
    );
  }

  getSupportBanks(
    queryParams: IGetSupportBanks = {}
  ): Promise<ICommonResponseData> {
    return makeRequest(
      `${this.gateway}${this.bankBasePath}/get-list`,
      'GET',
      queryParams,
      this.secretKey
    );
  }

  // shortcut for tokenization
  initTokenization(data: IInitTokenizationData): Promise<ICommonResponseData> {
    return this.#tokenization.initTokenization(data);
  }

  updateTokenzation(
    id: string,
    data: IUpdateTokenizationData
  ): Promise<ICommonResponseData> {
    return this.#tokenization.updateTokenzation(id, data);
  }

  getTokenizations(
    params: IGetTokenization,
    id?: string
  ): Promise<ICommonResponseData> {
    return this.#tokenization.getTokenizations(params, id);
  }

  private validateInitTransactionData(
    data: IInitTransactionData
  ): Record<string, unknown> {
    const paymentChannel = data.payment_channel;
    const { requiredData, extraData } = this.splitInitTransactionData(data);
    const newData: Partial<IInitTransactionData> = { ...requiredData };
    const requiredExtraFields: string[] = [];
    switch (paymentChannel) {
      case 'atm':
        requiredExtraFields.push('bank_type');
        break;
      case 'qrcode':
        requiredExtraFields.push(
          'bank_type',
          'bank_code',
          'purpose_of_transaction'
        );
        break;
      case 'installment':
        requiredExtraFields.push('installment_info');
        break;
      default:
        break;
    }
    for (const key of requiredExtraFields) {
      if (!extraData[key])
        throw new Error(
          `${key} is required for ${paymentChannel} payment channel`
        );
      newData[key] = extraData[key];
    }
    return newData;
  }

  private splitInitTransactionData(data: IInitTransactionData): {
    requiredData: IInitTransactionRequiredData;
    extraData: IInitTransactionExtraData;
  } {
    const {
      purpose_of_transaction,
      extra_data,
      bank_type,
      partner_code,
      bank_code,
      payment_type,
      installment_info,
      ...requiredData
    } = data;
    return {
      requiredData,
      extraData: {
        purpose_of_transaction,
        extra_data,
        bank_code,
        bank_type,
        partner_code,
        payment_type,
        installment_info,
      },
    };
  }
}

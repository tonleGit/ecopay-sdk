/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ICommonResponseData, IInitTokenizationConfig } from '../types';
import {
  IGetTokenization,
  IInitTokenizationData,
  IUpdateTokenizationData,
} from '../types/tokenization.type';
import { getFinalData, makeRequest } from '../utils';

export class TokenizationSDK {
  tokenConfig: IInitTokenizationConfig;
  gateway: string;
  basePath: string;

  constructor(initTokenConfig: IInitTokenizationConfig) {
    this.tokenConfig = initTokenConfig;
    this.gateway =
      initTokenConfig.environment === 'PROD'
        ? 'https://mgw.finviet.com.vn:6868/api/v1'
        : 'https://mgw-test.finviet.com.vn:6868/api/v1';
    this.basePath = '/tokenizations';
  }

  initTokenization(
    initTokenData: IInitTokenizationData
  ): Promise<ICommonResponseData> {
    const validData = this.validateTokenizationData(initTokenData);
    const finalData = getFinalData(validData, this.tokenConfig.secretKey);

    return makeRequest(
      `${this.gateway}${this.basePath}`,
      'POST',
      finalData,
      this.tokenConfig.secretKey
    );
  }

  updateTokenzation(
    id: string,
    updateTokenData: IUpdateTokenizationData
  ): Promise<ICommonResponseData> {
    const validData = this.validateTokenizationData(updateTokenData);
    const finalData = getFinalData(validData, this.tokenConfig.secretKey);

    return makeRequest(
      `${this.gateway}${this.basePath}/${id}`,
      'PUT',
      finalData,
      this.tokenConfig.secretKey
    );
  }

  getTokenizations(
    getTokenParams: IGetTokenization,
    id?: string
  ): Promise<ICommonResponseData> {
    const validData = this.validateTokenizationData(getTokenParams);
    const queryParams = getFinalData(validData, this.tokenConfig.secretKey);

    const url = id
      ? `${this.gateway}${this.basePath}/${id}`
      : `${this.gateway}${this.basePath}`;

    return makeRequest(url, 'GET', queryParams, this.tokenConfig.secretKey);
  }

  private validateTokenizationData(initData: any) {
    return {
      ...initData,
      req_time: Date.now(),
      merchant_code: this.tokenConfig.merchantCode,
    };
  }
}

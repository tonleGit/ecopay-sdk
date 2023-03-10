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

export class Tokenization {
  #tokenConfig: IInitTokenizationConfig;
  #basePath: string;

  constructor(initTokenConfig: IInitTokenizationConfig) {
    this.#tokenConfig = initTokenConfig;
    this.#basePath = '/tokenizations';
  }

  initTokenization(
    initTokenData: IInitTokenizationData
  ): Promise<ICommonResponseData> {
    const validData = this.validateTokenizationData(initTokenData);
    const finalData = getFinalData(validData, this.#tokenConfig.secretKey);

    return makeRequest(
      `${this.#tokenConfig.gateway}${this.#basePath}`,
      'POST',
      finalData,
      this.#tokenConfig.secretKey
    );
  }

  updateTokenzation(
    id: string,
    updateTokenData: IUpdateTokenizationData
  ): Promise<ICommonResponseData> {
    const validData = this.validateTokenizationData(updateTokenData);
    const finalData = getFinalData(validData, this.#tokenConfig.secretKey);

    return makeRequest(
      `${this.#tokenConfig.gateway}${this.#basePath}/${id}`,
      'PUT',
      finalData,
      this.#tokenConfig.secretKey
    );
  }

  getTokenizations(
    getTokenParams: IGetTokenization,
    id?: string
  ): Promise<ICommonResponseData> {
    const validData = this.validateTokenizationData(getTokenParams);
    const queryParams = getFinalData(validData, this.#tokenConfig.secretKey);

    const url = id
      ? `${this.#tokenConfig.gateway}${this.#basePath}/${id}`
      : `${this.#tokenConfig.gateway}${this.#basePath}`;

    return makeRequest(url, 'GET', queryParams, this.#tokenConfig.secretKey);
  }

  private validateTokenizationData(initData: any) {
    return {
      ...initData,
      req_time: Date.now(),
      merchant_code: this.#tokenConfig.merchantCode,
    };
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosRequestConfig } from 'axios';
import { ICommonResponseData } from '../types';
import { createChecksumFromData } from './params';
import * as querystring from 'querystring';

export function verifyResponse(
  initTransactionResponse: ICommonResponseData,
  secretKey: string
): boolean {
  const { signature, data } = initTransactionResponse;
  if (signature) {
    const verifier = createChecksumFromData(data, secretKey);
    if (verifier !== signature) throw new Error('Invalid response signature');
  }
  return true;
}

export function makeRequest(
  url: string,
  method: string,
  data: Record<string, any>, // or query in case method is GET
  secretKey: string
): Promise<any> {
  const initConfig: AxiosRequestConfig = {
    url,
    method,
  };
  if (['POST', 'PUT'].includes(method)) {
    initConfig['headers'] = {
      'Content-Type': 'application/json',
    };
    initConfig['data'] = JSON.stringify(data);
  }
  if (method === 'GET') {
    const queryStr = querystring.encode(data);
    initConfig['url'] = `${url}?${queryStr}`;
  }
  return axios(initConfig)
    .then(resp => resp.data)
    .then((respData: ICommonResponseData) => {
      verifyResponse(respData, secretKey);
      return respData;
    })
    .catch((err: any) => Promise.reject(err.response?.data || err));
}

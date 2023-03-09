/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ITransactionDetail } from '../types';
import axios from 'axios';

import {
  convertToDataString,
  createChecksum,
  validateInitTransactionData,
} from '../utils';

export function initTransaction(
  initData: ITransactionDetail,
  secretKey: string
): Promise<any> {
  const validData = validateInitTransactionData(initData);
  const dataStr = convertToDataString(validData);
  const checkSum = createChecksum(dataStr, secretKey);
  const finalData: Record<string, unknown> = {
    ...validData,
    signature: checkSum,
  };

  return axios({
    method: 'POST',
    url: 'https://mgw-test.finviet.com.vn:6868/api/v1/payment/init?',
    data: JSON.stringify(finalData),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.data);
}

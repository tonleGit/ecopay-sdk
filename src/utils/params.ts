/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createChecksum } from './crypto';

export function convertToDataString(data: Record<string, unknown>): string {
  const keys = Object.keys(data);
  const sortKeys = keys.sort();

  let value = '';
  for (const key of sortKeys) {
    if (typeof data[key] === 'object') {
      value += JSON.stringify(data[key]);
    } else {
      value += data[key];
    }
  }
  return value;
}

export function createChecksumFromData(
  params: Record<string, unknown>,
  secretKey: string
): string {
  const paramsStr = convertToDataString(params);
  const checkSum = createChecksum(paramsStr, secretKey);
  return checkSum;
}

export function getFinalData(
  data: Record<string, unknown>,
  secretKey: string
): Record<string, unknown> {
  const checkSum = createChecksumFromData(data, secretKey);
  const finalData = {
    ...data,
    signature: checkSum,
  };
  return finalData;
}

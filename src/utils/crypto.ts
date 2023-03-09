import * as crypto from 'crypto';

export function createChecksum(value: string, secretKey: string): string {
  const checkSum = crypto
    .createHmac('sha256', secretKey)
    .update(value)
    .digest('hex')
    .toString();
  return checkSum;
}

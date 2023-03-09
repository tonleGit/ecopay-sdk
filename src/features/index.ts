/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
// export * from './init-transaction';
import { ITransactionDetail } from '../types';
import { initTransaction } from './init-transaction';
export * from './init-transaction';

export class EcoPay {
  #secretKey = '';

  constructor(config: Record<string, unknown>) {
    this.#secretKey = config.secretKey as string;
  }

  private validateMiddleware(
    action: (...args: any[]) => any,
    ...args: any[]
  ): any {
    if (!this.#secretKey) {
      throw new Error('Merchant secret key not found');
    }
    return action(...args);
  }

  // features
  initTransaction(data: ITransactionDetail): Promise<any> {
    return this.validateMiddleware(initTransaction, data, this.#secretKey);
  }
}

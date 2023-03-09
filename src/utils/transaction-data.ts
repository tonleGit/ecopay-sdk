import {
  ITransactionDetail,
  ITransactionExtra,
  ITransactionRequired,
} from '../types';

export function validateInitTransactionData(
  data: ITransactionDetail
): Record<string, unknown> {
  const paymentChannel = data.payment_channel;
  const { requiredData, extraData } = splitInitTransactionData(data);
  const newData: Partial<ITransactionDetail> = { ...requiredData };
  const requiredExtraFields = [];
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
      throw new Error(`${key} is required for ${paymentChannel}`);
    newData[key] = extraData[key];
  }
  return newData;
}

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

function splitInitTransactionData(data: ITransactionDetail): {
  requiredData: ITransactionRequired;
  extraData: ITransactionExtra;
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

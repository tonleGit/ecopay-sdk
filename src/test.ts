/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { EcoPaySDK } from './features';

const sampleData = {
  merchant_code: 'FVMER0',
  platform: 'web',
  payment_channel: 'eco_merchant',
  merchant_order_id: 'testsdk' + Date.now().toString(20),
  amount: 25000,
  description: 'thanh toan',
  redirect_url: 'https://merchant-url',
  currency: 'VND',
  store_label: '0344567890',
  store_code: '0344567890',
  terminal_label: '0344567890',
  terminal_code: '0344567890',
  purpose_of_transaction: 'Thanh toan Eco',
  req_time: Date.now(),
  bank_type: 'international',
  bank_code: 'ALP',
  installment_info: {
    products: [
      {
        code: 'LAPTOP01',
        name: 'Laptop Gaming',
        category: 'LAPTOP',
        quantity: 2,
        unit_price: 2500000,
      },
    ],
  },
};

const tokenizationData = {
  merchant_user_id: 'testABC',
  redirect_url: 'https://example.com/',
  description: 'test tao tokenization',
  platform: 'web',
  bank_type: 'international',
  store_code: '0344567890',
};
// ecopay
//   .getSupportBanks()
//   .then(data => console.log('data', data))
//   .catch(err => console.error(err));

const updateTokenData = {
  merchant_user_id: 'test01',
  status: 'inactive',
  bank_type: 'international',
};
// console.log(JSON.stringify(tokenizationData));
// ecopay
//   .initTokenization(tokenizationData)
//   .then(data => console.log('data', data))
//   .catch(err => console.error('Error:', err));

// export function initEcoPaySDK(ecopayConfig: IInitSdkConfig): EcoPaySDK {
//   const ecopaySdkIns = new EcoPaySDK(ecopayConfig);
//   return new Proxy<EcoPaySDK>(ecopaySdkIns, {
//     get: function (target, p, receiver) {
//       const validateErrorMessage =
//         (!target.merchantCode && 'Merchant code is missing') ||
//         (!target.secretKey && 'Merchant secret key is missing') ||
//         (!target.gateway && 'Merchant gateway is missing') ||
//         '';
//       if (validateErrorMessage) {
//         throw new Error(validateErrorMessage);
//       }
//       // @ts-ignore
//       return Reflect.get(...arguments);
//     },
//   });
// }

const ecp = new EcoPaySDK({
  merchantCode: 'FVMER0',
  secretKey: '1234',
  environment: 'DEV',
});

ecp
  .initTransaction(sampleData)
  .then(data => console.log('data', data))
  .catch(err => console.error('Error:', err));

// console.log(ecp.test());

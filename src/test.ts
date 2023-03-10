import { EcoPaySDK } from '.';

const sampleData = {
  merchant_code: 'FVMER0',
  platform: 'web',
  payment_channel: 'all',
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
  extra_data: null,
  payment_type: '05',
};

const ecopay = new EcoPaySDK({ secretKey: '1234', merchantCode: 'FVMER0' });
ecopay
  .getSupportBanks()
  .then(data => console.log('data', data))
  .catch(err => console.error(err));

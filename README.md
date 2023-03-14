# ecopay

> Integrate this ecopay SDK to make payment with EcoPay gateway

## Install

```bash
npm install ecopay
```

## Payment transaction

> Create payment transaction:

```ts
import { EcoPaySDK } from 'ecopay';

const ecopayIns = new EcoPaySDK({
  // config parameters
});

const sampleData: IInitTransactionRequiredData & IInitTransactionExtraData = {
  // your data here
};

ecopayIns.initTransaction(sampleData); // Promise<ICommonResponseData>
```

> Check status of transaction

```ts
// other import like above
...
ecopayIns.checkTransaction("<merchant_order_id>");  // Promise<ICommonResponseData>

```

## Tokenization transaction

Initialize Tokenization from EcoPaySDK or separate Tokenization class:

```ts
import { EcoPaySDK } from 'ecopay';
...
const token = new EcoPaySDK.Tokenization({
    // config parameters
});
```

or

```ts
import { TokenizationSDK } from 'ecopay';
...
const token = new TokenizationSDK({
    // config parameters
});
```

## Methods

### EcoPaySDK

| Signature                                                                                                                                        | Description                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| EcoPaySDK(config: [IInitSdkConfig](#IInitSdkConfig))                                                                                             | Init SDK                            |
| initTransaction(params: [IInitTransactionRequiredData](#IInitTransactionRequiredData) & [IInitTransactionExtraData](#IInitTransactionExtraData)) | Create payment transaction          |
| checkTransaction(params: string)                                                                                                                 | Check status of payment transaction |
| getSupportBanks(params: [IGetSupportBanks](#IGetSupportBanks))                                                                                   | Get list of supported banks         |

### TokenizationSDK

\* These methods can be called directly on EcoPaySDK instance for short. Example: ecopaySDKInstance.initTokenization,...
| Signature | Description |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| TokenizationSDK(params: [IInitSdkConfig](#IInitSdkConfig)) | Init SDK |
| initTokenization(params: [IInitTokenizationData](#IInitTokenizationData)) | Create tokenization transaction |
| updateTokenzation(id: string, params: [IUpdateTokenizationData](#IUpdateTokenizationData)) | Update tokenization information |
| getTokenizations(params: [IGetTokenization](#IGetTokenization), id?: string) | Get a list of tokenizations if id is omitted, otherwise get a detail of tokenization with id |

### Return type

All the above methods have return data of type of Promise[<ICommonResponseData\>](#ICommonResponseData)

## Interface

> (\*) required

### <a name="IInitSdkConfig">IInitSdkConfig</a>

EcoPaySDK init params

> | Field        | Type   | Description         |
> | ------------ | ------ | ------------------- |
> | secretKey    | string | Merchant secret key |
> | merchantCode | string | Merchant code       |

### <a name="IInitTransactionRequiredData">IInitTransactionRequiredData</a>

Required parameters when creating payment transaction

> | Field                 | Type   | Description                                                                                                                                                                                                                                        |
> | --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | platform(\*)          | string | Device platform. <br /> Value one of: 'web', 'mobile' or "desktop"                                                                                                                                                                                 |
> | payment_channel(\*)   | string | Payment channel: <br /> - 'atm': atm payment <br /> - 'qrcode': qrcode payment <br /> - 'eco_merchant' or 'eco_consumer': payment through app eco merchant or consumer <br /> - 'installment': convert to installment <br /> - 'all': select later |
> | merchant_order_id(\*) | string | Unique order ID                                                                                                                                                                                                                                    |
> | amount(\*)            | number | Amount of transaction                                                                                                                                                                                                                              |
> | description(\*)       | string | Description of transaction                                                                                                                                                                                                                         |
> | redirect_url(\*)      | string | Url to notify transaction result to merchant                                                                                                                                                                                                       |
> | currency(\*)          | string | Curreny. 'VND' supported only                                                                                                                                                                                                                      |
> | store_label(\*)       | string | Store label                                                                                                                                                                                                                                        |
> | store_code(\*)        | string | Store code                                                                                                                                                                                                                                         |
> | terminal_label(\*)    | string | Terminal label                                                                                                                                                                                                                                     |
> | terminal_code(\*)     | string | Terminal code                                                                                                                                                                                                                                      |

### <a name="IInitTransactionExtraData">IInitTransactionExtraData</a>

Other optional parameters for creating payment transaction

> | Field                  | Type             | Description                                                                                                                                                                                                                  |
> | ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | purpose_of_transaction | string           | Purpose of transaction. Required when payment channel is qrcode                                                                                                                                                              |
> | bank_type              | string           | Bank type. Value: <br /> - 'domestic': Payment with domestic bank accounts <br /> - 'international': Payment with international card such as VISA, MasterCard, JCB,... <br /> Required when payment channel is qrcode or atm |
> | bank_code              | string           | Bank code. Required when payment channel is qrcode                                                                                                                                                                           |
> | payment_type           | string           | Payment type. Default is '05'                                                                                                                                                                                                |
> | installment_info       | IInstallmentInfo | Goods info when payment channel is installment. More detail below                                                                                                                                                            |

### <a name="IInstallmentInfo">IInstallmentInfo</a>

Installment info

> | Field        | Type       | Description       |
> | ------------ | ---------- | ----------------- |
> | products(\*) | IProduct[] | Array of products |

### <a name="IProduct">IProduct</a>

Installment products info

> | Field          | Type   | Description                               |
> | -------------- | ------ | ----------------------------------------- |
> | code(\*)       | string | Code of product. Example: 'LAPTOP01'      |
> | name(\*)       | string | Name of product. Example: 'Laptop Gaming' |
> | category(\*)   | string | Array of products. Example: 'LAPTOP'      |
> | quantity(\*)   | number | Quantity                                  |
> | unit_price(\*) | number | Price of a single product                 |

### <a name="IGetSupportBanks">IGetSupportBanks</a>

> | Field           | Type    | Description                                 |
> | --------------- | ------- | ------------------------------------------- |
> | disabled_paging | boolean | Pagination or not. Default false            |
> | page_size       | number  | Page size. Default: 20                      |
> | code            | string  | Bank code                                   |
> | partner_code    | string  | Partner code                                |
> | sort            | string  | Sort field. Example: 'created_at'           |
> | status          | string  | Status: 'active' or 'inactive'              |
> | type            | string  | Type of bank: 'domestic' or 'international' |

### <a name="IInitTokenizationData">IInitTokenizationData</a>

> | Field                | Type   | Description                                     |
> | -------------------- | ------ | ----------------------------------------------- |
> | merchant_user_id(\*) | string | Merchant user id                                |
> | redirect_url(\*)     | string | Redirect url to merchant                        |
> | description(\*)      | string | Description                                     |
> | bank_type(\*)        | string | Bank type. Value: 'domestic' or 'international' |
> | platform(\*)         | string | Device platform                                 |
> | bank_code            | string | Bank code                                       |
> | store_code           | string | Store code                                      |
> | merchant_transid     | string | Merchant transaction id to create tokenization  |

### <a name="IUpdateTokenizationData">IUpdateTokenizationData</a>

> | Field                | Type   | Description                                     |
> | -------------------- | ------ | ----------------------------------------------- |
> | merchant_user_id(\*) | string | Merchant user id when create tokenization       |
> | bank_type(\*)        | string | Bank type. Value: 'domestic' or 'international' |
> | status(\*)           | string | Tokenization status                             |

### <a name="IGetTokenization">IGetTokenization</a>

> | Field                | Type   | Description                                     |
> | -------------------- | ------ | ----------------------------------------------- |
> | merchant_user_id(\*) | string | User id                                         |
> | bank_type(\*)        | string | Bank type. Value: 'domestic' or 'international' |
> | status               | string | Tokenization status                             |
> | pageSize             | number | Page size                                       |
> | currentPage          | string | Current page to get data. Default 1             |

### <a name="ICommonResponseData">ICommonResponseData</a>

> | Field           | Type            | Description                                                     |
> | --------------- | --------------- | --------------------------------------------------------------- |
> | result_code(\*) | string          | Result code. Example: '010200'                                  |
> | message_key(\*) | string          | Result message key. Example: 'SUCCESS', 'FAILED', 'UNKNOWN',... |
> | message(\*)     | string          | Detail result message                                           |
> | data            | Array or Object | Data return                                                     |
> | signature       | string          | Checksum of data. Use this to validate integrity of field data  |
>
> Fields of data when init payment transaction or tokenization successfully:

> | Field            | Type   | Description                      |
> | ---------------- | ------ | -------------------------------- |
> | payment_url(\*)  | string | Payment url                      |
> | transid(\*)      | string | Transaction id in EcoPay system  |
> | status(\*)       | string | Transaction status               |
> | expired_at(\*)   | string | Time when transaction is expired |
> | expired_time(\*) | number | Time duration until expired_at   |

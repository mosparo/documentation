---
sidebar_position: 3
sidebar_label: Statistic
description: With the statistic API you're able to get the numbers about your project.
---

# Statistic

## `by-date`

**Method**: GET<br />
**Endpoint**: /api/v1/statistic/by-date<br />

Returns the exact numbers how many spam and valid submissions your project received in the last days.

:::caution
Because mosparo deletes the submissions after 14 days, the statistic API will only return the data from the last 14 days.
:::

### Authentication

To secure the API endpoint, an authentication is required. For this, the `Authorization` header must be sent with the request. In the header, the public key of the project must be set as username. For the password, a HMAC SHA256 hash of the API endpoint url combined with the request data, serialized as JSON, must be set. The private key will be used as key for the HMAC SHA256 hash.

```http request
Authorization: [publicKey]:[hmacHash]
```

#### Example

```php
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/statistic/by-date';
$formData = [];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($formData), $privateKey);
```

```http request
Authorization: QqfBxsmOfIMw0-uVNnRVdDlMUZdLpTG1xo0yyifyLrI:a72e56cb93b70a1f79dc6c807d4c0fbfcb8d122a458509299e2acdbb3a6f1df2
```

### Request

#### Arguments

| Name                  | Type    | Required | Description                                                                                                                                                                |
|-----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `range`               | Integer | Optional | The number of seconds for which the number should be returned (`3600` will return the numbers for the last hour). If not defined, all data from the last 14 days are used. |

### Response

#### Example
```json
{
  "result":true,
  "data":{
    "numberOfValidSubmissions":5,
    "numberOfSpamSubmissions":7,
    "numbersByDate":{
      "2022-12-30":{
        "numberOfValidSubmissions":3,
        "numberOfSpamSubmissions":4
      },
      "2022-12-31":{
        "numberOfValidSubmissions":2,
        "numberOfSpamSubmissions":3
      }
    }
  }
}
```

#### Properties

If the request was completed successfully, the following properties will be present in the answer:

| Name             | Type    | Description                                                                    |
|------------------|---------|--------------------------------------------------------------------------------|
| `result`         | Boolean | If the request was successful, the `result` property is set to true.           |
| `data`           | Object  | Contains the statistic data (see [Properties of `data`](#properties-of-data)). |

If an error occurred, only the following properties will be present in the answer:

| Name           | Type    | Description                                   |
|----------------|---------|-----------------------------------------------|
| `error`        | Boolean | If true, an error occurred.                   |
| `errorMessage` | String  | The description of the error, which occurred. |

##### Properties of `data`

| Name                       | Type    | Description                                                                                                                          |
|----------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| `numberOfValidSubmissions` | Integer | The number of valid submissions in the selected range.                                                                               |
| `numberOfSpamSubmissions`  | Integer | The number of sumbissions as spam in the selected range.                                                                             |
| `numbersByDate`            | Object  | Contains the statistic data for every day in the selected range (see [Properties of `numbersByDate`](#properties-of-numbersbydate)). |

##### Properties of `numbersByDate`

| Name                       | Type    | Description                                     |
|----------------------------|---------|-------------------------------------------------|
| `numberOfValidSubmissions` | Integer | The number of valid submissions for the date.   |
| `numberOfSpamSubmissions`  | Integer | The number of sumbissions as spam for the date. |
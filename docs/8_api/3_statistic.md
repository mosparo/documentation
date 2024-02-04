---
sidebar_position: 3
sidebar_label: Statistic
description: With the statistic API, you can get the numbers about your project.
---

# Statistic

## `by-date`

**Method**: GET<br />
**Endpoint**: /api/v1/statistic/by-date<br />

Returns the exact numbers of how many spam and valid submissions your project received in the last days.

:::caution
Because mosparo deletes the submissions after 14 days, the statistic API will only return the data from the last 14 days.
:::

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key in the header as the username. An HMAC SHA256 hash of the API endpoint URL combined with the request data, serialized as JSON, must be set as the password. The private key will be used as the key for the HMAC SHA256 hash.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Example

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/statistic/by-date';
$formData = [];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($formData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTpRcWZCeHNtT2ZJTXcwLXVWTm5SVmREbE1VWmRMcFRHMXhvMHl5aWZ5THJJOmE3MmU1NmNiOTNiNzBhMWY3OWRjNmM4MDdkNGMwZmJmY2I4ZDEyMmE0NTg1MDkyOTllMmFjZGJiM2E2ZjFkZjI=
```

### Request

#### Arguments

| Name        | Type    | Required | Description                                                                                                                                                                                           |
|-------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `range`     | Integer | Optional | The number of seconds for which mosparo should return the numbers (`3600` will return the numbers for the last hour). If not defined, all data from the last 14 days are used.                        |
| `startDate` | Date    | Optional | Defines the date from which mosparo should return the statistics. This can be any date, but mosparo will return only the available data (the data could have already been deleted again). _(Added in v1.1)_ |

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

If mosparo completed the request successfully, the following properties would be present in the answer:

| Name             | Type    | Description                                                                    |
|------------------|---------|--------------------------------------------------------------------------------|
| `result`         | Boolean | If the request was successful, the `result` property is true.           |
| `data`           | Object  | Contains the statistic data (see [Properties of `data`](#properties-of-data)). |

If an error occurred, only the following properties would be present in the answer:

| Name           | Type    | Description                                   |
|----------------|---------|-----------------------------------------------|
| `error`        | Boolean | If true, an error occurred.                   |
| `errorMessage` | String  | The description of the error which occurred. |

##### Properties of `data`

| Name                       | Type    | Description                                                                                                                          |
|----------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| `numberOfValidSubmissions` | Integer | The number of valid submissions in the selected range.                                                                               |
| `numberOfSpamSubmissions`  | Integer | The number of submissions as spam in the selected range.                                                                             |
| `numbersByDate`            | Object  | Contains the statistic data for every day in the selected range (see [Properties of `numbersByDate`](#properties-of-numbersbydate)). |

##### Properties of `numbersByDate`

| Name                       | Type    | Description                                     |
|----------------------------|---------|-------------------------------------------------|
| `numberOfValidSubmissions` | Integer | The number of valid submissions for the date.   |
| `numberOfSpamSubmissions`  | Integer | The number of submissions as spam for the date. |

:::info
The response can contain more data if the [API debug mode](./api_debug_mode) is enabled for a project.
:::
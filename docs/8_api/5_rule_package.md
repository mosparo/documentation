---
sidebar_position: 5
sidebar_label: Rule package
description: With the rule package API, you can manage the content of a rule package.
---

# Rule package

## `import`

**Method**: POST<br />
**Endpoint**: /api/v1/rule-package/import<br />
**Content-Type**: application/json (payload as JSON string in the request body)

The import API route imports the given rule package content into the given rule package. The rule package content needs to be valid against the mosparo rule package specifications.

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key as the username in the header. An HMAC-SHA256 hash of the API endpoint URL, combined with the request data serialized as JSON, must be set as the password. The private key will be used as the HMAC-SHA256 key.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Example

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/rule-package/import';
$requestData = ['rulePackageId' => 5, 'rulePackageContent' => '....'];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTpkZjA0MTc2NTZmOWUwNWY1ODcyMzhlMzdkNmJkMDUyYTRmZDUwNmUwY2QxMDhjYmU1MDFhZGE2OTg3NjM0MjA5
```

### Request

#### Arguments

| Name                 | Type   | Required | Description                                                                                                                  |
|----------------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------|
| `rulePackageId`      | String | Required | The rule package ID to which the content should be imported. This needs to be a rule package of the type 'Manually via API'. |
| `rulePackageContent` | String | Required | The whole rule package content that should be imported.                                                                      |
| `rulePackageHash`    | String | Optional | The SHA256 hash of the rule package content.                                                                                 |

### Response

#### Example

```json
{
  "successful": true,
  "verifiedHash": true
}
```

#### Properties

If mosparo completed the request successfully, the following properties would be present in the answer:

| Name               | Type    | Description                                                                                           |
|--------------------|---------|-------------------------------------------------------------------------------------------------------|
| `successful`       | Boolean | Returns `true`, if the import was successful, or `false` if something went wrong.                     |
| `verifiedHash`     | Boolean | If the hash was verified correctly, this will be set to `true`; otherwise, it will be set to `false`. |

If an error occurred, only the following properties would be present in the answer:

| Name           | Type    | Description                                    |
|----------------|---------|------------------------------------------------|
| `error`        | Boolean | If true, an error occurred.                    |
| `errorMessage` | String  | The description of the error which occurred.   |

:::info
The response can contain more data if the [API debug mode](./api_debug_mode) is enabled for a project.
:::

## `hash-index`

**Method**: GET<br />
**Endpoint**: /api/v1/rule-package/{id}/hash-index<br />
**Content-Type**: text/plain

This endpoint returns the whole hash index from a rule package. The hash index is a combination of the rule's or rule item's UUID and the rule's or rule item's hash. If you want to synchronize a rule package directly via the API, first load the hash index and check which rules or rule items need updating.

Every line is a rule or a rule item, so you need to split the response by a new-line character (`\n`).

As soon as the end is reached, the endpoint will return `###END` on a new line. If you received this code, then you can process the index.

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key as the username in the header. An HMAC-SHA256 hash of the API endpoint URL, combined with the request data serialized as JSON, must be set as the password. The private key will be used as the HMAC-SHA256 key.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Example

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/rule-package/1/hash-index';
$requestData = ['offset' => 0, 'maxItems' => 100000];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTphYmNlYjNjMzgxNmU3NGNhYzdhZDFlYTIwZmE3ODU3ZDBlMjk1YmQzODU2ZTcwZjE2NTMxNDU3YTU0ZDRiMmZj
```

### Request

#### Arguments

| Name              | Type    | Required | Description                                                                                                                                                                               |
|-------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `offset`          | Integer | Optional | Tells the endpoint at which position you want to start. With this, you can use a loop and load, for example, 100000 items at once and start the second request with the offset of 100000. |
| `maxItems`        | Integer | Optional | Tells the endpoint how many items you want to receive with one request.                                                                                                                   |

### Response

#### Example

```text
cf164449-ea85-4312-bec0-ae551de90891::r/3fed3c117b45765b8d3e57744d18d266/115
2f51af01-eea7-4fe4-b7bb-5b41790b3a44::i/569bbb49eea5ca57dc109b5223fc210c/1552
9cecd7ca-bc68-4c48-8a82-fa3af5778be7::i/e73b0046cc24782de57f953c6bc3801a/1553
2f737ffe-ff20-4bcb-a3de-0a039b710b62::i/3fbf46288fd00219fb12b77ef39e46f8/1554
cc7e2cf4-6574-45fb-a9de-6beefd0d8180::i/846ee5b4b570c98b0da9d751cd14dba6/1555
752b0bff-8cb9-42eb-87bd-c5529a709107::i/3b97a60179e9bdb4b86f4508f983e92f/1556
```

#### Format

The format of the output is the following:

```
{uuid}::{type}/{hash}/{id}
```

| Property | Description                                                                                              |
|----------|----------------------------------------------------------------------------------------------------------|
| `uuid`   | The UUID of the rule or rule item, which is unique per rule package.                                     |
| `type`   | Either `r` for rule or `i` for rule item.                                                                |
| `hash`   | The hash of the rule or rule item data. The rule hash does not include the items.                        |
| `id`     | That's the ID in the database of a rule or rule item. This ID is used to update the rules or rule items. |

#### Error

If the rule package does not have a cache (the rule package was never loaded into mosparo), the response is a simple JSON object that looks as follows:

```json
{
  "result": false,
  "noCache": true
}
```

The HTTP status code of the response is 205.

## `rules`

**Method**: GET<br />
**Endpoint**: /api/v1/rule-package/{id}/rules<br />
**Content-Type**: application/json

If you want to get a list of all rules in the rule package, you can use this endpoint.

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key as the username in the header. An HMAC-SHA256 hash of the API endpoint URL, combined with the request data serialized as JSON, must be set as the password. The private key will be used as the HMAC-SHA256 key.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Example

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/rule-package/1/rules';
$requestData = ['page' => 1, 'perPage' => 1000];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTo2OGQ0OTJjNDE3ZjJlMjY2MmJhNTc5YmU1YTdkNTY3MmUzZjdmNTE1Yzg4M2NiNjFjMjdiNTc5ZjA1NzUxZWNi
```

### Request

#### Arguments

| Name      | Type    | Required | Description                                                            |
|-----------|---------|----------|------------------------------------------------------------------------|
| `page`    | Integer | Optional | Sets the page that you want to receive from this list.                 |
| `perPage` | Integer | Optional | Tells the endpoint how many rules you want to receive in one response. |

### Response

#### Example

```json
{
  "result": true,
  "rules": [
    {
      "id": 115,
      "uuid": "cf164449-ea85-4312-bec0-ae551de90891",
      "type": "word",
      "name": "Blocked words",
      "description": "",
      "numberOfItems": 143,
      "spamRatingFactor": 3.0,
      "updatedAt": "2026-05-01T12:00:00+00:00",
      "listRoute": "/api/v1/rule-package/1/rules/115/rule-items"
    }
  ],
  "page": 1,
  "totalPages": 5
}
```

#### Properties

If mosparo completed the request successfully, the following properties would be present in the answer:

| Name         | Type    | Description                                                                                         |
|--------------|---------|-----------------------------------------------------------------------------------------------------|
| `result`     | Boolean | Returns `true` if the request is successful, or `false` if something went wrong.                    |
| `rules`      | Array   | The array contains all the rules for this page (see [Properties of `rules`](#properties-of-rules)). |
| `page`       | Integer | Tells you which page you requested.                                                                 |
| `totalPages` | Integer | Tells you how many pages you can request.                                                           |

:::info
The response can contain more data if the [API debug mode](./api_debug_mode) is enabled for a project.
:::

##### Properties of `rules`

| Name               | Type    | Description                                                                                  |
|--------------------|---------|----------------------------------------------------------------------------------------------|
| `id`               | Integer | The ID of the rule cache in mosparo.                                                         |
| `uuid`             | Integer | The UUID of this rule, which was specified in the rule package.                              |
| `type`             | String  | The type of the rule, for example `word`.                                                    |
| `name`             | String  | The name of the rule.                                                                        |
| `description`      | String  | The description of the rule.                                                                 |
| `numberOfItems`    | Integer | Specifies how many items this rule has.                                                      |
| `spamRatingFactor` | Float   | Specifies the factor by which every rule item should be multiplied if the rule item matches. |
| `updatedAt`        | String  | The timestamp at which the rule cache was updated the last time. Format: `Y-m-d\\TH:i:sP`    |
| `listRoute`        | String  | URL to the endpoint to get the rule items for this rule.                                     | 

#### Error

If the rule package does not have a cache (the rule package was never loaded into mosparo), the response is a simple JSON object that looks as follows:

```json
{
  "result": false,
  "noCache": true
}
```

The HTTP status code of the response is 205.

## `rule-items`

**Method**: GET<br />
**Endpoint**: /api/v1/rule-package/{id}/rules/{ruleId}/rule-items<br />
**Content-Type**: application/json

If you want to get the list of rule items in a rule, you can use this API endpoint.

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key as the username in the header. An HMAC-SHA256 hash of the API endpoint URL, combined with the request data serialized as JSON, must be set as the password. The private key will be used as the HMAC-SHA256 key.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Example

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/rule-package/1/rules/115/rule-items';
$requestData = ['page' => 1, 'perPage' => 1000];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTo1YmMwYmM5NDMxNzQ0MjM1MzMyOWRjMTkzZWEwNDg4ZDA4YTQ2YjI3N2NkMGU1NDc2ZTA2NzVjMzI1MmVlMzU5
```

### Request

#### Arguments

| Name      | Type    | Required | Description                                                                 |
|-----------|---------|----------|-----------------------------------------------------------------------------|
| `page`    | Integer | Optional | Sets the page that you want to receive from this list.                      |
| `perPage` | Integer | Optional | Tells the endpoint how many rule items you want to receive in one response. |

### Response

#### Example

```json
{
  "result": true,
  "ruleItems": [
    {
      "id": 1552,
      "uuid": "2f51af01-eea7-4fe4-b7bb-5b41790b3a44",
      "type": "word",
      "value": "pills",
      "rating": 3.0
    }
  ],
  "page": 1,
  "totalPages": 5
}
```

#### Properties

If mosparo completed the request successfully, the following properties would be present in the answer:

| Name         | Type    | Description                                                                                                      |
|--------------|---------|------------------------------------------------------------------------------------------------------------------|
| `result`     | Boolean | Returns `true` if the request is successful, or `false` if something went wrong.                                 |
| `ruleItems`  | Array   | The array contains all the rule items for this page (see [Properties of `ruleItems`](#properties-of-ruleitems)). |
| `page`       | Integer | Tells you which page you requested.                                                                              |
| `totalPages` | Integer | Tells you how many pages you can request.                                                                        |

:::info
The response can contain more data if the [API debug mode](./api_debug_mode) is enabled for a project.
:::

##### Properties of `ruleItems`

| Name     | Type    | Description                                                          |
|----------|---------|----------------------------------------------------------------------|
| `id`     | Integer | The ID of the rule item cache in mosparo.                            |
| `uuid`   | Integer | The UUID of this rule item, which was specified in the rule package. |
| `type`   | String  | The type of the rule item, for example `word`.                       |
| `value`  | String  | Contains the value of the rule item.                                 |
| `rating` | Float   | Defines the rating of the rule item.                                 |

#### Error

If the rule package does not have a cache (the rule package was never loaded into mosparo), the response is a simple JSON object that looks as follows:

```json
{
  "result": false,
  "noCache": true
}
```

The HTTP status code of the response is 205.


## `batch`

**Method**: POST<br />
**Endpoint**: /api/v1/rule-package/{id}/batch<br />
**Content-Type**: application/json (payload as JSON string in the request body)

To add, modify, or delete rules or rule items, you can use the batch API endpoint. To modify the rule package, you tell this API endpoint which changes to apply.

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key as the username in the header. An HMAC-SHA256 hash of the API endpoint URL, combined with the request data serialized as JSON, must be set as the password. The private key will be used as the HMAC-SHA256 key.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Example

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/rule-package/1/batch';
$requestData = ['tasks' => [
    ['type' => 'update_rule_package', 'data' => ['lastUpdatedAt' => '2026-05-01T12:00:00+00:00', 'refreshInterval' => 60]],
]];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTo5MWNhODkxZWM5ZGJlNDEyMmQ5YTJmYmM3NDMxMjJhOWJlYWRmMTdmYWRlNzYzN2IxNGNlMjljYmYwNjY5YzNk
```

### Request

#### Arguments

| Name    | Type   | Required | Description                                                                                                                  |
|---------|--------|----------|------------------------------------------------------------------------------------------------------------------------------|
| `tasks` | Array  | Required | An array of objects with all the tasks that the endpoint should execute (see [Properties of `tasks`](#properties-of-tasks)). |

##### Properties of `tasks`

Every task object has the following two properties:

| Name   | Type   | Required | Description                                                                                                                                          |
|--------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | String | Required | A string which defines the type of the task. Is one of `update_rule_package`, `store_rule`, `store_rule_item`, `remove_rule`, or `remove_rule_item`. |
| `data` | Object | Required | An object with all the data for the task. You can find the allowed properties for this object below, see [Task types](#task-types).                  |

#### Task types

##### `update_rule_package`

Updates the rule package information in the rule package cache.

The `data` object contains the following properties:

| Name              | Type    | Required | Description                                                                               |
|-------------------|---------|----------|-------------------------------------------------------------------------------------------|
| `lastUpdatedAt`   | String  | Required | The timestamp at which the rule cache was updated the last time. Format: `Y-m-d\\TH:i:sP` |
| `refreshInterval` | Integer | Required | Defines the time in seconds when mosparo is allowed to retrieve the rule package again.   |

##### `store_rule`

Stores (adds or updates) the rule in the rule package cache.

The `data` object contains the following properties:

| Name               | Type   | Required | Description                                                                                                                                                    |
|--------------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uuid`             | String | Required | A unique identification number of the rule.                                                                                                                    |
| `name`             | String | Required | Name of the rule.                                                                                                                                              |
| `description`      | String | Optional | Description of the rule.                                                                                                                                       |
| `type`             | String | Required | Type of rule (for example: `word` or `user-agent`)                                                                                                             |
| `spamRatingFactor` | Float  | Optional | Rating factor of the rule to strengthen or weaken the rule items. A value greater than 1.0 strengthens the items, and a value less than 1.0 weakens the items. |

##### `store_rule_item`

Stores (adds or updates) a rule item in the rule package cache.

The `data` object contains the following properties:

| Name       | Type   | Required | Description                                                                                                  |
|------------|--------|----------|--------------------------------------------------------------------------------------------------------------|
| `ruleUuid` | String | Required | The unique identification number of the rule to which this item belongs.                                     |
| `uuid`     | String | Required | A unique identification number of the rule item.                                                             |
| `type`     | String | Required | Defines the type of rule (for example: `text` or `regex`).                                                   |
| `value`    | String | Required | The actual value of the item.                                                                                |
| `rating`   | Float  | Optional | Defines the spam value of the item. This value is multiplied by the spam score to give the submission score. |

##### `remove_rule`

Deletes the given rule in the rule package cache.

The `data` object contains the following properties:

| Name | Type    | Required | Description                                                                                                              |
|------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| `id` | Integer | Required | The ID of the rule in mosparo. You get this ID either by requesting the hash index or by loading the rules from the API. |

##### `remove_rule_item`

Deletes the given rule item in the rule package cache.

The `data` object contains the following properties:

| Name | Type    | Required | Description                                                                                                                        |
|------|---------|----------|------------------------------------------------------------------------------------------------------------------------------------|
| `id` | Integer | Required | The ID of the rule item in mosparo. You get this ID either by requesting the hash index or by loading the rule items from the API. |

### Response

#### Example
```json
{
  "result": true,
  "errors": []
}
```

#### Properties

The response of the endpoint includes the following properties:

| Name         | Type    | Description                                                                         |
|--------------|---------|-------------------------------------------------------------------------------------|
| `result`     | Boolean | Is `true` when the endpoint was called correctly and was able to process the tasks. |
| `errors`     | Array   | Contains the error messages that occurred when processing the tasks.                |

:::info
The response can contain more data if the [API debug mode](./api_debug_mode) is enabled for a project.
:::

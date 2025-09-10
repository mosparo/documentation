---
sidebar_position: 5
sidebar_label: Rule package
description: With the rule package API, you can import a rule package to the mosparo installation.
---

# Rule package

## `import`

**Method**: POST<br />
**Endpoint**: /api/v1/rule-package/import<br />
**Content-Type**: application/json (payload as JSON string in the request body)

The import API route imports the given rule package content into the given rule package. The rule package content needs to be valid against the mosparo rule package specifications.

### Authentication

To secure the API endpoint, authentication is required. The `Authorization` header must be sent with the request. You must set the project's public key in the header as the username. An HMAC SHA256 hash of the API endpoint URL combined with the request data, serialized as JSON, must be set as the password. The private key will be used as the key for the HMAC SHA256 hash.

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

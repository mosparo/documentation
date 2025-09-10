---
sidebar_position: 6
sidebar_label: API debug mode
description: The API debug mode will add more details to the API responses to explain a response or failure.
---

# API debug mode

## Enable the API debug mode

To use the API debug mode, you have to enable it. You can find this setting in the [project settings](../usage/settings), and you have to enable it for every project for which you want to use the API debug mode.

## Use the API debug mode

If a backend API request (Verification, statistic, or rule package) fails or returns a non-successful response, the API will add more data if the API debug mode is enabled. This can help to understand why a request failed.

### Example

If the request signature for a request was not successfully verified, the API will return the following response:

#### Without API debug mode enabled

```json
{
   "error":true,
   "errorMessage":"Request invalid."
}
```

#### With API debug mode enabled

```json
{
   "error":true,
   "errorMessage":"Request invalid.",
   "debugInformation":{
      "reason":"hmac_hash_invalid",
      "expectedHmacHash":"85def7eb34fb888b0f7cc81e2ce416bf991498021cb302bf74cd1ed014384240",
      "receivedHmacHash":"85def7eb34fb888b0f7cc81e2ce416bf991498021cb302bf74cd1ed014384241",
      "payload":"\/api\/v1\/verification\/verify{\u0022submitToken\u0022:\u0022tMGF3RKb7u0Lg43R0aNmEvqFiBeb5f4jFu9jRnMGx2Q\u0022,\u0022validationSignature\u0022:\u00220d3aaea371261e6c7500dcee54fe23dceb12762a315df8bf539a9f5694442dbb\u0022,\u0022formSignature\u0022:\u002239a1b002684efdffb4255960520cc98d30de62a56299b585ebebd6beb090ed1f\u0022,\u0022formData\u0022:{\u0022emailAddress\u0022:\u002290adf74020cede3f838394bfc64d2981f7a60f06bd91dd55fcdf299970a3b1b9\u0022,\u0022first-name\u0022:\u00222d973910e3661a7aa7b6652ea399ad0134baabf8b8ede57e8061fe5e699c20fd\u0022,\u0022last-name\u0022:\u002246807bff9019eb387190a79fc24ccff43220ffd92cbf5897dd7cd0b3deddb4ea\u0022,\u0022message\u0022:\u0022304cc1877b9b333c560188e306f9f21a4880fdf2ff98e33f7c840fffd41a19cb\u0022,\u0022website\u0022:\u0022e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\u0022}}"
   }
}
```

## Additionally available data

The additional debug data is added to the response in the field `debugInformation`. If this field is unavailable in the response, then the API debug mode is either not enabled, or the request was successful. If the verification request was successful, but not all fields could be verified successfully, the debug data is added to the list of issues for every field.

The fields below are set in the response, depending on the type of error:

| Field name               | APIs         | Type of error            | Description                                                                           |
|--------------------------|--------------|--------------------------|---------------------------------------------------------------------------------------|
| `reason`                 | All          | General error            | Specifies the reason why the request failed (see [Reasons](#reasons)).                |
| `expectedHmacHash`       | All          | Authorization error      | Specifies the hash which mosparo calculated.                                          |
| `receivedHmacHash`       | All          | Authorization error      | Specifies the hash which mosparo received.                                            |
| `payload`                | All          | Authorization error      | Specifies the data mosparo used to calculate the HMAC hash.                           |
| `hasSubmitToken`         | Verification | Verification error       | Specifies if the submit token was set in the request.                                 |
| `hasValidationSignature` | Verification | Verification error       | Specifies if the validation signature was set in the request.                         |
| `hasFormSignature`       | Verification | Verification error       | Specifies if the form signature was set in the request.                               |
| `minimumTimeExpected`    | Verification | Verification error       | Specifies the expected minimum time if the minimum time security feature is enabled.  |
| `minimumTimeElapsed`     | Verification | Verification error       | Specifies the elapsed time if the minimum time security feature is enabled.           |
| `expectedSignature`      | Verification | Verification error       | Specifies the expected validation signature.                                          |
| `receivedSignature`      | Verification | Verification error       | Specifies the received validation signature.                                          |
| `signtaurePayload`       | Verification | Verification error       | Specifies the payload used to calculate the expected signature.                       |
| `expectedValue`          | Verification | Field verification error | Specifies the expected value for the field.                                           |
| `receivedValue`          | Verification | Field verification error | Specifies the received value for the field.                                           |
| `hasRulePackageId`       | Rule package | General error            | Specifies if the rule package ID was set in the request.                              |
| `hasRulePackageContent`  | Rule package | General error            | Specifies if the rule package content was set in the request.                         |
| `expectedType`           | Rule package | Type error               | Specifies the expected type of rule package.                                          |
| `receivedType`           | Rule package | Type error               | Specifies the type of the rule package that was found with the given rule package ID. |
| `sentHash`               | Rule package | Hash error               | Specifies the hash that was sent in the rule package request.                         |
| `generatedHash`          | Rule package | Hash error               | Specifies the generated hash based on the rule package content.                       |

### Reasons

| Reason                              | Description                                                                                                                     |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `general_error`                     | A general error occurred while processing the request.                                                                          |
| `field_not_in_received_data`        | The hash for this field was not set in the request.                                                                             |
| `field_signature_invalid`           | The hash for the field calculated by mosparo is different from the hash specified in the request.                               |
| `hmac_hash_invalid`                 | The request signature, an HMAC hash specified as the password in the `Authorization` header, was not equal to the expected one. |
| `minimum_time_invalid`              | The minimum time has not elapsed, and the verification is too early.                                                            |
| `required_parameter_missing`        | One of the required parameters is missing.                                                                                      |
| `submit_token_not_found`            | The given submit token cannot be found in the database.                                                                         |
| `submit_token_not_valid`            | The given submit token is invalid, maybe because the submit token was already used.                                             |
| `validation_signature_invalid`      | The given validation signature is different from the one mosparo has calculated.                                                |
| `rule_package_type_invalid`         | The type of the rule package is incorrect.                                                                                      |
| `rule_package_content_hash_invalid` | The given hash is not the same as the hash for the given rule package content.                                                  |



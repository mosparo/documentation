---
sidebar_position: 5
sidebar_label: Troubleshooting
description: Find out more about the most common problems with the API and what you can do about them.
---

# Troubleshooting

## API error message `Authorization header invalid.`

**API:** [Verification](./verification), [Statistic](./statistic)

The mosparo APIs expect the public key and the request signature (HMAC SHA256 hash with the private key as key) as username and password in a `Basic`
`Authorization` header. For that, please calculate the HMAC SHA256 hash for your request data. After that, please combine the public key with the
request signature. Use a colon `:` to combine these two values. After that, please encode the combined string as Base64 and add `Basic` in the front.

### Example

```php
<?php

$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$requestSignature = '3bdd385caa53e3da76a8dcbfcaa0d9f4e04d8c189fab03ba41383deea236b2d3';
$authData = base64_encode($publicKey . ':' . $requestSignature);

// Set this header value as the Authorization header
$headerValue = 'Basic ' . $authData;
```

## API error message `Request invalid.`

**API:** [Verification](./verification), [Statistic](./statistic)

The most common verification and statistic API error message is the `Request invalid.` message. When you send a request to the API, you must send the 
public key and the signature of the request data (HMAC SHA256 hash with the private key as key) in the `Authorization` header. If this signature is 
invalid, the API will respond with `Request invalid.`.

### Possible reasons for this error

In general, this error message can have two possible issues. It is possible that the wrong private key was used. Please make sure that you use the 
correct private key.

If the private key is correct, it could be a problem with the request data. Please make sure that your request data for the signature is the same as 
that which you send to the API. 

## Field marked as invalid

In some cases, the verification fails, and fields are marked as invalid. This happens mainly because of two reasons. One reason is that the field is not transmitted for verification. The other reason is that the API calculates a different signature for a field than the API client did.

This second issue happens probably because the signature is generated with already validated or prepared form data. A simple example is white spaces, which are trimmed from the beginning or the end of a form value. mosparo does not do any field manipulation when validating the form data in the frontend, so you should send the original form values to the mosparo backend API for verification.
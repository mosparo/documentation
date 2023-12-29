---
sidebar_position: 2
sidebar_label: Custom integration
description: Learn how to integrate mosparo into your website without a plugin.
---

# Custom integration

You can easily integrate mosparo into your website. To use mosparo, you need a form that contains one or more form fields.

## Add container

In your form, at the place where you want to display the mosparo box, insert an empty div container with an ID attribute:

```html
<div id="mosparo-box"></div>
```

## Embed CSS Resources

In your website's header, you need to include mosparo's CSS resources. To do this, paste the following code into the HTML head area:

```html
<link href="https://<host>/resources/<uuid>.css" rel="stylesheet"> 
```

Replace `<host>` with the address of your mosparo installation. Enter the unique identification number of your mosparo project at `<uuid>`.

:::info
You can also include the CSS resources directly from the script when initializing the mosparo box. To do this, use the `loadCssResource` option during initialization (see [mosparo class parameters](#parameters-of-the-mosparo-class)).
:::

## Embedding JavaScript

Embed the mosparo script on your website. Then initialize mosparo with the code below.

```html
<script src="https://<host>/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo(
               '<htmlId>', 
               '<host>', 
               '<uuid>',
               '<publicKey>', 
               <options>
        );
    };
</script>
```
:::info
The less-than (`<`) and greater-than (`>`) signs are inserted to identify the placeholder and must be replaced with the correct value.
:::

### Parameters of the mosparo class

| Parameter     | Type   | Required | Description                                               |
|---------------|--------|----------|-----------------------------------------------------------|
| `<htmlId>`    | String | Required | HTML ID of the div container you inserted into your form. |
| `<host>`      | String | Required | Host of your mosparo installation                         |
| `<uuid>`      | String | Required | Unique identification number of the project in mosparo    |
| `<publicKey>` | String | Required | Public key of the project in mosparo                      |
| `<options>`   | Object | Optional | Additional options                                        |

### Additional options

| Parameter                  | Type     | Default value                         | Description                                                                                                                                                                                                                                                                                                                       |
|----------------------------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowBrowserValidation`   | Boolean  | `true`                                | Specifies whether browser validation should be active.                                                                                                                                                                                                                                                                            |
| `cssResourceUrl`           | String   | _empty_                               | Defines the address at which the browser can load the CSS resources. You can use it if the correct resource address is cached.                                                                                                                                                                                                    |
| `customMessages`           | Object   | `{}`                                  | Option to override the messages which the frontend box uses (see [Custom Messages](#custom-messages)).                                                                                                                                                                                                                            |                                   
| `designMode`               | Boolean  | `false`                               | Used to display the mosparo box in the different states in the mosparo backend. The mosparo box is not functional if this option is set to `true`.                                                                                                                                                                                |
| `doSubmitFormInvisible`    | Callable | _empty_                               | _(Invisible mode only)_ With this method, executing a custom submit action is possible after the form is validated (for example, by XHR). This will skip the default submit process.                                                                                                                                              |
| `inputFieldSelector`       | String   | `[name]:not(.mosparo__ignored-field)` | Defines the selector with which the fields are searched.                                                                                                                                                                                                                                                                          |
| `language`                 | String   | _empty_                               | Defines the language of the mosparo box. It is empty by default, which means mosparo will use the language defined by the browser (if available) or English. If the translation for the defined language is missing for the defined language, mosparo will respond with the English translation. Example: `fr_FR`. _(Added in v1.1)_ |
| `loadCssResource`          | Boolean  | `false`                               | Determines whether the script should also load the CSS resources during initialization (see [Embed CSS Resources](#embed-css-resources)).                                                                                                                                                                                         |
| `name`                     | String   | _empty_                               | Defines the name of the HTML checkbox. By default, a random ID is used for it.                                                                                                                                                                                                                                                    |
| `onAbortSubmit`            | Callable | _empty_                               | _(Visible mode only)_ This callback will be called after the submit process is aborted, for example, when the form must be revalidated by mosparo.                                                                                                                                                                                |
| `onCheckForm`              | Callable | _empty_                               | Defines a callback that is called as soon as the form has been checked. The validation result will be given as a boolean parameter to the callback (`true` if everything is correct, `false` if not).                                                                                                                             |
| `onResetState`             | Callable | _empty_                               | Defines a callback that will be executed after the mosparo box is reset (for example, after the form was reset).                                                                                                                                                                                                                  |
| `onSwitchToInvisible`      | Callable | _empty_                               | _(Invisible mode only)_ When a website uses the invisible mode, mosparo will initialize itself in the visible mode and change to the invisible mode after receiving the submit token. This callback will be called after the switch to the invisible mode.                                                                        |
| `onSubmitFormInvisible`    | Callable | _empty_                               | _(Invisible mode only)_ This callback will be called before the form will be submitted.                                                                                                                                                                                                                                           |
| `onValidateFormInvisible`  | Callable | _empty_                               | _(Invisible mode only)_ This callback will be called before the form will be validated.                                                                                                                                                                                                                                           |
| `requestSubmitTokenOnInit` | Boolean  | `true`                                | Specifies whether a submit token should be automatically requested during initialization. If, for example, the form is reset directly after initialization (with `reset()`), there is no need for a submit token during initialization, as a new code is requested with the reset.                                                |

#### Custom Messages

With the `customMessages` option, it is possible to adjust the messages visible in the frontend box. The option accepts an object where the property name is the locale, and the value is an object.

In the object for a locale, the property name is the name of the message, while the value is the translated text (see [Messages](#messages)).

The functionality uses the language information from the browser by accessing `navigator.languages`. If that property is unavailable, the script will use the translations it received from the mosparo backend. All available locales in the `navigator.languages` property will be tested, while the first one that matches and is not empty will be used. If there is a dash in the locale name (`-`, for example, `de-CH`), it will be replaced by an underscore (`_`, for example, `de_CH`).

##### Messages

| Message name                  | Usage                                                                                                                | Default value |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------|
| `label`                       | This is the main sentence of the box.                                                                                | I accept that the form entries are checked for spam and stored encrypted for 14 days. |
| `accessibilityCheckingData`   | This is a status update when mosparo checks the data. It is only visible to screen readers.                    | We're checking your data. Please wait. |
| `accessibilityDataValid`      | This is a status update when mosparo checked the data, and everything is okay. It is only visible to screen readers. | Your data are valid. You can submit the form. |
| `errorGotNoToken`             | Visible when no submit token was returned from mosparo.                                                             | mosparo returned no submit token. |
| `errorInternalError`          | Visible when mosparo had an internal error.                                                                         | An error occurred. Please try again. |
| `errorNoSubmitTokenAvailable` | Visible when the submit token is removed from the form, maybe because something manipulated the form.               | No submit token available. Validation of this form is not possible. |
| `errorSpamDetected`           | Visible when mosparo detected spam in the submission.                                                               | Your data got catched by our spam protection. |
| `errorLockedOut`              | Visible when the user submits too many submissions and mosparo locks the user out.                                | You are locked out. Please try again after `%datetime%` |
| `errorDelay`                  | Visible when the user requests too many submit tokens and gets delayed.                                             | Your request was delayed. Please wait for `%seconds%` seconds. |
| `hpLeaveEmpty`                | This message is hidden, visible mostly to screen readers for the honeypot field.                          | Leave this field blank |

##### Example

```javascript
mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
    customMessages: {
        de_CH: {
            label: 'Ich akzeptiere aus der Schweiz'
        },
        en_GB: {
            label: 'I accept from United Kingdom'
        },
        en_AU: {
            label: 'I accept from Australia',
            errorSpamDetected: 'Spam from Australia? Impossible!'
        }
    }
});
```

### Events

If you cannot adjust the initialization parameters, you can also use the custom events to control the execution of mosparo. All events are dispatched on the form element (`<form>`). mosparo dispatches the following events:

| Event name                | Description                                                                                                                                                                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `form-checked`            | Defines the event that is dispatched as soon as the form has been checked. The validation result will be given as an boolean value `valid` to the event (`true` if everything is correct, `false` if not).                                                   |
| `state-reseted`           | Defines the event that will be dispatched after the mosparo box is reset (for example, after the form was reset).                                                                                                                                           |
| `switch-to-invisible`     | _(Invisible mode only)_ When a website uses the invisible mode, mosparo will initialize itself in the visible mode and change to the invisible mode after receiving the submit token. This event will be dispatched after the switch to the invisible mode. |
| `submit-aborted`          | _(Visible mode only)_ This event will be dispatched after the submit process is aborted, for example, when the form must be revalidated by mosparo.                                                                                                         |
| `submit-form-invisible`   | _(Invisible mode only)_ This event will be dispatched before submitting the form.                                                                                                                                                                           |
| `validate-form-invisible` | _(Invisible mode only)_ This event will be dispatched before the form is validated.                                                                                                                                                                         |

#### Example events and callbacks

```javascript
mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
    onCheckForm: function (valid) {
        console.log('onCheckForm', valid);
    },
    onResetState: function () {
        console.log('onResetState');
    },
    onAbortSubmit: function () {
        console.log('onAbortSubmit');
    },
    onSwitchToInvisible: function () {
        console.log('onSwitchToInvisible');
    },
    onValidateFormInvisible: function () {
        console.log('onValidateFormInvisible');
    },
    onSubmitFormInvisible: function () {
        console.log('onSubmitFormInvisible');
    }
});

document.getElementById('contact-form').addEventListener('form-checked', function (ev) {
    console.log(ev, ev.detail.valid);
});

document.getElementById('contact-form').addEventListener('submit-aborted', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('state-reseted', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('switch-to-invisible', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('validate-form-invisible', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('submit-form-invisible', function (ev) {
    console.log(ev);
});
```

## Performing verification

Once the form has been submitted, the backend of your website must check whether the submission was allowed at all. From a purely technical point of view, it would be conceivable that someone passes the validation by mosparo, then changes the request again with technical means, and then sends the form. Therefore, it is imperative to check whether the entries made were valid.

### Preparing Form Data

The backend must remove all fields ignored by mosparo from the submitted form data (see [Ignored Fields](../integration/ignored_fields/)).

### Verifying with a function library

You can then use the function library to perform the verification. You need the host of your mosparo installation, the public and private keys, and the cleaned form data.

For the exact procedure, consult the documentation of the function library you use.

#### Available function libraries

| Name              | Language   | Maintained by            | Website                                      |
|-------------------|------------|--------------------------|----------------------------------------------|
| JS API client     | JavaScript | mosparo Core Developers  | https://github.com/mosparo/js-api-client     |
| PHP API client    | PHP        | mosparo Core Developers  | https://github.com/mosparo/php-api-client    |
| Python API client | Python     | mosparo Core Developers  | https://github.com/mosparo/python-api-client |

### Perform verification manually

You can easily carry out the verification manually if you do not want to use a function library or if no function library is available for your programming language.

:::info
All code examples in this section are written in the programming language PHP. This is only for better presentation; you can use any programming language.
:::

#### Form

For this example, we use a simple form with a field for the name, the email address and a textarea for the message.

```html
<form method="post" id="contact-form">
    <div class="row mb-3">
        <label class="col-sm-3 col-form-label required" for="name">Name</label>
        <div class="col-sm-9">
            <input type="text" name="name" id="name" class="form-control" required />
        </div>
    </div>
    <div class="row mb-3">
        <label class="col-sm-3 col-form-label required" for="emailAddress">Email address</label>
        <div class="col-sm-9">
            <input type="email" name="emailAddress" id="emailAddress" class="form-control" required />
        </div>
    </div>
    <div class="row mb-3">
        <label class="col-sm-3 col-form-label required" for="message">Message</label>
        <div class="col-sm-9">
            <textarea class="form-control" name="message" id="message" style="height: 300px;" required></textarea>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-sm-3"></div>
        <div class="col-sm-9">
            <div id="mosparo-box"></div>
        </div>
    </div>
        
    <div class="row mb-3">
        <div class="col-sm-3"></div>
        <div class="col-sm-9">
            <button type="submit" name="submitted" class="btn btn-primary btn-lg">
                Submit
            </button>
        </div>
    </div>
</form>

<script src="https://mosparo.example.com/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo('mosparo-box', 'https://mosparo.example.com', '<uuid>', '<publicKey>', {
            loadCssResource: true
        });
    };
</script>
```

#### Before adding mosparo

After the form was submitted, the backend processes the form data and sends the form data by email or stores them in a database.

```php
<?php

// Get the form data
$formData = $_POST;

// Validate the form data
if (!validateFormData($formData)) {
    // If the form data is not valid, show an error message
    echo 'Your form data are not valid.';
    exit;
}

// If everything is valid, send the email.
mail('info@example.com', 'Contact form message', 'Hello webmaster, here is a contact form message .........');
```

#### Adding mosparo to the process

Now with mosparo, you have to adjust your backend process to verify the submission with mosparo.

```php
<?php

// Get the form data
$formData = $_POST;

// Verify the form data with mosparo
if (!verifyFormDataWithMosparo($formData)) {
    // General error message, we don't know the exact reason for the failed verification here
    echo 'The form data contains spam.';
    exit;
}

// Validate the form data
if (!validateFormData($formData)) {
    // If the form data is not valid, show an error message
    echo 'Your form data are not valid.';
    exit;
}

// If everything is valid, send the email.
mail('info@example.com', 'Contact form message', 'Hello webmaster, here is a contact form message .........');
```

The verification is done in eleven steps:

```php
<?php

function verifyFormDataWithMosparo(array $formData)
{
    // 1. Remove the ignored fields from the form data
    // 2. Extract the submit and validation token from the form data
    // 3. Prepare the form data
    // 4. Generate the hashes
    // 5. Generate the form data signature
    // 6. Generate the validation signature
    // 7. Prepare the verification signature
    // 8. Collect the request data
    // 9. Generate the request signature
    // 10. Send the API request
    // 11. Check the response 
}
```

##### 1. Remove the ignored fields from the form data

mosparo does not validate field types like checkbox, radio, password, and hidden. There are more ignored fields, which you can find on this list here: [Ignored fields](./ignored_fields)

You have to remove these from the form data since mosparo did not validate these fields (see [Preparing form data](#preparing-form-data)).

##### 2. Extract the submit and validation token from the form data

mosparo automatically adds the submit and validation token to your form data. So you should have these to values in your form data. Extract the two values and store them in a variable:

```php
$submitToken = $formData['_mosparo_submitToken'];
$validationToken = $formData['_mosparo_validationToken'];
```

##### 3. Prepare the form data

Now, we have to clean up the form data. For this we have to iterate over the form data. If the field name starts with `_mosparo_` we must remove this field from the form data. Additionally, we have to replace CRLF line breaks with LF line breaks for all other fields.

```php
$preparedFormData = [];
foreach ($formData as $fieldName => $value) {
    if (str_starts_with($fieldName, '_mosparo_')) {
        continue;
    }

    $preparedFormData[$fieldName] = str_replace("\r\n", "\n", $value);
}
```

##### 4. Generate the hashes

Since we do not want to transfer the plain-text form data to mosparo, we create hashes. For that, we iterate over the array of the prepared form data and create a SHA256 hash for every value. Please sort the array alphabetically by the field name in ascending order (A-Z).

```php
foreach ($preparedFormData as $fieldName => $value) {
    $preparedFormData[$fieldName] = hash('sha256', $value);
}

ksort($preparedFormData);
```

##### 5. Generate the form data signature

Now, we create a signature to prove the validity of the prepared form data. For this, we convert the prepared form data into a JSON string and then create an HMAC SHA256 hash with the project's private key.

```php
$jsonPreparedFormData = json_encode($preparedFormData);
$projectPrivateKey = '<privateKey>'; // You can find this value in the project settings in mosparo
$formDataSignature = hash_hmac('sha256', $jsonPreparedFormData, $projectPrivateKey);
```

##### 6. Generate the validation signature

With the same method as in step 5, we create the signature of the validation token (an HMAC SHA256 hash):

```php
$validationSignature = hash_hmac('sha256', $validationToken, $projectPrivateKey);
```

##### 7. Prepare the verification signature

To later confirm the response from mosparo, we create a verification signature. The signature is the combination of the validation and the form data signature as an HMAC SHA256 hash.

```php
$combinedSignatures = $validationSignature . $formDataSignature;
$verificationSignature = hash_hmac('sha256', $combinedSignatures, $projectPrivateKey); 
```

##### 8. Collect the request data

We have prepared the form data and generated the signatures, so we can now prepare the API request for the verification API. For that, we prepare the request data, which we need to contact the verification API:

```php
$apiEndpoint = '/api/v1/verification/verify'; // This is the API of mosparo, so it's a fixed value
$requestData = [
    'submitToken' => $submitToken,
    'validationSignature' => $validationSignature,
    'formSignature' => $formDataSignature,
    'formData' => $preparedFormData,
];
```

##### 9. Generate the request signature

To authenticate the request, we need a request signature. We create another HMAC SHA256 hash with the combination of the API endpoint and the request data as a JSON string as value.

```php
$jsonRequestData = json_encode($requestData);
$combinedApiEndpointJsonRequestData = $apiEndpoint . $jsonRequestData;
$requestSignature = hash_hmac('sha256', $combinedApiEndpointJsonRequestData, $projectPrivateKey);
```

##### 10. Send the API request

We have prepared all the necessary values and can contact the mosparo API. For that we need an HTTP client to make the request to the API. For this example, we're using the PHP library Guzzle to make the request, but of course, you can use any other client. The request to the API is a POST request, and you must add the public key and the request signature in the `Authorization` header (as Basic authorization header, encoded as Base64 string). The request data must be sent as the post data fields of the request.

```php
$projectPublicKey = '<publicKey>'; // You can find this value in the project settings in mosparo
$client = new \GuzzleHttp\Client([
    'base_uri' => 'https://mosparo.example.com', // The host of your mosparo installation
]);
$response = $client->request(
    'POST',
    $apiEndpoint,
    [
        'auth' => [$projectPublicKey, $requestSignature],
        'form_params' => $requestData,
    ]
);
```

##### 11. Check the response

The request was sent, and we received a response. Now it's time to check the result of the verification. For that, decode the returned JSON string from the API. If the verification was processed correctly (without HTTP error messages), then in the response from mosparo, you should have the following fields: `valid`, `verificationSignature`, `verifiedFields`, and `issues`.

If the field `valid` is set to `true` and the field `verificationSignature` contains the same value as the prepared verification signature in step 7, then the form data are valid, and you can process the data. If `valid` is not `true` or the verification signature is not the same, then something was wrong with the request (or the user tried to manipulate it), and is therefore rated as spam.

There is one additional crucial step to do. mosparo can only validate what it received in the frontend and what you sent in the backend. The user could change a required field in the browser to an ignored field for mosparo and bypass mosparo with it. After successful verification, you should ensure all your required fields are verified. For this, mosparo returns the array with the verified fields. Make sure, that all your fields are set in there:

```php
$responseData = json_decode((string) $response->getBody(), true);

if (isset($responseData['valid']) && $responseData['valid'] && isset($responseData['verificationSignature']) && $responseData['verificationSignature'] == $verificationSignature) {
    // Make sure that all required fields were verified by mosparo
    if (!isset($responseData['verifiedFields']['name']) || !isset($responseData['verifiedFields']['emailAddress']) ||  !isset($responseData['verifiedFields']['message'])) {
        return false;
    }
    return true;
}

return false;
```

You can find more about that here: [Bypass protection](./bypass_protection)

#### Complete function

Now the complete function to execute the verification looks like this:

```php
<?php

function verifyFormDataWithMosparo(array $formData)
{
    // 1. Remove the ignored fields from the form data
    // You have to do this only if you have ignored fields in your form
    
    // 2. Extract the submit and validation token from the form data
    $submitToken = $formData['_mosparo_submitToken'];
    $validationToken = $formData['_mosparo_validationToken'];

    // 3. Prepare the form data
    $preparedFormData = [];
    foreach ($formData as $fieldName => $value) {
        if (str_starts_with($fieldName, '_mosparo_')) {
            continue;
        }

        $preparedFormData[$fieldName] = str_replace("\r\n", "\n", $value);
    }

    // 4. Generate the hashes
    foreach ($preparedFormData as $fieldName => $value) {
        $preparedFormData[$fieldName] = hash('sha256', $value);
    }

    ksort($preparedFormData);

    // 5. Generate the form data signature
    $jsonPreparedFormData = json_encode($preparedFormData);
    $projectPrivateKey = '<privateKey>'; // You can find this value in the project settings in mosparo
    $formDataSignature = hash_hmac('sha256', $jsonPreparedFormData, $projectPrivateKey);

    // 6. Generate the validation signature
    $validationSignature = hash_hmac('sha256', $validationToken, $projectPrivateKey);

    // 7. Prepare the verification signature
    $combinedSignatures = $validationSignature . $formDataSignature;
    $verificationSignature = hash_hmac('sha256', $combinedSignatures, $projectPrivateKey); 

    // 8. Collect the request data
    $apiEndpoint = '/api/v1/verification/verify'; // This is the API of mosparo, so it's a fixed value
    $requestData = [
        'submitToken' => $submitToken,
        'validationSignature' => $validationSignature,
        'formSignature' => $formDataSignature,
        'formData' => $preparedFormData,
    ];

    // 9. Generate the request signature
    $jsonRequestData = json_encode($requestData);
    $combinedApiEndpointJsonRequestData = $apiEndpoint . $jsonRequestData;
    $requestSignature = hash_hmac('sha256', $combinedApiEndpointJsonRequestData, $projectPrivateKey);

    // 10. Send the API request
    $projectPublicKey = '<publicKey>'; // You can find this value in the project settings in mosparo
    $client = new \GuzzleHttp\Client([
        'base_uri' => 'https://mosparo.example.com', // The host of your mosparo installation
    ]);
    $response = $client->request(
        'POST',
        $apiEndpoint,
        [
            'auth' => [$projectPublicKey, $requestSignature],
            'form_params' => $requestData,
        ]
    );

    // 11. Check the response 
    $responseData = json_decode((string) $response->getBody(), true);

    if (isset($responseData['valid']) && $responseData['valid'] && isset($responseData['verificationSignature']) && $responseData['verificationSignature'] == $verificationSignature) {
        // Make sure that all required fields were verified by mosparo
        if (!isset($responseData['verifiedFields']['name']) || !isset($responseData['verifiedFields']['emailAddress']) ||  !isset($responseData['verifiedFields']['message'])) {
            return false;
        }
        return true;
    }

    return false;
}
``` 

#### After the verification

If the verification was successful, you can now process the form data as you did before, for example, sending it by email or storing it in a database.

#### API response fields

The response of the mosparo API indicates whether a response is correct or whether a request is invalid. The following fields can be included in the request:

| Field                   | Type    | Description                                                                                                                           |
|-------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------|
| `valid`                 | Boolean | Indicates whether a request is valid (i.e., may be sent) or invalid (manipulated).                                                    |
| `verificationSignature` | String  | mosparo calculates its own verification signature, which must match the verification signature calculated before sending the request. |
| `issues`                | Array   | All problems found during the audit.                                                                                                  |
| `verifiedFields`        | Object  | Indicates which fields of the form data have been checked and what the state of each field is.                                        | 
| `error`                 | Boolean | If an error has occurred, this field is set to `true`.                                                                                |
| `errorMessage`          | String  | The error message of the error.                                                                                                       |

The `error` and `errorMessage` fields are set if an error occurred during the check. The two fields indicate that an error has occurred and what the error message is. This happens, for example, if the public key or one of the signatures is invalid or another problem occurred.

##### Values for `verifiedFields`

| Value     | Description                                                                                                                                          |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `valid`   | The field was correctly verified and is valid.                                                                                                       |
| `invalid` | mosparo did not validate the field correctly, i.e., the value submitted during verification does not match the value originally entered in the form. |

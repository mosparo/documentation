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
<link href="https://[host]/resources/[uuid].css" rel="stylesheet"> 
```

Replace `[host]` with the address of your mosparo installation. Enter the unique identification number of your mosparo project at `[uuid]`.

:::info
You can also include the CSS resources directly from the script when initializing the mosparo box. To do this, use the `loadCssResource` option during initialization (see [mosparo class parameters](#parameters-of-the-mosparo-class)).
:::

## Embedding JavaScript

Embed the mosparo script on your website. Then initialize mosparo with the code below.

```html
<script src="https://{$host}/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo(
               '[htmlId]', 
               '[host]', 
               '[uuid]',
               '[publicKey]', 
               [options]
        );
    };
</script>
```

### Parameters of the mosparo class

| Parameter     | Type   | Required | Description                                               |
|---------------|--------|----------|-----------------------------------------------------------|
| `[htmlId]`    | String | Required | HTML ID of the div container you inserted into your form. |
| `[host]`      | String | Required | Host of your mosparo installation                         |
| `[uuid]`      | String | Required | Unique identification number of the project in mosparo    |
| `[publicKey]` | String | Required | Public key of the project in mosparo                      |
| `[options]`   | Object | Optional | Additional options                                        |

### Additional options

| Parameter                  | Type     | Default value                         | Description                                                                                                                                                                                                                                                                        |
|----------------------------|----------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowBrowserValidation`   | Boolean  | `true`                                | Specifies whether browser validation should be active.                                                                                                                                                                                                                             |
| `cssResourceUrl`           | String   | _empty_                               | Defines the address at which the browser can load the CSS resources. You can use it if the correct resource address is cached.                                                                                                                                                     |
| `customMessages`           | Object   | `{}`                                  | Option to override the messages which the frontend box uses (see [Custom Messages](#custom-messages)).                                                                                                                                                                             |                                   
| `designMode`               | Boolean  | `false`                               | Used to display the mosparo box in the different states in the mosparo backend. The mosparo box is not functional if this option is set to `true`.                                                                                                                                 |
| `doSubmitFormInvisible`    | Callable | _empty_                               | _(Invisible mode only)_ With this method, executing a custom submit action is possible after the form is validated (for example, by XHR). This will skip the default submit process.                                                                                     |
| `inputFieldSelector`       | String   | `[name]:not(.mosparo__ignored-field)` | Defines the selector with which the fields are searched.                                                                                                                                                                                                                           |
| `loadCssResource`          | Boolean  | `false`                               | Determines whether the script should also load the CSS resources during initialization (see [Embed CSS Resources](#embed-css-resources)).                                                                                                                                          |
| `name`                     | String   | _empty_                               | Defines the name of the HTML checkbox. By default, a random ID is used for it.                                                                                                                                                                                                     |
| `onAbortSubmit`            | Callable | _empty_                               | _(Visible mode only)_ This callback will be called after the submit process is aborted, for example, when the form must be revalidated by mosparo.                                                                                                                                 |
| `onCheckForm`              | Callable | _empty_                               | Defines a callback that is called as soon as the form has been checked. The validation result will be given as a boolean parameter to the callback (`true` if everything is correct, `false` if not).                                                                              |
| `onResetState`             | Callable | _empty_                               | Defines a callback that will be executed after the mosparo box is reset (for example, after the form was reset).                                                                                                                                                                   |
| `onSwitchToInvisible`      | Callable | _empty_                               | _(Invisible mode only)_ When a website uses the invisible mode, mosparo will initialize itself in the visible mode and change to the invisible mode after receiving the submit token. This callback will be called after the switch to the invisible mode.                         |
| `onSubmitFormInvisible`    | Callable | _empty_                               | _(Invisible mode only)_ This callback will be called before the form will be submitted.                                                                                                                                                                                            |
| `onValidateFormInvisible`  | Callable | _empty_                               | _(Invisible mode only)_ This callback will be called before the form will be validated.                                                                                                                                                                                            |
| `requestSubmitTokenOnInit` | Boolean  | `true`                                | Specifies whether a submit token should be automatically requested during initialization. If, for example, the form is reset directly after initialization (with `reset()`), there is no need for a submit token during initialization, as a new code is requested with the reset. |

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
mosparo('mosparo-box', 'host', 'uuid', 'publicKey', {
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
mosparo('mosparo-box', 'host', 'uuid', 'publicKey', {
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
All code examples in this section are written in the programming language PHP (from the [PHP API client](https://github.com/mosparo/php-api-client/)). This is only for better presentation; you can use any programming language.
:::

#### Prepare form data for request

After the form data has been cleaned (see [Preparing form data](#preparing-form-data)), you need to do some additional cleaning:

1. Extract the submission token `_mosparo_submitToken` and the validation token `_mosparo_validationToken` from the form data and store these values in a variable.
2. All form fields whose name begins with `_mosparo_` must be removed from the form data. These are the submission token and the validation token from mosparo, which you need for verification but must be absent from the form data.
3. In all fields, you must replace CRLF line breaks with LF line breaks (convert `\r\n` to `\n`).
4. Generate the signature (HMAC SHA256 hash) for every value (see [Arguments](../api/verification/#arguments)).
5. The names of the form data must be converted to lowercase letters
6. The form fields must be sorted by name in ascending alphabetical order (A-Z)

#### Generating the signatures

After the form data has been cleaned and sorted, you must create the necessary signatures and send the data to mosparo.

First, generate a signature of the form data. Convert the form data to a JSON string. Then generate an HMAC hash with the hash algorithm SHA256 and the private API key as the key.

```php
$formSignature = hmac_hash('sha256', json_encode($formData), $privateKey);
```

:::note
In the JSON string, empty arrays `[]` should be represented as empty objects `{}`. Otherwise, problems may occur.
:::

Then create a signature of the validation token that was transmitted in the form by mosparo.

```php
$validationSignature = hmac_hash('sha256', $validationToken, $privateKey);
```

A verification signature must then be generated, which consists of the validation signature and the form data signature, to make it impossible to change the data.

```php
$verificationSignature = hmac_hash('sha256', $validationSignature . $formSignature, $privateKey);
```

You must send these signatures to mosparo with the submission token and the form data.

```php
$apiEndpoint = '/api/v1/verification/verify';
$requestData = [
    'submitToken' => $submitToken,
    'validationSignature' => $validationSignature,
    'formSignature' => $formSignature,
    'formData' => $formData
];
```

A request signature is generated, which consists of the API endpoint and the request data as a JSON string, to confirm the authenticity of the request.

```php
$requestSignature = hmac_hash('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
```

#### Send the verification request

To start the request, send a POST request to the host of your mosparo installation. Use the API endpoint `/api/v1/verification/verify` and the request data.

To ensure the authenticity of your request, please send the public key and the request signature in the Authorization header.

```php
$data = [
    'auth' => [$publicKey, $requestSignature],
    'headers' => [
        'Accept' => 'application/json'
    ],
    'json' => $requestData
];

$res = $this->sendRequest('POST', $apiEndpoint, $data);
```

#### Evaluate the response

The response of the mosparo API indicates whether a response is correct or whether a request is invalid. The following fields can be included in the request:

| Field                   | Type    | Description                                                                                                                           |
|-------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------|
| `valid`                 | Boolean | Indicates whether a request is valid (i.e., may be sent) or invalid (manipulated).                                                     |
| `verificationSignature` | String  | mosparo calculates its own verification signature, which must match the verification signature calculated before sending the request. |
| `issues`                | Array   | All problems found during the audit.                                                                                      |
| `verifiedFields`        | Object  | Indicates which fields of the form data have been checked and what the state of each field is.                                        | 
| `error`                 | Boolean | If an error has occurred, this field is set to `true`.                                                                                |
| `errorMessage`          | String  | The error message of the error.                                                                                                |

The first thing to check is whether the `valid` field is set and set to `true`. If this is not the case, the form data is invalid.

Subsequently, the `verificationSignature` should be checked. For a request to be valid, the verification signature created before you send the request must match the verification signature returned by the API. If this is not the case, the request has been tampered with and is invalid.

In the field `issues`, possible problems that mosparo found during the verification are recorded.

The field `verifiedFields` is used to document which fields have been verified and what the result of the respective field is.

##### Values for `verifiedFields`

| Value     | Description                                                                                                                                  |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `valid`   | The field was correctly verified and is valid.                                                                                               |
| `invalid` | mosparo did not validate the field correctly, i.e., the value submitted during verification does not match the value originally entered in the form. |

The `error` and `errorMessage` fields are set if an error occurred during the check. The two fields indicate that an error has occurred and what the error message is. This happens, for example, if the public key or one of the signatures is invalid or another problem occurred.

#### After verification

If the field `valid` contains the value `true` and the verification signatures are equal, you should ensure that the protection was not bypassed. Read more about that in the [Bypass protection](bypass_protection). After that, the form input can be processed, for example, by sending an e-mail or saving the data in the database.

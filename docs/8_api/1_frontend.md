---
sidebar_position: 1
sidebar_label: Frontend
description: JavaScript uses the Frontend API to load the mosparo box.
---

# Frontend

## `request-submit-token`

**Method**: POST<br />
**Endpoint**: /api/v1/frontend/request-submit-token<br />
**Content-Type**: application/x-www-form-urlencoded (normal POST request)

Returns a new submit token to the browser.

### Authentication

No authentication is required. Each request must contain the public key of a project to identify the project.

### Request

#### Arguments

| Name        | Type   | Required | Description                                         |
|-------------|--------|----------|-----------------------------------------------------|
| `publicKey` | String | Required | The public key of the project.                      |
| `pageTitle` | String | Required | The title of the page on which the form is visible. |
| `pageUrl`   | String | Required | The URL of the page on which the form is visible.   |

### Response

#### Example
```json
{
  "submitToken":"_wc0MPl5EQuwuJeTMq8uoF7WFpFdoZZf35ctawmasmc",
  "messages":{
    "label":"Ich akzeptiere, dass die Formulareingaben auf Spam \u00fcberpr\u00fcft und f\u00fcr 14 Tage verschl\u00fcsselt gespeichert werden.",
    "accessibilityCheckingData":"Wir \u00fcberpr\u00fcfen Ihre Daten. Bitte warten Sie.",
    "accessibilityDataValid":"Ihre Daten enthalten kein Spam. Sie k\u00f6nnen das Formular absenden.",
    "errorGotNoToken":"mosparo hat keinen Absende-Token ausgestellt.",
    "errorInternalError":"Es trat ein Fehler auf. Bitte wiederholen Sie den Vorgang.",
    "errorNoSubmitTokenAvailable":"Kein Absende-Token verf\u00fcgbar. Die Validierung Ihrer Daten ist nicht m\u00f6glich.",
    "errorSpamDetected":"In Ihren Daten ist Spam enthalten.",
    "errorLockedOut":"Sie wurden tempor\u00e4r gesperrt. Bitte versuchen Sie es nach %datetime% erneut.",
    "errorDelay":"Ihre Anfrage wurde verz\u00f6gert. Bitte warten Sie %seconds% Sekunden.",
    "hpLeaveEmpty":"Dieses Feld leer lassen"
  }
}
```

#### Properties

| Name                | Type   | Description                                                   |
|---------------------|--------|---------------------------------------------------------------|
| `submitToken`       | String | The submit token is needed for the validation and verification. |
| `messages`          | Object | The translations for the different texts.                     |
| `honeypotFieldName` | String | The name of the honeypot field if this function is active.   |

## `check-form-data`

**Method**: POST<br />
**Endpoint**: /api/v1/frontend/check-form-data<br />
**Content-Type**: application/x-www-form-urlencoded (normal POST request)

Validates the form data and returns a validation token if the data does not contain spam.

### Authentication

No authentication is required. Each request must contain the public key of a project to identify the project.

### Request

#### Arguments

| Name          | Type   | Required | Description                                                                                           |
|---------------|--------|----------|-------------------------------------------------------------------------------------------------------|
| `publicKey`   | String | Required | The public key of the project.                                                                        |
| `submitToken` | String | Required | The submit token requested with the method [`request-submit-token`](#request-submit-token). |
| `formData`    | Array  | Required | An array with all the form data, see [Structure of `formData`](#structure-of-formdata).               |

#### Structure of `formData`

The form data is an array of objects. Every object needs the following properties:

| Name        | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| `name`      | String | Name of the field (`name` attribute of the HTML field) |
| `value`     | String | The value of the field                                 |
| `fieldPath` | String | The path of the field, see [Field path](#field-path)   |

#### Field path

The field path combines the HTML element tag and the field's name.

:::note Examples
`textarea.message`<br />
`select.country`
:::

The HTML type must be added to the field path if it is an `input` element.

:::note Examples
`input[text].name`<br />
`input[email].email-address`
:::

### Response

#### Example
```json
{
  "valid":true,
  "validationToken":"VXihNRK84O55IzHQD_G7aumyzDHOIiEZGnh1v2XyZJw"
}
```

#### Properties

| Name                | Type    | Description                                                        |
|---------------------|---------|--------------------------------------------------------------------|
| `valid`             | Boolean | The form data does not contain spam if true.                      |
| `validationToken`   | String  | The token needs to be sent to mosparo for verification. |


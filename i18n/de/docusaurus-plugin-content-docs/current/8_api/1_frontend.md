---
sidebar_position: 1
sidebar_label: Frontend
description: Die Frontend-API wird vom JavaScript verwendet, um die mosparo-Box zu laden.
---

# Frontend

## `request-submit-token`

**Methode**: POST<br />
**Endpunkt**: /api/v1/frontend/request-submit-token<br />
**Content-Type**: application/x-www-form-urlencoded (normale POST Anfrage)

Gibt einen neuen Einsendecode an den Browser zurück.

### Authentifizierung

Es ist keine Authentifizierung erforderlich. Um das Projekt zu identifizieren, muss jede Anfrage den öffentlichen Schlüssel eines Projekts enthalten.

### Anfrage

#### Argumente

| Name        | Typ    | Erforderlich  | Beschreibung                                            |
|-------------|--------|---------------|---------------------------------------------------------|
| `publicKey` | String | Erforderlich  | Der öffentliche Schlüssel des Projekts.                 |
| `pageTitle` | String | Erforderlich  | Der Titel der Seite, auf der das Formular sichtbar ist. |
| `pageUrl`   | String | Erforderlich  | Die URL der Seite, auf der das Formular sichtbar ist.   |

### Antwort

#### Beispiel
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

#### Merkmale

| Name                | Typ    | Beschreibung                                                             |
|---------------------|--------|--------------------------------------------------------------------------|
| `submitToken`       | String | Der Einsendecode, das für die Validierung und Überprüfung benötigt wird. |
| `messages`          | Objekt | Die Übersetzungen für die verschiedenen Texte.                           |
| `honeypotFieldName` | String | Der Name des Honeypot-Feldes, wenn diese Funktion aktiviert ist.         |

## `check-form-data`

**Methode**: POST<br />
**Endpunkt**: /api/v1/frontend/check-form-data<br />
**Content-Type**: application/x-www-form-urlencoded (normale POST Anfrage)

Validiert die Formulardaten und gibt einen Validierungscode zurück, wenn die Daten keinen Spam enthalten.

### Authentifizierung

Es ist keine Authentifizierung erforderlich. Um das Projekt zu identifizieren, muss jede Anfrage den öffentlichen Schlüssel eines Projekts enthalten.

### Anfrage

#### Argumente

| Name          | Typ    | Erforderlich | Beschreibung                                                                                                 |
|---------------|--------|--------------|--------------------------------------------------------------------------------------------------------------|
| `publicKey`   | String | Erforderlich | Der öffentliche Schlüssel des Projekts.                                                                      |
| `submitToken` | String | Erforderlich | Der Einsendecode, welcher mit der Methode [`request-submit-token`](#request-submit-token) angefordert wurde. |
| `formData`    | Array  | Erforderlich | Ein Array mit allen Formulardaten, siehe [Struktur von `formData`](#struktur-von-formdata).                  |

#### Struktur von `formData`

Die Formulardaten sind in einem Objekt bestehend aus zwei Eigenschaften:

| Name            | Typ  | Beschreibung                                                                                                                                                                       |
|-----------------|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fields`        | Array | Ein Array von Objekten mit den Daten der Felder, die verarbeitet werden sollen, siehe [Struktur der Felddaten](#struktur-der-felddaten).                                           |
| `ignoredFields` | Array | Ein Array mit den Namen (HTML-Attribut `name` eines ignorierten Feldes) der Felder, die vom Frontend ignoriert wurden, siehe [Ignorierte Felder](../integration/ignored_fields/).  |

#### Struktur der Felddaten

Jedes Objekt benötigt die folgenden Eigenschaften:

| Name        | Typ    | Beschreibung                                      |
|-------------|--------|---------------------------------------------------|
| `name`      | String | Name des Feldes (Attribut `name` des HTML-Feldes) |
| `value`     | String | Der Wert des Feldes                               |
| `fieldPath` | String | Der Pfad des Feldes, siehe [Feldpfad](#feldpfad)  |

#### Feldpfad

Der Feldpfad ist eine Kombination aus dem HTML-Element-Tag und dem Namen des Feldes.

:::note Beispiele
`textarea.message`<br />
`select.country`
:::

Der HTML-Typ muss dem Feldpfad hinzugefügt werden, wenn es sich um ein `input`-Element handelt.

:::note Beispiele
`input[text].name`<br />
`input[email].email-address`
:::

#### Beispiel `formData`

```json
{
  "fields": [
    {
      "name": "username",
      "value": "example",
      "fieldPath": "input[text].username"
    }
  ],
  "ignoredFields": [
    "password"
  ]
}
```

### Antwort

#### Beispiel
```json
{
  "valid":true,
  "validationToken":"VXihNRK84O55IzHQD_G7aumyzDHOIiEZGnh1v2XyZJw"
}
```

#### Merkmale

| Name                | Typ     | Beschreibung                                                                 |
|---------------------|---------|------------------------------------------------------------------------------|
| `valid`             | Boolean | Wenn `true` enthalten die Formulardaten keinen Spam.                         |
| `validationToken`   | String  | Der Validierungscode, der zur Verifizierung an mosparo gesendet werden muss. |


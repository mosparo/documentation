---
sidebar_position: 2
sidebar_label: Verification
description: Die Verifizierungs-API wird verwendet, um die Formulardaten zu überprüfen.
---

# Verification

## `verify`

**Methode**: POST<br />
**Endpunkt**: /api/v1/verification/verify<br />
**Content-Type**: application/json (Payload als JSON-String im Request Body)

Überprüft die Formulardaten und teilt dem Backend der Website mit, ob eine Eingabe korrekt war oder manipuliert wurde.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC SHA256 Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [Base64 von <publicKey>:<hmacHash>]
```

#### Beispiel

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/verification/verify';
$formData = ['first-name' => '0fde7e04a97f64098b5285c6e33502ddd918a04a7fc8c7012a13caae19b26c3b'];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($formData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTpRcWZCeHNtT2ZJTXcwLXVWTm5SVmREbE1VWmRMcFRHMXhvMHl5aWZ5THJJOjNiZGQzODVjYWE1M2UzZGE3NmE4ZGNiZmNhYTBkOWY0ZTA0ZDhjMTg5ZmFiMDNiYTQxMzgzZGVlYTIzNmIyZDM=
```

### Anfrage

#### Beispiel
```json
{
  "submitToken":"_wc0MPl5EQuwuJeTMq8uoF7WFpFdoZZf35ctawmasmc",
  "validationSignature":"122fe5123d3efb8167000b1adf54864991208f9ab9192b66d178cfc1886ed12d",
  "formSignature":"b1e232b17f9cb11ea9402cbdf67325f3ecc494bfa2277e3246f1f3a51696b668",
  "formData":{
    "email-address":"90adf74020cede3f838394bfc64d2981f7a60f06bd91dd55fcdf299970a3b1b9",
    "first-name":"0fde7e04a97f64098b5285c6e33502ddd918a04a7fc8c7012a13caae19b26c3b",
    "last-name":"65b63117b1a4dfe468d927e32d8ea302d9d10c04c9b9b7dfac9c7770deacc0cc",
    "message":"2c1733ff5e4e9a7f206c4fff391021acc6b1783785dbd70be9fcb8d008a0d9e5",
    "website":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}
```

#### Argumente

| Name                  | Typ    | Erforderlich | Beschreibung                                                                       |
|-----------------------|--------|--------------|------------------------------------------------------------------------------------|
| `submitToken`         | String | Erforderlich | Der Einsendecode, welcher im Frontend angefordert wurde.                           |
| `validationSignature` | String | Erforderlich | Der HMAC SHA256-Hash des Validierungscode.                                         |
| `formSignature`       | String | Erforderlich | Der HMAC SHA256-Hash der Formulardaten (serialisiert als JSON-String).             |
| `formData`            | Objekt | Erforderlich | Ein Objekt mit allen Formularfeldern und dem SHA256-Hash der Daten für jedes Feld. |

### Antwort

#### Beispiel
```json
{
  "valid":true,
  "verificationSignature":"994937080e6f4fdfbe0aa8e0581348cbabc1d3b84365e8a8ba0a00fa2716e470",
  "verifiedFields":{
    "first-name":"valid",
    "last-name":"valid",
    "email-address":"valid",
    "website":"valid",
    "message":"valid"
  },
  "issues":[

  ]
}
```

#### Merkmale

Wenn die Anfrage erfolgreich abgeschlossen wurde, sind die folgenden Eigenschaften in der Antwort enthalten:

| Name                    | Typ     | Beschreibung                                                                                                                                                                                                                   |
|-------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `valid`                 | Boolean | Ist `true`, wenn die Anfrage gültig war und vom Backend verarbeitet werden kann. Ist dies `false`, ist die Übermittlung nicht akzeptabel.                                                                                      |
| `verificationSignature` | String  | Die von mosparo erzeugte Signatur. Diese muss mit der vom Client selbst erstellten Signatur abgeglichen werden, um Manipulationen zu verhindern (siehe [Auswerten der Antwort](../integration/custom/#auswerten-der-antwort)). |
| `verifiedFields`        | Objekt  | Ein Objekt mit allen überprüften Feldern und mit dem Status für jedes Feld (siehe [Werte für `verifiedFields`](../integration/custom/#werte-für-verifiedfields)).                                                              |
| `issues`                | Array   | Ein Array mit möglichen Problemen als String.                                                                                                                                                                                  |

Wenn ein Fehler aufgetreten ist, sind nur die folgenden Eigenschaften in der Antwort enthalten:

| Name           | Typ     | Beschreibung                                       |
|----------------|---------|----------------------------------------------------|
| `error`        | Boolean | Wenn `true`, ist ein Fehler aufgetreten.           |
| `errorMessage` | String  | Die Beschreibung des Fehlers, der aufgetreten ist. |
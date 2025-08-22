---
sidebar_position: 5
sidebar_label: Regelpakete
description: Mit der Regelpaket-API können Sie ein Regelpaket in die mosparo-Installation importieren.
---

# Regelpakete

## `import`

**Methode**: POST<br />
**Endpunkt**: /api/v1/rule-package/import<br />
**Content-Type**: application/json (Payload als JSON-String im Request Body)

Die Import-API-Route importiert den Inhalt des angegebenen Regelpakets in das angegebene Regelpaket. Der Inhalt des Regelpakets muss den Spezifikationen für Mosparo-Regelpakete entsprechen.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC SHA256 Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Beispiel

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

### Anfrage

#### Argumente

| Name                 | Typ    | Erforderlich | Beschreibung                                                                                                                               |
|----------------------|--------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `rulePackageId`      | String | Erforderlich | Die ID des Regelpakets, in das der Inhalt importiert werden soll. Dabei muss es sich um ein Regelpaket vom Typ „Manuell über API“ handeln. |
| `rulePackageContent` | String | Erforderlich | Der gesamte Inhalt des Regelpakets, der importiert werden soll.                                                                            |
| `rulePackageHash`    | String | Optional     | Der SHA256-Hashwert des Inhalts des Regelpakets.                                                                                           |

### Antwort

#### Beispiel
```json
{
  "successful": true,
  "verifiedHash": true
}
```

#### Merkmale

Wenn die Anfrage erfolgreich abgeschlossen wurde, sind die folgenden Eigenschaften in der Antwort enthalten:

| Name               | Typ     | Beschreibung                                                                                           |
|--------------------|---------|--------------------------------------------------------------------------------------------------------|
| `successful`       | Boolean | Ist immer als `true` gesetzt, sofern kein Fehler aufgetreten ist.                                      |
| `verifiedHash`     | Boolean | Wenn der Hash korrekt verifiziert wurde, wird dieser Wert auf „true“ gesetzt, andernfalls auf „false“. |

Wenn ein Fehler aufgetreten ist, sind nur die folgenden Eigenschaften in der Antwort enthalten:

| Name               | Typ     | Beschreibung                                                                           |
|--------------------|---------|----------------------------------------------------------------------------------------|
| `error`            | Boolean | Wenn `true`, ist ein Fehler aufgetreten.                                               |
| `errorMessage`     | String  | Die Beschreibung des Fehlers, der aufgetreten ist.                                     |

:::info
Die Antwort kann mehr Daten enthalten, falls der [API-Debugging-Modus](./api_debug_mode) für ein Projekt aktiviert ist.
:::

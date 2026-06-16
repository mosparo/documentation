---
sidebar_position: 5
sidebar_label: Regelpakete
description: Mit der Regelpaket-API können Sie den Inhalt eines Regelpakets verwalten.
---

# Regelpakete

## `import`

**Methode**: POST<br />
**Endpunkt**: /api/v1/rule-package/import<br />
**Content-Type**: application/json (Payload als JSON-String im Request Body)

Die Import-API-Route importiert den Inhalt des angegebenen Regelpakets in das angegebene Regelpaket. Der Inhalt des Regelpakets muss den Spezifikationen für mosparo-Regelpakete entsprechen.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC-SHA256-Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

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

| Name                 | Typ    | Erforderlich | Beschreibung                                                                                                                              |
|----------------------|--------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `rulePackageId`      | String | Erforderlich | Die ID des Regelpakets, in das der Inhalt importiert werden soll. Dabei muss es sich um ein Regelpaket vom Typ "Manuell über API" handeln. |
| `rulePackageContent` | String | Erforderlich | Der gesamte Inhalt des Regelpakets, der importiert werden soll.                                                                           |
| `rulePackageHash`    | String | Optional     | Der SHA256-Hashwert des Inhalts des Regelpakets.                                                                                          |

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
| `verifiedHash`     | Boolean | Wenn der Hash korrekt verifiziert wurde, wird dieser Wert auf "true" gesetzt, andernfalls auf "false". |

Wenn ein Fehler aufgetreten ist, sind nur die folgenden Eigenschaften in der Antwort enthalten:

| Name               | Typ     | Beschreibung                                                                           |
|--------------------|---------|----------------------------------------------------------------------------------------|
| `error`            | Boolean | Wenn `true`, ist ein Fehler aufgetreten.                                               |
| `errorMessage`     | String  | Die Beschreibung des Fehlers, der aufgetreten ist.                                     |

:::info
Die Antwort kann mehr Daten enthalten, falls der [API-Debugging-Modus](./api_debug_mode) für ein Projekt aktiviert ist.
:::

## `hash-index`

**Methode**: GET<br />
**Endpunkt**: /api/v1/rule-package/{id}/hash-index<br />
**Content-Type**: text/plain

Dieser Endpunkt gibt den gesamten Hash-Index eines Regelpakets zurück. Der Hash-Index setzt sich aus der UUID der Regel bzw. des Regeleintrages und dem Hash der Regel bzw. des Regeleintrages zusammen. Wenn Sie ein Regelpaket direkt über die API synchronisieren möchten, laden Sie zunächst den Hash-Index und prüfen Sie, welche Regeln bzw. Regeleinträge aktualisiert werden müssen.

Jede Zeile ist eine Regel oder ein Regeleintrag, daher müssen Sie die Antwort anhand eines Zeilenumbruchzeichens (`\n`) aufteilen.

Sobald das Ende erreicht ist, gibt der Endpunkt `###END` in einer neuen Zeile zurück. Wenn Sie diesen Code erhalten haben hast, können Sie den Index verarbeiten.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC-SHA256-Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Beispiel

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

### Anfrage

#### Argumente

| Name              | Typ     | Erforderlich | Beschreibung                                                                                                                                                                                                             |
|-------------------|---------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `offset`          | Integer | Optional     | Gibt an, an welcher Position der Endpunkt beginnen soll. Auf diese Weise können Sie eine Schleife verwenden und beispielsweise 100000 Elemente auf einmal laden und die zweite Anfrage mit dem Offset 100000 starten. |
| `maxItems`        | Integer | Optional     | Gibt dem Endpunkt an, wie viele Elemente Sie mit einer Anfrage erhalten möchten.                                                                                                                                         |

### Antwort

#### Beispiel

```text
cf164449-ea85-4312-bec0-ae551de90891::r/3fed3c117b45765b8d3e57744d18d266/115
2f51af01-eea7-4fe4-b7bb-5b41790b3a44::i/569bbb49eea5ca57dc109b5223fc210c/1552
9cecd7ca-bc68-4c48-8a82-fa3af5778be7::i/e73b0046cc24782de57f953c6bc3801a/1553
2f737ffe-ff20-4bcb-a3de-0a039b710b62::i/3fbf46288fd00219fb12b77ef39e46f8/1554
cc7e2cf4-6574-45fb-a9de-6beefd0d8180::i/846ee5b4b570c98b0da9d751cd14dba6/1555
752b0bff-8cb9-42eb-87bd-c5529a709107::i/3b97a60179e9bdb4b86f4508f983e92f/1556
```

#### Format

Das Ausgabeformat sieht wie folgt aus:

```
{uuid}::{type}/{hash}/{id}
```

| Merkmal | Beschreibung                                                                                                                                       |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `uuid`  | Die UUID der Regel oder des Regeleintrages, die pro Regelpaket eindeutig ist.                                                                      |
| `type`  | Entweder `r` für "Regel" oder `i` für "Regeleintrag".                                                                                              |
| `hash`  | Der Hashwert der Regel oder des Regeleintrages. Der Regel-Hash enthält keine Regeleinträge.                                                        |
| `id`    | Das ist die ID einer Regel oder eines Regeleintrages in der Datenbank. Diese ID wird verwendet, um die Regeln oder Regeleinträge zu aktualisieren. |

#### Fehler

Wenn das Regelpaket keinen Cache hat (das Regelpaket wurde nie in mosparo geladen), ist die Antwort ein einfaches JSON-Objekt, das wie folgt aussieht:

```json
{
  "result": false,
  "noCache": true
}
```

Der HTTP-Statuscode der Antwort lautet 205.

## `rules`

**Methode**: GET<br />
**Endpunkt**: /api/v1/rule-package/{id}/rules<br />
**Content-Type**: application/json

Wenn Sie eine Liste aller Regeln im Regelpaket abrufen möchten, können Sie diesen Endpunkt verwenden.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC-SHA256-Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Beispiel

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

### Anfrage

#### Argumente

| Name      | Typ     | Erforderlich | Beschreibung                                                                  |
|-----------|---------|--------------|-------------------------------------------------------------------------------|
| `page`    | Integer | Optional     | Legt die Seite fest, die Sie aus dieser Liste erhalten möchten.               |
| `perPage` | Integer | Optional     | Gibt dem Endpunkt an, wie viele Regeln Sie in einer Antwort erhalten möchten. |

### Antwort

#### Beispiel

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

#### Merkmale

Wenn mosparo die Anfrage erfolgreich ausgeführt hat, sind in der Antwort die folgenden Merkmale enthalten:

| Name         | Typ     | Beschreibung                                                                                         |
|--------------|---------|------------------------------------------------------------------------------------------------------|
| `result`     | Boolean | Gibt `true` zurück, wenn die Anfrage erfolgreich war, oder `false`, wenn ein Fehler aufgetreten ist. |
| `rules`      | Array   | Das Array enthält alle Regeln für diese Seite (siehe [Merkmale von `rules`](#merkmale-von-rules)).   |
| `page`       | Integer | Zeigt an, welche Seite Sie aufgerufen haben.                                                         |
| `totalPages` | Integer | Gibt an, wie viele Seiten Sie anfordern können.                                                      |

:::info
Die Antwort kann mehr Daten enthalten, falls der [API-Debugging-Modus](./api_debug_mode) für ein Projekt aktiviert ist.
:::

##### Merkmale von `rules`

| Name               | Typ     | Beschreibung                                                                                                   |
|--------------------|---------|----------------------------------------------------------------------------------------------------------------|
| `id`               | Integer | Die ID des Regel-Caches in mosparo.                                                                            |
| `uuid`             | Integer | Die UUID dieser Regel, die im Regelpaket angegeben wurde.                                                      |
| `type`             | Objekt  | Der Typ der Regel, zum Beispiel `word`.                                                                        |
| `name`             | String  | Der Name der Regel.                                                                                            |
| `description`      | String  | Die Beschreibung der Regel.                                                                                    |
| `numberOfItems`    | Integer | Gibt an, wie viele Einträge in dieser Regel vorhanden sind.                                                    |
| `spamRatingFactor` | Float   | Gibt den Faktor an, mit dem jeder Regeleintrag multipliziert werden soll, wenn der Regeleintrag übereinstimmt. |
| `updatedAt`        | String  | Der Zeitstempel, zu dem der Regel-Cache zuletzt aktualisiert wurde. Format: `Y-m-d\\TH:i:sP`                   |
| `listRoute`        | String  | URL zum Endpunkt, über den die Regeleinträge für diese Regel abgerufen werden können.                          | 

#### Fehler

Wenn das Regelpaket keinen Cache hat (das Regelpaket wurde nie in mosparo geladen), ist die Antwort ein einfaches JSON-Objekt, das wie folgt aussieht:

```json
{
  "result": false,
  "noCache": true
}
```

Der HTTP-Statuscode der Antwort lautet 205.

## `rule-items`

**Methode**: GET<br />
**Endpunkt**: /api/v1/rule-package/{id}/rules/{ruleId}/rule-items<br />
**Content-Type**: application/json

Wenn Sie die Liste der Regeleinträge einer Regel abrufen möchten, können Sie diesen API-Endpunkt verwenden.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC-SHA256-Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Beispiel

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

### Anfrage

#### Argumente

| Name      | Typ     | Erforderlich | Beschreibung                                                                         |
|-----------|---------|--------------|--------------------------------------------------------------------------------------|
| `page`    | Integer | Optional     | Legt die Seite fest, die Sie aus dieser Liste erhalten möchten.                      |
| `perPage` | Integer | Optional     | Gibt dem Endpunkt an, wie viele Regeleinträge Sie in einer Antwort erhalten möchten. |

### Antwort

#### Beispiel

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

#### Merkmale

Wenn mosparo die Anfrage erfolgreich ausgeführt hat, sind in der Antwort die folgenden Merkmale enthalten:

| Name         | Typ     | Beschreibung                                                                                                      |
|--------------|---------|-------------------------------------------------------------------------------------------------------------------|
| `result`     | Boolean | Gibt `true` zurück, wenn die Anfrage erfolgreich war, oder `false`, wenn ein Fehler aufgetreten ist.              |
| `ruleItems`  | Array   | Das Array enthält alle Regeleinträge für diese Seite (siehe [Merkmale von `ruleItems`](#merkmale-von-ruleitems)). |
| `page`       | Integer | Zeigt an, welche Seite Sie aufgerufen haben.                                                                      |
| `totalPages` | Integer | Gibt an, wie viele Seiten Sie anfordern können.                                                                   |

:::info
Die Antwort kann mehr Daten enthalten, falls der [API-Debugging-Modus](./api_debug_mode) für ein Projekt aktiviert ist.
:::

##### Merkmale von `ruleItems`

| Name     | Typ     | Beschreibung                                                       |
|----------|---------|--------------------------------------------------------------------|
| `id`     | Integer | Die ID des Regeleintrag-Caches in mosparo.                         |
| `uuid`   | Integer | Die UUID dieses Regeleintrages, die im Regelpaket angegeben wurde. |
| `type`   | String  | Der Typ des Regeleintrages, zum Beispiel `word`.                   |
| `value`  | String  | Enthält den Wert des Regeleintrages.                               |
| `rating` | Float   | Legt die Bewertung des Regeleintrages fest.                        |

#### Fehler

Wenn das Regelpaket keinen Cache hat (das Regelpaket wurde nie in mosparo geladen), ist die Antwort ein einfaches JSON-Objekt, das wie folgt aussieht:

```json
{
  "result": false,
  "noCache": true
}
```

Der HTTP-Statuscode der Antwort lautet 205.

## `batch`

**Methode**: POST<br />
**Endpunkt**: /api/v1/rule-package/{id}/batch<br />
**Content-Type**: application/json (Payload als JSON-String im Request Body)

Um Regeln oder Regelelemente hinzuzufügen, zu ändern oder zu löschen, können Sie den Batch-API-Endpunkt verwenden. Um das Regelpaket zu ändern, teilen Sie diesem API-Endpunkt mit, welche Änderungen vorgenommen werden sollen.

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC-SHA256-Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [base64 of <publicKey>:<hmacHash>]
```

#### Beispiel

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

### Anfrage

#### Argumente

| Name    | Typ    | Erforderlich | Beschreibung                                                                                                                            |
|---------|--------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `tasks` | Array  | Erforderlich | Ein Array von Objekten, das alle Aufgaben enthält, die der Endpunkt ausführen soll (siehe [Merkmale von `tasks`](#merkmale-von-tasks)). |

##### Merkmale von `tasks`

Jedes Aufgabenobjekt verfügt über die folgenden zwei Eigenschaften:

| Name   | Typ    | Erforderlich | Beschreibung                                                                                                                                                                           |
|--------|--------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | String | Erforderlich | Eine Zeichenfolge, die den Typ der Aufgabe angibt. Kann einer der folgenden Werte sein: `update_rule_package`, `store_rule`, `store_rule_item`, `remove_rule` oder `remove_rule_item`. |
| `data` | Objekt | Erforderlich | Ein Objekt, das alle Daten für die Aufgabe enthält. Die zulässigen Eigenschaften dieses Objekts finden Sie weiter unten unter [Aufgabentypen](#aufgabentypen).                         |

#### Aufgabentypen

##### `update_rule_package`

Aktualisiert die Informationen zum Regelpaket im Regelpaket-Cache.

Das `data`-Objekt enthält die folgenden Merkmale:

| Name              | Typ     | Erforderlich | Beschreibung                                                                                 |
|-------------------|---------|--------------|----------------------------------------------------------------------------------------------|
| `lastUpdatedAt`   | String  | Erforderlich | Der Zeitstempel, zu dem der Regel-Cache zuletzt aktualisiert wurde. Format: `Y-m-d\\TH:i:sP` |
| `refreshInterval` | Integer | Erforderlich | Legt die Zeit in Sekunden fest, nach der mosparo das Regelpaket erneut abrufen darf.         |

##### `store_rule`

Speichert (fügt hinzu oder aktualisiert) die Regel im Regelpaket-Cache

Das `data`-Objekt enthält die folgenden Merkmale:

| Name               | Typ    | Erforderlich | Beschreibung                                                                                                                                                                                |
|--------------------|--------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uuid`             | String | Erforderlich | Eine eindeutige Identifikationsnummer der Regel.                                                                                                                                            |
| `name`             | String | Erforderlich | Name der Regel.                                                                                                                                                                             |
| `description`      | String | Optional     | Beschreibung der Regel.                                                                                                                                                                     |
| `type`             | String | Erforderlich | Regeltyp (zum Beispiel: `word` oder `user-agent`).                                                                                                                                          |
| `spamRatingFactor` | Float  | Optional     | Bewertungsfaktor der Regel, um die Einträge der Regel zu verstärken oder abzuschwächen. Ein Wert grösser als 1.0 verstärkt die Einträge, ein Wert kleiner als 1.0 schwächt die Einträge ab. |

##### `store_rule_item`

Speichert (fügt hinzu oder aktualisiert) einen Regel-Eintrag im Regelpaket-Cache.

Das `data`-Objekt enthält die folgenden Merkmale:

| Name       | Typ    | Required     | Beschreibung                                                                                                                                           |
|------------|--------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ruleUuid` | String | Erforderlich | Die eindeutige Identifikationsnummer der Regel, zu der dieser Eintrag gehört.                                                                          |
| `uuid`     | String | Erforderlich | Eine Eindeutige Identifikationsnummer des Regel-Eintrags.                                                                                              |
| `type`     | String | Erforderlich | Definiert den Typ der Regel (zum Beispiel: `text` oder `regex`).                                                                                       |
| `value`    | String | Erforderlich | Der eigentliche Wert des Eintrags.                                                                                                                     |
| `rating`   | Float  | Optional     | Definiert den Spam-Wert des Eintrags. Dieser Wert wird mit dem Spam-Bewertungsfaktor multipliziert und ergibt das Bewertungsergebnis einer Einsendung. |

##### `remove_rule`

Löscht die angegebene Regel aus dem Regelpaket-Cache.

Das `data`-Objekt enthält die folgenden Merkmale:

| Name | Typ     | Erforderlich | Beschreibung                                                                                                                         |
|------|---------|--------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `id` | Integer | Erforderlich | Die ID der Regel in mosparo. Diese ID erhalten Sie entweder durch Abfrage des Hash-Indexes oder durch Laden der Regeln über die API. |

##### `remove_rule_item`

Löscht den angegebenen Regel-Eintrag aus dem Regelpaket-Cache.

Das `data`-Objekt enthält die folgenden Merkmale:

| Name | Typ     | Erforderlich | Beschreibung                                                                                                                                         |
|------|---------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id` | Integer | Erforderlich | Die ID des Regeleintrages in mosparo. Diese ID erhalten Sie entweder durch Abfrage des Hash-Indexes oder durch Laden der Regelelemente über die API. |

### Antwort

#### Beispiel

```json
{
  "result": true,
  "errors": []
}
```

#### Merkmale

Die Antwort des Endpunkts enthält die folgenden Merkmale:

| Name         | Typ     | Beschreibung                                                                                |
|--------------|---------|---------------------------------------------------------------------------------------------|
| `result`     | Boolean | Ist `true`, wenn der Endpunkt korrekt aufgerufen wurde und die Aufgaben verarbeiten konnte. |
| `errors`     | Array   | Enthält die Fehlermeldungen, die bei der Bearbeitung der Aufgaben aufgetreten sind.         |

:::info
Die Antwort kann mehr Daten enthalten, falls der [API-Debugging-Modus](./api_debug_mode) für ein Projekt aktiviert ist.
:::

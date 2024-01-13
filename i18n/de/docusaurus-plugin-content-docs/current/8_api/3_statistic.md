---
sidebar_position: 3
sidebar_label: Statistic
description: Mit der Statistik-API sind Sie in der Lage, die Zahlen zu Ihrem Projekt abzurufen.
---

# Statistic

## `by-date`

**Methode**: GET<br />
**Endpunkt**: /api/v1/statistic/by-date<br />

Gibt die genauen Zahlen zurück, wie viele Spam- und gültige Einsendungen Ihr Projekt in den letzten Tagen erhalten hat.

:::caution
Da mosparo die Einsendungen nach 14 Tagen löscht, liefert die Statistik-API nur die Daten der letzten 14 Tage.
:::

### Authentifizierung

Um den API-Endpunkt zu sichern, ist eine Authentifizierung erforderlich. Dazu muss der Header `Authorization` mit der Anfrage gesendet werden. In diesem Header muss der öffentliche Schlüssel des Projekts als Benutzername angegeben werden. Für das Passwort muss ein HMAC SHA256 Hash der API-Endpunkt-URL kombiniert mit den Anfragedaten, serialisiert als JSON, angegeben werden. Der private Schlüssel wird als Schlüssel für den HMAC-SHA256-Hash verwendet.

```http request
Authorization: [Base64 von <publicKey>:<hmacHash>]
```

#### Beispiel

```php
$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$privateKey = 'stH6Ugo4FcbQLp6_KPlOYltFMHfY59rxCUQRk3_AxYQ';
$apiEndpoint = '/api/v1/statistic/by-date';
$formData = [];

$hmacHash = hash_hmac('sha256', $apiEndpoint . json_encode($formData), $privateKey);
$authHeader = base64_encode($publicKey . ':' . $hmacHash);
```

```http request
Authorization: WFN0UU5ha0VpSmsxb01JWEo2X1J4bWQzajVnTmNRYWUzNG4xRzNhUjZGVTpRcWZCeHNtT2ZJTXcwLXVWTm5SVmREbE1VWmRMcFRHMXhvMHl5aWZ5THJJOmE3MmU1NmNiOTNiNzBhMWY3OWRjNmM4MDdkNGMwZmJmY2I4ZDEyMmE0NTg1MDkyOTllMmFjZGJiM2E2ZjFkZjI=
```

### Anfrage

#### Argumente

| Name        | Typ                        | Erforderlich | Beschreibung                                                                                                                                                               |
|-------------|----------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `range`     | Integer                    | Optional     | Die Anzahl der Sekunden, für die die Zahlen zurückgegeben werden sollen (`3600` gibt die Zahlen für die letzte Stunde zurück). Wenn nicht definiert, werden alle Daten der letzten 14 Tage verwendet. |
| `startDate` | Datum (Format: YYYY-MM-DD) | Optional     | Legt das Datum fest, ab dem mosparo die Statistik zurückgeben soll. Dies kann ein beliebiges Datum sein, aber mosparo wird nur die verfügbaren Daten zurückgeben (die Daten könnten bereits wieder gelöscht worden sein). _(Hinzugefügt in v1.1)_ |

### Antwort

#### Beispiel
```json
{
  "result":true,
  "data":{
    "numberOfValidSubmissions":5,
    "numberOfSpamSubmissions":7,
    "numbersByDate":{
      "2022-12-30":{
        "numberOfValidSubmissions":3,
        "numberOfSpamSubmissions":4
      },
      "2022-12-31":{
        "numberOfValidSubmissions":2,
        "numberOfSpamSubmissions":3
      }
    }
  }
}
```

#### Merkmale

Wenn die Anfrage erfolgreich abgeschlossen wurde, sind die folgenden Eigenschaften in der Antwort enthalten:

| Name             | Typ     | Beschreibung                                                                          |
|------------------|---------|---------------------------------------------------------------------------------------|
| `result`         | Boolean | Wenn die Anfrage erfolgreich war, wird die Eigenschaft `result` auf `true` gesetzt.   |
| `data`           | Object  | Enthält die statistischen Daten (siehe [Merkmale von `data`](#merkmale-von-data)). |

Wenn ein Fehler aufgetreten ist, sind nur die folgenden Eigenschaften in der Antwort enthalten:

| Name           | Typ     | Beschreibung                                       |
|----------------|---------|----------------------------------------------------|
| `error`        | Boolean | Wenn `true`, ist ein Fehler aufgetreten.           |
| `errorMessage` | String  | Die Beschreibung des Fehlers, der aufgetreten ist. |

##### Merkmale von `data`

| Name                       | Typ     | Beschreibung                                                                                                                               |
|----------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `numberOfValidSubmissions` | Integer | Die Anzahl der gültigen Einsendungen im ausgewählten Bereich (`range`).                                                                    |
| `numberOfSpamSubmissions`  | Integer | Die Anzahl der Einsendungen als Spam im ausgewählten Bereich (`range`).                                                                              |
| `numbersByDate`            | Objekt  | Enthält die statistischen Daten für jeden Tag im ausgewählten Bereich (`range`) (siehe [Merkmale von `numbersByDate`](#merkmale-von-numbersbydate)). |

##### Merkmale von `numbersByDate`

| Name                       | Typ     | Beschreibung                                         |
|----------------------------|---------|------------------------------------------------------|
| `numberOfValidSubmissions` | Integer | Die Anzahl der gültigen Einreichungen für das Datum. |
| `numberOfSpamSubmissions`  | Integer | Die Anzahl der Spam-Emissionen für das Datum.        |

:::info
Die Antwort kann mehr Daten enthalten, falls der [API-Debugging-Modus](./api_debug_mode) für ein Projekt aktiviert ist.
:::
---
sidebar_position: 4
sidebar_label: Health
description: Mit der Health-API können Sie den Zustand der mosparo-Installation überprüfen.
---

# Health

## `check`

**Methode**: GET<br />
**Endpunkt**: /api/v1/health/check

Diese API-Route prüft den Zustand von mosparo und gibt die Informationen zurück. Der Docker Healthcheck verwendet diese Route, um den Zustand des Docker-Containers zu prüfen. Die API kann aber auch mit anderen Überwachungswerkzeugen und Nicht-Docker-Installationen verwendet werden.

### Authentifizierung

Für diese API ist keine Authentifizierung erforderlich. Allerdings muss die IP-Adresse des Clients, der diese API anfordert, in der Umgebungsvariablen `MOSPARO_HEALTH_ALLOW_LIST` aufgeführt sein. Erfahren Sie mehr über die Umgebungsvariablen [hier](../installation/configure/environment_variables).

### Anfrage

#### Argumente

_Keine Argumente_

### Antwort

#### Statuscode

Wenn die Verbindung zur Datenbank nicht hergestellt werden konnte oder ein anderes Problem vorliegt, ist der Antwortcode der API `500`. Falls alles in Ordnung ist oder mosparo noch nicht installiert wurde, ist der Antwortcode der API `200`.

#### Beispiel
```json
{
  "service": "mosparo",
  "healthy": true,
  "databaseStatus": "connected",
  "error": null
}
```

#### Merkmale

| Name             | Typ     | Beschreibung                                                                                                                                                                                                                                                                                                  |
|------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `serivce`        | String       | Der antwortende Dienst. Im moment ist dies immer auf `mosparo` gesetzt.                                                                                                                                                                                                                                       |
| `healthy`        | Boolean      | Wenn alles in Ordnung ist, wird dies auf `true` gesetzt, ansonsten auf `false`.                                                                                                                                                                                                                               |
| `databaseStatus` | String       | Wenn die Datenbank verfügbar ist und die Verbindung erfolgreich war, wird dies auf `connected` gesetzt. Wenn beim Testen der Verbindung ein Fehler aufgetreten ist, wird dieser Wert auf `connection-failed` gesetzt. Wenn mosparo noch nicht installiert ist, wird dieser Wert auf `not-configured` gesetzt. |
| `error`          | String\|null | Wenn ein Fehler auftritt, enthält dies die Fehlermeldung. Ist kein Fehler aufgetreten, wird dies auf `null` gesetzt.                                                                                                                                                                                          |


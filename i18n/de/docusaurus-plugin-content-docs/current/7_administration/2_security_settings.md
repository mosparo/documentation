---
sidebar_position: 2
sidebar_label: Sicherheits-Einstellungen
description: Eine Übersicht über die verfügbaren Sicherheits-Einstellungen.
---

# Sicherheits-Einstellungen

## Login-Drosselung

Die Login-Drosselung hilft, die mosparo Login-Seite vor einem Brute-Force-Angriff zu schützen. Indem die Anzahl der Anfragen gezählt und ein Angreifer nach einigen Versuchen blockiert wird, ist ein solcher Angriff sehr zeitaufwändig und nahezu sinnlos.

### Verfügbare Einstellungen

| Name                                                | Standard-Wert | Beschreibung                                                                                                                             |
|-----------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Anzahl der Anfragen pro Benutzername und IP-Adresse | 5 Anfragen    | Damit wird die Anzahl der Anfragen festgelegt, die ein Benutzer von einer IP-Adresse für einen Benutzernamen stellen kann                |
| Anzahl der Anfragen für eine IP-Adresse             | 25 Anfragen   | Damit wird die Anzahl der Anfragen festgelegt, die ein Benutzer von einer IP-Adresse aus stellen kann (für alle Benutzernamen zusammen). |
| Zeitspanne                                          | 5 Minuten     | Damit wird die Zeit in Minuten angegeben, in der die Anzahl der Anfragen ausgewertet wird.                                               |

#### Erklärung

Die erste Regel blockiert den Benutzer, nachdem er versucht hat, sich mit einem Benutzernamen und fünf verschiedenen Kennwörtern anzumelden (5 Anfragen). Mit dem Standardwert von 25 Anfragen für eine IP-Adresse kann der Benutzer fünf Passwörter für fünf verschiedene Benutzernamen ausprobieren, um sich anzumelden, bevor er für beide Regeln gesperrt wird (5 Anfragen pro Benutzername und IP-Adresse, 25 Anfragen insgesamt pro IP-Adresse).

## Reverse Proxy

Konfigurieren Sie die folgenden Einstellungen für Ihren Reverse Proxy, falls Sie einen für den Betrieb von mosparo verwenden. Ein Reverse Proxy kann in verschiedenen Anwendungsfällen verwendet werden. Ein gutes Beispiel für einen Reverse Proxy ist beispielsweise ein Caching Server (zum Beispiel Varnish oder Cloudflare). Diese Einstellungen sind für mosparo vor allem wichtig, damit die IP-Adresse des Benutzers korrekt erkannt wird. Falls Sie die Reverse Proxy-Einstellungen in mosparo nicht konfigurieren, kann mosparo die IP-Adresse des Benutzers nicht korrekt erkennen.

### Verfügbare Einstellungen

| Name                                                             | Beschreibung                                                                                                                                                                                                                 |
|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Liste der vertrauenswürdigen Proxies                             | Damit mosparo nur den korrekten Reverse Proxies vertraut, müssen Sie die IP-Adressen aller Reverse Proxies in der Liste erfassen.                                                                                            |
| REMOTE_ADDR in die Liste der vertrauenswürdigen Proxies einfügen | Falls Ihr Reverse Proxy über eine vielzahl an IP-Adressen verfügt und/oder keine fixen IP-Adressen verwendet, können Sie mosparo mitteilen, alle Reverse Proxies zu akzeptieren. **Diese Einstellung kann gefährlich sein.** |
| Name der benutzerdefinierten Adress-Kopfzeile                    | Falls Ihr Reverse Proxy eine spezielle Kopfzeile für die Übermittlung der IP-Adresse verwendet, geben Sie bitte den Namen hier an.                                                                                           |
| Name der benutzerdefinierten Protokoll-Kopfzeile                 | Falls Ihr Reverse Proxy eine spezielle Kopfzeile für die Übermittlung des Protokolls verwendet, geben Sie bitte den Namen hier an.                                                                                           |

Mehr Informationen zur Konfiguration des Reverse Proxies finden Sie unter [Reverse Proxy](../installation/reverse_proxy).

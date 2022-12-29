---
sidebar_position: 3
sidebar_label: Konfiguration der Cronjobs
description: Mit Cronjobs werden automatische Arbeiten regelmässig ausgeführt.
---

# Konfiguration der Cronjobs

Nachdem die Installation von mosparo abgeschlossen ist, sollten Sie die Cronjobs einrichten, mit welchen mosparo verschiedene automatische Aktionen durchführt.

Wir empfehlen Ihnen, die folgenden Cronjobs zu konfigurieren:

```
13 */2 * * * php [mosparoPath]/bin/console mosparo:cleanup-database`
36 3 * * * php [mosparoPath]/bin/console mosparo:rulesets:refresh
```

Falls Sie GeoIP2 verwenden, konfigurieren Sie bitte folgenden Cronjob:

```
25 4 * * * php [mosparoPath]/bin/console mosparo:geoip2:download-database
```

Die Ausführungszeitpunkte können Sie frei wählen. Es wird jedoch empfohlen, die Bereinigung der Datenbank (`mosparo:cleanup-database`) mehrmals pro Tag auszuführen, während das Aktualisieren der Regel-Pakete sowie der GeoIP2-Datenbank nur einmal täglich sinnvoll ist.

Bitte ersetzen Sie `[mosparoPfad]` mit dem absoluten Pfad der mosparo-Installation. Dies kann je nach Hosting und Server-Typ variieren.

Falls notwendig, passen Sie ebenfalls die PHP Executable an. Es kann sein, dass auf Ihrem Hosting die Version mitgegeben werden muss oder ein anderer Pfad verwendet wird.

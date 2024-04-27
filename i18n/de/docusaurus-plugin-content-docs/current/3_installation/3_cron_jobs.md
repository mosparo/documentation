---
sidebar_position: 3
sidebar_label: Konfiguration der Cronjobs
description: Mit Cronjobs werden automatische Arbeiten regelmässig ausgeführt.
---

# Konfiguration der Cronjobs

Nachdem die Installation von mosparo abgeschlossen ist, sollten Sie die Cronjobs einrichten, mit denen mosparo verschiedene automatische Aktionen durchführt. Sie haben die Wahl zwischen der Ausführung der Befehle über die CLI oder den Web-Cronjob.

## CLI-Cronjobs

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

## Web-Cronjob

Sie können auch den Web-Cronjob verwenden, um diese Funktionen auszuführen, insbesondere wenn die Ausführung der CLI-Cronjobs nicht möglich ist, z.B. wegen deaktivierter PHP-Funktionen.

Um den Web-Cronjob zu nutzen, aktivieren Sie ihn bitte in der Administration von mosparo. Wählen Sie dazu in der Administrationsübersicht den Punkt „Cronjobs“ und aktivieren Sie die Checkbox auf der rechten Seite. Um den Cronjob sicherer zu machen, müssen Sie einen geheimen Schlüssel angeben. mosparo generiert automatisch einen Schlüssel, Sie können aber auch einen eigenen eingeben. Sie können auch die Wartezeit zwischen den Cronjob-Ausführungen und das GeoIP2-Aktualisierungsintervall einstellen (wenn Sie GeoIP2 aktiviert haben). Speichern Sie die Einstellungen, indem Sie auf die Schaltfläche am unteren Rand des Formulars klicken.

Nach dem Speichern sehen Sie auf der linken Seite die vollständige URL zum Web-Cronjob und ein Beispiel, wie Sie den Cronjob einrichten können. Bitte konfigurieren Sie den Cronjob auf dem Server, im Hosting-Control-Panel oder bei Ihrem Remote-Cronjob-Dienst entsprechend.

Um die Sicherheit des Cronjobs zu erhöhen, können Sie den Zugriff auf den Web-Cronjob auch in den Sicherheitseinstellungen in der Administration beschränken. Weitere Informationen dazu finden Sie [hier](../administration/security_settings#web-cronjob-zugriff).
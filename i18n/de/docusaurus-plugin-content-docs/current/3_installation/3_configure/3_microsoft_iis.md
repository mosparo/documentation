---
sidebar_position: 3
sidebar_label: Microsoft IIS
description: Um Microsoft IIS als Webserver für mosparo zu verwenden, müssen Sie einige Anpassungen in der Konfiguration vornehmen.
---

# Microsoft IIS

## Generelle Installation

Die Installation des Microsoft IIS und die Konfiguration von PHP für den Micorsoft IIS liegen ausserhalb des Rahmens dieser Dokumentation und werden daher hier nicht dokumentiert.

Die Installation von mosparo ist im Allgemeinen die gleiche wie die der anderen Webserver. Der einzige zusätzlich erforderliche Schritt ist die Konfiguration der Rewrite-Regeln.

## Rewrite-Regeln konfigurieren

Um mosparo auf einem Microsoft IIS Webserver laufen zu lassen, fügen Sie die folgende `web.config` Datei hinzu, um das korrekte URL-Rewriting zu gewährleisten.

Bitte fügen Sie den folgenden Inhalt in die Datei `web.config` im Verzeichnis `public` Ihrer mosparo-Installation ein.

```xml title="C:\inetpub\wwwroot\mosparo.example.com\public\web.config"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="URL Rewrite for mosparo" stopProcessing="true">
                    <match url="^(.*)$" ignoreCase="false" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="index.php" appendQueryString="true" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

Für die Rewrite-Regeln benötigen Sie das IIS URL Rewrite Module. Weitere Informationen über das Modul finden Sie hier: https://www.iis.net/downloads/microsoft/url-rewrite

Es ist nicht erforderlich, dass Sie die oben bereitgestellte `web.config` Datei verwenden. Sie können auch eine bestehende `web.config` Konfigurationsdatei im `public` Verzeichnis Ihrer mosparo Installation entsprechend erweitern.

## Bekannte Probleme

Mit Microsoft IIS als Webserver funktioniert (noch) nicht alles problemlos. Die folgenden Probleme sind bekannt, und wir werden versuchen, diese in Zukunft zu beheben:

- Um Downloads (Updates, GeoIP2-Datenbanken, Rulesets) mit mosparo zu ermöglichen, müssen Sie in den PHP-Einstellungen die CA-Datei für `curl` konfigurieren. Mehr Informationen dazu finden Sie hier: https://www.php.net/manual/en/curl.configuration.php
- Der Aktualisierungsprozess ist unter Microsoft IIS/Microsoft Windows im Vergleich zu Installationen unter Linux langsam. Der Hauptgrund dafür sind die Berechnungen der Hashes für die vorhandenen Dateien. Wir werden versuchen, dieses Problem in Zukunft zu beheben. Im Moment müssen Sie die `max_execution_time` in PHP und die `Activity Timeout` in den FastCGI-Einstellungen im IIS auf einen ausreichend hohen Wert erhöhen. In unseren Tests dauerte die Aktualisierung von mosparo mehr als 30 Sekunden, aber nicht mehr als 60 Sekunden, aber wir können diese Werte nicht garantieren. Alternativ ist es möglich, mosparo über den CLI-Befehl zu aktualisieren (`mosparo:self-update`, siehe [Update über Kommandozeile installieren](../update#update-über-kommandozeile-installieren))
---
sidebar_position: 1
sidebar_label: Voraussetzungen
description: Alle Voraussetzungen, welche erfüllt sein müssen, damit mosparo korrekt funktionieren kann.
---

# Voraussetzungen

Damit mosparo auf einem Server installiert werden kann, gibt es folgende Voraussetzungen, welche erfüllt sein müssen:

- Domain oder Subdomain in Ihrem Besitz
- maximal 100 MB freier Speicherplatz
- SSL-Zertifikat für die gewählte Domain oder Subdomain
- PHP 7.4 oder neuer
  :::caution
  Wenn Sie PHP 8.1 verwenden, müssen Sie mindestens 8.1.10 verwenden
  :::
- Folgende PHP-Erweiterungen:
  - ctype
  - iconv
  - intl
  - json
  - pdo
  - pdo_mysql
  - openssl
  - zip
  - posix (optional)
  - sodium (optional)
  - Zend OPCache (optional)
  - curl (optional)
- MySQL-Datenbank

## Verbindung zum Internet

Für das Herunterladen von Updates und Regel-Paketen ist eine funktionierende Internet-Verbindung erforderlich.

### Mit der `curl`-Erweiterung

Wenn Sie die `curl`-Erweiterung installiert haben, stellen Sie bitte sicher, dass die Funktionen `curl_exec` und `curl_mutli_exec` nicht auf die Liste der deaktivierten Funktionen hinzugefügt wurden. Wenn Sie die Funktionen aus Sicherheitsgründen zur Liste hinzugefügt haben, empfehlen wir Ihnen, die `curl`-Erweiterung komplett zu deaktivieren.

### Ohne die `curl`-Erweiterung

Bitte stellen Sie sicher, dass die Option `allow_url_fopen` in der PHP-Konfigurationsdatei (`php.ini`) auf den Wert `1` gesetzt ist. Ansonsten ist es PHP nicht erlaubt, eine Anfrage ins Internet zu senden.

### Zusätzliche Informationen

- In den mosparo Versionen vor 0.4 wird keine klare Fehlermeldung angezeigt, falls die Verbindung nicht korrekt hergestellt werden konnte. Wenn ein Fehler 500 angezeigt wird, wenn Sie prüfen, ob neue Updates vorhanden sind, stellen Sie sicher, dass die Einstellungen wie oben beschrieben korrekt sind.
- mosparo kann ohne externe Verbindung arbeiten. Fügen Sie in Ihrer PHP-Konfiguration für Ihren Webserver die Funktionen `curl_exec` und `curl_multi_exec` zu der Liste der deaktivierten Funktionen hinzu und setzen Sie die Option `allow_url_fopen` auf `0`. Stellen Sie sicher, dass die Funktionen sowie die Einstellung in Ihrer PHP-CLI-Konfiguration nicht gesetzt sind. Anschliessend können Sie mosparo mit dem CLI-Kommando aktualisieren. Das Aktualisieren der Regel-Pakete mit dem Cronjob wird mithilfe eines CLI-Prozesses ausgeführt und ist daher ebenfalls problemlos möglich.
- Bitte beachten Sie, dass an dem Ort, an dem Sie mosparo integrieren wollen (zum Beispiel Ihre WordPress-Website), eine Verbindung über das Internet möglich sein muss, damit die Integration mosparo kontaktieren kann. Die Option `allow_url_fopen` muss auf `1` gesetzt sein sowie die Funktionen `curl_exec` und `curl_multi_exec` dürfen nicht deaktiviert sein (sofern die `curl`-Erweiterung aktiv ist).
- Die `curl`-Erweiterung ist für mosparo nicht zwingend erforderlich. mosparo kann Dateien mit der Standard-PHP-Funktionalität herunterladen. Wenn Sie die `curl`-Erweiterung aktivieren, aber die Funktionen `curl_exec` und `curl_multi_exec` deaktivieren, wird mosparo versuchen, die `curl`-Erweiterung zu verwenden. Da die Funktionen jedoch blockiert sind, wird ein Fehler auftreten. Wir empfehlen daher, dass Sie entweder die `curl`-Erweiterung nicht aktivieren oder die Funktionen nicht blockieren.

:::info
In der Version 0.4 von mosparo werden wir eine entsprechende Prüfung im Installations-Prozess einbauen, welche eine Warnung anzeigt, falls die Konfiguration von PHP einen Download von Updates sowie von Regel-Paketen nicht erlauben sollte. Zusätzlich werden alle Funktionen, welche einen funktionierenden Download benötigen, so angepasst, dass zuerst geprüft wird, ob eine Verbindung möglich ist. Es wird ebenfalls eine bessere Warnung angezeigt, falls der Download aufgrund der Einstellungen nicht möglich sein sollte.
:::

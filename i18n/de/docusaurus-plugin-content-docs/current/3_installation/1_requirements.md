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
- PHP 8.1.10 oder neuer
- Folgende PHP-Erweiterungen:
  - ctype
  - curl
  - dom
  - filter
  - gd
  - iconv
  - intl
  - json
  - libxml
  - openssl
  - pcre
  - pdo
  - pdo_mysql
  - simplexml
  - tokenizer
  - xml
  - zip
  - posix (optional)
  - sodium (optional)
  - Zend OPCache (optional)
- MySQL-Datenbank

## Verbindung zum Internet

Für das Herunterladen von Updates und Regel-Paketen ist eine funktionierende Internet-Verbindung erforderlich.

mosparo selber arbeitet ohne externe Verbindung. Um die Sicherheit zu erweitern, fügen Sie in Ihrer PHP-Konfiguration für Ihren Webserver die Funktionen `curl_exec` und `curl_multi_exec` zu der Liste der deaktivierten Funktionen hinzu und setzen Sie die Option `allow_url_fopen` auf `0`. Stellen Sie sicher, dass die Funktionen sowie die Einstellung in Ihrer PHP-CLI-Konfiguration nicht gesetzt sind. Anschliessend können Sie mosparo mit dem CLI-Kommando aktualisieren. Das Aktualisieren der Regel-Pakete mit dem Cronjob wird mithilfe eines CLI-Prozesses ausgeführt und ist daher ebenfalls problemlos möglich.

Die Aktualisierung der GeoIP2-Datenbank ist nur mit der Erweiterung `curl` möglich.

Bitte beachten Sie, dass an dem Ort, an dem Sie mosparo integrieren wollen (zum Beispiel Ihre WordPress-Website), eine Verbindung über das Internet möglich sein muss, damit die Integration mosparo kontaktieren kann. Die Option `allow_url_fopen` muss auf `1` gesetzt sein sowie die Funktionen `curl_exec` und `curl_multi_exec` dürfen nicht deaktiviert sein (sofern die `curl`-Erweiterung aktiv ist).

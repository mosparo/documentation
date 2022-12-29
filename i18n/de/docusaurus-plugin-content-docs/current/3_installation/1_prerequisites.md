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
- MySQL-Datenbank

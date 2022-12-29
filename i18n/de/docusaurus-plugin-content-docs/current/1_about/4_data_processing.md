---
sidebar_position: 4
sidebar_label: Datenverarbeitung
description: Alle Informationen zum Thema der Datenverarbeitung.
---

# Datenverarbeitung

## Verarbeiten

mosparo verarbeitet nur die Daten, welche beim Überprüfen der Formulardaten übermittelt werden. Das umfasst

- Die Adresse und der Titel der Website, auf welcher das Formular ausgefüllt wurde
- Alle Daten, welche in den Formularfeldern vom Benutzer eingegeben wurden
- Die IP-Adresse sowie den User-Agent des Benutzers
- Die AS-Nummer sowie das Land der IP-Adresse, sofern GeoIP2 aktiviert ist

## Speichern

Alle persönlichen Daten, welche zu einer Einsendung gespeichert wurden, werden automatisch verschlüsselt. Falls jemand unerlaubt Zugriff auf die Datenbank von mosparo erhalten sollte, kann dieser zwar alle Einsendungen sehen, aber nicht welche Daten dazu eingegeben wurden, da die Daten verschlüsselt sind.

An gewissen Stellen wird die IP-Adresse des Benutzers nicht verschlüsselt gespeichert. Um die Sicherheitsmassnahmen zu ermöglichen, ist es wichtig, dass das System nach der IP-Adresse suchen kann. Die nicht-verschlüsselten IP-Adressen werden jedoch als Hash gespeichert und sind nicht mehr direkt erkennbar.

Weitere Daten, welche nichts mit den Einsendungen zu tun haben (zum Beispiel Benutzerkontos, Einstellungen, Regeln) werden nicht verschlüsselt gespeichert.

## Löschen

Alle Einsendungen werden nach 14 Tagen als veraltet betrachtet. Sobald das nächste Mal eine Systembereinigung ausgeführt wird, werden alle veralteten Daten automatisch gelöscht. Eine Systembereinigung wird entweder automatisch beim Öffnen eines Formulars (Anfordern eines Einsende-Codes), beim Benutzen von mosparo oder automatisch durch die Bereinigungsaktion ausgeführt. Die automatische Bereinigungsaktion muss jedoch als Cronjob manuell konfiguriert werden.

Einsende-Codes (und damit die dafür verwendete IP-Adresse), welche nicht verwendet wurden, werden nach 24 Stunden als veraltet betrachtet und bei der nächsten Systembereinigung gelöscht.

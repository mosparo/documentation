---
sidebar_position: 7
sidebar_label: Updates
description: Erfahren Sie mehr über das Update-Web-Interface.
---

# Updates

mosparo hat ein Update-System, welches Ihnen hilft, die neuste Version von mosparo zu installieren.

## Update-Kanal wählen

Wenn Sie neue Versionen von mosparo testen möchten, bevor sie veröffentlicht werden, können Sie den Update-Kanal auf `Entwicklung` oder `Beta` umstellen.

Der Update-Kanal `Beta` enthält Beta-Versionen der aktuellen stabilen Hauptversion von mosparo, während der Update-Kanal `Entwicklung` Testversionen der nächsten Hauptversion enthält.

:::caution
Bitte beachten Sie, dass die Versionen im Kanal `Entwicklung` und `Beta` nicht für den produktiven Betrieb gedacht sind und Fehler enthalten können.
:::

:::info
Falls beim Prüfen auf neue Updates ein Fehler auftritt, kann es sein, dass keine Verbindung mit dem Internet möglich ist. Bitte prüfen Sie die Hinweise in den [Voraussetzungen](../installation/requirements#verbindung-zum-internet).
:::

## Update für mosparo installieren

Erfahren Sie mehr über das Installieren eines Updates für mosparo in [Update für mosparo installieren](../installation/update).

## Automatische Update-Prüfung

Mit der Version 0.4 führt mosparo einmal am Tag eine automatische Update-Prüfung durch. Wenn ein Update verfügbar ist, sehen Sie einen orangefarbenen Button im Header von mosparo. 

:::info
mosparo installiert das Update nicht automatisch. Sie müssen das Update manuell starten.
:::

Wenn Sie diese automatische Prüfung nicht wünschen, können Sie sie durch Setzen der Umgebungsvariablen abschalten.

Um die automatische Prüfung zu deaktivieren, erstellen Sie bitte die Datei `.env.local` im Hauptverzeichnis von mosparo und setzen Sie die Variable `MOSPARO_AUTOMATIC_UPDATE_CHECK_ENABLED` auf `0`. Sie können auch die Datei `.env.local.dist` kopieren oder umbenennen und den Wert der Variable darin anpassen.
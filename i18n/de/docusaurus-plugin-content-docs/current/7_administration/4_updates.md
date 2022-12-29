---
sidebar_position: 4
sidebar_label: Updates
description: Um mosparo zu aktualisieren, stehen Ihnen zwei Möglichkeiten zur Verfügung.
---

# Updates

mosparo verfügt über ein Update-System, welches Ihnen hilft, die neueste Version von mosparo zu installieren. Wenn Sie neue Versionen von mosparo testen möchten, bevor sie veröffentlicht werden, können Sie den Update-Kanal auf “Entwicklung” umstellen.

:::caution
Bitte beachten Sie, dass die Versionen im Kanal “Entwicklung” nicht für den produktiven Betrieb gedacht sind und Fehler enthalten können.
:::

## Update über Webinterface installieren

Um zu prüfen, ob eine neue Version verfügbar ist, klicken Sie bitte auf die Schaltfläche “Nach Updates suchen”. mosparo nimmt anschliessend mit dem mosparo Update-Service Verbindung auf und ruft die aktuellen Versionsinformationen ab. Anschliessend wird ermittelt, ob die installierte Version älter als die neueste verfügbare Version ist. Ist das der Fall, wird Ihnen eine zusätzliche Schaltfläche “Update installieren” angezeigt, mit dem Sie mosparo aktualisieren können.

:::warning
mosparo erstellt **kein** Backup der Konfiguration oder der Datenbank, bevor die neue Version installiert wird. Bitte stellen Sie sicher, dass Sie ein Backup von mosparo und der Datenbank erstellt haben, bevor Sie mit dem Update fortfahren.
:::

Nachdem Sie die Schaltfläche “Update installieren” betätigt haben, wird der automatische Update-Prozess ausgeführt. mosparo lädt die gewählte Version herunter, entpackt das Archiv, kopiert die Dateien und führt weitere Verifizierungs- und Update-Aktionen aus. Nachdem die neue Version installiert wurde, sehen Sie eine entsprechende Meldung. Klicken Sie auf die angezeigte Schaltfläche, um das Update abzuschliessen.

Bevor Sie mosparo zum ersten Mal nach einem Update verwenden können, wird sichergestellt, dass der Zwischenspeicher erneuert wird, bevor Sie mosparo benutzen. Sie sehen diese Meldung auch wenn Sie mosparo manuell aktualisieren.

## Update über Kommandozeile installieren

Wenn Sie möchten, können Sie das Update auch über die Kommandozeile zum Beispiel per SSH installieren.

Wechseln Sie dazu in das Verzeichnis Ihrer mosparo-Installation und führen Sie folgenden Befehl aus:

```
php bin/console mosparo:self-update
```

Folgen Sie den Anweisungen des Kommandos. Passen Sie ggf. die PHP Executable Ihrem System an.

:::warning
mosparo erstellt **kein** Backup der Konfiguration oder der Datenbank, bevor die neue Version installiert wird. Bitte stellen Sie sicher, dass Sie ein Backup von mosparo und der Datenbank erstellt haben, bevor Sie mit dem Update fortfahren.
:::
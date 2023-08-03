---
sidebar_position: 4
sidebar_label: Update für mosparo installieren
description: Es gibt drei Möglichkeiten, ein Update für mosparo zu installieren.
---

# Update für mosparo installieren

## Update über Webinterface installieren

Als Administrator einer mosparo Installation, können Sie das Update-Webinterface in der Administrationsoberfläche öffnen (erfahren Sie mehr über [Updates](../administration/updates)).

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

## Update manuell installieren

Sie können ein Update für mosparo auch manuell installieren. Dafür laden Sie bitte die neuste Version von der mosparo Website herunter, extrahieren das Archiv und laden die Dateien in Ihr mosparo Verzeichnis hoch.

Wir empfehlen Ihnen, ein Backup der Datei `config/env.mosparo` zu erstellen, da in der Datei der Verschlüsslungsschlüssel gespeichert ist. Wenn Sie diesen verlieren können die Daten von mosparo nicht mehr entschlüsselt werden.

Nach dem Sie alle Dateien hochgeladen haben, müssen Sie folgende Befehle ausführen, um das Update abzuschliessen:

```
php bin/console cache:clear
php bin/console doctrine:migrations:migrate
```
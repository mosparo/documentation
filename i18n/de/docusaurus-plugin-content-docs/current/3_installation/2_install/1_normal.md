---
sidebar_position: 2
sidebar_label: Normale Installation
description: Laden Sie das Paket herunter und installieren Sie mosparo in 6 einfachen Schritten.
---

# Normale Installation

Um mosparo auf Ihrem Webhosting zu installieren, können Sie das von uns bereitgestellte Archiv verwenden.

1. Laden Sie die neueste Version von mosparo von [unserer Website](https://mosparo.io/releases/) oder von der [Release-Seite auf GitHub](https://github.com/mosparo/mosparo/releases) herunter.
2. Entpacken Sie die heruntergeladene Datei
3. Erstellen Sie eine neue Website in Ihrem Hosting Control Panel (zum Beispiel für eine Domain example.com oder für eine Subdomain mosparo.example.com)
   1. Wenn möglich, setzen Sie das öffentliche Verzeichnis der Website (Document Root) auf das Unterverzeichnis `/public`
   2. Fügen Sie der Website ein SSL-Zertifikat hinzu oder aktivieren Sie Lets Encrypt, falls das in Ihrem Hosting Control Panel verfügbar ist
4. Laden Sie alle entpackten Dateien in das Verzeichnis dieser Website hoch
   - macOS/Linux: Bitte beachten Sie auch die versteckten Dateien (zum Beispiel `.env`). Sie müssen alle Dateien hochladen, auch die versteckten.
5. Öffnen Sie Ihren Browser und greifen Sie auf die Website zu (zum Beispiel über die Domain `example.com` oder `mosparo.example.com`)
   - Sollten beim Zugriff auf mosparo Probleme auftreten, lesen Sie bitte die Tipps zur Fehlerbehebung unterhalb.
6. Folgen Sie dem Installations-Assistenten, um mosparo zu installieren

:::info
Wenn Sie das mosparo Docker-Image mit einer MySQL- oder PostgreSQL-Datenbank in einem Container verwenden, verwenden Sie bitte den Namen dieses Containers als Datenbank-Host.
:::

## Fehlerbehebung

### Falls Sie keinen Zugriff auf mosparo haben

Falls Sie nach dem Hochladen der Dateien in Schritt 5 nicht auf Mosparo zugreifen können, finden Sie hier einige mögliche Gründe dafür, warum es nicht funktioniert. Falls Sie einen anderen Fehlercode erhalten haben oder ein Problem gelöst haben, teilen Sie uns dies bitte in den [GitHub-Diskussionen](https://github.com/orgs/mosparo/discussions/categories/problems-issues) mit, damit wir diese Liste hier aktualisieren und es anderen erleichtern können.

### 403 Forbidden

Falls Ihre mosparo-Installation auf einem cPanel-Webhosting gehostet wird, überprüfen Sie bitte, ob der Inhaber des Verzeichnisses „public“ korrekt gesetzt ist. Der Inhaber sollte identisch mit dem Inhaber des Verzeichnisses sein, in das Sie die mosparo-Dateien hochgeladen haben (in der Regel sollte dies „ihrbenutzer:nobody“ sein).

### 500 Internal Server Error

Wenn Sie den Statuscode 500 oder eine Fehlermeldung wie „Internal server error“ sehen, liegt das Problem höchstwahrscheinlich an einem der beiden folgenden Gründe:

- Ihr SCP-/FTP-Client hat nicht alle Dateien korrekt hochgeladen, sodass einige Dateien Ihrer Mosparo-Installation fehlen. Um zu überprüfen, ob dies die Ursache ist, können Sie die Grösse der hochgeladenen Dateien überprüfen und mit den Dateien im entpackten Verzeichnis vergleichen. Andernfalls können Sie alle Dateien im selben Verzeichnis erneut hochladen, wodurch die fehlenden Dateien hochgeladen werden sollten. Je nach Webhosting können Sie auch die vollständige ZIP-Datei hochladen und dort entpacken. Dies ist in der Regel im Web-Dateimanager für cPanel- oder Plesk-Webhosting (sowie einigen anderen) sowie in einigen SCP-Clients möglich.
- Wenn Sie sicher sind, dass alle Dateien hochgeladen wurden, sehen Sie sich bitte die Protokolldatei im Mosparo-Verzeichnis an. Sie finden die Protokolldatei unter `var/log/` in Ihrem Mosparo-Verzeichnis. Die Datei heisst `prod-YYYY-MM-DD.log`, wobei YYYY-MM-DD durch das Datum ersetzt wird, an dem die Protokolldatei erstellt wurde. Wenn Sie eine solche Datei nicht finden können, überprüfen Sie bitte das Fehlerprotokoll Ihres Webhosting. In diesem Fall (wenn Sie keine Protokolldatei sehen können) fehlt höchstwahrscheinlich eine PHP-Erweiterung. Bitte überprüfen Sie die Anforderungen und stellen Sie sicher, dass alle erforderlichen Erweiterungen verfügbar sind.

Sollten Sie keine Lösung für dieses Problem finden, zögern Sie bitte nicht, uns in den [GitHub-Diskussionen](https://github.com/orgs/mosparo/discussions/categories/problems-issues) mehr darüber zu berichten.
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
5. Öffnen Sie Ihren Browser und greifen Sie auf die Website zu (zum Beispiel über die Domain `example.com` oder `mosparo.example.com`)
6. Folgen Sie dem Installations-Assistenten, um mosparo zu installieren

:::info
Wenn Sie das mosparo Docker-Image mit einer MySQL- oder PostgreSQL-Datenbank in einem Container verwenden, verwenden Sie bitte den Namen dieses Containers als Datenbank-Host.
:::

---
sidebar_position: 3
sidebar_label: GeoIP2
description: Erfahren Sie, wie Sie GeoIP2 konfigurieren können.
---

# GeoIP2

Wenn ein Benutzer ein Formular aufruft, wird mosparo die IP-Adresse dieses Benutzers übermittelt. Die IP-Adresse ist aber nur eine Kombination von Zahlen (und Buchstaben bei IPv6), welche so direkt fast keine Informationen über die Herkunft hergeben.

Um trotzdem zu wissen, woher ein Benutzer kommt, gibt es Datenbanken, mit welchen die IP-Adresse einem Land und einem Anbieter zugeordnet werden kann.

:::info
Theoretisch ist eine genauere Zuordnung bis auf die Stadt möglich, jedoch verwendet mosparo nur maximal die Länder- und Anbieter-Datenbank.
:::

Damit mosparo die GeoIP2-Datenbank verwenden kann, brauchen Sie einen Lizenzschlüssel. Einen kostenlosen Lizenzschlüssel können Sie auf der Website von MaxMind anfordern: https://dev.maxmind.com/geoip/geolite2-free-geolocation-data

Falls Sie noch keinen Account haben, erstellen Sie zuerst einen Account. Anschliessend fordern Sie einen Lizenzschlüssel für GeoLite2 an. Fügen Sie den Lizenzschlüssel im Feld in mosparo ein und betätigen Sie die Schaltfläche “Speichern”.

Sie können anschliessend auf der rechten Seite die Schaltfläche “Datenbank herunterladen” betätigen, um die Datenbank herunterzuladen. Falls alles korrekt funktioniert hat, sehen Sie anschliessend eine Meldung, dass GeoIP2 verfügbar ist. Zusätzlich wird der Aktualisierungszeitpunkt der Datenbanken angezeigt.

:::info
Falls Sie den Lizenzschlüssel neu angefordert hat, dauert es eine gewisse Zeit, bis der Lizenzschlüssel von mosparo verwendet werden kann. Es kann daher sein, dass beim Herunterladen der Datenbank eine Fehlermeldung angezeigt wird. Warten Sie in diesem Fall ein paar Minuten und versuchen Sie es erneut.
:::

Wir empfehlen Ihnen, die automatische Aktualisierung mithilfe des Cronjobs einzurichten (siehe [Konfiguration der Cronjobs](../installation/cron_jobs/)).

:::caution
Bitte beachten Sie, dass die Datenbank keine genaue und garantierte Methode zur Lokalisierung eines Benutzers ist. Wenn Sie GeoIP2 verwenden, um Länder zu blockieren, sollten Sie beachten, dass Sie auch gute Benutzer blockieren könnten.
:::

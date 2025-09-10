---
sidebar_position: 6
sidebar_label: Bereinigungsstatistik
description: Die Bereinigungsstatistik gibt einen Überblick darüber, wann mosparo die Datenbank bereinigt hat.
---

# Bereinigungsstatistik

Eine der Hauptfunktionen von mosparo ist die automatische Bereinigung der Datenbank. Dieser Prozess löscht die vom Benutzer übermittelten Daten nach 14 Tagen automatisch. Die Bereinigungsstatistik gibt dem Administrator einen Überblick darüber, wann der Bereinigungsprozess ausgeführt wurde, wie viele Daten gelöscht wurden und wie lange dies gedauert hat.

Die Spalte `Ausführender` gibt Auskunft darüber, wie der Prozess gestartet wurde. Wenn der Executor `Frontend-API` ist, bedeutet dies, dass der Bereinigungsprozess ausgeführt wird, wenn ein Benutzer ein Formular öffnet, in das mosparo integriert ist. `Bereinigungsbefehl` hingegen bedeutet, dass der Bereinigungsprozess über den CLI-Befehl ausgeführt wurde, beispielsweise durch einen Cron-Job.

Die Spalten `Einsende-Codes` und `Einsendungen` geben die Anzahl der Objekte an, die mosparo enthält, und die Menge, die bei dieser Bereinigung gelöscht wurde (die roten negativen Zahlen).

Die Spalte `Ausführungsdauer` zeigt, wie lange der Bereinigungsprozess gedauert hat, und die Spalte `Status` gibt den Status des Bereinigungsprozesses an. Wenn die Bereinigung abgeschlossen ist, wird die nächste reguläre Bereinigung nach mindestens 6 Stunden ausgeführt. Wenn der Status `Unvollständig` ist, wird die nächste Bereinigung in 10 Minuten ausgeführt. Ein unvollständiger Bereinigungsprozess bedeutet, dass ein Limit erreicht wurde, typischerweise nur, wenn die Frontend-API den Bereinigungsprozess ausführt, und dass weitere Daten gelöscht werden müssen.
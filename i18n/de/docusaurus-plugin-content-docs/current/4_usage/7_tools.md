---
sidebar_position: 7
sidebar_label: Werkzeuge
description: Die Werkzeuge unterstützen Sie bei der Benutzung von mosparo.
---

# Werkzeuge

## Regel-Tester

Mit dem Regel-Tester können Sie testen, wie die erfassten Regeln funktionieren und ob die Regeln Spam erkennen oder nicht.

Geben Sie den zu testenden Wert im Feld "Test-Wert" ein. Wählen Sie anschliessend, um welchen Typ von Feld bzw. Wert es sich handelt. Gewisse Regelarten werden nur auf gewisse Feldtypen angewendet. Zusätzlich können Sie auswählen, ob Regel und Regel-Pakete für den Test verwendet werden sollen (oder nur zum Beispiel Regel-Pakete).

Sobald Sie die gewünschten Einstellungen vorgenommen haben, können Sie den Test mit einem Klick auf die Schaltfläche "Testen" starten.

Nachdem der Test durchgeführt wurde, sehen Sie das Test-Resultat. Neben den eingegebenen Test-Daten wird angezeigt, ob die Eingabe als Spam gewertet wird, wie viele Punkte dafür berechnet wurden und was der Grenzwert ist. Zusätzlich sehen Sie eine Liste aller Regeln, die mit dem eingegebenen Test-Wert übereinstimmen.

## Exportieren

Mit der Exportieren-Funktion können Sie die Einstellungen eines mosparo Projektes in ein anderes Projekt (ggf. in einer anderen mosparo Installation) übertragen.

Um einen Export zu starten, wählen Sie, welche Daten Sie exportieren möchten. Die Haupteinstellungen beinhalten den Namen, die Beschreibung, die Hosts sowie den Spam-Score eines Projektes. Die Darstellungs- sowie Sicherheitseinstellungen enthalten die jeweiligen spezifischen Einstellungen. Wenn Sie die Regeln oder Regel-Pakete anwählen, werden alle erfassten Regeln bzw. Regel-Pakete exportiert.

Nachdem Sie Ihre Auswahl getroffen haben, können Sie den Export mit einem Klick auf die Schaltfläche "Exportieren" starten. Sie erhalten eine JSON-Datei, welche die gewählten Daten Ihres Projektes beinhalten.

:::info
Sensible Daten wie Einsendungen, Einsendecodes, die eindeutige Projekt-ID (UUID), die API-Schlüssel oder die Projektmitglieder werden nicht exportiert.
:::

## Importieren

Mit der Importieren-Funktion können Sie die Einstellungen eines anderen mosparo Projektes in Ihr Projekt installieren. Sie benötigen dafür eine Export-Datei, welche mit der [Exportieren-Funktion](#exportieren) erstellt wurde (oder das gleiche Schema verwendet). 

Um die Datei zu importieren, wählen Sie die Datei im vorgesehen Feld aus und wählen Sie anschliessend, welche Daten Sie importieren möchten. Sie können hier alle möglichen Bereiche anwählen, auch wenn diese eventuell in der Datei nicht vorhanden sind.

Die Einstellungen (Haupt-, Darstellungs- sowie Sicherheitseinstellungen) werden immer überschrieben.

Falls Sie möchten, dass die Regeln importiert werden, müssen Sie zusätzlich auswählen, wie mosparo mit bereits existierenden Regeln umgehen soll. mosparo kann entweder die vorhandenen Regeln überschreiben (Modus Überschreiben), die vorhandenen Regel-Einträge aktualisieren bzw. zusätzliche Regel-Einträge hinzufügen (Modus Anfügen), oder die bestehenden Regeln als neue Regel mit einer neuen Identifikationsnummer hinzufügen (Modus Hinzufügen).

Regel-Pakete werden über die Adresse (URL) gesucht. Falls Sie bereits ein Regel-Paket mit der gleichen Adresse erfasst haben, wird das Regel-Paket aktualisiert.

:::info
Beim Importieren werden keine Regeln oder Regel-Pakete gelöscht. Beim Modus "Überschreiben" können Regel-Einträge gelöscht werden.
:::

Klicken Sie anschliessend auf "Import simulieren". mosparo wird die Datei hochladen, validieren und anschliessend ermitteln, welche Einstellungen geändert werden müssen. In der darauffolgenden Übersicht sehen Sie, welche Änderungen notwendig sind. Wenn die Änderungen für Sie in Ordnung sind, können Sie sie mit einem Klick auf die Schaltfläche "Änderungen ausführen" ausführen.
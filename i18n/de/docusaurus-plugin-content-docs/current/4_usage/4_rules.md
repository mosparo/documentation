---
sidebar_position: 4
sidebar_label: Regeln
description: Lernen Sie, wie Sie in mosparo Regeln erstellen und verwalten können.
---

# Regeln

Mit Hilfe von Regeln erkennt mosparo, ob es sich bei einer Einsendung um Spam oder um eine gültige Einsendung handelt. Für jede Regel muss ein Regeltyp gewählt werden. Innerhalb einer Regel können beliebig viele Einträge erstellt werden, welche immer auf dem selben Regeltyp basieren. Eine Regel wird immer pro Projekt erfasst und kann nicht automatisch zwischen den Projekten ausgetauscht werden.

## Erstellen einer Regel

:::tip
Bevorzugen Sie ein Video, anstatt einen Text zu lesen? Sehen Sie sich unser HowTo über das Erstellen einer Regel auf [YouTube](https://www.youtube.com/watch?v=LKv9uzlkrhU) an.
:::

Um eine Regel zu erstellen, wählen Sie in der Navigation "Regeln" und anschliessend oben Rechts “Regel erstellen”. Danach wird eine Liste aller Regelarten angezeigt. Wählen Sie, mit welcher Regelart Sie eine Regel erstellen möchten.

Nachdem Sie einen Regeltyp ausgewählt haben, wird ein Feld angezeigt, in das Sie den Namen der Regel eingeben können. Geben Sie der Regel einen Namen, damit Sie bei der Verwaltung der Regeln einen besseren Überblick haben.

Nachdem Sie die Regel erstellt haben, wird der Regel-Editor angezeigt. Sie können im Feld „Beschreibung“ eine Beschreibung der Regel hinzufügen. Außerdem können Sie festlegen, ob die Regel aktiv oder inaktiv sein soll. Der Spam-Bewertungsfaktor erhöht oder verringert die Einträge in dieser Regel. Jeder Eintrag hat standardmäßig in der Regel den Wert 1. Der Spam-Bewertungsfaktor kann diesen Wert für alle Elemente erhöhen oder verringern.

Auf der rechten Seite können Sie die Elemente verwalten. Die Liste der Elemente ist eine bearbeitbare Tabelle. Sie können auf eine Zelle klicken, um den Wert zu bearbeiten. Je nach Regeltyp müssen Sie entweder einen Wert eingeben oder einen Wert aus der Liste auswählen (z. B. Unicode-Block). Bestimmte Regeltypen haben auch Untertypen, die Sie für jedes Element auswählen können (z. B. „Text“ und „Regulärer Ausdruck“ für den Regeltyp „Wort“).

Die Zellen mit orangefarbenem Hintergrund sind ungespeichert und werden nach einigen Sekunden automatisch gespeichert. Am unteren Rand des Bildschirms sehen Sie die Schaltfläche „Speichern“ sowie eine Übersicht über die Anzahl Ihrer ungespeicherten Änderungen.

Mit dem Kontrollkästchen am Anfang jeder Zeile können Sie mehrere Zeilen auswählen und dann über das Dropdown-Menü oberhalb der Tabelle die ausgewählten Elemente auf einmal löschen.

Um Elemente hinzuzufügen, können Sie entweder ein einzelnes Element oder mehrere Elemente hinzufügen. Wenn Sie mehrere Elemente auswählen, können Sie eine Liste mit Werten eingeben und diese auf einmal hinzufügen. Sie können auch einen Text oder eine CSV-Datei direkt in die Regel importieren. Wenn Sie die Importfunktion oder die Option zum Hinzufügen mehrerer Elemente auf einmal verwenden, wird während der Verarbeitung der Daten durch das System ein Overlay angezeigt. Wenn Sie das Fenster schließen, wird der Importvorgang angehalten. Bitte lassen Sie das Fenster geöffnet, bis auf dem Bildschirm angezeigt wird, dass der Vorgang abgeschlossen ist. Beim Importieren oder Hinzufügen mehrerer Elemente auf einmal überspringt der Importvorgang alle bereits vorhandenen Elemente.

Mit der Schaltfläche „Filter“ auf der rechten Seite können Sie die angezeigten Elemente filtern.

Das Feld "Bew." ("Bewertung") definiert den Spam-Wert eines Eintrags. Wenn das Feld leer ist, wird automatisch der Wert 1.0 verwendet. Sie können in diesem Feld jedoch einen numerischen Wert zwischen -1000000 und 1000000 eingeben. Wenn eine negative Zahl eingegeben wird, verringert sich die Anzahl der Punkte die eine Einsendung erhält. Siehe [Bewertungs-Beispiel](#bewertungs-beispiel)

Die Schaltfläche „Speichern“ am unteren Bildschirmrand speichert alle nicht gespeicherten Änderungen. In der Regel werden Änderungen nach einigen Sekunden in der Datenbank gespeichert. Ist dies jedoch nicht der Fall oder möchten Sie die Seite verlassen, können Sie die Schaltfläche verwenden, um die Änderungen manuell zu speichern.

Mit der Schaltfläche „Elemente exportieren“ am unteren Bildschirmrand können Sie einen CSV-Export Ihrer Regelelemente erstellen. Sie können die CSV-Datei später wieder importieren.

## Verwalten der Regeln

In der Verwaltung der Regeln finden Sie alle erfassten Regeln. Sie können weitere Regeln erstellen, in dem Sie oben rechts die Schaltfläche “Regel erstellen” verwenden.

In der Liste der Regeln sehen Sie den Namen der Regel, den Regeltyp und ob die Regel aktiv ist oder nicht. Sie können die vorhandenen Regeln bearbeiten oder löschen, falls eine Regel nicht mehr benötigt wird.

Mit dem Filter-Dropdown in der oberen rechten Ecke können Sie die Liste nach nur einer der Regelarten filtern.

Bevor eine Regel gelöscht wird, müssen Sie das Löschen der Regel bestätigen.

## Bewertungs-Beispiel

:::tip
Bevorzugen Sie ein Video, anstatt einen Text zu lesen? Sehen Sie sich unser HowTo über die Spam-Bewertung auf [YouTube](https://www.youtube.com/watch?v=mFcbiDDJl-A) an.
:::

Sie haben in mosparo zwei Regeln konfiguriert:

- Regel 1 ist eine Regel vom Typ _Wort_. Sie hat ein Element für das Wort `Medizin` mit einer Spam-Bewertung von `5.0`.
- Regel 2 ist eine Regel des Typs _Unicode Block_. Sie hat ein Element für den Unicode-Block `Emoticons` mit einer Spam-Bewertung von `-10.0`.

Wenn ein Beitrag den Text `Medizin 💊` enthält, ist die Bewertung `-5.0` (`= 5.0 + (-10.0)`) und damit unter dem konfigurierten Spam-Erkennungsminimum von `5.0` für dieses Projekt. mosparo wird die Einsendung nicht blockieren.
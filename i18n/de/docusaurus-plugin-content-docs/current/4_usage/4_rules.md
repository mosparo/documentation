---
sidebar_position: 4
sidebar_label: Regeln
description: Lernen Sie, wie Sie in mosparo Regeln erstellen und verwalten können.
---

# Regeln

Mit Hilfe von Regeln erkennt mosparo, ob es sich bei einer Einsendung um Spam oder um eine gültige Einsendung handelt. Für jede Regel muss ein Regeltyp gewählt werden. Innerhalb einer Regel können beliebig viele Einträge erstellt werden, welche immer auf dem selben Regeltyp basieren. Eine Regel wird immer pro Projekt erfasst und kann nicht automatisch zwischen den Projekten ausgetauscht werden.

## Erstellen von Regeln

Um eine Regel zu erstellen, wählen Sie in der Navigation "Regeln" und anschliessend oben Rechts “Regel erstellen”. Danach wird eine Liste aller Regelarten angezeigt. Wählen Sie, mit welcher Regelart Sie eine Regel erstellen möchten.

Nachdem Sie einen Regelart gewählt haben, sehen Sie die Bearbeitungsoberfläche einer Regel. Geben Sie der Regel einen Namen, damit Sie bei der Verwaltung der Regeln mehr Übersicht behalten.

Zusätzlich können Sie im Feld “Beschreibung” eine genauere Beschreibung der Regel eintragen. Ebenfalls können Sie wählen, ob die Regel aktiv oder inaktiv sein soll.

Der Spam-Bewertungsfaktor verstärkt oder verringert die Einträge in dieser Regel. Jeder Eintrag in der Regel hat standardmässig einen Wert von 1. Mit dem Spam-Bewertungsfaktor kann dieser Wert erhöht oder verringert werden.

Auf der rechten Seite können die Einträge erfasst werden. Fügen Sie je nach Regelart einen Wert ein oder wählen Sie einen Wert aus der Liste (zum Beispiel: Unicode-Block). Gewisse Regelarten haben zusätzlich Typen, welche Sie für jeden Eintrag wählen können (zum Beispiel: “Text” und “Regular Expression” bei der Regelart “Wort”).

Mit der Funktion “Mehrere Einträge hinzufügen” haben Sie die Möglichkeit, eine Liste von Einträgen mit wenigen Klicks zu erfassen. Sie können zum Beispiel eine Liste von Wörtern im Feld einfügen und mit einem Klick als Einträge erstellen lassen.

Das Feld "Bew." ("Bewertung") definiert den Spam-Wert eines Eintrags. Wenn das Feld leer ist, wird automatisch der Wert 1.0 verwendet. Sie können in diesem Feld jedoch einen numerischen Wert zwischen -1000000 und 1000000 eingeben. Wenn eine negative Zahl eingegeben wird, verringert sich die Anzahl der Punkte die eine Einsendung erhält. Siehe [Bewertungs-Beispiel](#bewertungs-beispiel)

Wenn ein Eintrag nicht mehr notwendig ist, können Sie den Eintrag mit dem Lösch-Symbol löschen. Der Eintrag wird aber erst gelöscht, wenn die Regel mit der Schaltlfäche unten rechts gespeichert wird.

## Verwalten der Regeln

In der Verwaltung der Regeln finden Sie alle erfassten Regeln. Sie können weitere Regeln erstellen, in dem Sie oben rechts die Schaltfläche “Regel erstellen” verwenden.

In der Liste der Regeln sehen Sie den Namen der Regel, den Regeltyp und ob die Regel aktiv ist oder nicht. Sie können die vorhandenen Regeln bearbeiten oder löschen, falls eine Regel nicht mehr benötigt wird.

Mit dem Filter-Dropdown in der oberen rechten Ecke können Sie die Liste nach nur einer der Regelarten filtern.

Bevor eine Regel gelöscht wird, müssen Sie das Löschen der Regel bestätigen.

## Bewertungs-Beispiel

Sie haben in mosparo zwei Regeln konfiguriert:

- Regel 1 ist eine Regel vom Typ _Wort_. Sie hat ein Element für das Wort `Medizin` mit einer Spam-Bewertung von `5.0`.
- Regel 2 ist eine Regel des Typs _Unicode Block_. Sie hat ein Element für den Unicode-Block `Emoticons` mit einer Spam-Bewertung von `-10.0`.

Wenn ein Beitrag den Text `Medizin 💊` enthält, ist die Bewertung `-5.0` (`= 5.0 + (-10.0)`) und damit unter dem konfigurierten Spam-Erkennungsminimum von `5.0` für dieses Projekt. mosparo wird die Einsendung nicht blockieren.
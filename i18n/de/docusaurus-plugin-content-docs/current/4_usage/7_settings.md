---
sidebar_position: 7
sidebar_label: Einstellungen
description: In den Projekteinstellungen können Sie das Projekt gemäss Ihren Wünschen anpassen.
---

# Einstellungen

## Allgemeine Einstellungen

In den allgemeinen Einstellungen können die wichtigsten Informationen zum Projekt bearbeitet werden.

| Feld                             | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name                             | Bezeichnung des Projektes                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Beschreibung                     | Beschreibung des Projektes                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Hosts                            | Damit die Anfragen korrekt beantwortet werden können, muss mosparo wissen, woher dieses Projekt verwendet wird. Dazu müssen alle Hosts erfasst werden. Es muss nur die Domain, ohne korrekten Pfad zum Formular, eingegeben werden. Beispiel: `example.com`                                                                                                                                                                                    |
| Spam-Grenze                      | Die Spam-Grenze legt fest, ab wie vielen Punkten eine Einsendung als Spam erkannt wird.                                                                                                                                                                                                                                                                                                                                                        |
| Speichern der Statistik          | Legt fest, wie lange mosparo die Statistikdaten für ein Projekt speichert. Nach Ablauf der gewählten Zeitspanne löscht mosparo die Statistikdaten automatisch. _(Hinzugefügt in v1.1)_                                                                                                                                                                                                                                                         |
| API-Debugging-Modus              | Aktiviert den API-Debug-Modus. Wenn dieser Modus aktiviert ist, antworten die APIs mit zusätzlichen Informationen, damit leichter nachvollzogen werden kann, warum die API die Antwort oder Fehlermeldung zurückgegeben hat. Siehe [API-Debugging-Modus](../api/api_debug_mode). _(Hinzugefügt in v1.1)_                                                                                                                                       |
| Verifizierungs-Simulations-Modus | Aktiviert den Verifikations-Simulations-Modus. Wenn dieser Modus aktiviert ist, erklärt die Verifizierungs-Simulation, welche Daten die mosparo Verifizierungs-API zur Verifizierung der Einsendung erwartet. Der Verifizierungs-Simulations-Modus ist auf der Detailseite der Einsendung sichtbar, sofern er aktiviert ist. Siehe [Verifizierungs-Simulations-Modus](./submissions#verifizierungs-simulations-modus). _(Hinzugefügt in v1.1)_ |

Auf der rechten Seite sind die wichtigsten Informationen sichtbar, die Sie benötigen, um mosparo in Ihre Website zu integrieren. Kopieren Sie diese Informationen und fügen Sie diese Werte in den dafür vorgesehenen Feldern oder Konfigurations-Feldern Ihrer Website ein.

| Feld                             | Beschreibung                                                                                                                              |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Host                             | Adresse der mosparo-Installation                                                                                                          |
| Eindeutige Identifikationsnummer | Eindeutige Identifikationsnummer des Projektes                                                                                            |
| Öffentlicher Schlüssel           | Das ist der öffentliche, also nicht geheime, Sicherheitsschlüssel, welcher verwendet wird, um die Einsendungen an mosparo zu übermitteln. |
| Geheimer Schlüssel               | Der geheime Schlüssel ist dazu da, die Schnittstellen-Anfragen zu signieren und sicherzustellen, dass die Anfragen echt sind.             |

## Projektmitglieder

Projektmitglieder sind Benutzer, welche auf ein Projekt Zugriff haben. Die Benutzer können verschiedene Berechtigungen haben und zum Teil nur Projekte anschauen, jedoch nichts verändern. Benutzer können in mehr als einem Projekt als Projektmitglied hinzugefügt werden.

### Projektmitglied hinzufügen

Wenn Sie ein neues Projektmitglied hinzufügen möchten, klicken Sie oben rechts auf die Schaltfläche. Geben Sie anschliessend die E-Mail-Adresse des gewünschten Benutzers ein und wählen Sie gewünschte Rolle, welche dieses Mitglied in diesem Projekt wahrnehmen soll. Bestätigen Sie Ihre Eingaben mit einem Klick auf die Schaltfläche unterhalb des Formulars.

:::caution
Sie können nur Benutzer hinzufügen, die zuvor als Benutzer in der Administration erstellt wurden.
:::

### Projektmitglied bearbeiten

Sie können ein Projektmitglied jederzeit bearbeiten und die zugewiesene Rolle anpassen, falls ein Mitglied mehr oder weniger Berechtigungen haben soll.

### Projektmitglied entfernen

Falls ein Projektmitglied keinen Zugriff mehr auf ein Projekt haben soll, können Sie das Projektmitglied jederzeit entfernen. Falls Sie ein Projektmitglied entfernen, wird nur das Projektmitglied in diesem Projekt entfernt. Der Benutzer selbst und alle anderen Mitgliedschaften zu anderen Projekten dieses Benutzers bleiben erhalten.

## Sicherheits-Einstellungen

### Einstellungsarten

#### Allgemeine Sicherheitseinstellungen

Die allgemeinen Sicherheitseinstellungen eines Projekts sind die Grundeinstellungen für jedes Projekt. Sie sollten zuerst die allgemeinen Sicherheitseinstellungen konfigurieren, bevor Sie die herkunftsbezogenen Einstellungen verwenden.

#### Ursprungsbezogene Sicherheitseinstellungen

Die ursprungsbezogenen Sicherheitseinstellungen ermöglichen es Ihnen, die Sicherheitseinstellungen aufgrund des Ursprungs eines Benutzers anzupassen. Dies kann durch die Definition spezieller Sicherheitseinstellungen auf der Grundlage der IP-Adresse eines Benutzers erfolgen. Wenn Sie GeoIP2 konfiguriert haben, können Sie auch die AS-Nummer und das Land zur Zuordnung eines Benutzers verwenden.

Mit der Priorität können Sie festlegen, in welcher Reihenfolge die Richtlinien angewendet werden sollen. Die passende Richtlinie mit der höchsten Priorität wird für einen Benutzer verwendet.

Sie können so viele Richtlinien erstellen, wie Sie möchten. In jeder Richtlinie können Sie beliebig viele Kriterien definieren. Die Richtlinie wird für einen Benutzer verwendet, sobald eines der Kriterien zutrifft.

Wenn Sie eine der Sicherheitseinstellungen anpassen möchten, aktivieren Sie die Überschreiben-Checkbox in der oberen rechten Ecke des Feldes für die Sicherheitseinstellung. Wenn Sie eine der in den allgemeinen Sicherheitseinstellungen aktivierten Sicherheitseinstellungen deaktivieren möchten, aktivieren Sie die Überschreiben-Checkbox und deaktivieren Sie das aktivierte Kontrollkästchen.

### Verfügbare Sicherheits-Einstellungen

#### Mindestzeit

Mit der Mindestzeit kann festgelegt werden, wie viel Zeit zwischen der initialen Anfrage und dem Überprüfen des Formulars vergehen muss, bevor die Anfrage akzeptiert wird. Bots können Formularanfragen innerhalb von Sekunden absenden, während dessen ein normaler Benutzer mehrere Minuten braucht.

:::info
Bitte beachten Sie, dass gewisse Benutzer schneller und andere langsamer im Tippen sind. Die Mindestzeit sollte möglichst klein sein, um keine korrekten Anfragen fälschlicherweise abzulehnen.
:::

#### Honeypot-Feld

Mit dem Honeypot-Feld wird ein verstecktes Feld zum Formular hinzugefügt, welches zwingend leer sein muss. Das Feld ist für normale Benutzer nicht sichtbar. Ein Bot sieht das Feld und denkt möglicherweise, dass es ausgefüllt werden muss.

Sobald das Feld ausgefüllt wird, wird die Einsendung als Spam gewertet, weil der normale Benutzer das Feld nicht sieht. Für Benutzer mit Screenreader ist das Feld mit einem entsprechenden Hinweis ausgestattet, dass es nicht ausgefüllt werden soll.

:::caution
Ein Honeypot-Feld kann eine Verbesserung der Spam-Erkennung sein. Da Bots aber technisch auch erkennen können, ob es ein Honeypot-Feld sein könnte oder nicht, ist diese Funktion mit Vorsicht zu benutzen.
:::

Tragen Sie im angezeigten Feld den Namen des Honeypot-Feldes ein. Es darf kein anderes Feld in Ihrem Formular mit diesem Namen geben, da es ansonsten zu einem Konflikt kommt. Bitte verwenden Sie einen neutralen Begriff, der keinen Hinweis auf die Funktionsweise des Feldes gibt.

#### Anfrage-Verzögerung

Mit der Anfrage-Verzögerung ist es möglich, eine IP-Adresse warten zu lassen, falls eine IP-Adresse viele Anfragen in einem gewissen Zeitraum getätigt hat. Mit der Anfrage-Verzögerung ist es möglich, dem Benutzer zu signalisieren, dass die Anfrage verarbeitet werden kann, aber der Benutzer sich einen Moment gedulden muss.

Bots möchten so viele Anfragen wie möglich absenden. Mit der Anfrage-Verzögerung werden diese entsprechend gebremst und das Senden von Spam ist weniger interessant.

:::caution
Benutzer können die gleiche IP-Adresse teilen, beispielsweise in einer Wohnung mit mehreren Benutzern oder in einer Firma.
:::

##### Felder

| Feld                      | Beschreibung                                                                                                                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Anzahl erlaubter Anfragen | Das Feld definiert die Anzahl der Anfragen, die ein Benutzer innerhalb eines Zeitraums machen kann, bevor die Anfrage-Verzögerung aktiv wird.                                |
| Erkennungszeitraum        | Definiert die Zeit in Sekunden, in welcher die Anfragen gemacht werden müssen, bevor die Anfrage-Verzögerung aktiv wird.                                                     |
| Anfrageverzögerungszeit   | Definiert die Zeit in Sekunden, welche der Benutzer warten muss, bevor er eine erneute Anfrage senden kann.                                                                  |
| Multiplikator             | Der Multiplikator wird auf die Anfrageverzögerungszeit angewendet und erhöht (oder verringert) die Verzögerungszeit bei erneuten Anfragen innerhalb dieser Verzögerungszeit. |

##### Beispiel

:::note Beispielswerte
Werte der Felder: Anzahl erlaubter Anfragen: 30, Erkennungszeitraum: 30 sek, Anfrageverzögerungszeit: 60 sek, Multiplikator: 1.5
:::

- Ein Benutzer macht innerhalb von 20 Sekunden 30 Anfragen. Die automatische Verzögerung wird aktiv und der Benutzer muss für 60 Sekunden warten.
- Wenn der Benutzer innerhalb dieser 60 Sekunden eine weitere Anfrage macht, erhöht sich die Zeit mit Hilfe des Faktors von 60 auf 90 Sekunden.
- Bei einer weiteren Anfrage innerhalb der 90 Sekunden erhöht sich die Zeit auf 135 Sekunden.

#### Automatische Sperre

Wenn eine IP-Adresse sehr viele Einsendungen absendet, kann mit der automatischen Sperre eine IP-Adresse automatisch für eine gewisse Zeit blockiert werden. Die Sperre wird automatisch vorgenommen und greift sofort. Sobald die eingestellte Zeit abgelaufen ist, kann die IP-Adresse wieder eine Einsendung absenden.

:::caution
Benutzer können die gleiche IP-Adresse teilen, beispielsweise in einer Wohnung mit mehreren Benutzern oder in einer Firma.
:::

:::caution
Die Sperre der IP-Adressen erfolgt über die gesamte mosparo-Installation. Wenn eine IP-Adresse in einem Projekt blockiert wurde, wird sie automatisch auch in einem anderen Projekt blockiert, sofern beide Projekte die automatische Sperre aktiviert haben.
:::

##### Felder

| Feld                      | Beschreibung                                                                                                                                                |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Anzahl erlaubter Anfragen | Das Feld definiert die Anzahl der Einsendungen, die ein Benutzer innerhalb eines Zeitraums absenden kann, bevor die IP-Sperre aktiv wird.                   |
| Erkennungszeitraum        | Definiert die Zeit in Sekunden, in welcher die Einsendungen gemacht werden müssen, bevor die IP-Sperre aktiv wird.                                          |
| Anfangssperrzeit          | Definiert die Zeit in Sekunden, welche der Benutzer gesperrt wird und keine Einsendungen absenden kann.                                                     |
| Multiplikator             | Der Multiplikator wird auf die Anfangssperrzeit angewendet und erhöht (oder verringert) die Sperrzeit bei erneuten Einsendungen innerhalb dieser Sperrzeit. |

##### Beispiel

:::note Beispielswerte
Werte der Felder: Anzahl erlaubter Anfragen: 30, Erkennungszeitraum: 30 sek, Anfangssperrzeit: 300 sek, Multiplikator: 1.5
:::

- Ein Benutzer sendet innerhalb von 20 Sekunden 30 Einsendungen. Die IP-Sperre wird aktiv und der Benutzer wird für 300 Sekunden gesperrt.
- Wenn der Benutzer innerhalb dieser 300 Sekunden eine weitere Einsendung absendet, erhöht sich die Zeit mit Hilfe des Faktors von 300 auf 450 Sekunden.
- Bei einer weiteren Anfrage innerhalb dieser 450 Sekunden erhöht sich die Zeit auf 675 Sekunden.

#### Liste der erlaubten IP-Adressen

_Sie können die Liste der erlaubten IP-Adressen nur in den allgemeinen Sicherheitseinstellungen eines Projekts bearbeiten._

Wenn Sie möchten, dass gewisse IP-Adresse von der Anfrage-Verzögerung sowie der automatischen Sperre ausgenommen werden, können Sie diese IP-Adressen oder Subnetze in die Liste der erlaubten IP-Adressen eintragen. Die Sicherheitsfeatures werden für die dort eingetragenen IP-Adressen und Subnetze übersprungen. Die normale Überprüfung auf Spam findet aber nach wie vor statt.

:::caution
Benutzer können die gleiche IP-Adresse teilen, beispielsweise in einer Wohnung mit mehreren Benutzern oder in einer Firma.
:::

## Darstellung

mosparo bietet Ihnen die Möglichkeit, das Design der mosparo Box so weit wie möglich zu verändern und an Ihre Website anzupassen. Nutzen Sie die Design-Einstellungen, um das Aussehen und die Darstellung anzupassen. Um Ihnen die Konfiguration von mosparo zu erleichtern, gibt es zwei Modi. Im einfachen Modus wählen Sie die wichtigsten Farben für Ihre Website und die Grösse der Box aus und mosparo übernimmt den Rest.

Wenn Sie alle Optionen konfigurieren möchten, können Sie in den erweiterten Modus wechseln und jede einzelne Farbe und andere Optionen ändern. Sie können jederzeit zwischen diesen beiden Modi wechseln.

:::info
Da mosparo mit normalen HTML-Elementen und CSS-Regeln arbeitet, können Sie das gesamte Aussehen der mosparo-Box mit entsprechenden CSS-Regeln überschreiben. Da dafür jedoch Programmiererfahrung notwendig ist, wird diese Möglichkeit in dieser Dokumentation nicht weiter beschrieben.
:::

:::warning
Das Überschreiben der CSS-Regeln geschieht auf eigene Verantwortung und wird offiziell von mosparo nicht empfohlen.
:::

### Einfacher Modus

Neue Projekte verwenden standardmässig den einfachen Modus. Im Projektassistenten können Sie diese vier Felder direkt nach dem Anlegen des Projekts konfigurieren. mosparo berechnet automatisch die bestmögliche Farbe für den Erfolgs- und Misserfolgsstatus. Mit dem Feld zur Auswahl der Grösse, können Sie bestimmen, wie gross die Box dargestellt werden soll.

### Erweiterter Modus

Im erweiterten Modus haben Sie alle Möglichkeiten, das Design der mosparo Box anzupassen.

#### Box-Grösse und -Radius

Sie können zwischen drei verschiedenen Grössen der mosparo-Box auswählen. Diese drei Grössen sind in mosparo vordefiniert und es kann nur zwischen diesen drei Grössen gewählt werden.

Der Radius der Box können Sie so anpassen, wie es für Ihre Website am besten passt. Falls Sie keinen Radius wünschen, können Sie den Wert auf 0 stellen.

#### Farben

Wählen Sie die verschiedenen Farben für die Box in den jeweiligen Zuständen aus. Falls Sie für eine Farbe einen transparenten Wert verwenden möchten, können Sie im Farbwähler auf das schwarze X klicken.

#### mosparo-Logo

Wenn der Benutzer mit der Tastatur die Kontrollbox fokussiert oder der Benutzer mit der Maus über die mosparo-Box fährt, wird das mosparo-Logo dargestellt. Falls Sie dieses Branding nicht möchten, können Sie die Anzeige des Logos deaktivieren.

#### Ping-Animation

Um die Aufmerksamkeit auf die Kontrollbox zu lenken, ist im Standard eine Ping-Animation eingebaut, welche die Checkbox hervorheben soll. Falls Sie diese Animation nicht möchten, können Sie sie jederzeit deaktivieren.

### Unsichtbarer Modus

Der unsichtbare Modus wurde mit Version 1.0 eingeführt. Im unsichtbaren Modus muss der Benutzer keine Box anklicken, um die Daten zu überprüfen. Stattdessen werden die Daten überprüft, sobald der Benutzer das Formular absenden möchte. Die genauere Beschreibung der Variante finden Sie unter [Funktionsweise](../about/how_it_works#funktionsweise-unsichtbare-variante). 

Mit den Einstellungen können Sie die Darstellung dieser Überlagerung anpassen.

#### Farben

Mit den Farben können Sie den Hintergrund des Overlays, die Textfarbe sowie die Farbe des Lade-Kreises definiert werden. Zusätzlich kann die Farbe der Fehlermeldung, falls Spam entdeckt wurde, definiert werden. Die Hintergrundfarbe des Overlays sollte leicht transparent sein, so dass der Benutzer weiss, dass er die Seite nicht verlassen hat.

#### mosparo-Logo

Sobald das Overlay dargestellt wird, zeigt mosparo das Logo von mosparo ein. falls Sie dieses Branding nicht möchten, können Sie die Anzeige des Logos deaktivieren.

#### Seiten-Overlay

Definieren Sie, ob die Überlagerung die gesamte Website überlagern soll, oder ob nur das Formular überlagert werden soll.

### Kontrast-Bewertung

Unser Ziel ist es, dass jeder Mensch Ihr Formular ausfüllen kann. Dafür ist es für uns Wichtig, dass die mosparo-Box auch von einem Menschen benutzt werden kann, der nicht so gut sieht, wie andere Menschen. Es ist daher wichtig, dass die von Ihnen gewählten Farben einen möglichst hohen Kontrast aufweisen. Aus diesem Grund haben wir direkt in den Darstellungseinstellungen eine Funktion eingebaut, welche die entsprechenden Kontraste berechnet und Ihnen anzeigt.

### Auslieferung der Darstellungseinstellungen

Beim Speichern der Darstellung werden die gewählten Werte in der Datenbank gespeichert. Zusätzlich wird der CSS-Code, welcher für die Darstellung verantwortlich ist, für Ihr Projekt in einer speziellen Datei vorbereitet.

Sobald ein Benutzer ein Formular auf Ihrer Website aufruft, wird diese bereits vorbereitete Datei geladen und der Benutzer hat automatisch die korrekte Darstellung.

Nachdem Sie die Darstellung angepasst haben, wird eine neue solche Datei mit einem neuen Dateinamen gespeichert. Alle Anfragen an die alte Datei werden automatisch an die neue Datei weitergeleitet, so dass beim Anpassen der Darstellung keine Unterbrüche feststellbar sind und trotzdem immer die neueste Version verwendet wird.

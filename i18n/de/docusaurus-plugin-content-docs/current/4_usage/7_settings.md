---
sidebar_position: 7
sidebar_label: Einstellungen
description: In den Projekteinstellungen können Sie das Projekt gemäss Ihren Wünschen anpassen.
---

# Einstellungen

## Allgemeine Einstellungen

In den allgemeinen Einstellungen können die wichtigsten Informationen zum Projekt bearbeitet werden.

| Feld          | Beschreibung                                                                                                                                                                                                                                                                     |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name          | Bezeichnung des Projektes                                                                                                                                                                                                                                                        |
| Beschreibung  | Beschreibung des Projektes                                                                                                                                                                                                                                                       |
| Hosts         | Damit die Anfragen korrekt beantwortet werden können, muss mosparo wissen, woher dieses Projekt verwendet wird. Dazu müssen alle Hosts erfasst werden welche dieses Projekt verwenden. Es muss nur die Domain, ohne Protokoll und Pfad, eingegeben werden. Siehe [Hosts](#hosts) |
| Projektgruppe | Wählen Sie die Gruppe, in der das Projekt angezeigt werden soll. Standardmässig wird ein Projekt in der Hauptgruppe angezeigt, welche die Startgruppe ist. _(Hinzugefügt in v1.3)_                                                                                               |

Zusätzliche Einstellungen sind seit v1.3 unter [Erweiterte Einstellungen](#erweiterte-einstellungen) verfügbar.

Auf der rechten Seite sind die wichtigsten Informationen sichtbar, die Sie benötigen, um mosparo in Ihre Website zu integrieren. Kopieren Sie diese Informationen und fügen Sie diese Werte in den dafür vorgesehenen Feldern oder Konfigurations-Feldern Ihrer Website ein.

| Feld                             | Beschreibung                                                                                                                              |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Host                             | Adresse der mosparo-Installation                                                                                                          |
| Eindeutige Identifikationsnummer | Eindeutige Identifikationsnummer des Projektes                                                                                            |
| Öffentlicher Schlüssel           | Das ist der öffentliche, also nicht geheime, Sicherheitsschlüssel, welcher verwendet wird, um die Einsendungen an mosparo zu übermitteln. |
| Geheimer Schlüssel               | Der geheime Schlüssel ist dazu da, die Schnittstellen-Anfragen zu signieren und sicherzustellen, dass die Anfragen echt sind.             |

### Hosts

Mit der Version 1.2 haben wir einen Fehler behoben, der seit der ersten Version in mosparo vorhanden war. Der Fehler besteht darin, dass die konfigurierten Hosts nie verwendet wurden, um die Herkunft einer Anfrage an die Frontend-API zu verifizieren. Mit der Version 1.2 haben wir diesen Fehler behoben, und die Hosts werden vor der Verarbeitung der Anfrage überprüft. Technisch gesehen handelt es sich um die Cross-Origin-Header (CORS).

Sie müssen alle Hosts, auf denen Sie ein Projekt verwenden, zu den Hosts in den Projekteinstellungen hinzufügen, damit mosparo den Ursprung korrekt verifizieren kann.

Ein Host ist eine Domain ohne das Protokoll und den Pfad. Sie können einen Stern (`*`) als Platzhalter am Anfang eines Hosts verwenden. Der Platzhalter muss vor einem Punkt oder ohne andere Zeichen platziert werden. Wenn Sie den Platzhalter vor einen Punkt setzen, wird auch die Domäne ohne den Punkt zugelassen. Wir empfehlen, nicht nur den Platzhalter als Hosts zu verwenden, da dies allen möglichen Ursprüngen die Verbindung zur Frontend-API ermöglichen würde.

#### Gültige Hosts

- `example.com`
- `www.example.com`
- `*.example.com` (schliesst `example.com`, `www.example.com` und `abc.www.example.com` ein)
- `*` (erlaubt alle, nicht empfohlen)

#### Ungültige Hosts

- `https://example.com`
- `example.com/contact-form`
- `*example.com`
- `www.*.example.com`

## Erweiterte Einstellungen

In den allgemeinen Einstellungen können die wichtigsten Informationen zum Projekt bearbeitet werden.

| Feld                             | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Spamerkennungs-Optionen**      |
| Status                           | Wenn aktiv, blockiert mosparo Beiträge, die als Spam erkannt wurden. Wenn inaktiv, bewertet mosparo alle Beiträge, blockiert sie aber nicht. Sie können den Status auch in einer [ursprungsbasierten Sicherheitsrichtlinie](#ursprungsbezogene-sicherheitseinstellungen) aktivieren oder deaktivieren.                                                                                                                                         |
| Spam-Grenze                      | Die Spam-Grenze legt fest, ab wie vielen Punkten eine Einsendung als Spam erkannt wird. Sie können die Spam-Grenze auch in einer [ursprungsbasierten Sicherheitsrichtlinie](#ursprungsbezogene-sicherheitseinstellungen) anpassen.                                                                                                                                                                                                                                                             |
| **Sprach-Optionen**              |
| Sprachquelle                     | Legt fest, wie mosparo die Sprache für die Frontend-Box bestimmt. mosparo verwendet standardmässig die Browsersprache. Mit dieser Option ist es möglich, die Sprache der Website als Fallback zu verwenden oder die Sprache der Website als Hauptquelle zu verwenden und die Browsersprache als Fallback zu verwenden. _(Hinzugefügt in v1.3)_                                                                                                 |
| **Statistik-Optionen**           |
| Speichern der Statistik          | Legt fest, wie lange mosparo die Statistikdaten für ein Projekt speichert. Nach Ablauf der gewählten Zeitspanne löscht mosparo die Statistikdaten automatisch. _(Hinzugefügt in v1.1)_                                                                                                                                                                                                                                                         |
| **Entwickler-Optionen**          |
| API-Debugging-Modus              | Aktiviert den API-Debug-Modus. Wenn dieser Modus aktiviert ist, antworten die APIs mit zusätzlichen Informationen, damit leichter nachvollzogen werden kann, warum die API die Antwort oder Fehlermeldung zurückgegeben hat. Siehe [API-Debugging-Modus](../api/api_debug_mode). _(Hinzugefügt in v1.1)_                                                                                                                                       |
| Verifizierungs-Simulations-Modus | Aktiviert den Verifikations-Simulations-Modus. Wenn dieser Modus aktiviert ist, erklärt die Verifizierungs-Simulation, welche Daten die mosparo Verifizierungs-API zur Verifizierung der Einsendung erwartet. Der Verifizierungs-Simulations-Modus ist auf der Detailseite der Einsendung sichtbar, sofern er aktiviert ist. Siehe [Verifizierungs-Simulations-Modus](./submissions#verifizierungs-simulations-modus). _(Hinzugefügt in v1.1)_ |

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

Sie können die Spam-Erkennung auch vollständig deaktivieren oder die Spam-Bewertung für eine Sicherheitsrichtlinie anpassen. Mit dieser Option können Sie beispielsweise die Spam-Erkennung für eine IP-Adresse vollständig deaktivieren oder die Spam-Bewertung für ein Land verringern. _(Hinzugefügt in v1.4)_

### Verfügbare Sicherheits-Einstellungen

#### Mindestzeit

Mit der Mindestzeit kann festgelegt werden, wie viel Zeit zwischen der initialen Anfrage und dem Überprüfen des Formulars vergehen muss, bevor die Anfrage akzeptiert wird. Bots können Formularanfragen innerhalb von Sekunden absenden, während dessen ein normaler Benutzer mehrere Minuten braucht.

:::info
Bitte beachten Sie, dass gewisse Benutzer schneller und andere langsamer im Tippen sind. Die Mindestzeit sollte möglichst klein sein, um keine korrekten Anfragen fälschlicherweise abzulehnen.
:::

#### Honeypot-Feld

Das Honeypot-Feld ist ein verstecktes Feld in Ihrem Formular, welches der Benutzende leer absenden muss. Für Menschen ist es nicht sichtbar, aber ein Bot sieht es möglicherweise und denkt, dass es ausgefüllt werden muss.

Sobald das Feld ausgefüllt wird, wird die Einsendung als Spam gewertet, weil der Mensch das Feld nicht sieht. Für Menschen mit Screenreader ist das Feld mit einem entsprechenden Hinweis ausgestattet, dass es nicht ausgefüllt werden soll.

:::caution
Ein Honeypot-Feld kann eine Verbesserung der Spam-Erkennung sein. Da Bots aber technisch auch erkennen können, ob es ein Honeypot-Feld sein könnte oder nicht, ist diese Funktion mit Vorsicht zu benutzen.
:::

Tragen Sie im angezeigten Feld den Namen des Honeypot-Feldes ein. Es darf kein anderes Feld in Ihrem Formular mit diesem Namen geben, da es ansonsten zu einem Konflikt kommt. Bitte verwenden Sie einen neutralen Begriff, der keinen Hinweis auf die Funktionsweise des Feldes gibt. Es wird empfohlen, einen Namen zu verwenden, welcher wie ein normales Feld klingt, zum Beispiel "strasse-2".

mosparo wird das Feld automatisch zu Ihrem Formular hinzufügen, sofern Sie einen Namen für das Feld in den Sicherheits-Einstellungen definiert haben. Sie müssen betreffend des Honeypot-Feldes an Ihrem Formular nichts anpassen, ausser dass Sie mosparo zum Formular hinzufügen müssen.

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

#### Arbeitsnachweis-Mechanismus (Proof-of-Work-Mechanismus)

Mit v1.3 bietet mosparo eine Sicherheitsfunktion basierend auf dem Arbeitsnachweis-Mechanismus. Mit dieser Funktion muss der Browser viele Hashes berechnen, um den von uns erwarteten zu finden. Dies kostet den Browser Zeit, da er eine Menge Berechnungen durchführen muss.

:::info Eine Nachricht des mosparo-Teams
Aus unserer Sicht macht es keinen Sinn, ein Formular nur mit dem Arbeitsnachweis-Mechanismus zu schützen. Dieser Mechanismus basiert auf dem Prozessor, und jedes mit dem Internet verbundene Gerät verfügt über einen Prozessor, so dass jeder (auch Bots) dieses Rätsel lösen kann. Ausserdem werden Prozessoren jedes Jahr schneller und billiger, so dass die tatsächlichen Kosten für einen Spam-Bot sehr gering sind und kein wirkliches Problem darstellen.

Mit der regelbasierten Spamerkennung und den anderen Sicherheits-Einstellungen bietet mosparo eine hervorragende Kombination, mit der der Arbeitsnachweis-Mechanismus besser genutzt werden kann.
:::

Bei der dynamischen Komplexität erhöht mosparo den Zahlenbereich automatisch auf Basis der Einsendungen innerhalb eines bestimmten Zeitraums. Optional basiert die dynamische Komplexität auf der IP-Adresse. Wenn ein Nutzer viele Einsendungen macht, muss er immer mehr Zeit aufwenden, um das Arbeitsnachweis-Rätsel zu lösen, bevor das Formular abgeschickt wird.

##### Felder

| Feld                                                            | Beschreibung                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Komplexität                                                     | Die Komplexität definiert den Zahlenbereich, der verwendet wird, um die Zufallszahl für das Rätsel zu erhalten.Je grösser der Zahlenbereich ist, desto mehr Berechnungen muss der Browser durchführen. Es wird empfohlen, keinen zu grossen Zahlenbereich zu verwenden, da es Zeit kostet, bis der normale Benutzer das Formular abschickt. |
| Zahlenbereich                                                   | Zeigt den Zahlenbereich an, der zur Ermittlung der Zufallszahl verwendet wird.                                                                                                                                                                                                                                                              |
| Max. Zeit zur Lösung                                            | Zeigt die maximale geschätzte Zeit an, die Ihr Gerät zur Berechnung der Hashes für den gesamten Zahlenbereich benötigt hat. Normalerweise ist die Lösung des Rätsels schneller, da die Zielzahl nicht am Ende des Zahlenbereichs liegt. Andere Geräte können langsamer oder schneller sein als Ihr Gerät.                                   |
| Geschwindigkeit                                                 | Zeigt die Berechnungsgeschwindigkeit auf Ihrem Gerät an. Andere Geräte können langsamer oder schneller sein als Ihr Gerät.                                                                                                                                                                                                                  |
| **Dynamische Komplexität**                                      |
| Maximale Komplexität                                            | Legt die maximale Komplexität fest, die verwendet wird, wenn die Anzahl der Einreichungen innerhalb des angegebenen Zeitrahmens erreicht ist.                                                                                                                                                                                               |
| Zahlenbereich                                                   | _Siehe oben_                                                                                                                                                                                                                                                                                                                                |
| Max. Zeit zur Lösung                                            | _Siehe oben_                                                                                                                                                                                                                                                                                                                                |
| Geschwindigkeit                                                 | _Siehe oben_                                                                                                                                                                                                                                                                                                                                |
| Anzahl der Einsendungen zum Erreichen der maximalen Komplexität | Das Feld definiert die Anzahl der Einsendungen, die ein Benutzer innerhalb eines Zeitraums einreichen kann, um die maximale Komplexität zu erreichen.                                                                                                                                                                                       |
| Erkennungszeitraum                                              | Legt die Zeit in Sekunden fest, in der die Einsendungen gezählt werden.                                                                                                                                                                                                                                                                     |
| Basierend auf der IP-Adresse                                    | Ist diese Option aktiviert, werden nur die Einsendungen von der gleichen IP-Adresse gezählt. Andernfalls werden alle Einsendungen von allen Benutzern innerhalb des angegebenen Zeitraums gezählt.                                                                                                                                          |

#### Gleiche Einsendungen blockieren

Mit dieser Sicherheitsfunktion können Sie gleiche Einsendungen blockieren. Wenn ein Benutzer die gleichen Formulardaten mehrfach abschickt, blockiert mosparo die zusätzlichen Einsendungen, und der Benutzer kann die gleichen Daten nicht mehr absenden.

Sie können festlegen, in welchem Zeitrahmen mosparo die gleichen Einsendungen zählen soll und ob die Einsendungen auf Basis der IP-Adresse des Benutzers gezählt werden sollen.

##### Felder

| Feld                                   | Beschreibung                                                                                                                                              |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Anzahl erlaubter gleicher Einsendungen | Das Feld definiert die Anzahl der gleichen Einsendungen, die ein Benutzer innerhalb eines Zeitraums machen kann, bevor die Einsendungen blockiert werden. |
| Erkennungszeitrahmen                   | Definiert die Zeit in Sekunden, in der die Einsendungen gezählt werden, um die Anzahl der erlaubten gleichen Einsendungen zu erreichen.                   |
| Basierend auf der IP-Adresse           | Wenn aktiviert zählt mosparo die gleichwertigen Einsendungen basierend auf der IP-Adresse.                                                                |

#### Liste der erlaubten IP-Adressen

_Sie können die Liste der erlaubten IP-Adressen nur in den allgemeinen Sicherheitseinstellungen eines Projekts bearbeiten._

Wenn Sie möchten, dass gewisse IP-Adresse von der Anfrage-Verzögerung sowie der automatischen Sperre ausgenommen werden, können Sie diese IP-Adressen oder Subnetze in die Liste der erlaubten IP-Adressen eintragen. Die Sicherheitsfeatures werden für die dort eingetragenen IP-Adressen und Subnetze übersprungen. Die normale Überprüfung auf Spam findet aber nach wie vor statt.

:::caution
Benutzer können die gleiche IP-Adresse teilen, beispielsweise in einer Wohnung mit mehreren Benutzern oder in einer Firma.
:::

## Darstellung

mosparo bietet Ihnen die Möglichkeit, die Darstellung der mosparo Box so weit wie möglich zu verändern und an Ihre Website anzupassen. Nutzen Sie die Darstellungs-Einstellungen, um das Aussehen und die Bedienung anzupassen.

### Darstellungs-Arten

Die drei Darstellungs-Arten erleichtern Ihnen die Konfiguration der Darstellung der mosparo-Box:

- Im **einfachen sichtbaren Modus** wählen Sie die wichtigsten Farben für Ihre Website und die Grösse der Box, den Rest erledigt mosparo.
- Im **erweiterten sichtbaren Modus** können Sie alle Farben, die Grösse der Ränder und des Radius und einige andere Einstellungen der sichtbaren Box wählen.
- Mit dem **einfachen unsichtbaren Modus** können Sie die wichtigsten Farben für den unsichtbaren mosparo-Modus auswählen

Bitte benutzen Sie das Dropdown-Menü „Darstellungsart“ in der linken unteren Ecke der Seite mit den Darstellungs-Einstellungen, um zwischen den Arten zu wechseln.

:::info
Da mosparo mit normalen HTML-Elementen und CSS-Regeln arbeitet, können Sie das gesamte Aussehen der mosparo-Box mit entsprechenden CSS-Regeln überschreiben. Da dafür jedoch Programmiererfahrung notwendig ist, wird diese Möglichkeit in dieser Dokumentation nicht weiter beschrieben.
:::

:::warning
Das Überschreiben der CSS-Regeln geschieht auf eigene Verantwortung und wird offiziell von mosparo nicht empfohlen.
:::

### Einfacher sichtbarer Modus

Neue Projekte verwenden standardmässig den einfachen Modus. Im Projektassistenten können Sie diese vier Felder direkt nach dem Anlegen des Projekts konfigurieren. mosparo berechnet automatisch die bestmögliche Farbe für den Erfolgs- und Misserfolgsstatus. Mit dem Feld zur Auswahl der Grösse, können Sie bestimmen, wie gross die Box dargestellt werden soll.

### Erweiterter sichtbarer Modus

Im erweiterten Modus haben Sie alle Möglichkeiten, das Design der mosparo Box anzupassen.

#### Box-Grösse und -Radius

Auf der ersten Registerkarte der Grösseneinstellungen, können Sie zwischen drei verschiedenen Grössen der mosparo-Box auswählen. Diese drei Grössen sind in mosparo vordefiniert und es kann nur zwischen diesen gewählt werden.

Der Radius der Box können Sie so anpassen, wie es für Ihre Website am besten passt. Falls Sie keinen Radius wünschen, können Sie den Wert auf 0 stellen.

#### Radius und Rahmenbreite des Kontrollkästchens

Auf der zweiten Registerkarte der Grösseneinstellungen können Sie den Radius des Kontrollkästchens und die Rahmenbreite festlegen. Mit diesen Einstellungen können Sie das Aussehen des Kontrollkästchens ändern und es eher quadratisch gestalten, ähnlich wie bei anderen Spam-Schutzmethoden. _(Hinzugefügt in v1.4)_

#### Farben

Wählen Sie die verschiedenen Farben für die Box in den jeweiligen Zuständen aus. Falls Sie für eine Farbe einen transparenten Wert verwenden möchten, können Sie im Farbwähler auf das schwarze X klicken.

#### mosparo-Logo

Wenn der Benutzer mit der Tastatur die Kontrollbox fokussiert oder der Benutzer mit der Maus über die mosparo-Box fährt, wird das mosparo-Logo dargestellt. Falls Sie dieses Branding nicht möchten, können Sie die Anzeige des Logos deaktivieren.

#### Ping-Animation

Um die Aufmerksamkeit auf die Kontrollbox zu lenken, ist im Standard eine Ping-Animation eingebaut, welche die Checkbox hervorheben soll. Falls Sie diese Animation nicht möchten, können Sie sie jederzeit deaktivieren.

### Einfacher unsichtbarer Modus

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

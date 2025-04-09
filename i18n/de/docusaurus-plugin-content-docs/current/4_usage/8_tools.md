---
sidebar_position: 8
sidebar_label: Werkzeuge
description: Die Werkzeuge unterstützen Sie bei der Benutzung von mosparo.
---

# Werkzeuge

## Regel-Tester

:::tip
Bevorzugen Sie ein Video, anstatt einen Text zu lesen? Sehen Sie sich unser HowTo über das Testen einer Regel auf [YouTube](https://www.youtube.com/watch?v=oFq3j7kP8TQ) an.
:::


Mit dem Regel-Tester können Sie testen, wie die erfassten Regeln funktionieren und ob die Regeln Spam erkennen oder nicht.

Geben Sie den zu testenden Wert im Feld "Test-Wert" ein. Wählen Sie anschliessend, um welchen Typ von Feld bzw. Wert es sich handelt. Gewisse Regelarten werden nur auf gewisse Feldtypen angewendet. 

:::info
Welche Regeltypen für welche Datentypen verwendet werden, sehen Sie in der [Liste der Regelarten](./rule_types).
:::

Zusätzlich können Sie auswählen, ob Regel und Regel-Pakete für den Test verwendet werden sollen (oder nur zum Beispiel Regel-Pakete).

Sobald Sie die gewünschten Einstellungen vorgenommen haben, können Sie den Test mit einem Klick auf die Schaltfläche "Testen" starten.

Nachdem der Test durchgeführt wurde, sehen Sie das Test-Resultat. Neben den eingegebenen Test-Daten wird angezeigt, ob die Eingabe als Spam gewertet wird, wie viele Punkte dafür berechnet wurden und was der Grenzwert ist. Zusätzlich sehen Sie eine Liste aller Regeln, die mit dem eingegebenen Test-Wert übereinstimmen.

## Exportieren

Mit der Exportieren-Funktion können Sie die Einstellungen eines mosparo Projektes in ein anderes Projekt (ggf. in einer anderen mosparo Installation) übertragen.

### Web

Um einen Export zu starten, wählen Sie, welche Daten Sie exportieren möchten. Die Haupteinstellungen beinhalten den Namen, die Beschreibung, die Hosts sowie den Spam-Score eines Projektes. Die Darstellungs- sowie Sicherheitseinstellungen enthalten die jeweiligen spezifischen Einstellungen. Wenn Sie die Regeln oder Regel-Pakete anwählen, werden alle erfassten Regeln bzw. Regel-Pakete exportiert.

Nachdem Sie Ihre Auswahl getroffen haben, können Sie den Export mit einem Klick auf die Schaltfläche "Exportieren" starten. Sie erhalten eine JSON-Datei, welche die gewählten Daten Ihres Projektes beinhalten.

:::info
Sensible Daten wie Einsendungen, Einsendecodes, die eindeutige Projekt-ID (UUID), die API-Schlüssel oder die Projektmitglieder werden nicht exportiert.
:::

### CLI

Alternativ können Sie ein Projekt auch über die CLI exportieren. Verwenden Sie dazu folgenden Befehl:

```
php bin/console mosparo:export <projectId> [<filePath>]
```

Das wichtigste Argument für den Befehl ist die Projekt-ID. Sie finden die ID wenn Sie in der Projekt-Liste in der Web-Oberfläche auf die Schaltfläche mit dem Zahnrad-Symbol klicken. Anschliessend öffnet sich das Dropdown, in welchem Sie die Projekt-ID sehen.

Der Befehl wird den Export direkt in Ihr Terminal ausgeben (STDOUT). Wenn Sie den Export in eine Datei speichern möchten, geben Sie den Pfad zur Datei als zweites Argument an.

Sie können zudem bestimmen, welche Teile exportiert oder nicht exportiert werden sollen. Werden keine angegeben werden automatisch alle exportiert.

| Argument                                     | Standard | Beschreibung                                                      |
|----------------------------------------------|----------|-------------------------------------------------------------------|
| --generalSettings<br/>--no-generalSettings   | Ja       | Exportiert (oder exportiert nicht) die Haupteinstellungen.        |
| --designSettings<br/>--no-designSettings     | Ja       | Exportiert (oder exportiert nicht) die Darstellungseinstellungen. |
| --securitySettings<br/>--no-securitySettings | Ja       | Exportiert (oder exportiert nicht) die Sicherheitseinstellungen.  |
| --rules<br/>--no-rules                       | Ja       | Exportiert (oder exportiert nicht) die Regeln.                    |
| --rulesets<br/>--no-rulesets                 | Ja       | Exportiert (oder exportiert nicht) die Regel-Pakete.              |

## Importieren

Mit der Importieren-Funktion können Sie die Einstellungen eines anderen mosparo Projektes in Ihr Projekt installieren. Sie benötigen dafür eine Export-Datei, welche mit der [Exportieren-Funktion](#exportieren) erstellt wurde (oder das gleiche Schema verwendet).

### Web

Um die Datei zu importieren, wählen Sie die Datei im vorgesehen Feld aus und wählen Sie anschliessend, welche Daten Sie importieren möchten. Sie können hier alle möglichen Bereiche anwählen, auch wenn diese eventuell in der Datei nicht vorhanden sind.

Die Einstellungen (Haupt-, Darstellungs- sowie Sicherheitseinstellungen) werden immer überschrieben.

Falls Sie möchten, dass die Regeln importiert werden, müssen Sie zusätzlich auswählen, wie mosparo mit bereits existierenden Regeln umgehen soll. mosparo kann entweder die vorhandenen Regeln überschreiben (Modus Überschreiben), die vorhandenen Regel-Einträge aktualisieren bzw. zusätzliche Regel-Einträge hinzufügen (Modus Anfügen), oder die bestehenden Regeln als neue Regel mit einer neuen Identifikationsnummer hinzufügen (Modus Hinzufügen).

Regel-Pakete werden über die Adresse (URL) gesucht. Falls Sie bereits ein Regel-Paket mit der gleichen Adresse erfasst haben, wird das Regel-Paket aktualisiert.

:::info
Beim Importieren werden keine Regeln oder Regel-Pakete gelöscht. Beim Modus "Überschreiben" können Regel-Einträge gelöscht werden.
:::

Klicken Sie anschliessend auf "Import simulieren". mosparo wird die Datei hochladen, validieren und anschliessend ermitteln, welche Einstellungen geändert werden müssen. In der darauffolgenden Übersicht sehen Sie, welche Änderungen notwendig sind. Wenn die Änderungen für Sie in Ordnung sind, können Sie sie mit einem Klick auf die Schaltfläche "Änderungen ausführen" ausführen.

### CLI

Alternativ können Sie ein Projekt auch über die CLI importieren. Verwenden Sie dazu folgenden Befehl:

```
php bin/console mosparo:import <projectId> <filePath>
```

Das wichtigste Argument für den Befehl ist die Projekt-ID. Sie finden die ID wenn Sie in der Projekt-Liste in der Web-Oberfläche auf die Schaltfläche mit dem Zahnrad-Symbol klicken. Anschliessend öffnet sich das Dropdown, in welchem Sie die Projekt-ID sehen.

Geben Sie als zweites Argument die exportierte Datei an, welche Sie importieren möchten.

Sie müssen zudem bestimmen, welche Teile importiert werden sollen. Es müssen die gewünschte Teile angegeben werden, da das Kommando im Standard keinen Import ausführt.

| Argument                                     | Standard   | Beschreibung                                                                                                          |
|----------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------|
| --generalSettings<br/>--no-generalSettings   | Nein       | Importiert (oder importiert nicht) die Haupteinstellungen.                                                            |
| --designSettings<br/>--no-designSettings     | Nein       | Importiert (oder importiert nicht) die Darstellungseinstellungen.                                                     |
| --securitySettings<br/>--no-securitySettings | Nein       | Importiert (oder importiert nicht) die Sicherheitseinstellungen.                                                      |
| --rules<br/>--no-rules                       | Nein       | Importiert (oder importiert nicht) die Regeln.                                                                        |
| --rulesets<br/>--no-rulesets                 | Nein       | Importiert (oder importiert nicht) die Regel-Pakete.                                                                  |
| <nobr>--handlingExistingRules=WERT</nobr>    | `override` | Definiert, wie mosparo mit den bereits existierenden Regeln umgehen soll. Erlaubte Werte: `override`, `append`, `add` |

Nach dem Sie den Befehl gestartet haben, wird der Import simuliert. Ihnen werden anschliessend die ermittelten Änderungen angezeigt. Bestätigen Sie den Import sofern alle Änderungen für Sie in Ordnung sind.
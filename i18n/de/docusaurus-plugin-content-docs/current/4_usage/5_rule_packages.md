---
sidebar_position: 5
sidebar_label: Regelpakete
description: Erfahren Sie mehr über die Verwendung von Regelpaketen sowie den Aufbau eines Regelpaketes.
---

# Regelpakete

## Regelpakete verwalten

Regelpakete fassen eine oder mehrere Regeln in einer Datei zusammen. In mosparo gibt es vier verschiedene Arten von Regelpaketen. Zwei davon werden automatisch aktualisiert (automatisches Laden von einer URL oder einer Datei), während die anderen beiden manuell über einen CLI-Befehl oder eine API-Anfrage aktualisiert werden.

Um ein neues Regelpaket hinzuzufügen, wählen Sie in der Regelpaket-Oberfläche „Regelpaket hinzufügen”. Anschliessend müssen Sie den Typ auswählen.

Nachdem Sie den Typ ausgewählt haben, müssen Sie alle Informationen für das Regelpaket eingeben. Für die automatischen Regelpakete müssen Sie den Pfad oder die URL festlegen. Sie können auch einen Faktor angeben, mit dem das Regelpaket verstärkt oder abgeschwächt werden kann.

Nachdem ein Regelpaket hinzugefügt wurde, können Sie das Regelpaket betrachten. Wenn Sie eine manuelle Regelpaketart ausgewählt haben, müssen Sie zunächst den Inhalt des Regelpakets entsprechend der ausgewählten Art importieren. Informationen zum Importieren des Regelpakets über die CLI finden Sie unter [CLI](../cli#regelpaket-importieren). Informationen zum Importieren des Regelpakets über die API finden Sie in der [API-Dokumentation](../api/rule_package).

Da das Regelpaket an einem anderen Ort erstellt und an Ihre mosparo-Installation geliefert wird, können Sie die Regeln im Regelpaket nicht bearbeiten oder löschen.

## Format der Regelpakete

### Speichern des Regelpakets

Ein Regelpaket ist eine JSON-Datei. Die JSON-Datei muss dem Regelpaket und dem Regelmuster entsprechen. Das Schema für das Regelpaket und die Regeln ist im [Spezifikationen-Repository](https://github.com/mosparo/specifications) verfügbar.

Zusätzlich zur JSON-Datei müssen Sie die Prüfsumme der JSON-Datei am selben Speicherort speichern. Der SHA256-Hash der Datei muss erstellt und unter demselben Dateinamen, jedoch mit der Endung „.sha256“ gespeichert werden.

:::note Beispiel
**Adresse des Regelpaketes (wird in mosparo eingetragen)**<br />
https://example.com/ruleset.json<br />
/home/mosparo/my-rulepackage.json

**Adresse der Checksumme:**<br />
https://example.com/ruleset.json.sha256<br />
/home/mosparo/my-rulepackage.json.sha256
:::

### Aufbau eines Regelpakets

Die JSON-Struktur des Regelpakets ist als JSON-Objekt aufgebaut. Das Objekt verfügt über folgende Eigenschaften:

| Eigenschaft     | Typ      | Beschreibung                                                                                                                                                                                                             |
|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Gibt an, wann das Regelpaket zuletzt verändert wurde. Dieser Wert wird genutzt, um zu entscheiden, ob mosparo das Regelpaket aktualisieren muss oder ob bereits die aktuellste Version vorhanden ist.                    |
| refreshInterval | Integer  | Definiert die Zeit in Sekunden, wann mosparo das Regelpaket erneut abrufen darf. mosparo speichert das Regelpaket in einem Zwischenspeicher und erst nach Ablauf dieser Zeit wird das Regelpaket erneut heruntergeladen. |
| rules           | Array    | Ist ein Array, welcher alle Regeln als JSON-Objekt beinhaltet                                                                                                                                                            |

### Aufbau einer Regel

Das JSON-Objekt einer Regel besteht aus folgenden Eigenschaften:

| Eigenschaft      | Typ    | Beschreibung                                                                                                                                                                                 |
|------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | Eine eindeutige Identifikationsnummer der Regel                                                                                                                                              |
| name             | String | Bezeichnung der Regel                                                                                                                                                                        |
| description      | String | Beschreibung der Regel                                                                                                                                                                       |
| type             | String | Typ der Regel (zum Beispiel: `word` oder `user-agent`)                                                                                                                                       |
| items            | Array  | Array mit allen Regel-Einträgen                                                                                                                                                              |
| spamRatingFactor | Float  | Bewertungsfaktor der Regel, um die Einträge der Regel zu verstärken oder abzuschwächen. Ein Wert grösser als 1.0 verstärkt die Einträge, ein Wert kleiner als 1.0 schwächt die Einträge ab.  |

### Aufbau eines Regel-Eintrags

Das JSON-Objekt eines Regel-Eintrags besteht aus folgenden Eigenschaften:

| Eigenschaft | Typ    | Beschreibung                                                                                                                                            |
|-------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid        | UUID   | Eine Eindeutige Identifikationsnummer des Regel-Eintrags                                                                                                |
| type        | String | Definiert den Typ der Regel (zum Beispiel: `text` oder `regex`)                                                                                         | 
| value       | String | Der eigentliche Wert des Eintrags                                                                                                                       |
| rating      | Float  | Definiert den Spam-Wert des Eintrags. Dieser Wert wird mit dem Spam-Bewertungsfaktor multipliziert und ergibt das Bewertungsergebnis einer Einsendung.  |


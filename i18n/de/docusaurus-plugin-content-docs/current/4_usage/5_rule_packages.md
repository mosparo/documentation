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

## Format von Regelpaketen

Das erste Format für Regelpakete war ein einfaches JSON-Format. Dies eignet sich hervorragend für kleine Regelpakete, da es einfach zu erstellen und zu verwalten ist. Bei grösseren Regelpaketen mit Hunderten von Elementen hat das JSON-Format jedoch den Nachteil, dass mosparo viel Arbeitsspeicher benötigt, um das Regelpaket zu analysieren und zu validieren. Beim Importieren eines Regelpakets mit Tausenden von Einträgen ist diese Methode nicht mehr praktikabel.

Aus diesem Grund haben wir in Version 1.5 ein neues Format für Regelpakete eingeführt. Das neue Format ist eine ZIP-Datei, die mehrere kleinere JSON-Dateien enthält, die nacheinander geladen werden. Mit diesem Ansatz kann mosparo riesige Regelpakete mit Tausenden von Einträgen importieren und verwenden.

### ZIP-basiertes Regelpaket (ab Version 1.5)

Das ZIP-basierte Regelpaket besteht aus mindestens drei verschiedenen Dateien. Die Dateien haben folgende Namen und Anwendungsfälle:

| Dateiname         | Vorkommen        | Beschreibung                                                                                                                                                                                                                                        |
|-------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rule-package.json | Nur einmal       | Dies ist die Haupt-JSON-Datei eines Regelpakets, die die wichtigsten Informationen zum Regelpaket enthält und zudem alle anderen Dateien auflistet.                                                                                                 |
| rules-*.json      | Einmal oder mehr | Enthält die Informationen für 1000 Regeln, jedoch ohne die Regeleinträge. Es kann eine unbegrenzte Anzahl von Regeldateien geben.                                                                                                                   |
| rule-items-*.json | Einmal oder mehr | Enthält Informationen zu 1000 Regeleinträgen. Eine Datei kann Regeleinträge für mehrere Regeln enthalten und ist nicht direkt mit einer bestimmten Regel oder Regeldatei verknüpft. Es kann eine unbegrenzte Anzahl von Regeleintragsdateien geben. |

:::info
Die Anzahl von 1000 Regeln oder Regeleinträgen in einer Datei ist technisch nicht begrenzt. Wir haben einige Leistungstests durchgeführt und festgestellt, dass die Verarbeitung von jeweils 1000 Regeln und Einträgen die beste Wahl ist, da dabei der geringste RAM-Bedarf besteht. Wenn Sie Ihr eigenes Regelpaket erstellen, können Sie mehr als 1000 Regeln oder Regeleinträge speichern, aber bitte beachten Sie, dass Sie möglicherweise den verfügbaren Speicher für Ihre mosparo-Installation erhöhen müssen.
:::

:::info
Aus technischer Sicht sind die Namen der Regel- und Regeleintragsdateien nicht festgelegt, und Sie können sie nach Belieben ändern. Der einzige festgelegte Dateiname ist "rule-package.json".
:::

Die Dateischemata sind im [Spezifikationen-Repository](https://github.com/mosparo/specifications) verfügbar.

#### rule-package.json

Die Hauptdatei des Regelpakets hat folgende Struktur:

| Eigenschaft     | Typ      | Beschreibung                                                                                                                                                                                                             |
|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Gibt an, wann das Regelpaket zuletzt verändert wurde. Dieser Wert wird genutzt, um zu entscheiden, ob mosparo das Regelpaket aktualisieren muss oder ob bereits die aktuellste Version vorhanden ist.                    |
| refreshInterval | Integer  | Definiert die Zeit in Sekunden, wann mosparo das Regelpaket erneut abrufen darf. mosparo speichert das Regelpaket in einem Zwischenspeicher und erst nach Ablauf dieser Zeit wird das Regelpaket erneut heruntergeladen. |
| rFiles          | Array    | Ein Array, das alle Dateinamen der Regeldateien enthält. mosparo verwendet dieses Array, um alle Dateien im ZIP-Archiv zu verarbeiten.                                                                                        |
| riFiles         | Array    | Ein Array, das alle Dateinamen der Regeleintragsdateien in diesem Regelpaket enthält. mosparo verwendet dieses Array, um alle Dateien im ZIP-Archiv zu verarbeiten.                                                      |           

##### Beispiel

```json
{
  "lastUpdatedAt": "2026-05-01T12:00:00+00:00",
  "refreshInterval": 60,
  "rFiles": [
    "rules-0.json"
  ],
  "riFiles": [
    "rule-items-0.json"
  ]
}
```

#### rules-*.json

Die Regeldatei enthält ein Array mit 1000 Regeln. Jede Regel ist ein Objekt, das die folgenden Eigenschaften enthält:

| Eigenschaft      | Typ    | Beschreibung                                                                                                                                                                                 |
|------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | Eine eindeutige Identifikationsnummer der Regel                                                                                                                                              |
| name             | String | Bezeichnung der Regel                                                                                                                                                                        |
| description      | String | Beschreibung der Regel                                                                                                                                                                       |
| type             | String | Typ der Regel (zum Beispiel: `word` oder `user-agent`)                                                                                                                                       |
| spamRatingFactor | Float  | Bewertungsfaktor der Regel, um die Einträge der Regel zu verstärken oder abzuschwächen. Ein Wert grösser als 1.0 verstärkt die Einträge, ein Wert kleiner als 1.0 schwächt die Einträge ab.  |

##### Beispiel

```json
[
  {
    "uuid": "1f6615f2-5fcd-4d71-9271-8ac7d1e4252b",
    "name": "Name der Regel",
    "description": "Beschreibung der Regel",
    "type": "word",
    "spamRatingFactor": 1
  }
]
```

#### rule-items-*.json

Die Regeleintragsdatei enthält ein Array mit 1000 Regeleinträgen. Jeder Regeleintrag ist ein Objekt, das die folgenden Eigenschaften enthält:

| Eigenschaft | Typ    | Beschreibung                                                                                                                                           |
|-------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| ruleUuid    | UUID   | Die eindeutige Identifikationsnummer der Regel, zu der dieser Eintrag gehört.                                                                          |
| uuid        | UUID   | Eine Eindeutige Identifikationsnummer des Regel-Eintrags                                                                                               |
| type        | String | Definiert den Typ der Regel (zum Beispiel: `text` oder `regex`)                                                                                        | 
| value       | String | Der eigentliche Wert des Eintrags                                                                                                                      |
| rating      | Float  | Definiert den Spam-Wert des Eintrags. Dieser Wert wird mit dem Spam-Bewertungsfaktor multipliziert und ergibt das Bewertungsergebnis einer Einsendung. |

Wenn mosparo ein ZIP-basiertes Regelpaket importiert, verarbeitet mosparo zunächst alle Regeldateien und erstellt alle Regeln ohne Einträge. Anschliessend verarbeitet mosparo alle Regeleintragsdateien und fügt die Regeleinträge zu den zuvor erstellten Regeln hinzu.

##### Beispiel

```json
[
  {
    "ruleUuid": "1f6615f2-5fcd-4d71-9271-8ac7d1e4252b",
    "uuid": "7a2c0c93-ff35-4a34-93f6-bd7f91f3ebb0",
    "type": "text",
    "value": "test",
    "rating": 2
  }
]
```

#### Speichern des Regelpakets

Zusätzlich zur ZIP-Datei müssen Sie die Prüfsumme der ZIP-Datei am selben Speicherort speichern. Der SHA256-Hash der Datei muss erstellt und unter demselben Dateinamen, jedoch mit der Endung „.sha256“ gespeichert werden.

:::note Beispiel
**Adresse des Regelpaketes (wird in mosparo eingetragen)**<br />
https://example.com/rulepackage.zip<br />
/home/mosparo/my-rulepackage.zip

**Adresse der Checksumme:**<br />
https://example.com/rulepackage.zip.sha256<br />
/home/mosparo/my-rulepackage.zip.sha256
:::

### JSON-basiertes Regelpaket

Ein JSON-basiertes Regelpaket ist eine einfache JSON-Datei, die alle Daten enthält. Wir empfehlen zwar die Verwendung des ZIP-basierten Regelpaketformats, doch mosparo unterstützt weiterhin JSON-basierte Regelpakete, und wir haben **keine** Pläne, diese Kompatibilität in einer kommenden Version aufzuheben.

#### Speichern des Regelpakets

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

#### Aufbau eines Regelpakets

Die JSON-Struktur des Regelpakets ist als JSON-Objekt aufgebaut. Das Objekt verfügt über folgende Eigenschaften:

| Eigenschaft     | Typ      | Beschreibung                                                                                                                                                                                                             |
|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Gibt an, wann das Regelpaket zuletzt verändert wurde. Dieser Wert wird genutzt, um zu entscheiden, ob mosparo das Regelpaket aktualisieren muss oder ob bereits die aktuellste Version vorhanden ist.                    |
| refreshInterval | Integer  | Definiert die Zeit in Sekunden, wann mosparo das Regelpaket erneut abrufen darf. mosparo speichert das Regelpaket in einem Zwischenspeicher und erst nach Ablauf dieser Zeit wird das Regelpaket erneut heruntergeladen. |
| rules           | Array    | Ist ein Array, welcher alle Regeln als JSON-Objekt beinhaltet                                                                                                                                                            |

#### Aufbau einer Regel

Das JSON-Objekt einer Regel besteht aus folgenden Eigenschaften:

| Eigenschaft      | Typ    | Beschreibung                                                                                                                                                                                 |
|------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | Eine eindeutige Identifikationsnummer der Regel                                                                                                                                              |
| name             | String | Bezeichnung der Regel                                                                                                                                                                        |
| description      | String | Beschreibung der Regel                                                                                                                                                                       |
| type             | String | Typ der Regel (zum Beispiel: `word` oder `user-agent`)                                                                                                                                       |
| items            | Array  | Array mit allen Regel-Einträgen                                                                                                                                                              |
| spamRatingFactor | Float  | Bewertungsfaktor der Regel, um die Einträge der Regel zu verstärken oder abzuschwächen. Ein Wert grösser als 1.0 verstärkt die Einträge, ein Wert kleiner als 1.0 schwächt die Einträge ab.  |

#### Aufbau eines Regel-Eintrags

Das JSON-Objekt eines Regel-Eintrags besteht aus folgenden Eigenschaften:

| Eigenschaft | Typ    | Beschreibung                                                                                                                                            |
|-------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid        | UUID   | Eine Eindeutige Identifikationsnummer des Regel-Eintrags                                                                                                |
| type        | String | Definiert den Typ der Regel (zum Beispiel: `text` oder `regex`)                                                                                         | 
| value       | String | Der eigentliche Wert des Eintrags                                                                                                                       |
| rating      | Float  | Definiert den Spam-Wert des Eintrags. Dieser Wert wird mit dem Spam-Bewertungsfaktor multipliziert und ergibt das Bewertungsergebnis einer Einsendung.  |


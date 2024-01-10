---
sidebar_position: 5
sidebar_label: Regel-Pakete
description: Erfahren Sie mehr über die Verwendung von Regel-Paketen sowie den Aufbau eines Regel-Paketes.
---

# Regel-Pakete

## Regel-Pakete verwalten

Regel-Pakete fassen eine oder mehrere Regeln zusammen, die von jemandem erstellt und auf einem externen Server gehostet werden. Diese Regel-Pakete können zu mosparo hinzugefügt werden und werden in regelmässigen Abständen automatisch aktualisiert. Um die Integrität der Regel-Pakete zu gewährleisten, wird bei der Aktualisierung des Regel-Pakets eine Prüfsumme erstellt und geprüft.

Um ein neues Regel-Paket hinzuzufügen, müssen Sie die URL des Regel-Pakets kennen. Sie können zusätzlich einen Faktor angeben, mit dem das Regel-Paket verstärkt oder abgeschwächt werden kann.

Nachdem ein Regel-Paket hinzugefügt wurde, können Sie die darin enthaltenen Regeln anzeigen. Sie können die Regeln im Regel-Paket jedoch nicht bearbeiten oder löschen.

## Format der Regel-Pakete

### Speichern des Regel-Pakets

Ein Regel-Paket besteht aus einer JSON-Datei, welche auf einem Webserver zum Download bereitgestellt wird. Die JSON-Datei muss entsprechend dem Muster für Regel-Pakete sowie Regeln entsprechen. Das Schema für das Regel-Paket sowie die Regel sind im [Spezifikationen-Repository](https://github.com/mosparo/specifications) verfügbar.

Zusätzlich zu der JSON-Datei muss auf dem gleichen Webserver unter der gleichen Adresse die Checksumme der JSON-Datei abgelegt werden. Dazu muss der SHA256 Hash der Datei erstellt werden und mit dem gleichen Dateinamen, aber mit dem Suffix “.sha256” abgespeichert werden.

:::note Beispiel
Adresse des Regel-Paketes (wird in mosparo eingetragen)<br />
https://example.com/ruleset.json

Adresse der Checksumme:<br />
https://example.com/ruleset.json.sha256
:::

### Aufbau eines Regel-Pakets

Die JSON-Struktur des Regel-Pakets ist als JSON-Objekt aufgebaut. Das Objekt verfügt über folgende Eigenschaften:

| Eigenschaft     | Typ      | Beschreibung                                                                                                                                                                                                                |
|-----------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Gibt an, wann das Regel-Paket zuletzt verändert wurde. Dieser Wert wird genutzt, um zu entscheiden, ob mosparo das Regel-Paket aktualisieren muss oder ob bereits die aktuellste Version vorhanden ist.                     |
| refreshInterval | Integer  | Definiert die Zeit in Sekunden, wann mosparo das Regel-Paket erneut abrufen darf. mosparo speichert das Regel-Paket in einem Zwischenspeicher und erst nach Ablauf dieser Zeit wird das Regel-Paket erneut heruntergeladen. |
| rules           | Array    | Ist ein Array, welcher alle Regeln als JSON-Objekt beinhaltet                                                                                                                                                               |

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


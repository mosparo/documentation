---
sidebar_position: 9
sidebar_label: CLI
---

# CLI

Diese Seite beschreibt die CLI-Befehle, die in mosparo enthalten sind.

## Wartung

### Datenbankbereinigung

Eine der Hauptfunktionen von mosparo besteht darin, sicherzustellen, dass die Formulardaten nach zwei Wochen aus mosparo gelöscht werden. Um die Datenbank nach zwei Wochen zu bereinigen, führt mosparo den Bereinigungsprozess automatisch alle 6 Stunden aus, wenn ein Formular geladen wird. Wenn Sie die Bereinigung lieber zu einem bestimmten Zeitpunkt ausführen möchten, können Sie diesen Befehl verwenden und einen Cron-Job einrichten.

Dieser Befehl verwendet bei der Ausführung eine leichte Verzögerung. Der Grund dafür ist, dass sichergestellt werden soll, dass der Befehl nur einmal ausgeführt wird, insbesondere in einer Multi-Node-Konfiguration, in der mehrere Nodes den Befehl gleichzeitig ausführen könnten.

```shell
./bin/console mosparo:cleanup-database
```

#### Argumente

_Dieser Befehl bietet keine Argumente an._

#### Anwendungsfall

Verwenden Sie diesen Befehl in einem Cron-Job, um diese Funktion automatisch auszuführen.

### GeoIP2-Datenbank herunterladen

Mit diesem Befehl kann die neueste GeoIP2-Datenbank automatisch von den MaxMind-Servern heruntergeladen werden.

```shell
./bin/console mosparo:geoip2:download-database
```

#### Argumente

_Dieser Befehl bietet keine Argumente an._

#### Anwendungsfall

Verwenden Sie diesen Befehl in einem Cron-Job, um diese Funktion automatisch auszuführen.

### Health

Der Health-Befehl überprüft den Zustand der Mosparo-Installation.

```shell
./bin/console mosparo:health
```

#### Argumente

_Dieser Befehl bietet keine Argumente an._

#### Anwendungsfall

Dieser Befehl wird als Docker Healthcheck verwendet, um den Zustand des Containers automatisch zu überprüfen.

### Update

Der Update-Befehl ist ein interaktiver Befehl, mit dem mosparo automatisch auf die neueste Version aktualisiert wird.

```shell
./bin/console mosparo:self-update
```

#### Argumente

_Dieser Befehl bietet keine Argumente an._

#### Anwendungsfall

Verwenden Sie diesen Befehl, um Ihre mosparo-Installation zu aktualisieren.

## Importieren & Exportieren

### Projekteinstellungen importieren

Mit dem Befehl "Importieren" können Sie die Einstellungen aus einem zuvor exportierten Projekt in ein Projekt importieren.

```shell
./bin/console mosparo:import [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--rules|--no-rules] [--handlingExistingRules HANDLINGEXISTINGRULES] [--rulePackages|--no-rulePackages] [-f|--force] [--] <projectId> <filePath>
```

#### Argumente

| Argument               | Erforderlich | Beschreibung                                                                                                                                                                                                                                                                                                        |
|-------------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| projectId               | Erforderlich | Die Projekt-ID des Projekts, in das Sie die Einstellungen importieren möchten. Die ID eines Projekts finden Sie in der Projektliste in mosparo.                                                                                                                                                                     |
| filePath                | Erforderlich | Der Speicherort der Datei, die Sie importieren möchten.                                                                                                                                                                                                                                                             |
| --generalSettings       | Optional     | Importieren Sie die allgemeinen Einstellungen eines Projekts.                                                                                                                                                                                                                                                       |
| --no-generalSettings    | Optional     | Importieren Sie die allgemeinen Einstellungen eines Projekts nicht.                                                                                                                                                                                                                                                 |
| --designSettings        | Optional     | Importieren Sie die Designeinstellungen eines Projekts.                                                                                                                                                                                                                                                             |
| --no-designSettings     | Optional     | Importieren Sie die Designeinstellungen eines Projekts nicht.                                                                                                                                                                                                                                                       |
| --securitySettings      | Optional     | Importieren Sie die Sicherheitseinstellungen eines Projekts.                                                                                                                                                                                                                                                        |
| --no-securitySettings   | Optional     | Importieren Sie die Sicherheitseinstellungen eines Projekts nicht.                                                                                                                                                                                                                                                  |
| --rules                 | Optional     | Importieren Sie die Regeln eines Projekts.                                                                                                                                                                                                                                                                          |
| --no-rules              | Optional     | Importieren Sie die Regeln eines Projekts nicht.                                                                                                                                                                                                                                                                    |
| --handlingExistingRules | Optional     | Legt fest, wie mosparo mit bestehenden Regeln umgehen soll. Verwenden Sie `override`, um eine bereits vorhandene Regel zu überschreiben. Verwenden Sie `append`, um die Regelelemente anzuhängen, wenn bereits eine Regel vorhanden ist. Verwenden Sie `add`, um eine bestehende Regel als neue Regel hinzuzufügen. |
| --rulePackages          | Optional     | Importieren Sie die Regelpakete eines Projekts.                                                                                                                                                                                                                                                                     |
| --no-rulePackages       | Optional     | Importieren Sie die Regelpakete eines Projekts nicht.                                                                                                                                                                                                                                                               |
| --force                 | Optional     | Wenn die Option "force" gesetzt ist, führt der Befehl alle Änderungen ohne Rückfrage aus. Andernfalls wird der Befehl interaktiv ausgeführt, und Sie müssen dem Befehl mitteilen, welche Änderungen angewendet werden sollen.                                                                                       |

#### Anwendungsfall

Verwenden Sie diesen Befehl, um die Einstellungen, Regeln und Regelpakete aus einer Datei in ein Projekt zu importieren.

### Projekteinstellungen exportieren

Mit dem Befehl "Exportieren" können Sie die Einstellungen eines Projekts exportieren. Sie können die Einstellungen später in ein anderes Projekt in derselben oder einer anderen mosparo-Installation importieren.

mosparo exportiert keine sensiblen Daten, wie beispielsweise übermittelte Formulardaten oder die UUID, den öffentlichen oder privaten Schlüssel eines Projekts.

```shell
./bin/console mosparo:export [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--rules|--no-rules] [--rulePackages|--no-rulePackages] [--] <projectId> [<filePath>]
```

#### Argumente

| Argument             | Erforderlich | Beschreibung                                                                                                               |
|-----------------------|--------------|----------------------------------------------------------------------------------------------------------------------------|
| projectId             | Erforderlich | Die Projekt-ID des Projekts, das Sie exportieren möchten. Die ID eines Projekts finden Sie in der Projektliste in mosparo. |
| filePath              | Optional     | Der Speicherort, an dem der Befehl die Exportdatei speichern soll.                                                         |
| --generalSettings     | Optional     | Exportieren Sie die allgemeinen Einstellungen eines Projekts.                                                              |
| --no-generalSettings  | Optional     | Exportieren Sie die allgemeinen Einstellungen eines Projekts nicht.                                                        |
| --designSettings      | Optional     | Exportieren Sie die Designeinstellungen eines Projekts.                                                                    |
| --no-designSettings   | Optional     | Exportieren Sie die Designeinstellungen eines Projekts nicht.                                                              |
| --securitySettings    | Optional     | Exportieren Sie die Sicherheitseinstellungen eines Projekts.                                                               |
| --no-securitySettings | Optional     | Exportieren Sie die Sicherheitseinstellungen eines Projekts nicht.                                                         |
| --rules               | Optional     | Exportieren Sie die Regeln eines Projekts.                                                                                 |
| --no-rules            | Optional     | Exportieren Sie die Regeln eines Projekts nicht.                                                                           |
| --rulePackages        | Optional     | Exportieren Sie die Regelpakete eines Projekts.                                                                            |
| --no-rulePackages     | Optional     | Exportieren Sie die Regelpakete eines Projekts nicht.                                                                      |

#### Anwendungsfall

Verwenden Sie diesen Befehl, um die Einstellungen, Regeln und Regelpakete eines Projekts in eine Datei zu exportieren.

## Regelpakete

### Regelpaket importieren

Mit dem Befehl zum Importieren von Regelpaketen können Sie ein Regelpaket aus einer lokalen Datei oder über die Standardeingabe (stdin) importieren.

```shell
./bin/console mosparo:rule-package:import [-f|--file FILE] [-i|--input] [-s|--hash HASH] [--] <projectId> <rulePackageId>
```

#### Argumente

| Argument      | Erforderlich | Beschreibung                                                                                                                                 |
|---------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| projectId     | Erforderlich | Die Projekt-ID des Projekts, in das Sie das Regelpaket importieren möchten. Die ID eines Projekts finden Sie in der Projektliste in mosparo. |
| rulePackageId | Erforderlich | Die Regelpaket-ID des Regelpakets, in das Sie das Regelpaket importieren möchten. Dieses Regelpaket muss vom richtigen Typ sein.             |
| -f / --file   | Optional     | Der Pfad zur Regelpaketdatei.                                                                                                                |
| -i / --input  | Optional     | Mit dieser Option können Sie den Befehl anweisen, den Inhalt des Pakets aus der Standardeingabe zu lesen.                                    |
| -s / --hash   | Optional     | Geben Sie den SHA256-Hashwert des Inhalts des Regelpakets an.                                                                                |

Mindestens eines von `-f`/`--file` oder `-i`/`--input` ist zwingend erforderlich.

#### Anwendungsfall

Verwenden Sie diesen Befehl, um ein lokal generiertes oder gespeichertes Regelpaket zu importieren.

### Regelpakete aktualisieren

Aktualisiert alle automatischen Regelpakete. Pakete, die auf einer URL gehostet werden, werden heruntergeladen und in mosparo zwischengespeichert. Pakete, die aus einem angegebenen Dateipfad geladen werden, werden direkt geladen und in mosparo zwischengespeichert.

```shell
./bin/console mosparo:rule-package:refresh
```

#### Argumente

_Dieser Befehl bietet keine Argumente an._

#### Anwendungsfall

Verwenden Sie diesen Befehl in einem Cron-Job, um diese Funktion automatisch auszuführen.

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

Der Health-Befehl überprüft den Zustand der mosparo-Installation.

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

### Update abschliessen

Der Befehl `finalize-update` kann nach der Aktualisierung von mosparo ausgeführt werden. Der Befehl führt dieselben Schritte aus wie im Frontend, wenn der Benutzer nach einer Aktualisierung die Weboberfläche öffnet.

Der Befehl führt Folgendes aus:

- Aktualisierung der Datenbank
- Leeren des Caches
- Überprüfung auf weitere Aktualisierungsschritte, beispielsweise zur Neuberechnung der vorbereiteten Regelelemente

```shell
./bin/console mosparo:finalize-update
```

#### Argumente

| Argument         | Erforderlich | Beschreibung                                                                                                                                                              |
|---------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| --force            | Optional | Schliesst die Aktualisierung ab, auch wenn die installierte Version bereits die aktuelle Version ist.                                                                     |
| --wait-for-database | Optional | Wartet die angegebene Anzahl von Sekunden, bis die Datenbank verfügbar ist. Dies ist nützlich, wenn mosparo und die Datenbank gleichzeitig gestartet werden. Bei 0 wird nicht gewartet. _Standard: 0_ |

#### Anwendungsfall

Verwenden Sie diesen Befehl, um ein Update Ihrer mosparo-Installation abzuschliessen.

### Frontend-Ressourcen aktualisieren

Aktualisiert die Frontend-Ressourcen aller Projekte. Die Frontend-Ressourcen enthalten die Projektdesigns und werden aus den Assets der installierten Version erstellt; daher müssen sie nach einem Update aktualisiert werden. Das Update über die Administrationsoberfläche führt dies automatisch durch. Bei einer Installation, die durch Ersetzen der Dateien aktualisiert wird – beispielsweise durch das Starten eines neuen Container-Images –, wird dieses Update jedoch nie ausgeführt; stattdessen aktualisiert dieser Befehl die Ressourcen.

```shell
./bin/console mosparo:refresh-frontend-resources
```

#### Argumente

_Dieser Befehl bietet keine Argumente an._

#### Anwendungsfall

Verwenden Sie diesen Befehl, um die Frontend-Ressourcen aller Projekte Ihrer mosparo-Installation nach einem Update zu aktualisieren.

## Benutzer

### Benutzer erstellen

Der Befehl legt einen Benutzer ohne den Einrichtungsassistenten oder die Verwaltungsoberfläche an, sodass eine Installation im Rahmen einer automatisierten Bereitstellung vorbereitet werden kann.

```shell
./bin/console mosparo:user:create [--password PASSWORD] [--password-from-stdin] [--role ROLE] [--update] [--] <email>
```

#### Argumente

| Argument              | Erforderlich | Beschreibung                                                     |
|-----------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| email                | Erforderlich | Die E-Mail-Adresse des Benutzers, die gleichzeitig auch der Benutzername ist.|
| --password            | Optional | Das Passwort des Benutzers. Der Befehl fordert zur Eingabe des Passworts auf, falls dies erforderlich ist und weder diese Option noch die Option --password-from-stdin verwendet wird. |
| --password-from-stdin | Optional | Das Passwort wird statt über die Option --password aus der Standardeingabe eingelesen. |
| --role | Optional | Die Rolle des Benutzers. Kann mehrfach verwendet werden um mehrere Rollen zu definieren. Jeder Benutzer erhält die Rolle ROLE_USER. Ohne diese Option erhält ein neuer Benutzer nur die Rolle ROLE_USER. Mit der Option --update bleiben die bestehenden Rollen erhalten. |
| --update | Optional | Einen bestehenden Benutzer aktualisieren, anstatt den Vorgang mit einer Fehlermeldung abzubrechen. Das Passwort wird geändert, wenn die Option --password oder --password-from-stdin verwendet wird, und die Rollen werden geändert, wenn die Option --role verwendet wird. Ohne eine dieser Optionen fordert der Befehl zur Eingabe eines neuen Passworts auf. |

#### Anwendungsfall

Verwenden Sie diesen Befehl, um beispielsweise in einer Automatisierung einen Benutzer anzulegen oder zu aktualisieren.

## Projekt

### Projekt erstellen

Der Befehl erstellt ein Projekt, sodass eine Installation im Rahmen einer automatisierten Bereitstellung vorbereitet werden kann. Die UUID und die Schlüssel werden generiert, sofern sie nicht angegeben werden; aus diesem Grund gibt der Befehl sie aus.

```shell
./bin/console mosparo:project:create [--owner OWNER] [--host HOST] [--description DESCRIPTION] [--uuid UUID] [--public-key PUBLIC-KEY] [--private-key PRIVATE-KEY] [--private-key-from-stdin] [--update] [--] <name>
```

#### Argumente

| Argument                | Erforderlich | Beschreibung                                                                                                                                             |
|--------------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| name               | Erforderlich | Der Name des Projekts.|
| --owner         | Optional | Die E-Mail-Adresse des Benutzers, der Inhaber des Projekts wird.                                                                                    |
| --host         | Optional | Ein Host, der das Projekt nutzen wird; kann mehrfach verwendet werden.                                                                                 |
| --description | Optional | Die Beschreibung des Projekts.|
| --uuid | Optional | Die UUID des Projekts. Wird diese Option nicht verwendet, wird eine zufällige UUID generiert.|
| --public-key | Optional | Der öffentliche Schlüssel des Projekts, der zusammen mit den Optionen --private-key oder --private-key-from-stdin verwendet wird. Werden diese Optionen nicht verwendet, werden beide Schlüssel generiert. |
| --private-key | Optional | Der private Schlüssel des Projekts, der zusammen mit --public-key verwendet werden soll. Wird in der Prozessliste angezeigt; --private-key-from-stdin sollte bevorzugt verwendet werden. |
| --private-key-from-stdin | Optional | Liest den privaten Schlüssel aus der Standardeingabe anstelle der Option --private-key ein; diese Option ist in Verbindung mit --public-key zu verwenden. |
| --update | Optional | Aktualisiert den Namen, die Beschreibung, die Hosts und die Schlüssel des Projekts mit der angegebenen UUID, anstatt den Vorgang mit einer Fehlermeldung abzubrechen. Erfordert die Option --uuid. |

#### Anwendungsfall

Verwenden Sie diesen Befehl, um beispielsweise im Rahmen einer Automatisierung ein Projekt zu erstellen oder zu aktualisieren.

### Projekteinstellungen importieren

Mit dem Befehl "Importieren" können Sie die Einstellungen aus einem zuvor exportierten Projekt in ein Projekt importieren.

```shell
./bin/console mosparo:import [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--translations|--no-translations] [--submissionRules|--no-submissionRules] [--fieldRules|--no-fieldRules] [--handlingExistingFieldRules HANDLINGEXISTINGFIELDRULES] [--rulePackages|--no-rulePackages] [-f|--force] [--] <projectId> <filePath>
```

#### Argumente

| Argument                     | Erforderlich | Beschreibung                                                                                                                                                                                                                                                                                                                                   |
|------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| projectId                    | Erforderlich | Die Projekt-ID des Projekts, in das Sie die Einstellungen importieren möchten. Die ID eines Projekts finden Sie in der Projektliste in mosparo.                                                                                                                                                                                                |
| filePath                     | Erforderlich | Der Speicherort der Datei, die Sie importieren möchten.                                                                                                                                                                                                                                                                                        |
| --generalSettings            | Optional     | Importieren Sie die allgemeinen Einstellungen eines Projekts.                                                                                                                                                                                                                                                                                  |
| --no-generalSettings         | Optional     | Importieren Sie die allgemeinen Einstellungen eines Projekts nicht.                                                                                                                                                                                                                                                                            |
| --designSettings             | Optional     | Importieren Sie die Designeinstellungen eines Projekts.                                                                                                                                                                                                                                                                                        |
| --no-designSettings          | Optional     | Importieren Sie die Designeinstellungen eines Projekts nicht.                                                                                                                                                                                                                                                                                  |
| --securitySettings           | Optional     | Importieren Sie die Sicherheitseinstellungen eines Projekts.                                                                                                                                                                                                                                                                                   |
| --no-securitySettings        | Optional     | Importieren Sie die Sicherheitseinstellungen eines Projekts nicht.                                                                                                                                                                                                                                                                             |
| --translations               | Optional     | Importieren Sie die Übersetzungen eines Projekts.                                                                                                                                                                                                                                                                                              |
| --no-translations            | Optional     | Importieren Sie die Übersetzungen eines Projekts nicht.                                                                                                                                                                                                                                                                                        |
| --submissionRules            | Optional     | Importieren Sie die Einsende-Regeln eines Projekts.                                                                                                                                                                                                                                                                                            |
| --no-submissionRules         | Optional     | Importieren Sie die Einsende-Regeln eines Projekts nicht.                                                                                                                                                                                                                                                                                      |
| --fieldRules                 | Optional     | Importieren Sie die Feld-Regeln eines Projekts.                                                                                                                                                                                                                                                                                                |
| --no-fieldRules              | Optional     | Importieren Sie die Feld-Regeln eines Projekts nicht.                                                                                                                                                                                                                                                                                          |
| --handlingExistingFieldRules | Optional     | Legt fest, wie mosparo mit bestehenden Feld-Regeln umgehen soll. Verwenden Sie `override`, um eine bereits vorhandene Feld-Regel zu überschreiben. Verwenden Sie `append`, um die Regelelemente anzuhängen, wenn bereits eine Feld-Regel vorhanden ist. Verwenden Sie `add`, um eine bestehende Feld-Regel als neue Feld-Regel hinzuzufügen. |
| --rulePackages               | Optional     | Importieren Sie die Regelpakete eines Projekts.                                                                                                                                                                                                                                                                                                |
| --no-rulePackages            | Optional     | Importieren Sie die Regelpakete eines Projekts nicht.                                                                                                                                                                                                                                                                                          |
| --force                      | Optional     | Wenn die Option "force" gesetzt ist, führt der Befehl alle Änderungen ohne Rückfrage aus. Andernfalls wird der Befehl interaktiv ausgeführt, und Sie müssen dem Befehl mitteilen, welche Änderungen angewendet werden sollen.                                                                                                                  |

#### Anwendungsfall

Verwenden Sie diesen Befehl, um die Einstellungen, Regeln und Regelpakete aus einer Datei in ein Projekt zu importieren.

### Projekteinstellungen exportieren

Mit dem Befehl "Exportieren" können Sie die Einstellungen eines Projekts exportieren. Sie können die Einstellungen später in ein anderes Projekt in derselben oder einer anderen mosparo-Installation importieren.

mosparo exportiert keine sensiblen Daten, wie beispielsweise übermittelte Formulardaten oder die UUID, den öffentlichen oder privaten Schlüssel eines Projekts.

```shell
./bin/console mosparo:export [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--translations|--no-translations] [--submissionRules|--no-submissionRules] [--fieldRules|--no-fieldRules] [--rulePackages|--no-rulePackages] [--] <projectId> [<filePath>]
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
| --translations        | Optional     | Exportieren Sie die Übersetzungen eines Projekts.                                                                          |
| --no-translations     | Optional     | Exportieren Sie die Übersetzungen eines Projekts nicht.                                                                    |
| --submissionRules     | Optional     | Exportieren Sie die Einsende-Regeln eines Projekts.                                                                        |
| --no-submissionRules  | Optional     | Exportieren Sie die Einsende-Regeln eines Projekts nicht.                                                                  |
| --fieldRules          | Optional     | Exportieren Sie die Feld-Regeln eines Projekts.                                                                            |
| --no-fieldRules       | Optional     | Exportieren Sie die Feld-Regeln eines Projekts nicht.                                                                      |
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

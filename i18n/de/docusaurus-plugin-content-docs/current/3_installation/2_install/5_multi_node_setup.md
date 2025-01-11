---
sidebar_position: 5
sidebar_label: Multi-Node-Setup
description: Lesen Sie mehr über die Voraussetzungen für den Einsatz von mosparo in einem Multi-Node-Setup.
---

# Multi-Node-Setup

Angenommen, Sie möchten mosparo in einem Multi-Node-Setup verwenden, zum Beispiel um eine hochverfügbare Installation zu haben oder um mehr Nodes zur Verarbeitung der Anfragen zu verwenden. In diesem Fall müssen Sie einige zusätzliche Konfigurationen vornehmen. Da jedes Setup andere Anforderungen und Abhängigkeiten hat, können wir keine endgültige Lösung für alles dokumentieren, aber wir möchten einige Details hervorheben.

## Loadbalancer

Ein oder mehrere Loadbalancer sollten die Anfragen auf die verfügbaren Nodes verteilen. Um eine hochverfügbare Installation zu haben, müssen Sie sicherstellen, dass die Lastverteiler ebenfalls hochverfügbar sind, indem Sie beispielsweise eine virtuelle IP-Adresse gemeinsam nutzen oder eine Art von Cloud-Dienst mit aktiver Überwachung verwenden.

## Applikations-Nodes

### Konfiguration der Nodes

#### Cronjobs

Um sicherzustellen, dass nur einer der Knoten den Cronjob gleichzeitig ausführt, sollten Sie die Cronjobs entweder nur auf einem oder zu unterschiedlichen Zeiten auf jedem Knoten konfigurieren. Andernfalls verschwenden Sie möglicherweise mehr Ressourcen als nötig.

#### Gemeinsamer Cache

Sie sollten einen zusätzlichen gemeinsamen Cache aktivieren, um technische Daten zwischen den Nodes zu teilen. Derzeit speichert mosparo die geplante Ausführung der Datenbankbereinigung sowie die Blockierung für diesen Bereinigungsprozess im gemeinsamen Cache. Mit einem gemeinsamen Cache können Sie sicherstellen, dass nur ein Node die Bereinigung durchführt.

Um einen gemeinsamen Cache zu konfigurieren, setzen Sie die folgenden Umgebungsvariablen:

```editorconfig
MOSPARO_CACHE_ADAPTER=memcached # Or set it to redis if you want to use Redis
MEMCACHED_URL=memcached://127.0.0.1:11211 # Adjust this to your need...
#REDIS_URL=redis://127.0.0.1:6379 # ...or set this environment variable if you want to use Redis
MOSPARO_CLEANUP_GRACE_PERIOD_ENABLED=1 # You probably want to enable this environment variable, too
```

Lesen Sie mehr über diese Umgebungsvariablen und wie man sie konfiguriert [hier](../configure/environment_variables).

Zusätzlich können Sie mosparo den vorbereiteten CSS-Cache im gemeinsamen Cache speichern lassen, um die Synchronisation dieser Dateien zwischen den Nodes zu vermeiden (siehe unten).

### Synchronisierte Dateien

mosparo speichert einige Daten als Dateien. Um mosparo in einem Multi-Node-Setup zu verwenden, müssen Sie diese Dateien zwischen den Nodes synchronisieren. Bei den Dateien, die mosparo auf dem Node speichert, handelt es sich in der Regel um technische Dateien, die durch administrative Aufgaben (zum Beispiel die Bearbeitung eines Projekts oder die Ausführung eines Cronjobs) gespeichert werden.

Die Dateien in diesen Pfaden müssen synchronisiert werden:

- `config/env.mosparo.php` (eine Datei)
- `public/resources` (ganzes Verzeichnis, siehe unten)
- `var/data` (ganzes Verzeichnis)

Um diese Dateien zu synchronisieren, können Sie ein gemeinsam genutztes Netzwerkdateisystem verwenden oder die Dateien zwischen allen Nodes synchronisieren (in beide Richtungen, z. B. mit Unison, Syncthing oder ähnlichen Tools). Aus technischer Sicht werden diese Dateien nur durch administrative Aufgaben oder Cronjobs geändert, so dass Sie technisch gesehen auch einen Node für administrative Zwecke einrichten und diese Dateien dann von diesem einen Node mit den anderen Nodes synchronisieren könnten (in eine Richtung, z. B. mit rsync).

Wenn Sie nicht das Docker-Image verwenden, sollten Sie auch den Quellcode von mosparo zwischen diesen Knoten synchronisieren. Das können Sie mit einem einfachen `rsync`-Befehl von dem Server aus tun, auf dem Sie das Update installiert haben. Sie können natürlich auch eine Art Deployment-Tool verwenden und sicherstellen, dass alle Nodes den gleichen Quellcode haben. Da dies nur nach einem Update ein Problem darstellt, brauchen Sie keine aktive Synchronisation der Quellcode-Dateien.

#### Verzeichnis `public/resources`

Dieses Verzeichnis enthält die vorbereiteten CSS-Dateien je nach dem konfigurierten Design eines Projekts. Sie können mosparo diese CSS-Dateien in Ihrem gemeinsamen Cache statt im Dateisystem speichern lassen, so dass Sie diese Dateien nicht zwischen den Nodes synchronisieren müssen. Um diese Funktion zu aktivieren, setzen Sie die folgende Umgebungsvariable:

```editorconfig
MOSPARO_PREPARE_CSS_FILES_IN_SHARED_CACHE=1
```

Lesen Sie mehr über diese Umgebungsvariablen und wie man sie konfiguriert [hier](../configure/environment_variables).

## Datenbank

Für den Einsatz von mosparo in einer hochverfügbaren Installation benötigen Sie ausserdem eine hochverfügbare Datenbank. Dies kann mit einem Aktiv-Aktiv-Setup (bei dem mehrere aktive Server als Datenbankserver dienen) oder einem Aktiv-Passiv-Setup (bei dem nur ein Server aktiv ist, während die anderen synchronisierte passive Server sind) realisiert werden.

Wir haben keine Erfahrung mit hochverfügbaren SQLite-Konfigurationen. Wir gehen davon aus, dass SQLite wahrscheinlich nicht die richtige Wahl für ein solches Setup ist, da die Datenbankdatei auf einem gemeinsam genutzten Dateisystem (z. B. NFS) gehostet werden muss.

## Haben wir etwas vergessen?

Da hochverfügbare Installationen kompliziert sind und immer vom jeweiligen Anwendungsfall abhängen, ist es für uns schwierig, alles abzudecken. Bitte lassen Sie uns wissen, wenn wir etwas übersehen haben. Sie können uns auch mitteilen, wie Ihr Setup aussieht, was Sie getan haben, um mosparo hochverfügbar zu machen, oder was noch getan werden muss, um es in einem solchen Setup besser nutzbar zu machen. Teilen Sie uns Ihre Erfahrungen per E-Mail (feedback@mosparo.io) oder in den [GitHub Diskussionen (https://github.com/orgs/mosparo/discussions)] mit. 
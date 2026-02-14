---
sidebar_position: 3
sidebar_label: Docker
---

# Docker

Docker ist eine Software, welche Ihnen erlaubt, bereits vorbereitete Images (Pakete) einer Software ohne spezifische Konfiguration betreiben zu können. Ein installiertes Docker Image nennt man Container. Mit einem Docker Image müssen Sie für die Installation keine Dateien hochladen, Webserver konfigurieren (ausser den Reverse Proxy) und Sie müssen sich nicht um die PHP-Einstellungen kümmern.

## Anforderungen

Um das Docker Image zu verwenden, benötigen Sie mindestens
To use the Docker image, you need at least

- Docker in der Version 20.10.20 oder neuer
- Eine MySQL- oder PostgreSQL-Datenbank, entweder in einem Docker Container oder Remote

## Benutzen des Images

Es gibt zwei Möglichkeiten, wie das Docker Image verwendet werden kann. Die erste und empfohlene Möglichkeit ist die Verwendung von Docker Compose. Mit Docker Compose können Sie alle benötigten Container mit mehr oder weniger einem Befehl erstellen lassen. Sie können Ihren Container aber auch manuell direkt mit dem Docker Image erstellen.

### Mit Docker Compose

Um diese Methode zu verwenden, installieren Sie bitte zuerst Docker Compose. Sie können die Anleitung dafür hier finden: https://docs.docker.com/compose/install/

Erstellen Sie anschliessend ein Verzeichnis auf Ihrem Server. Erstellen Sie in diesem Verzeichnis eine Datei, welche Sie `docker-compose.yaml` nennen.

Fügen Sie den folgenden Inhalt in diese Datei:

```yaml
services:
  db:
    # We recommend the mariadb image
    image: mariadb:11.4
    # If you want to use MySQL, uncomment the following line (and comment the one above)
    #image: mysql:8.0.27
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=mosparo_root_pw
      - MYSQL_DATABASE=mosparo
      - MYSQL_USER=mosparo
      - MYSQL_PASSWORD=mosparo_password
    expose:
      - 3306
      - 33060
  mosparo_web:
    image: mosparo/mosparo:latest
    ports:
      - 127.0.0.1:8080:80
    restart: always
    environment:
      - MOSPARO_ENABLE_WEBSERVER=1
      - MOSPARO_ENABLE_CRON=0
    volumes:
      - mosparo_data:/mosparo-data
  mosparo_cron:
    image: mosparo/mosparo:latest
    restart: always
    environment:
      - MOSPARO_ENABLE_WEBSERVER=0
      - MOSPARO_ENABLE_CRON=1
    volumes:
      - mosparo_data:/mosparo-data
volumes:
  db_data:
  mosparo_data:
```

Wir empfehlen, die Werte `MYSQL_ROOT_PASSWORD` und `MYSQL_PASSWORD` durch Ihre eindeutigen Passwörter zu ersetzen.

Öffnen Sie ein Terminal, nachdem Sie die Datei mit dem Inhalt oberhalb erstellt haben. Wechseln Sie in das erstellte Verzeichnis und führen Sie folgenden Befehl aus um die Container zu starten:

```
docker-compose up -d
```

Sie sollten nun sehen, wie die Images heruntergeladen und die Container erstellt werden.

Nach einer gewissen Zeit sind die Arbeiten abgeschlossen und die mosparo Container wurden erstellt. Der mosparo Container ist nun installiert.

Sie sollten nun auf mosparo zugreifen können, indem Sie `127.0.0.1:8080` in Ihrem Browser eingeben.

Verwenden Sie den Namen des MySQL- oder PostgreSQL-Docker-Containers als Host für die Datenbankverbindung. Wenn Sie die Docker Compose-Datei wie oben angegeben verwenden, lautet der Name des MySQL-Containers `db`. Füllen Sie die anderen Werte wie in der Docker Compose-Datei definiert ein.

Aus Sicherheitsgründen sollten Sie den Port 8080 des mosparo Image nie direkt öffentlich verfügbar machen. Stattdessen sollten Sie einen Reverse Proxy aufsetzen. Erfahren Sie mehr dazu unter [Reverse Proxy](../configure/reverse_proxy).

### Direkt das Image benutzen

Statt Docker Compose für das Erstellen der Container zu verwenden, können Sie natürlich auch direkt das Image als Docker Container starten. Führen Sie folgenden Befehl aus um den Docker Container zu erstellen:

```
docker run -p 127.0.0.1:8080:80 -d mosparo/mosparo
```

Das Image wird anschliessend heruntergeladen und der Container erstellt. Wenn Sie eine MySQL- oder PostgreSQL-Datenbank in einem Docker Container verwenden möchten, müssen Sie den mosparo Container mit dem Container verknüpfen.

```
docker run –link mysql-server -p 127.0.0.1:8080:80 -d mosparo/mosparo
```

:::info
Bitte passen Sie den Container-Name `mysql-server` an den von Ihnen gewählten Namen an.
:::

Sie sollten nun auf mosparo zugreifen können, indem Sie `127.0.0.1:8080` in Ihrem Browser eingeben.

Verwenden Sie den Namen des MySQL- oder PostgreSQL-Docker-Containers als Host für die Datenbankverbindung.

Aus Sicherheitsgründen sollten Sie den Port 8080 des mosparo Image nie direkt öffentlich verfügbar machen. Stattdessen sollten Sie einen Reverse Proxy aufsetzen. Erfahren Sie mehr dazu unter [Reverse Proxy](../configure/reverse_proxy).

## Unpriviligertes Image

Wir bereiten auch ein unprivilegiertes Image mit mosparo vor. Das unprivilegierte Image benötigt zum Starten des Containers den Root-Benutzer nicht. Es ist kompatibel mit dem Sicherheitskontext `restricted-v2` von OpenShift. Die folgende Tabelle zeigt Ihnen die Unterschiede zwischen der Standard- und der unprivilegierten Version:

| Unterschied           | Beschreibung                                                                                                                                                                                                                                                                 |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Keine Cronjobs        | Das Image führt keine Cronjobs aus. Das liegt daran, dass die Cron-Software Root benötigt, um korrekt zu starten. Die offizielle Empfehlung für Kubernetes lautet, [Kubernetes Cronjobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) zu verwenden. |
| Funktionalität wählen | Im unprivilegierten Image können Sie wählen, ob nginx, PHP oder beides im Container laufen soll. Weitere Informationen finden Sie in den Umgebungsvariablen.                                                                                                                 |
| Freigegebener Port    | Dieses Image gibt den Port 8080 für den Webserver frei, im Gegensatz zu Port 80 im Standard-Image.                                                                                                                                                                           |
| Volumes               | Das unprivilegierte Abbild verwendet drei verschiedene Volumes, um die verschiedenen beschreibbaren Verzeichnisse durch beschreibbare Volumes ohne zu linken zu ersetzen.                                                                                                    |
| Konfigurationsdatei   | Der Pfad zur Konfigurationsdatei wird als Umgebungsvariable definiert. Das Image erwartet ein Volume für `/mosparo-config`, in dem die Konfigurationsdatei gespeichert ist.                                                                                                  |

### Mit Docker Compose

Verwenden Sie die folgende Docker Compose-Konfiguration, um das unprivilegierte Image zu verwenden:

```yaml
services:
  db:
    # We recommend the mariadb image
    image: mariadb:11.4
    # If you want to use MySQL, uncomment the following line (and comment the one above)
    #image: mysql:8.0.37
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=mosparo_root_pw
      - MYSQL_DATABASE=mosparo
      - MYSQL_USER=mosparo
      - MYSQL_PASSWORD=mosparo_password
    expose:
      - 3306
      - 33060
  mosparo_web:
    image: mosparo/mosparo-unprivileged:latest
    ports:
      - 8080:8080
    restart: always
    environment:
      - MOSPARO_RUN_NGINX=1
      - MOSPARO_RUN_PHP_FPM=1
      - MOSPARO_CONFIG_FILE_PATH=/mosparo-config/env.mosparo.php
      #- MOSPARO_CLEANUP_GRACE_PERIOD_ENABLED=1
    volumes:
      - mosparo_config:/mosparo-config
      - mosparo_public_resources:/mosparo/public/resources
      - mosparo_var:/mosparo/var
volumes:
  db_data:
  mosparo_config:
  mosparo_public_resources:
  mosparo_var:
```

## Umgebungsvariablen

mosparo in einem Docker Container speichert die Konfiguration von mosparo in einer PHP-Datei wie auch bei einer normalen Installation. Sie können die Konfiguration von mosparo daher nicht über Umgebungsvariablen definieren.

Aber es gibt ein paar zusätzliche Umgebungsvariablen, mit welchen Sie das Verhalten vom Docker Image beeinflussen können. Erfahren Sie dazu mehr auf der Seite der [Umgebungsvariablen](../configure/environment_variables).

## Gesundheitsprüfung

Das Docker-Image verwendet den Docker Healthcheck, um den Zustand des Docker-Containers zu überprüfen. Wenn die Verbindung zur Datenbank nicht möglich ist oder etwas anderes nicht stimmt, wird der Healthcheck dieses Problem erkennen.
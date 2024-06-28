---
sidebar_position: 3
sidebar_label: Docker
---

# Docker

Docker is a software, which allows you to run already prepared images of software on your own server. The running Docker image on your server is called container. With the Docker image you do not have to upload files, configure web servers (except the reverse proxy) and do not have to take care about the PHP settings.

## Requirements

To use the Docker image, you need at least

- Docker version 20.10.20 or newer
- One MySQL or PostgreSQL database, in a Docker container or somewhere else

## Use the image

There are two options to use the Docker image. The first and recommended option is to use Docker Compose. With Docker Compose you can create all the needed containers with more or less one command. But you can also create your Docker container manually by using the image directly.

### Use Docker Compose

To use this method, please install Docker Compose first. You can find the manual here: https://docs.docker.com/compose/install/

Now you should create a new directory on your server. In this directory, please create a new file called `docker-compose.yaml`.

Insert the following content into this file:

```yaml
services:
  db:
    # We recommend the mariadb image
    image: mariadb:10.10
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

We recommend replacing the `MYSQL_ROOT_PASSWORD` and the `MYSQL_PASSWORD` values with your unique passwords.

After you created the file with the content above, open a terminal. Navigate to your newly created directory and run the following command to create and start the containers:

```
docker-compose up -d
```

You should see that the images get downloaded and the containers get created.

After some time, the work should be completed and the mosparo container created. The mosparo container is now installed.

You should be able to access mosparo when you enter `127.0.0.1:8080` in your browser.

Use the name of the MySQL or PostgreSQL Docker container as the host for the database connection. If you use the Docker Compose file as provided, the name of the MySQL container is `db`. Fill in the other values as defined in the Docker Compose file.

Because of security reasons, you should not make the port 8080 of the mosparo image publicly available. Instead, you have to set up a reverse proxy. For this, see [reverse proxy](../reverse_proxy).

### Use the image directly

Instead of using the Docker Compose method, you can of course create the container directly with the image. For this run the following command:

```
docker run -p 127.0.0.1:8080:80 -d mosparo/mosparo
```

The image will be downloaded and the container created. If you want to use a dockerized MySQL or PostgreSQL database, you have to link the mosparo container to this container.

```
docker run –link mysql-server -p 127.0.0.1:8080:80 -d mosparo/mosparo
```

:::info
Please adjust the container name `mysql-server` to your setup.
:::

You should be able to access mosparo when you enter `127.0.0.1:8080` in your browser.

Use the name of the MySQL or PostgreSQL Docker container as the host for the database connection.

Because of security reasons, you should not make the port 8080 of the mosparo image publicly available. Instead, you have to set up a reverse proxy. For this, see [reverse proxy](../reverse_proxy).

## Environment variables

mosparo stores the configuration of mosparo in a PHP file as if you install it normally, so you cannot set the configuration by using environment variables.

But there are some additional environment variables which you can use to change the behavior of the Docker image:

| Name                     | Default                 | Description                                                                                                                                                                                      |
|--------------------------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MOSPARO_ENABLE_WEBSERVER | `1`                     | Allows to enable or disable the webserver in the mosparo image                                                                                                                                   |
| MOSPARO_ENABLE_CRON      | `1`                     | Allows to enable or disable the cron jobs in the mosparo image                                                                                                                                   |
| MOSPARO_UPDATES_ENABLED  | `0`                     | Enables or disables the updates inside mosparo. This should be disabled all the time in a Docker container since updating mosparo in a Docker environment should be happen by updating the image |
| TRUSTED_PROXIES          | `127.0.0.1,REMOTE_ADDR` | Defines which proxies mosparo should trust. The default settings allow all proxies. This is why you need a reverse proxy in front of mosparo and should not expose it to the public directly.    |


---
sidebar_position: 6
sidebar_label: Environment variables
description: Learn more about enabling and configuring additional features with environment variables.
---

# Environment variables

## Available variables

### General variables

| Variable name                             | Type    | Default value           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-------------------------------------------|---------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MOSPARO_UPDATES_ENABLED                   | Boolean | `1`                     | Enables or disables the option to update mosparo within the user interface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| MOSPARO_AUTOMATIC_UPDATE_CHECK_ENABLED    | Boolean | `1`                     | Enables or disables the automatic check for a new version when accessing the user interface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| MOSPARO_ENV_SUFFIX                        | String  | _empty_                 | With the suffix, it's possible to adjust the mosparo configuration file name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| MOSPARO_CACHE_ADAPTER                     | String  | `filesystem`            | This sets the adapter for the shared cache. The shared cache helps share cache data between multiple nodes. Available options: `filesystem`, `memcached`, `redis`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| MOSPARO_CLEANUP_GRACE_PERIOD_ENABLED      | Boolean | `0`                     | When enabled, the frontend API controller of mosparo will not clean up the database for another 24 hours. This is helpful if you use a cronjob to clean up the database every night. If so, you do not want to let the frontend API controller do this job. For this, you can enable the grace period, meaning the frontend API controller will wait another 24 hours before the cleanup starts. In these 24 hours, the cronjob can clean the database again, so the frontend API controller will technically never clean up the database, except if the cronjob was not executed successfully.                                                                                                                                                                            |
| MOSPARO_PREPARE_CSS_FILES_IN_SHARED_CACHE | Boolean | `0`                     | If enabled, mosparo will store the prepared CSS files in the shared cache instead of in a physical file on your server. This is useful if you use multiple nodes for mosparo since you do not have to synchronize the files between your nodes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| MOSPARO_HEALTH_ALLOW_LIST                 | String  | `127.0.0.1,::1`         | Only IP addresses listed in this environment variable can access the health API. By default, only the localhost can access the health check. You can add IP addresses (for example, 10.11.12.13) or subnets with the subnet mask in CIDR notation (for example, 10.11.12.0/24), separated by a comma (`,`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| MEMCACHED_URL                             | String  | `memcached://localhost` | Connection details to connect to your memcached cache. Has no effect as long as `MOSPARO_CACHE_ADAPTER` is not set to `memcached`. Find configuration examples in the [Symfony documentation](https://symfony.com/doc/current/components/cache/adapters/memcached_adapter.html).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| REDIS_URL                                 | String  | `redis://localhost`     | Connection details to connect to your Redis cache. Has no effect as long as `MOSPARO_CACHE_ADAPTER` is not set to `redis`. Find configuration examples in the [Symfony documentation](https://symfony.com/doc/current/components/cache/adapters/redis_adapter.html).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TRUSTED_PROXIES                           | String  | `127.0.0.1`             | If you deploy mosparo behind a load balancer or any other kind of reverse proxy, mosparo does not know the real IP address of the user. For this, your reverse proxy will send special headers to mosparo (for example, X-Forwarded-For). But mosparo (and Symfony in general) will accept these headers only from the trusted proxies. For this, you have to list the IP addresses of your reverse proxies in this variable so mosparo knows which ones it can trust. You can add IP addresses (for example, 10.11.12.13) or subnets with the subnet mask in CIDR notation (for example, 10.11.12.0/24), separated by a comma (`,`). You can add `REMOTE_ADDR` to accept all clients, but you should make sure that only your reverse proxies can access your web server. |

### Docker-specific variables

| Variable name            | Type    | Default value | Description                                              |
|--------------------------|---------|---------------|----------------------------------------------------------|
| MOSPARO_ENABLE_WEBSERVER | Boolean | `1`           | Enables or disables the web server in the mosparo image. |
| MOSPARO_ENABLE_CRON      | Boolean | `1`           | Enables or disables the cron jobs in the mosparo image.  |

## Configuration

### `.env.local` file

For a normal installation (not a Docker-based one), the recommended approach to configuring these environment variables is to create a new file named `.env.local` and add the required environment variables with the needed values to it.

Copy the file `.env.local.dist` and adjust the values for an easier start. The file contains all the possible variables and describes how to use them.

### Docker

#### Docker Compose

If you use Docker Compose to configure the containers, set the environment variables in the Docker Compose file.

```
  ...
  mosparo_web:
    image: mosparo/mosparo:latest
    ports:
      - 8080:80
    restart: always
    environment:
      - MOSPARO_ENABLE_WEBSERVER=1
      - MOSPARO_CLEANUP_GRACE_PERIOD_ENABLED=1
      - MOSPARO_CACHE_ADAPTER=memcached
      - MEMCACHED_URL=memcached://memcached
  ...
```

#### Docker directly

When starting a Docker container via the command line, you can specify the environment variables as an argument:

```shell
docker run -d -e MOSPARO_CACHE_ADAPTER='memcached' -p 8080:80 --name mosparo_container mosparo/mosparo:latest
```

Learn more about this in the [Docker documentation](https://docs.docker.com/engine/containers/run/#environment-variables).

### Other options

You can probably also specify the environment variables in your webserver configuration (depending on your webserver). For this, check your webserver's documentation.
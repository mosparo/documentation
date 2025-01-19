---
sidebar_position: 5
sidebar_label: Multi-node setup
description: Read more about the requirements for using mosparo in a multi-node setup.
---

# Multi-node setup

Suppose you want to use mosparo in a multi-node setup, for example, to have a high-availability setup or to use more nodes to process the requests. In that case, you must do some additional configuration to make it work. Since every setup has different requirements and dependencies, we cannot share a final solution for everything, but we want to highlight some details.

## Load balancer

One or multiple load balancers should balance the requests between the available nodes. To have a high-availability setup, you have to ensure that the load balancers are also high-availability, for example, by sharing a virtual IP address or using some kind of cloud service with active monitoring.

## Application nodes

### Nodes setup

#### Cron jobs

To ensure that only one of the nodes executes the cron job simultaneously, you should either configure the cron jobs only on one or at different times on every node. Otherwise, you may waste more resources than needed.

#### Shared cache

You should enable an additional shared cache to share technical data between the nodes. Currently, mosparo stores the scheduled execution of the database cleanup in the shared cache and the lock for this cleanup process. With a shared cache, you can ensure that only one node executes the cleanup.

To configure a shared cache, set the following environment variables:

```editorconfig
MOSPARO_CACHE_ADAPTER=memcached # Or set it to redis if you want to use Redis
MEMCACHED_URL=memcached://127.0.0.1:11211 # Adjust this to your need...
#REDIS_URL=redis://127.0.0.1:6379 # ...or set this environment variable if you want to use Redis
MOSPARO_CLEANUP_GRACE_PERIOD_ENABLED=1 # You probably want to enable this environment variable, too
```

Read more about these environment variables and how to configure them [here](../configure/environment_variables).

Additionally, you can let mosparo store the prepared CSS cache in the shared cache to avoid synchronizing these files between the nodes (see below).

### Synchronized files

mosparo stores some data as files. To use mosparo in a multi-node setup, you have to synchronize these files between the nodes. The files that mosparo stores on the node are generally technical files stored by administrative tasks (for example, editing a project or executing a cron job).

The files in these paths must be synchronized:

- `config/env.mosparo.php` (one file)
- `public/resources` (whole directory, see below)
- `var/data` (whole directory)

To synchronize these files, you can use a shared network file system or synchronize the files between all the nodes (two-way, for example, with Unison, Syncthing, or similar tools). From a technical perspective, these files only get changed by administrative tasks or cron jobs, so technically, you could also set up one node for administrative purposes and then synchronize these files from this one node to the other nodes (one-way, for example, with rsync).

If you do not use the Docker image, you should also synchronize the source code of mosparo between these nodes. You can do that with a simple `rsync` command from the server where you installed the update. You can, of course, also use some kind of deployment tool and make sure that all the nodes have the same source code. Since this only is a problem after an update, you do not need an active synchronization all the time for the source code files.

#### Directory `public/resources`

This directory contains the prepared CSS files depending on the configured design of a project. You can let mosparo store these CSS files in your shared cache instead of the file system, so you do not have to synchronize these files between the nodes. To enable that feature, set the following environment variable:

```editorconfig
MOSPARO_PREPARE_CSS_FILES_IN_SHARED_CACHE=1
```

Read more about these environment variables and how to configure them [here](../configure/environment_variables).

## Database

You also need a high-availability database to use mosparo in a high-availability setup. This can be done with an active-active (where multiple active servers serve as database servers) or an active-passive setup (where only one server is active while the others are synchronized passive servers).

We do not have any experience with high-availability SQLite setups. We assume that SQLite is probably not the right choice for such a setup since the database file must be hosted on a shared filesystem (for example, NFS).

## Did we miss something?

Since high-availability setups are complicated to build and always depend on the use case, it's hard for us to have everything covered. Please let us know if we missed something. You can also let us know how your setup looks, what you did to make mosparo high-available, or what needs to be done to make it better usable in such a setup. Tell us your experience by email (feedback@mosparo.io) or in the [GitHub discussions](https://github.com/orgs/mosparo/discussions). 
---
sidebar_position: 3
sidebar_label: Set up cron jobs
description: With cron jobs, automatic tasks are carried out regularly.
---

# Set up cron jobs

After the installation of mosparo is complete, you should set up the cron jobs with which mosparo performs various automatic actions.

We recommend that you configure the following cron jobs:

```
13 */2 * * * php [mosparoPath]/bin/console mosparo:cleanup-database`
36 3 * * * php [mosparoPath]/bin/console mosparo:rulesets:refresh
```

If you are using GeoIP2, please configure the following cron job:

```
25 4 * * * php [mosparoPath]/bin/console mosparo:geoip2:download-database
```

You can freely choose the execution times. However, it is recommended to run the cleanup of the database (`mosparo:cleanup-database`) several times a day, while updating the rule packages and the GeoIP2 database is only useful once a day.

Please replace `[mosparoPath]` with the absolute path of the mosparo installation. This may vary depending on hosting and server type.

If necessary, adjust the PHP executable as well. It may be that you must add the version to the executable name according to your hosting, or a different path is used.

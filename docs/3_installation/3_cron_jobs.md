# Set up cron jobs

After the installation of mosparo is complete, you should set up the cron jobs with which mosparo performs various automatic actions. You can choose between executing the commands via the CLI or the web cron job.

## CLI cron jobs

We recommend that you configure the following cron jobs:

```
13 */2 * * * php [mosparoPath]/bin/console mosparo:cleanup-database`
36 3 * * * php [mosparoPath]/bin/console mosparo:rulesets:refresh
```

If you are using GeoIP2, please configure the following cron job:

```
25 4 * * * php [mosparoPath]/bin/console mosparo:geoip2:download-database
```

You can freely choose the execution times. However, it is recommended that the database be cleaned several times a day (`mosparo:cleanup-database`), while updating the rule packages is required only once a day. The GeoIP2 database should be updated only once daily (or weekly).

Please replace `[mosparoPath]` with the absolute path of the mosparo installation. This may vary depending on hosting and server type.

If necessary, adjust the PHP executable as well. Depending on your hosting, you may need to add the version to the executable name or use a different path.

## Web cron job

You can also use the web cron job to execute these functions, especially if it's impossible to execute the CLI cron jobs, for example, because of disabled PHP functions.

To use the web cron job, please enable it in the administration of mosparo. Choose "Cron jobs" in the administration overview and check the checkbox on the right side. To make the cron job more secure, you have to specify a secret key. mosparo will automatically generate a key, but you can also enter a custom one. You can also set the waiting time between cron job executions and the GeoIP2 refresh interval (if you've enabled GeoIP2). Save the settings by clicking the button at the bottom of the form.

After saving, you'll see the full URL to the web cron job on the left side and an example of how you could set up the cron job. Please configure the cron job in the server, the hosting control panel, or your remote cron job service accordingly.

To enhance the security of the cron job, you can also limit access to the web cron job in the Security settings in the administration. You can find more information about that [here](../administration/security_settings#web-cron-job-access).
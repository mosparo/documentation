---
sidebar_position: 3
sidebar_label: Microsoft IIS
description: To use Microsoft IIS as a web server for mosparo, you must make some adjustments in the configuration.
---

# Microsoft IIS

## General installation

The installation of Microsoft IIS and the configuration of PHP for Microsoft IIS are outside the scope of this documentation and, therefore, are not documented here.

The installation of mosparo is generally the same as that of the other web servers. The only additional required step is the configuration of the rewrite rules.

## Configure rewrite rules

To run mosparo on a Microsoft IIS web server, add the following `web.config` file to provide the correct URL rewriting.

Please put the content below in the `web.config` file in the `public` directory of your mosparo installation.

```xml title="C:\inetpub\wwwroot\mosparo.example.com\public\web.config"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="URL Rewrite for mosparo" stopProcessing="true">
                    <match url="^(.*)$" ignoreCase="false" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="index.php" appendQueryString="true" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

For the rewrite rules, you need the IIS URL Rewrite Module. You can find more information about the module here: https://www.iis.net/downloads/microsoft/url-rewrite

You are not required to use the provided `web.config` file above. You can also extend an existing `web.config` configuration file in the `public` directory of your mosparo installation.

## Known issues

Not everything works great with Microsoft IIS as a web server. The following issues are known, and we will try to fix these in the future:

- To make downloads (Updates, GeoIP2 databases, Rulesets) possible with mosparo, you must configure the CA file for `curl` in the PHP settings. You can find more information about this here: https://www.php.net/manual/en/curl.configuration.php
- The update process is slow on Microsoft IIS/Microsoft Windows compared to installations on Linux. The main reason for this is the calculations of the hashes for the existing files. We will try to fix this issue in the future. For now, you must increase the `max_execution_time` in PHP and the `Activity Timeout` in the FastCGI setup in IIS to a high enough value. In our tests, it took more than 30 seconds to update mosparo, but not more than 60 seconds, but we cannot guarantee these values. As an alternative, it's possible to update mosparo via the CLI command (`mosparo:self-update`, see [Installing the update from the command line](./update#installing-the-update-from-the-command-line))
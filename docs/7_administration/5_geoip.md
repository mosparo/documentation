---
sidebar_position: 5
sidebar_label: GeoIP2
description: Learn how to configure GeoIP2.
---

# GeoIP2

When a user opens a form, mosparo will receive the IP address of that user. However, the IP address is only a combination of numbers (and letters in IPv6), providing almost no direct information about the origin.

There are databases with which the IP address can be assigned to a country and a provider to know from where a user comes.

:::info
Theoretically, a more precise assignment to the city is possible, but mosparo only uses the country and provider database at most.
:::

To use the GeoIP2 database in mosparo, you need an account ID and a license key. You can request a free license key on MaxMind's website: https://dev.maxmind.com/geoip/geolite2-free-geolocation-data

If you don't have an account, create one first. You can find the account ID in your MaxMind account under "Account Information". You can request the license key under "Manage License Keys" in your MaxMind account.

Paste the account ID and the license key into the fields in mosparo and press the "Save" button.

You can then press the "Download database" button on the right side to download the database. If everything works correctly, you will see a message that GeoIP2 is available. In addition, the update time of the databases is displayed.

:::info
If you have requested the license key, it will take some time to use it by mosparo. Therefore, an error message may be displayed when downloading the database. In this case, wait a few minutes and try again.
:::

We recommend that you set up automatic updating using the cronjob (see [Set up Cron jobs](../installation/cron_jobs)).

:::caution
Please note that the database is not an accurate and guaranteed method of locating a user. If you use GeoIP2 to block countries, you should note that you could also block good users.
:::

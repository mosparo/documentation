---
sidebar_position: 4
sidebar_label: Updates
description: Read more about the update web interface.
---

# Updates

mosparo has an update system to help you install the latest version of mosparo. 

## Choose update channel

If you want to test new versions of mosparo before they are released, you can change the update channel to `Develop` or `Beta`.

The `Beta` channel contains the beta version for the stable major, while the `Develop` channel contains the next major version.

:::caution
Please note that the `Develop` and `Beta` channel versions are not intended for production use and may contain bugs or issues.
:::

:::info
If you see an error message when you check for updates, mosparo may have no internet connection. Please check the internet access recommendations in the [requirements](../installation/requirements#access-to-the-internet).
:::

## Update mosparo

Read more about updating mosparo in [Update mosparo](../installation/update).

## Automatic update check

With version 0.4, mosparo executes an automatic update check once a day. If an update is available, you will see an orange button in the header of mosparo.

:::info
mosparo does not automatically install the update. You have to start the update manually.
:::

If you do not want this automatic check, you can disable it by setting the environment variable.

To disable the automatic check, please create the file `.env.local` in the root of mosparo and set the variable `MOSPARO_AUTOMATIC_UPDATE_CHECK_ENABLED` to `0`. You can also copy or rename the file `.env.local.dist` and adjust the value of the variable in there.
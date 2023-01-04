---
sidebar_position: 4
sidebar_label: Updates
description: There are two ways to update mosparo.
---

# Updates

mosparo has an update system to help you install the latest version of mosparo. If you want to test new versions of mosparo before they are released, you can change the update channel to "Develop."

:::caution
Please note that the "Develop" channel versions are not intended for production use and may contain bugs or issues.
:::

## Installing the update via the web interface

Click on the "Check for update" button to check if a new version is available. mosparo will then contact the mosparo update service and retrieve the current version information. It then determines whether the installed version is older than the latest available version. If this is the case, a button will present with which you can update mosparo.

:::warning
mosparo does **not** back up the configuration or the database before installing the new version. Please ensure you have backed up mosparo and the database before proceeding with the update.
:::

After you have pressed the "Install update" button, the automatic update process is executed. mosparo downloads the selected version, unpacks the archive, copy the files, and performs further verification and update actions. After the new version is installed, you will see a corresponding message. Click the button provided to complete the update.

Before using mosparo for the first time after an update, ensure that the cache is renewed before using mosparo. You will also see this message if you update mosparo manually.

## Installing the update from the command line

If you want, you can also install the update via the command line, for example, via SSH.

To do this, change to the directory of your mosparo installation and execute the following command:

```
php bin/console mosparo:self-update
```

Follow the instructions of the command. If necessary, adapt the PHP Executable to your system.

:::warning
mosparo does **not** back up the configuration or database before installing the new version. Please ensure you have backed up mosparo and the database before proceeding with the update.
:::
---
sidebar_position: 7
sidebar_label: Update mosparo
description: There are three ways to update mosparo.
---

# Update mosparo

:::info
If your mosparo installation is running in the `dev` environment (where the environment variable `APP_ENV` is set to `dev`; this usually is only a problem if installed from source), the update process will work and show positive results, but mosparo will not update the mosparo installation itself. Instead, mosparo will download and execute the changes in a temporary directory. Please use Git to check out the latest version.
:::

## Installing the update via the web interface

As administrator of a mosparo installation, you can open the update web interface in the administration interface (see more about [Updates](../administration/updates)).

Click the "Check for update" button to check if a new version is available. mosparo will then contact the mosparo update service and retrieve the current version information. It then determines whether the installed version is older than the latest version. If this is the case, a button will appear with which you can update mosparo.

:::warning
mosparo does **not** back up the configuration or the database before installing the new version. Please ensure you have backed up mosparo and the database before proceeding with the update.
:::

After you have pressed the "Install update" button, the automatic update process is executed. mosparo downloads the selected version, unpacks the archive, copies the files, and performs further verification and update actions. After the new version is installed, you will see a corresponding message. Click the button provided to complete the update.

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

## Updating manually

You can also update mosparo manually. For this, you must download the latest version from the mosparo website, extract the archive and upload the files into your mosparo directory.

We recommend making a backup of the file `config/env.mosparo.php` since, in this file, your secret key for the encryption is stored. If you lose this key, your data can no longer get decrypted.

After you've uploaded all files, you have to execute the following commands to finalize the update:

```
php bin/console cache:clear
php bin/console doctrine:migrations:migrate
```
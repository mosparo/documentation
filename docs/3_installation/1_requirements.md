---
sidebar_position: 1
sidebar_label: Requirements
description: All requirements that you must fulfill for mosparo to function correctly.
---

# Requirements

To install mosparo on a server, your server must meet the following requirements:

- Domain or subdomain you own
- maximum 100 MB free disk space
- SSL certificate for the selected domain or subdomain
- PHP 7.4 or newer
  :::caution
  If you are using PHP 8.1, you must use at least 8.1.10
  :::
- The following PHP extensions:
  - ctype
  - gd
  - iconv
  - intl
  - json
  - pdo
  - pdo_mysql
  - openssl
  - zip
  - posix (optional)
  - sodium (optional)
  - Zend OPCache (optional)
  - curl (optional)
- MySQL database

## Access to the internet

A working internet connection is required to download the updates and the rule packages.

### With the `curl` extension

If you've installed and enabled the `curl` extension, you should ensure that the functions `curl_exec` and `curl_multi_exec` are not on the list of disabled functions. If you did that for security, we recommend disabling the `curl` extension completely.

### Without the `curl` extension

Please ensure that in your PHP configuration file (`php.ini`), the option `allow_url_fopen` is set to 1. Otherwise, PHP cannot connect to a remote server.

### Additional information

- In the mosparo version before 0.4, no clear error message is visible when the connection cannot be established successfully. If you see an error 500 while checking for updates, please ensure the settings are correct, as described above.
- mosparo works without an external connection. To keep the maximum possible security, you can disable `curl_exec` and `curl_multi_exec` and set `allow_url_fopen` to 0 in the PHP configuration for your webserver. Do not add the functions or do not set the setting to 0 in the configuration for the CLI. To be able to update mosparo, you have to use the CLI command instead of the web interface. The cron job to refresh the rule packages is already a CLI process, so it should work with that solution.
- Please keep in mind that at the place where you integrate mosparo (for example, your WordPress website), access to remote URLs is required, so `allow_url_fopen` has to be set to `1` and the functions `curl_exec` and `curl_multi_exec` cannot be listed as disabled functions.
- You do not need the `curl` extension for mosparo. mosparo can download files with the standard PHP functionality. If you enabled the `curl` extension but disabled the two functions, mosparo will try to use `curl` and then fail because of the disabled functions. Please do not enable the module if you want to disable these two methods.

:::info
With v0.4, we will add a check to the setup to display a warning if the configuration will block updates and rule package downloads. Additionally, in all cases where mosparo will download something, a better error message will be visible if the settings block a download.
:::

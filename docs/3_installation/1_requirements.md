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
- PHP 8.1.10 or newer
- The following PHP extensions:
  - ctype
  - curl
  - dom
  - filter
  - gd
  - iconv
  - intl
  - json
  - libxml
  - openssl
  - pcre
  - pdo
  - pdo_mysql or pdo_pgsql
  - simplexml
  - tokenizer
  - xml
  - zip
  - posix (optional)
  - sodium (optional)
  - Zend OPCache (optional)
- MySQL or PostgreSQL database

## Access to the internet

A working internet connection is required to download the updates and the rule packages.

mosparo itself works without an external connection. To keep the maximum possible security, you can disable `curl_exec` and `curl_multi_exec` and set `allow_url_fopen` to 0 in the PHP configuration for your webserver. Do not add the functions or do not set the setting to 0 in the configuration for the CLI. To be able to update mosparo, you have to use the CLI command instead of the web interface. The cron job to refresh the rule packages is already a CLI process, so it should work with that solution.

Updating the GeoIP2 database is only possible with the `curl` extension.

Please keep in mind that at the place where you integrate mosparo (for example, your WordPress website), access to remote URLs is required, so `allow_url_fopen` has to be set to `1` and the functions `curl_exec` and `curl_multi_exec` cannot be listed as disabled functions.


---
sidebar_position: 1
sidebar_label: Prerequisites
---

# Prerequisites

In order for mosparo to be installed on a server, there are the following prerequisites, which must be met:

- Domain or subdomain you own
- maximum 100 MB free disk space
- SSL certificate for the selected domain or subdomain
- PHP 7.4 or newer
  :::caution
  If you are using PHP 8.1, you must use at least 8.1.10
  :::
- The following PHP extensions:
  - ctype
  - Iconv
  - Intl
  - json
  - pdo
  - pdo_mysql
  - openssl
  - zip
  - Posix (optional)
  - sodium (optional)
  - Zend OPCache (optional)
- MySQL database

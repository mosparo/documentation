---
sidebar_position: 1
sidebar_label: Prerequisites
description: All requirements that must be fulfilled for mosparo to function correctly.
---

# Prerequisites

To install mosparo on a server, the following prerequisites must be met:

- Domain or subdomain you own
- maximum 100 MB free disk space
- SSL certificate for the selected domain or subdomain
- PHP 7.4 or newer
  :::caution
  If you are using PHP 8.1, you must use at least 8.1.10
  :::
- The following PHP extensions:
  - ctype
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
- MySQL database

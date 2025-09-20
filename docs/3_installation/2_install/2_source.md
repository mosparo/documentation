---
sidebar_position: 3
sidebar_label: Install from source
description: Install mosparo directly with the source.
---

# Install from the source

Alternatively, you can install mosparo directly from our Git repository. The installation is more complex, but if, for example, you want to use your deployment tool, this variant is more recommended.

## Prerequisites

In addition to the requirements described in the [requirements](../requirements) regarding your web hosting, you need for this method
- Git
- Composer
- Yarn
- Node.js (18)

## Installation

1. Clone the repository git
```
git clone git@github.com:mosparo/mosparo.git
```
2. Change to the directory of the mosparo repository
3. _(Optional)_ If you want to use the latest stable version, you should check out the tag of the last version
```
git checkout tags/[lastVersionTag]
```
:::note
Please replace `[lastversionTag]` with the name of the latest tag (see https://github.com/mosparo/mosparo/tags).
:::
4. Run
```
composer install –-no-dev
```
5. Install all frontend packages
```
yarn install
```
6. Generate all frontend resources
```
yarn encore production
```
7. If you want to run mosparo in production, create the file `.env.local` and add the following content:
```dotenv title=.env.local
APP_ENV=prod
```
8. Open your browser and access the virtual host (for example, by accessing the subdomain in your browser)
9. Follow the installation wizard to install mosparo

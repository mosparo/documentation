---
sidebar_position: 3
sidebar_label: Install from source
description: Install mosparo directly with the source.
---

# Install from source

Alternatively, you can install mosparo directly from our Git repository. The installation is more complex, but if, for example, you want to use your own deployment tool, this variant is more recommended.

## Prerequisites

In addition to the requirements described in the [prerequisites](../prerequisites) regarding your web hosting, you need for this method
- Git
- Composer
- NPM

## Installation

1. Clone the repository git
```
git clone git@github.com:mosparo/mosparo.git
```
2. Change to the directory of the mosparo repository
3. _(Optional)_ If you want use the latest stable version, you should checkout the tag of the last version
```
git checkout tags/[lastVersionTag]
```
:::note
Please replace `[lastversionTag]` with the name of the latest tag (see https://github.com/mosparo/mosparo/tags).
:::
4. Run 
```
composer composer install –-no-dev
```
5. Install all frontend packages
```
npm install
```
6. Generate all frontend resources
```
./node_modules/.bin/encore prod
```
7. Open your browser and access the website
8. Follow the installation wizard to install mosparo

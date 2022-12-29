---
sidebar_position: 3
sidebar_label: Install from source
---

# Install from source

Alternatively, you can install mosparo directly from our Git repository. The installation is more complex, but if, for example, you want to use your own deployment tool, this variant is more recommended.

## Prerequisites

In addition to the requirements described in the [prerequisites](../prerequisites) regarding your web hosting, you need for this variant
- Git
- Composer
- NPM

## Installation

1. Clone the repository git
```
git clone git@github.com:mosparo/mosparo.git
```
2. Change to the directory of the mosparo repository
3. Run 
```
composer composer install –-no-dev
```
4. Install all frontend packages
```
npm install
```
5. Generate all frontend resources
```
./node_modules/.bin/encore prod
```
6. Open your browser and access the website
7. Follow the installation wizard to install mosparo

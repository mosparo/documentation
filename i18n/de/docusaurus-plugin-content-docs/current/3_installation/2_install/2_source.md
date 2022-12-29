---
sidebar_position: 3
sidebar_label: Installation aus der Source
description: Installieren Sie mosparo direkt mit der Source.
---

# Installation aus der Source

Alternativ können Sie mosparo direkt von unserem Git-Repository installieren. Die Installation ist aufwändiger, aber falls Sie beispielsweise ein eigenes Deployment Tool einsetzen wollen, ist diese Variante empfehlenswerter.

## Voraussetzungen

Zusätzlich zu den beschriebenen [Voraussetzungen](../prerequisites) betreffend Ihrem Webhosting brauchen Sie für diese Variante noch
- Git
- Composer
- NPM

## Installation

1. Klonen Sie das Repository
```
git clone git@github.com:mosparo/mosparo.git
```
2. Wechseln Sie in das Verzeichnis des Repositories
3. Führen Sie Composer aus 
```
composer composer install –-no-dev
```
4. Installieren Sie alle Frontend-Pakete
```
npm install
```
5. Generieren Sie alle Frontend-Ressourcen
```
./node_modules/.bin/encore prod
```
6. Öffnen Sie Ihren Browser und greifen Sie auf die Website zu
7. Folgen Sie dem Installations-Assistenten, um mosparo zu installieren

---
sidebar_position: 3
sidebar_label: Installation aus der Source
description: Installieren Sie mosparo direkt mit der Source.
---

# Installation aus der Source

Alternativ können Sie mosparo direkt von unserem Git-Repository installieren. Die Installation ist aufwändiger, aber falls Sie beispielsweise ein eigenes Deployment Tool einsetzen wollen, ist diese Variante empfehlenswerter.

## Voraussetzungen

Zusätzlich zu den beschriebenen [Voraussetzungen](../requirements/) betreffend Ihrem Webhosting brauchen Sie für diese Variante noch
- Git
- Composer
- Yarn
- Node.js (18)

## Installation

1. Klonen Sie das Repository
```
git clone git@github.com:mosparo/mosparo.git
```
2. Wechseln Sie in das Verzeichnis des Repositories
3. _(Optional)_ Wenn Sie die letzte stabile Version verwenden möchten, sollten Sie zum entsprechenden Tag der letzten Version wechseln
```
git checkout tags/[lastVersionTag]
```
:::note
Bitte ersetzen Sie `[lastVersionTag]` mit dem Namen des letzten Tags (siehe https://github.com/mosparo/mosparo/tags).
:::
4. Führen Sie Composer aus 
```
composer composer install –-no-dev
```
5. Installieren Sie alle Frontend-Pakete
```
yarn install
```
6. Generieren Sie alle Frontend-Ressourcen
```
yarn encore production
```
7. Öffnen Sie Ihren Browser und greifen Sie auf die Website zu (zum Beispiel, in dem Sie die Subdomain in Ihrem Browser eingeben)
8. Folgen Sie dem Installations-Assistenten, um mosparo zu installieren

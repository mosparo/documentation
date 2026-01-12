---
sidebar_position: 5
sidebar_label: Content Security Policy (CSP)
description: Wenn Ihre Website mit CSP geschützt wird, fügen Sie diese zusätzlichen Optionen hinzu, um sicherzustellen, dass mosparo korrekt funktioniert.
---

# Content Security Policy (CSP)

Wenn Ihre Website, die mosparo verwendet, zum Schutz CSP einsetzt, müssen Sie die CSP-Kopfzeile anpassen und die mosparo-spezifischen Anweisungen hinzufügen. Wenn Sie dies nicht tun, funktioniert mosparo nicht ordnungsgemäss.

Bitte setzen oder passen Sie (falls Sie diese bereits in Ihrer CSP-Kopfzeile haben) die folgenden Anweisungen an:

| CSP-Direktive | Beispielswert                 | Beschreibung                                            |
|---------------|-------------------------------|---------------------------------------------------------|
| `script-src`  | `https://mosparo.example.com` | Ermöglicht das Laden des mosparo-Skripts.               |
| `style-src`   | `https://mosparo.example.com` | Erlaubt die für die mosparo-Box erforderlichen Styles.  |
| `connect-src` | `https://mosparo.example.com` | Ermöglicht die Kommunikation mit der mosparo-API.       |
| `img-src`     | `https://mosparo.example.com` | Erlaubt Bilder (SVG), die von mosparo verwendet werden. |

:::info
Bitte ersetzen Sie `mosparo.example.com` durch die URL Ihrer mosparo-Installation.
:::

## Beispiel

:::note Kopfzeile
<b>Content-Security-Policy:</b> default-src 'self'; img-src 'self' https://mosparo.example.com; script-src 'self' https://mosparo.example.com; style-src 'self' https://mosparo.example.com; connect-src 'self' https://mosparo.example.com
:::

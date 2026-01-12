---
sidebar_position: 5
sidebar_label: Content security policy (CSP)
description: If CSP protects your website, add these additional options to ensure mosparo works correctly.
---

# Content security policy (CSP)

If your website that uses mosparo uses CSP to protect it, you need to adjust the CSP header and add the mosparo-specific directives. If you don't do this, mosparo will not work correctly.

Please set or adjust (if you have them already in your CSP header) the following directives:

| CSP directives | Example value                 | Description                                     |
|----------------|-------------------------------|-------------------------------------------------|
| `script-src`   | `https://mosparo.example.com` | Allows loading of the mosparo script.           |
| `style-src`    | `https://mosparo.example.com` | Allows the styles required for the mosparo box. |
| `connect-src`  | `https://mosparo.example.com` | Allows communication with the mosparo API.      |
| `img-src`      | `https://mosparo.example.com` | Allows images (SVG) used by mosparo.            |

:::info
Please replace `mosparo.example.com` with the URL of your mosparo installation.
:::

## Example

:::note Header
<b>Content-Security-Policy:</b> default-src 'self'; img-src 'self' https://mosparo.example.com; script-src 'self' https://mosparo.example.com; style-src 'self' https://mosparo.example.com; connect-src 'self' https://mosparo.example.com
:::
---
sidebar_position: 5
sidebar_label: Reverse Proxy
description: If you set up mosparo behind a reverse proxy, you must make some special adjustments.
---

# Reverse Proxy

## Headers

When you use a reverse proxy, you must set the `X-Forwareded-For` header in the connection to mosparo. Otherwise, mosparo does not know which client started the request.

Additionally, you have to set the header `X-Forwarded-Proto`, in case your connection behind the reverse proxy is not encrypted with SSL.

### Example nginx
```editorconfig
server {
    listen 443 ssl http2;

    server_name [domain];

    index  index.html index.htm index.php;

    # Reverse proxy configuration - Start
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_pass http://127.0.0.1:8080;
    }
    # Reverse proxy configuration - End

    [sslConfiguration] # Configure accordingly to your needs
}
```

## Trusted proxies

Symfony, on which mosparo is based, allows HTTP headers like `X-Forwarded-For` only if the request is from a trusted proxy.

For this, you have to specify the IP addresses of your proxy servers so that mosparo can accept the headers `X-Forwarded-Proto` and `X-Forwarded-For`.

To define your proxies IP address, set the environment variable `TRUSTED_PROXIES`. Add all IP addresses of your proxies as comma separated list.

:::note Example
```
TRUSTED_PROXIES=127.0.0.1,192.168.0.1
```
:::

When you don't know the IP address of your reverse proxy, you can add `REMOTE_ADDR` to allow all possible proxies to use the `X-Forwarded-*` headers.

:::note Example
```
TRUSTED_PROXIES=127.0.0.1,REMOTE_ADDR
```
:::

:::warning
This method can be dangerous, and you should only use it if needed. You should never expose a mosparo installation to the public directly (without reverse proxy) with the `REMOTE_ADDR` option in the trusted proxies variable.
:::
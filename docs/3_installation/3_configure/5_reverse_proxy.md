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

    index index.html index.htm index.php;

    # Reverse proxy configuration - Start
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_pass http://127.0.0.1:8080;
    }
    # Reverse proxy configuration - End

    [sslConfiguration] # Configure according to your needs
}
```

## Install mosparo under subpath with reverse proxy

Generally, we recommend installing mosparo at the root of a domain or subdomain and not in a subpath. The problem with the subpath is that it could leak the wrong data from mosparo if the web server is misconfigured.

But, since v1.2, installing mosparo in a subpath using a reverse proxy is possible. Only the `public` directory of mosparo must be exposed to the internet. You can use the Docker image or install mosparo in a different location and expose the `public` directory from there.

You must forward the headers `X-Forwarded-Host` with the name of your host and `X-Forwarded-Prefix` with the name of your subpath to mosparo.

### Example nginx

```editorconfig
server {
    listen 443 ssl http2;

    server_name [domain];

    root /var/www/;
    index index.html index.htm index.php;

    # Reverse proxy configuration - Start
	location /app/ {
		rewrite /app/(.*) /$1 break;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
		proxy_set_header X-Forwarded-Host $http_host;
		proxy_set_header X-Forwarded-Prefix /app;
		proxy_pass http://127.0.0.1:8080;
	}
    # Reverse proxy configuration - End

    [sslConfiguration] # Configure according to your needs
}
```

## Trusted proxies

Symfony, on which mosparo is based, allows HTTP headers like `X-Forwarded-For` only if the request is from a trusted proxy.

For this, you have to specify the IP addresses of your proxy servers so that mosparo can accept the headers `X-Forwarded-Proto` and `X-Forwarded-For`.

Go to the mosparo Administration interface and choose "Security settings". In the security settings, you can configure the settings for your reverse proxy for mosparo (but not for your web server, of course). Add all trusted proxies to the list of trusted proxies. If you need, you can add `REMOTE_ADDR` by setting the flag. Additionally, you can set the names of the address and proto headers if your proxy requires that.

:::warning
This method can be dangerous, and you should only use it if needed. You should never expose a mosparo installation to the public directly (without reverse proxy) with the `REMOTE_ADDR` option in the trusted proxies variable.
:::
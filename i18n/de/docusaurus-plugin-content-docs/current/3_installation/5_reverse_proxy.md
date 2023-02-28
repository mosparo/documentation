---
sidebar_position: 5
sidebar_label: Reverse Proxy
description: Wenn Sie mosparo hinter einem Reverse Proxy aufsetzen, müssen Sie ein paar zusätzliche Anpassungen vornehmen.
---

# Reverse Proxy

## Kopfzeilen

Wenn Sie einen Reverse Proxy verwenden, müssen Sie die Kopfzeile `X-Forwarded-For` in der Verbindung zu mosparo definieren. Ansonsten weiss mosparo nicht, welcher Client die Anfrage gestartet hat.

Zusätzlich müssen Sie die Kopfzeile `X-Forwarded-Proto` übermitteln, falls die Verbindung hinter dem Reverse Proxy nicht mit SSL verschlüsselt ist.

### Beispiel nginx
```editorconfig
server {
    listen 443 ssl http2;

    server_name [domain];

    index  index.html index.htm index.php;

    # Reverse Proxy Konfiguration - Start
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_pass http://127.0.0.1:8080;
    }
    # Reverse Proxy Konfiguration - Ende

    [sslConfiguration] # Konfigurieren gemäss Ihren Anforderungen
}
```

## Vertrauenswürdige Proxies

Symfony, auf welchem mosparo basiert, erlaubt zusätzliche HTTP-Kopfzeilen wie `X-Forwarded-For` nur, wenn die Anfrage von einem vertrauenswürdigen Proxy kommt.

Damit das korrekt funktioniert, müssen Sie die IP-Adressen der Proxy-Server in der Konfiguration von mosparo hinterlegen, damit mosparo die Kopfzeilen `X-Forwarded-Proto` und `X-Forwarded-For` akzeptieren kann.

Setzen Sie eine Umgebungsvariable `TRUSTED_PROXIES` mit den IP-Adressen Ihrer Proxy-Server. Trennen Sie mehrere IP-Adressen mit einem Komma.

:::note Beispiel
```
TRUSTED_PROXIES=127.0.0.1,192.168.0.1
```
:::

Wenn Sie die IP-Adressen Ihres Reverse Proxy nicht kennen, können Sie auch `REMOTE_ADDR` als erlaubte IP-Adresse hinzufügen, um allen möglichen Proxies die Verwendung der Kopfzeilen `X-Forwarded-*` zu erlauben.

:::note Beispiel
```
TRUSTED_PROXIES=127.0.0.1,REMOTE_ADDR
```
:::

:::warning
Diese Methode kann gefährlich sein und Sie sollten Sie nur nutzen, falls notwendig. Sie sollten eine mosparo Installation nie direkt (ohne Reverse Proxy) in der Öffentlichkeit zugänglich machen, wenn Sie die Option `REMOTE_ADDR` in der Liste der vertrauenswürdigen Proxies hinterlegt haben.
:::
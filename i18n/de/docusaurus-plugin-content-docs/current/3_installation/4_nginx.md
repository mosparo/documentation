---
sidebar_position: 4
sidebar_label: nginx
description: Wenn Sie nginx als Ihr Webserver verwenden, benötigen Sie ein paar spezielle Anpassungen.
---

# nginx

Wenn Sie Ihre Website auf einem nginx Webserver hosten, müssen Sie einige spezielle Konfigurationen vornehmen, da nginx nicht mit `.htaccess`-Dateien arbeiten kann.

Hier finden Sie eine Beispielkonfiguration für mosparo. Alle `location`-Blöcke, die mit `Erforderlich` gekennzeichnet sind, müssen in der Konfigurationsdatei enthalten sein. Ansonsten wird mosparo nicht korrekt funktionieren.

```editorconfig
server {
    listen 443 ssl http2;
                        
    server_name [domain];
    root [pathToMosparo]/public;

    index index.php;

    location = /favicon.ico { # Optional
        log_not_found off;
        access_log off;
    }

    location = /robots.txt { # Optional
        allow all;
        log_not_found off;
        access_log off;
    }

    location / {  # Erforderlich
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ ^/resources/(.*)/(.*)\.css$ { # Erforderlich
        try_files $uri $uri/ /index.php?$args;
        log_not_found off;
        expires max;
    }

    location ~ \.php$ {  # Erforderlich
        include fastcgi_params;
        fastcgi_intercept_errors on;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock; # An Ihr Setup anpassen
        fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~* \.(js|png|jpg|jpeg|gif|ico)$ {  # Optional
        expires max;
        log_not_found off;
    }

    [sslConfiguration] # Konfigurieren gemäss Ihren Anforderungen
}
```
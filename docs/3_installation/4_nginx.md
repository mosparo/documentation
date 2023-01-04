---
sidebar_position: 4
sidebar_label: nginx
description: If you use nginx as your webserver, you need some special adjustments.
---

# nginx

If you're hosting your website on an nginx webserver, you need some special adjustments since nginx cannot work with `.htaccess` files.

Here you can find an example configuration for mosparo. All location blocks marked with `Required` must be in your configuration file. Otherwise, mosparo will not work correctly.

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

    location / {  # Required
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ ^/resources/(.*)/(.*)\.css$ { # Required
        try_files $uri $uri/ /index.php?$args;
        log_not_found off;
        expires max;
    }

    location ~ \.php$ {  # Required
        include fastcgi_params;
        fastcgi_intercept_errors on;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~* \.(js|png|jpg|jpeg|gif|ico)$ {  # Optional
        expires max;
        log_not_found off;
    }

    [sslConfiguration] # Configure accordingly to your needs
}
```
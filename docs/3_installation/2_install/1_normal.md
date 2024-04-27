---
sidebar_position: 2
sidebar_label: Normal installation
description: Download the package and install mosparo in 6 easy steps.
---

# Normal installation

You can use the package we provided to install mosparo on your web hosting.

1. Download the latest version of mosparo from [our website](https://mosparo.io/releases/) or the [release page on GitHub](https://github.com/mosparo/mosparo/releases).
2. Extract the downloaded file
3. Create a new website in your hosting control panel (for example, for a domain `example.com` or a subdomain `mosparo.example.com`)
   1. If possible, set the website's public directory (document root) to the `/public` subdirectory
   2. Add an SSL certificate to the website or enable Lets Encrypt (or a similar certificate service) if it is available in your hosting control panel
4. Upload all extracted files to the directory of this new website
5. Open your browser and access the website (for example, via the domain `example.com` or `mosparo.example.com`)
6. Follow the installation wizard to install mosparo

:::info
If you're using the mosparo Docker image with a MySQL or PostgreSQL database in a container, please use the name of that container as the database host.
:::
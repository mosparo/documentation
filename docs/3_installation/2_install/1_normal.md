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
   - macOS/Linux: Please be aware of hidden files (for example, `.env`). You must upload all the files, including the hidden ones.
5. Open your browser and access the website (for example, via the domain `example.com` or `mosparo.example.com`). 
   - If you experience any issue when accessing mosparo, see the troubleshooting hints below.
6. Follow the installation wizard to install mosparo

:::info
If you're using the mosparo Docker image with a MySQL or PostgreSQL database in a container, please use the name of that container as the database host.
:::

## Troubleshooting

### If you cannot access mosparo

If you cannot access mosparo after uploading the files in step 5, here are some possible reasons why it is not working. If you have a different error code or a problem you solved, please let us know in the [GitHub Discussions](https://github.com/orgs/mosparo/discussions/categories/problems-issues) so we can update this list here and make it easier for others.

### 403 Forbidden

If your mosparo installation is hosted on cPanel web hosting, please check whether the ownership of the `public` directory is correct. It should be set to the same owner as the directory in which you uploaded the mosparo files (which should usually be `youruser:nobody`).

### 500 Internal Server Error

If you see a status code 500 or an error message like `Internal server error`, then one of the two following reasons is most likely the issue:

- Your SCP/FTP client did not upload all files correctly, so some files of your mosparo installation are missing. To verify whether this is the cause, you can check the sizes of the uploaded files and compare them with the files in the extracted directory. Otherwise, you can reupload all the files in the same directory, which should upload the missing files. Depending on your web hosting, you can also upload the full ZIP file and extract it there. This is usually possible in the web file manager for cPanel or Plesk web hosting (and some others as well), as well as in some SCP clients.
- If you're sure that all the files are uploaded, please have a look at the log file in the mosparo directory. You can find the log file under `var/log/` in your mosparo directory. The file is called `prod-YYYY-MM-DD.log`, where YYYY-MM-DD is replaced with the date when the log file was written. If you can't find such a file, please check the error log on your web hosting. In this case (if you can't see a log file), it is most likely that a PHP extension is missing. Please check the requirements and ensure that all required extensions are available.

If you cannot find a solution to this problem, please do not hesitate to tell us more about it in [GitHub Discussions](https://github.com/orgs/mosparo/discussions/categories/problems-issues).
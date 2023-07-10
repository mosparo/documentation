---
sidebar_position: 2
sidebar_label: Security settings
description: An overview of the available security settings.
---

# Security settings

## Login Throttling Settings

Login throttling helps to protect the mosparo login from a brute force attack. By counting the number of requests and blocking an attacker after some tries, such an attack will take a lot of time and is nearly senseless.

### Available settings

| Name                                           | Default value | Description                                                                                           |
|------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------|
| Number of requests for username and IP address | 5 requests    | This defines the number of requests a user can make from one IP address for one username.             |
| Number of requests for an IP address           | 25 requests   | This defines the number of requests a user can make from one IP address (for all usernames combined). |
| Time range                                     | 5 minutes     | This defines the time in minutes when the number of requests is evaluated.                            |

#### Explanation

The first rule will block the user after he tries to log in with a username with five different passwords (5 requests). With the default value of 25 requests for an IP address, the user can try five passwords for five different usernames to log in before getting blocked for both rules (5 requests per username and IP address, 25 total requests per IP address).

## Reverse Proxy

Configure the following settings for your reverse proxy if you use one to run mosparo. A reverse proxy can be used in various use cases. For example, a good example of a reverse proxy is a caching server (for example, Varnish or Cloudflare). These settings are essential for mosparo to recognize the user's IP address correctly. If you do not configure the reverse proxy settings in mosparo, mosparo will not be able to accurately identify the user's IP address.

### Available settings

| Name                                     | Description                                                                                                                                                                                                                 |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| List of trusted proxies                  | To ensure that mosparo trusts only the correct reverse proxies, you must record the IP addresses of all reverse proxies in the list.                                                                                            |
| Include REMOTE_ADDR in trusted proxies   | If your reverse proxy has a lot of IP addresses and/or does not use fixed IP addresses, you can tell mosparo to accept all reverse proxies. **This setting can be dangerous.** |
| Name of the custom remote address header | If your reverse proxy uses a special header for submitting the IP address, please specify the name here.                                                                                           |
| Name of the custom protocol header       | If your reverse proxy uses a special header to send the protocol, please specify the name here.                                                                                           |

For more information on configuring the reverse proxy, see [Reverse Proxy](../installation/reverse_proxy).



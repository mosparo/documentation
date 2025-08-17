---
sidebar_position: 7
sidebar_label: Settings
description: You can adjust the project according to your wishes in the project settings.
---

# Settings

## General settings

You can edit the most important information about the project in general settings.

| Field         | Description                                                                                                                                                                                                                                                            |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name          | Name of the project                                                                                                                                                                                                                                                    |
| Description   | Description of the project                                                                                                                                                                                                                                             |
| Hosts         | For the requests to be answered correctly, mosparo needs to know from where this project is being used. To do this, you must configure all hosts which use the project. It is necessary to enter the domain without protocol and path to the form. See [Hosts](#hosts) |
| Project group | Select the group in which this project should be listed. By default, a project is listed in the Main Group, which is the root. _(Added in v1.3)_                                                                                                                       |

Since version 1.3, additional options are available under [Advanced settings](#advanced-settings).

On the right side, you can see the most important information you need to integrate mosparo into your website. Copy this information and paste these values into your website's fields or configuration pages.

| Field                        | Description                                                                                    |
|------------------------------|------------------------------------------------------------------------------------------------|
| Host                         | mosparo installation address                                                                   |
| Unique identification number | Unique identification number of the project                                                    |
| Public key                   | This is the public, i.e., non-secret, security key used to transmit the submissions to mosparo. |
| Secret key                   | The secret key is there to sign the API requests and ensure that the requests are genuine.     |

### Hosts

With version 1.2, we fixed a bug that has been in mosparo since the first version. The bug is that the configured hosts were never used to verify the origin of a request to the frontend API. With version 1.2, we fixed this bug, and the hosts will be verified before the request is processed. Technically, we're speaking of the cross-origin headers (CORS).

You must add all hosts you use for a project to the project settings so that mosparo can correctly verify the origin.

A host is a domain without the protocol and the path. You can use a star (`*`) as a wildcard at the beginning of a host. The wildcard has to be placed before a dot or without any other characters. If you put the wildcard before a dot, the domain without the dot will also be allowed. We do not recommend using only the wildcard as hosts since that would enable all possible origins to connect to the frontend API.

#### Valid hosts

- `example.com`
- `www.example.com`
- `*.example.com` (will include `example.com`, `www.example.com`, and `abc.www.example.com`)
- `*` (will allow everything, not recommended)

#### Invalid hosts

- `https://example.com`
- `example.com/contact-form`
- `*example.com`
- `www.*.example.com`

## Advanced settings

Some additional settings are available in the advanced settings.

| Field                                | Description                                                                                                                                                                                                                                                                                                                                                      |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Spam&nbsp;detection&nbsp;options** |
| Status                               | If active, mosparo will block submissions that were detected as spam. If inactive, mosparo will rate all submissions but not block them. You can also turn the status on or off in an [origin-based security policy](#origin-based-security-settings).                                                                                                           |
| Spam score                           | The spam score determines the points at which a submission is recognized as spam. You can also adjust the spam score in an [origin-based security policy](#origin-based-security-settings).                                                                                                                                                                                                         |
| **Language&nbsp;options**            |
| Language source                      | Defines how mosparo determines the language for the frontend box. mosparo uses the browser language by default. With this option, it's possible to use the website's language as a fallback or use the website's language as the main source and use the browser language as a fallback. _(Added in v1.3)_                                                       |
| **Statistic&nbsp;options**           |
| Statistic storage                    | Defines how long mosparo stores the statistical data for a project. After the selected time range, mosparo deletes the statistical data automatically. _(Added in v1.1)_                                                                                                                                                                                         |
| **Developer&nbsp;options**           |
| API debug mode                       | Enables the API debug mode. When enabled, the APIs will respond with additional information to make it easier to understand why the API returned the response or error message. See [API debug mode](../api/api_debug_mode). _(Added in v1.1)_                                                                                                                   |
| Verification simulation mode         | Enables the verification simulation mode. When enabled, the verification simulation will explain which data the mosparo verification API expects to verify the request. The verification simulation mode is visible on the submission detail page when enabled. See [Verification simulation mode](./submissions#verification-simulation-mode). _(Added in v1.1)_ |

## Project members

Project members are users who have access to a project. The users can have different permissions and sometimes only view projects but can not change anything. Users can be added as project members in more than one project.

### Add project member

To add a new project member:
Click the button in the upper-right corner.
Enter the email address of the desired user and select the desired role that this member should play in this project.
Confirm your entries by clicking on the button below the form.

:::caution
You can only add users who have previously been created as users in the administration.
:::

### Edit project member

You can edit a project member at any time and adjust the assigned role if you want a member to have more or fewer permissions.

### Remove project member

If you no longer want a project member to have access to a project, you can remove the project member at any time. If you remove a project member, only the project member in that project is removed. The user himself and all other memberships to other projects of this user are retained.

## Security settings

### Types of settings

#### General security settings

The general security settings of a project are the base settings for every project. You should first configure the general security settings before using the origin-based ones.

#### Origin-based security settings

The origin-based security settings allow you to adjust the security settings based on the origin of a user. This can be done by defining special security settings based on the IP address of a user. If you have configured GeoIP2, you can also use the AS number and the country to match a user.

With the priority, you can specify in which order the guidelines should be applied. The matching guideline with the highest priority will be used for a user.

You can create as many guidelines as you want. In every guideline, you can define as many criteria as you wish. The criteria will be used for a user as soon as one of the criteria matches.

If you want to adjust one of the security settings, check the override checkbox in the top right corner of the security settings box. If you wish to disable one of the security settings enabled in the general security settings, override the security settings and uncheck the enabled checkbox.

You can also disable the spam detection altogether or adjust the spam score for a security policy. With this option, you can, for example, disable the spam detection completely for an IP address or decrease the spam score for a country. _(Added in v1.4)_

### Available security settings

#### Minimum time

You can use the minimum time to specify how much time must elapse between the initial request and the form verification before the request is accepted. Bots can submit form requests within seconds. A typical user may need several minutes.

:::info
Some users are faster, and others are slower in typing. The minimum time should be as short as possible to avoid incorrectly rejecting valid requests.
:::

#### Honeypot field

The honeypot field is a hidden field in your form that the user must submit empty. It is not visible to regular users, but a bot may see it and think it needs to be filled in.

The submission is considered spam when the field contains content because the regular user does not see the field. For users with screen readers, the field is marked with a note that the user should not fill in anything.

:::caution
A honeypot field can improve spam detection. However, since bots can also technically detect whether it is a honeypot field, you should use this function with caution.
:::

Enter the name of the honeypot field in the displayed field. There must be no other field in your form with this name. Otherwise, there will be a conflict. Please use a neutral term that does not indicate how the field works. Using a name that could be a normal field name, like "street-2" is recommended.

mosparo will add the field automatically to your form when you define a name for it in the security settings. You do not have to do anything in your form regarding the honeypot field except add mosparo to the form.

#### Request delay

With the request delay, it is possible to have an IP address wait if an IP address has made many requests in a certain period. With the request delay, it is possible to signal to the user that mosparo can process the request, but the user has to wait a moment.

Bots want to send as many requests as possible. With the request delay, these are slowed down accordingly, and sending spam is less attractive.

:::caution
Users can share the same IP address, for example, in a multi-user apartment or a company.
:::

##### Fields

| Field                      | Description                                                                                                                             |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Number of allowed requests | The field defines the number of requests a user can make within a period before the request delay becomes active.               |
| Detection time frame       | Defines the time in seconds in which the requests must be made before the request delay becomes active.                                 |
| Base delay time            | Defines the time, in seconds, that the user must wait before sending a new request.                                                     |
| Multiplicator              | The multiplicator is applied to the base delay time and increases (or decreases) the delay time for re-requests within that delay time. |

##### Example

:::note Example values
Number of allowed requests: 30, Detection time frame: 30 sec, Base delay time: 60 sec, Multiplicator: 1.5
:::

- A user makes 30 requests within 20 seconds. The automatic delay becomes active, and the user has to wait for 60 seconds.
- If the user makes another request within these 60 seconds, the time increases from 60 to 90 seconds with the help of the multiplicator.
- For a further request within 90 seconds, the time increases to 135 seconds.

#### IP lockout

If an IP address submits a large number of submissions, an IP address can be automatically blocked for a certain period with automatic blocking. The lock is made automatically and takes effect immediately. As soon as the set time has elapsed, the IP address can submit a submission again.

:::caution
Users can share the same IP address, for example, in a multi-user apartment or a company.
:::

:::caution
IP addresses are blocked throughout the entire mosparo installation. If an IP address has been blocked in one project, it is automatically blocked in another if both projects have IP lockout enabled.
:::

##### Fields

| Field                      | Description                                                                                                                                       |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Number of allowed requests | The field defines the number of submissions a user can submit within a period before the IP lockout becomes active.                               |
| Detection time frame       | Defines the time, in seconds, in which the submissions must be made before the IP lockout becomes active.                                         |
| Base lockout time          | Defines the time, in seconds, that the user is locked and cannot submit submissions.                                                              |
| Multiplicator              | The multiplicator is applied to the base lockout time and increases (or decreases) the lockout time for new submissions within that lockout time. |

##### Example

:::note Example values
Number of allowed requests: 30, Detection time frame: 30 sec, Base lockout time: 300 sec, Multiplicator: 1.5
:::

- A user submits 30 submissions within 20 seconds. The IP lockout becomes active, and the user is banned for 300 seconds.
- If the user submits another submission within these 300 seconds, the time increases from 300 to 450 seconds using the multiplicator.
- For a further submission within these 450 seconds, the time increases to 675 seconds.

#### Proof of work mechanism

With v1.3, mosparo offers a security feature based on the proof of work mechanism. With this feature, the browser has to calculate many hashes to match the one we expect. This costs the browser time since the browser has to do a lot of calculations.

:::info A message from the mosparo team
From our perspective, protecting a form with only the proof of work mechanism makes no sense. This mechanism is based on the processor, and every device connected to the internet has a processor, so everybody (even bots) can solve this puzzle. Additionally, processors get faster and cheaper every year, so the actual cost for a spam bot is very low and not really a problem.

With the rule-based spam protection method and the other security features, mosparo offers a great combination with which the proof of work mechanism can be better utilized.
:::

With the dynamic complexity, mosparo will automatically increase the number range based on the submissions made within a specific time frame. Optionally, the dynamic complexity is based on the IP address. If a user makes a lot of submissions, the user has to use more and more time to solve the proof of work puzzle before the form is submitted.

##### Fields

| Field                                             | Description                                                                                                                                                                                                                                                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Complexity                                        | The complexity defines the number range, which is used to get the random number for the puzzle. The larger the number range, the more calculations a browser has to perform. It's recommended not to use a too-large number range because it takes time for the normal user to submit the form. |
| Number range                                      | Shows the number range used to determine the random number.                                                                                                                                                                                                                         |
| Max time to solve                                 | Shows the maximum estimated time it took on your device to calculate the hashes for the whole number range. Normally, solving the puzzle is faster since the target number is not at the end of the number range. Other devices may be slower or faster than your device.                    |
| Speed                                             | Shows the calculation speed on your device. Other devices may be slower or faster than your device.                                                                                                                                                                                          |
| **Dynamic complexity**                            |
| Maximum complexity                                | Defines the maximum complexity that is used when the number of submissions within the specified time frame is reached.                                                                                                                                                                      |
| Number range                                      | _See above_                                                                                                                                                                                                                                                                                  |
| Max time to solve                                 | _See above_                                                                                                                                                                                                                                                                                  |
| Speed                                             | _See above_                                                                                                                                                                                                                                                                                  |
| Number of submissions to reach maximum complexity | The field defines the number of submissions a user can submit within a period to reach the maximum complexity.                                                                                                                                                                               |
| Detection time frame                              | Defines the time, in seconds, in which the submissions are counted.                                                                                                                                                                                                                          |
| Based on IP address                               | If active, only the submissions from the same IP address are counted. Otherwise, all submissions from all users within the specified time frame are counted.                                                                                                                                 |

#### Block equal submissions

With this security feature, you can block equal submissions. When a user submits the same form data multiple times, mosparo will block the additional submissions, and the user cannot submit the same data anymore.

You can define in which time frame mosparo should count the equal submissions and if the submissions should be counted based on the user's IP address.

##### Fields

| Field                               | Description                                                                                                                 |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Number of allowed equal submissions | The field defines the number of equal submissions a user can submit within a period before the submissions will be blocked. |
| Detection time frame                | Defines the time, in seconds, in which the submissions will be counted to reach the number of allowed equal submissions.    |
| Based on IP address                 | If enabled, mosparo counts the equal submission based on the IP address.                                                    |

#### List of allowed IP addresses

_You can edit the list of allowed IP addresses only in the general security settings of a project._

If you want specific IP addresses to be excluded from the request delay and IP lockout, you can add these IP addresses or subnets to the list of allowed IP addresses. The security features are skipped for the IP addresses and subnets enlisted on it. However, the regular check for spam still takes place.

:::caution
Users can share the same IP address, for example, in a multi-user apartment or a company.
:::

## Design

mosparo offers you the functionality to change the design of the mosparo box as much as possible and adapt it to your website. Use the design settings to adjust the look and feel.

### Design modes

The three design modes make it easier for you to configure the design of the mosparo box:

- With the **simple visible mode**, you choose the most important colors for your website, and the box size, and mosparo handles the rest.
- With the **advanced visible mode**, you can choose all the colors, the size of the borders and radius, and some other settings of the visible box.
- With the **simple invisible mode**, you can choose the most important colors for the invisible mosparo mode

Please use the `Design mode` dropdown in the bottom left corner of the design settings page to switch between the modes.

:::info
Since mosparo works with standard HTML elements and CSS rules, you can override the entire appearance of the mosparo box with appropriate CSS rules. However, because this requires programming experience, this possibility is not further described in this documentation.
:::

:::warning
Overriding the CSS rules is at your own risk and is not officially recommended by mosparo.
:::

### Simple visible mode

New projects using the simple mode by default. In the project wizard, you're able to configure these four fields directly after creating the project. mosparo will automatically calculate the best possible color for the success and failure states. Use the size selector to define which size of the box you want to use.

### Advanced visible mode

In the advanced mode, you have all options to adjust the design of the mosparo box.

#### Box size and radius

In the first tab of the size settings, you can choose between three different sizes of the mosparo box. These three sizes are predefined in mosparo, and you can only choose between them.

You can adjust the radius of the box to suit your website best. If you do not want a radius, you can set the value to 0.

#### Checkbox radius and border width

In the second tab of the size settings, you can define the radius of the checkbox and the border width. With these settings, you can change the look and feel of the checkbox to a more square checkbox, similar to other spam protection methods. _(Added in v1.4)_

#### Colors

Select the different colors for the box in each state. You can click the black X in the color picker if you want to use a transparent value for a color.

#### mosparo logo

When the user focuses on the checkbox with the keyboard or the user moves the mouse over the mosparo box, the mosparo logo is displayed. If you do not want this branding, you can disable the display of the logo.

#### Ping animation

A ping animation is built into the standard system, which should highlight the checkbox. If you do not want this animation, you can disable it anytime.

### Simple invisible mode

The invisible mode was introduced with version 1.0. With the invisible mode, the user does not have to click a box to check the data. Instead, the data is checked when the user submits the form. A more detailed description of the variant can be found at [How it works](../about/how_it_works#functionality-invisible-variant).

The settings allow you to customize the appearance of this overlay.

#### Colors

With the colors, you can define the background of the overlay, the text color, and the color of the loading circle. Additionally, the color of the error message, if spam was detected, can be defined. The overlay's background color should be slightly transparent so the user knows he has not left the page.

#### mosparo logo

When the overlay is displayed, mosparo will show the mosparo logo. If you do not want this branding, you can turn off the display of the logo.

#### Page overlay

Define if the overlay should overlay the whole website or if only the form should be overlaid.

### Contrast Rating

Our goal is that everyone can fill out your form. For this, it is essential that the mosparo box can also be used by a person who does not see as well as other people. It is, therefore, important that the colors you choose have the highest possible contrast ratio. For this reason, we have integrated a function directly in the display settings, which calculates the corresponding contrasts and displays them to you.

### Delivery of appearance settings

The selected values are stored in the database when the appearance settings are saved. In addition, the CSS code, which is responsible for the presentation, is prepared for your project in a special file.

When a user calls up a form on your website, this already prepared file is loaded, and the user automatically has the correct representation.

After you customize the appearance, a new file is saved with a new name. All requests from the old file are automatically forwarded to the new file so that no interruptions can be detected when adjusting the display, and the latest version is always used.


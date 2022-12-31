---
sidebar_position: 6
sidebar_label: Settings
description: In the project settings you can adjust the project according to your wishes.
---

# Settings

## General Settings

In the general settings, the most important information about the project can be edited.

| Field       | Description                                                                                                                                                                                                                                                           |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name        | Name of the project                                                                                                                                                                                                                                                   |
| Description | Description of the project                                                                                                                                                                                                                                            |
| Hosts       | In order for the requests to be answered correctly, mosparo needs to know where this project is being used from. To do this, all hosts must be captured. It is only necessary to enter the domain, without the correct path to the form. For example, `example.com`   |
| Spam limit  | The spam limit determines the number of points at which a submission is recognized as spam.                                                                                                                                                                           |

On the right side you can see the most important information you need to integrate mosparo into your website. Copy this information and paste these values into the fields or configuration pages provided on your website.

| Field                        | Description                                                                                    |
|------------------------------|------------------------------------------------------------------------------------------------|
| Host                         | mosparo installation address                                                                   |
| Unique identification number | Unique identification number of the project                                                    |
| Public key                   | This is the public, i.e. non-secret, security key used to transmit the submissions to mosparo. |
| Secret key                   | The secret key is there to sign the API requests and ensure that the requests are genuine.     |

## Project members

Project members are users who have access to a project. The users can have different permissions and sometimes only view projects, but can not change anything. Users can be added as project members in more than one project.

### Add project member

To add a new project member, click the button in the upper-right corner. Then enter the email address of the desired user and select the desired role that this member should play in this project. Confirm your entries by clicking on the button below the form.

:::caution
You can only add users who have previously been created as users in the administration.
:::

### Edit project member

You can edit a project member at any time and adjust the assigned role if you want a member to have more or less permissions.

### Remove project member

If you no longer want a project member to have access to a project, you can remove the project member at any time. If you remove a project member, only the project member in that project is removed. The user himself and all other memberships to other projects of this user are retained.

## Security settings

### Minimum time

The minimum time can be used to specify how much time must elapse between the initial request and the verification of the form before the request is accepted. Bots can submit form requests within seconds. A normal user may need several minutes.

:::info
Some users are faster, and others are slower in typing. The minimum time should be as short as possible to avoid erroneously rejecting valid requests.
:::

### Honeypot field

With the honeypot field, a hidden field is added to the form, which must be empty. The field is not visible to normal users. A bot sees the field and may think it needs to be filled in.

As soon as the field contains content, the submission is considered as spam because the normal user does not see the field. For users with screen readers, the field is marked with a note that it should not be filled in.

:::caution
A honeypot field can be an improvement in spam detection. However, since bots can also technically detect whether it could be a honeypot field or not, this function should be used with caution.
:::

Enter the name of the honeypot field in the displayed field. There must be no other field in your form with this name, otherwise there will be a conflict. Please use a neutral term that gives no indication of how the field works.

### Request delay

With the request delay, it is possible to have an IP address waited if an IP address has made many requests in a certain period of time. With the request delay, it is possible to signal to the user that the request can be processed, but the user has to wait a moment.

Bots want to send as many requests as possible. With the request delay, these are slowed down accordingly and sending spam is less interesting.

:::caution
Users can share the same IP address, for example in a multi-user apartment or in a company.
:::

#### Fields

| Field                      | Description                                                                                                                             |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Number of allowed requests | The field defines the number of requests a user can make within a period of time before the request delay becomes active.               |
| Detection time frame       | Defines the time in seconds in which the requests must be made before the request delay becomes active.                                 |
| Base delay time            | Defines the time, in seconds, that the user must wait before sending a new request.                                                     |
| Multiplicator              | The multiplicator is applied to the base delay time and increases (or decreases) the delay time for re-requests within that delay time. |

#### Example

:::note Example values
Number of allowed requests: 30, Detection time frame: 30 sec, Base delay time: 60 sec, Multiplicator: 1.5
:::

- A user makes 30 requests within 20 seconds. The automatic delay becomes active and the user has to wait for 60 seconds.
- If the user makes another request within these 60 seconds, the time increases from 60 to 90 seconds with the help of the multiplicator.
- For a further request within the 90 seconds, the time increases to 135 seconds.

### IP lockout

If an IP address sends a large number of requests, an IP address can be automatically blocked for a certain period of time with automatic blocking. The lock is made automatically and takes effect immediately. As soon as the set time has elapsed, the IP address can receive a submission token again.

:::caution
Users can share the same IP address, for example in a multi-user apartment or in a company.
:::

:::caution
IP addresses are blocked throughout the entire mosparo installation. If an IP address has been blocked in one project, it is automatically blocked in another project if both projects have IP lockout enabled.
:::

#### Fields

| Field                      | Description                                                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Number of allowed requests | The field defines the number of requests a user can make within a period of time before the IP lockout becomes active.                         |
| Detection time frame       | Defines the time, in seconds, in which the requests must be made before the IP lockout becomes active.                                         |
| Base lockout time          | Defines the time, in seconds, that the user is locked and cannot send requests.                                                                |
| Multiplicator              | The multiplicator is applied to the base lockout time and increases (or decreases) the lockout time for new requests within that lockout time. |

#### Example

:::note Example values
Number of allowed requests: 30, Detection time frame: 30 sec, Base lockout time: 300 sec, Multiplicator: 1.5
:::

- A user makes 30 requests within 20 seconds. The IP lockout becomes active and the user is banned for 300 seconds.
- If the user makes another request within these 300 seconds, the time increases from 300 to 450 seconds using the multiplicator.
- For a further request within these 450 seconds, the time increases to 675 seconds.

### List of allowed IP addresses

If you want certain IP addresses to be excluded from the request delay and IP lockout, you can add these IP addresses or subnets to the list of allowed IP addresses. The security features are skipped for the IP addresses and subnets enlisted on it. However, the normal check for spam still takes place.

:::caution
Users can share the same IP address, for example in a multi-user apartment or in a company.
:::

## Appearance

mosparo offers you the possibility to change the appearance of the mosparo box as far as possible and adapt it to your website. Use the built-in configuration editor.

:::info
Since mosparo works with normal HTML elements and CSS rules, you can override the entire appearance of the mosparo box with appropriate CSS rules. However, because this requires programming experience, this possibility is not further described in this documentation.
:::

:::warning
Overriding the CSS rules is at your own risk and is not officially recommended by mosparo.
:::

### Box size and radius

You can choose between three different sizes of the mosparo box. These three sizes are predefined in mosparo and you can only choose between these three sizes.

You can adjust the radius of the box to best suit your website. If you do not want a radius, you can set the value to 0.

### Colors

Select the different colors for the box in each state. If you want to use a transparent value for a color, you can click the black X in the Color Picker.

### mosparo logo

When the user focuses on the checkbox with the keyboard or the user moves the mouse over the mosparo box, the mosparo logo is displayed. If you do not want this branding, you can disable the display of the logo.

### Ping animation

In order to draw attention to the checkbox, a ping animation is built into the standard system, which should highlight the checkbox. If you do not want this animation, you can disable it at any time.

### Delivery of appearance settings

When the representation is saved, the selected values are stored in the database. In addition, the CSS code, which is responsible for the presentation, is prepared for your project in a special file.

As soon as a user calls up a form on your website, this already prepared file is loaded and the user automatically has the correct representation.

After you customize the appearance, a new such file is saved with a new file name. All requests from the old file are automatically forwarded to the new file, so that no interruptions can be detected when adjusting the display and the latest version is always used.

### Contrast Rating

Our goal is that everyone can fill out your form. For this it is important for us that the mosparo box can also be used by a person who does not see as well as other people. It is therefore important that the colors you choose have the highest possible contrast ratio. For this reason, we have integrated a function directly in the display settings, which calculates the corresponding contrasts and displays them to you.


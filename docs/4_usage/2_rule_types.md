---
sidebar_position: 2
sidebar_label: Rule types
description: mosparo has various rule types. Here you will find an overview of all rule types.
---

# Rule types

mosparo knows different rules. Depending on the rule type, only certain fields are checked (for example, URL or email fields). The rule type is selected by the user before a rule is created. There can be several subtypes within a rule type.

## Word

### Normal word

The subtype "Normal Word" allows you to define a single word, part of a word, or combination of words. The value you enter must appear exactly as it does on the form for the rule to apply. You can use the asterisk (*) as a wildcard. When matching, `*word*` is used automatically, which means that you do not have to insert the placeholder before and after the searched word.

:::note Example
pills<br />
lo*ery
:::

### Regular Expression

If you select "RegEx" as the subtype, you can define a regular expression pattern that mosparo will use to match. Please fill in the entire Regular Expression pattern in the field when creating the rule. The pattern must comply with PHP's regular expression requirements.

:::note Example
/(seo|s3o)/i
:::

## Email address

The email address rule type can be used to enter an email address that cannot be entered in an email field.

:::note Example
info@example.com
:::

## Domain

With the rule type domain, a domain can be entered that may not be entered in an email or URL field.

:::note Example
example.com
:::

## IP address

### Single IP address

With this subtype you have the possibility to enter a single IP address, which is not allowed to make a submission.

:::note Example
192.168.10.10

abcd:ef01::1
:::

### Subnet

With the subtype Subnet you can enter an entire subnet, which is not allowed to make a submission.

:::note Example
192.168.10.0/24

abcd:ef01::/48
:::

## Website

The rule type "Website" can be used to specify a URL to a website that may not be entered in a URL or free text field.

:::caution
It is recommended to start your input with the protocol or two slashes for a protocol-independent URL. If the input does not start with the protocol or at least with two slashes, the rule could detect false domains as spam.
:::

:::note Example
//example.com/spam/test-form.html
:::

## Provider

To use the "Provider" rule type, it is necessary that the MindMax GeoLite2 database is configured. Otherwise,the rule type has  no influence. In addition, it must be borne in mind that these rule types cannot be guaranteed to function correctly. The assignment of AS number and country to an IP address can be outdated or generally incorrect.

:::info
Before you can use the "Provider" rule type, you must configure GeoIP2 (see [GeoIP2](../administration/geoip)).
:::

### AS number

The subtype "AS number" can be used to define an AS number that is not allowed. If a request comes from an IP address that can be resolved to this AS number, the user cannot send his request.

:::note Example
123456
:::

### Country

The subtype "Country" can be used to define a country from which it is not allowed to send a request. Enter an ISO country code that is not authorized to make a submission. All IP addresses assigned to this country code will be blocked.

:::caution
Adding a country to the rule means that no one from that country can make a submission. On the one hand, this sounds good, on the other hand, this rule could discourage real users from making submissions. Please use this option carefully. The exact location of an IP address is never guaranteed.
:::

:::note Example
CH
:::

## User-Agent

### Text

The subtype "Normal Word" allows you to define a single word, part of a word, or combination of words. The value you enter must appear exactly as it does in the User-Agent for the rule to apply. You can use the asterisk (*) as a wildcard. When matching, `*word*` is used automatically, which means that you do not have to insert the placeholder before and after the searched word.

:::note Example
Best Browser<br />
Br*ws*r
:::

### Regular Expression

If you select "RegEx" as the subtype, you can define a regular expression pattern that mosparo will use to match. Please fill in the entire Regular Expression pattern in the field when creating the rule. The pattern must comply with PHP's regular expression requirements.

:::note Example
/(browser|brows3r)/i
:::

## Unicode Block

The Unicode Block rule type can be used to disallow some characters. For example, if you do not want to allow currency characters such as € or £ in your form, you can add the Unicode block "currency signs" as a rule. It is no longer possible to submit the form with characters from this block.

:::note Example
Currency Sign
:::

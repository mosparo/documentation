---
sidebar_position: 3
sidebar_label: Rule types
description: mosparo has various rule types. Here you will find an overview of all rule types.
---

# Rule types

mosparo knows different rules. Depending on the rule type, only specific fields are checked (for example, URL or email fields). The user selects the rule type before a rule is created. There can be several subtypes within a rule type.

## Word

### Normal word

The subtype "Normal Word" allows you to define a single word, part of a word, or combination of words. The value you enter must appear in the form exactly as it does in the rule for the rule to apply. You can use the asterisk (*) as a wildcard. When matching, `*word*` is used automatically, meaning you do not have to insert the placeholder before and after the searched word.

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

You can use the email address rule type to enter an email address that the user cannot enter in an email field.

:::note Example
info@example.com
:::

## Domain

With the rule type domain, you can enter a domain that the user may not enter in an email or URL field.

:::note Example
example.com
:::

## IP address

### Single IP address

With this subtype, you can enter a single IP address, which is not allowed to submit.

:::note Example
192.168.10.10

abcd:ef01::1
:::

### Subnet

With the subtype Subnet, you can enter an entire subnet, which is not allowed to submit.

:::note Example
192.168.10.0/24

abcd:ef01::/48
:::

## Website

The rule type "Website" can specify a website URL that the user may not enter in a URL or free text field.

:::caution
It is recommended to start your input with the protocol or two slashes for a protocol-independent URL. The rule could detect false domains as spam if the input does not begin with the protocol or at least with two slashes.
:::

:::note Example
//example.com/spam/test-form.html
:::

## Provider

To use the "Provider" rule type, you must configure the MindMax GeoLite2 database. Otherwise, the rule type has no influence. In addition, you must remember that these rule types cannot be guaranteed to function correctly. The AS number and country assignment to an IP address can be outdated or generally incorrect.

:::info
Before you can use the "Provider" rule type, you must configure GeoIP2 (see [GeoIP2](../administration/geoip)).
:::

### AS number

The subtype "AS number" can define an AS number that is not allowed. If a request comes from an IP address that can be resolved to this AS number, the user cannot send his request.

:::note Example
123456
:::

### Country

The subtype "Country" can define a country from which it cannot send a request. Enter an ISO country code that is not authorized to submit. mosparo will block all IP addresses assigned to this country code.

:::caution
Adding a country to the rule means that no one from that country can submit. On the one hand, this sounds good. On the other hand, this rule could discourage real users from making submissions. Please use this option carefully. The exact location of an IP address is never guaranteed.
:::

:::note Example
CH
:::

## User-Agent

### Text

The subtype "Normal Word" allows you to define a single word, part of a word, or combination of words. The value you enter must appear in the User-Agent exactly as it does in the rule for the rule to apply. You can use the asterisk (\*) as a wildcard. When matching, `*word*` is used automatically, meaning you do not have to insert the placeholder before and after the searched word.

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

You can use the Unicode Block rule type to disallow some characters. For example, if you do not want to allow currency characters such as € or £ in your form, you can add the Unicode block "currency signs" as a rule. It is no longer possible to submit the form with characters from this block.

:::note Example
Currency Sign
:::

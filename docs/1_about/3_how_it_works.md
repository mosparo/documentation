---
sidebar_position: 3
sidebar_label: How it works
---

# How it works

## Overview

The functionality of mosparo is relatively easy to explain. Instead of using a "magic method" to determine whether a visitor to your website is human or not, mosparo checks the data entered. If someone wants to send you spam,they must enter the appropriate information in your form. By searching through this entered data, the appropriate rules can be used to determine beyond doubt whether a submission should be classified as spam.

This method inevitably depends on your rules and rules. If there are no rules or no applicable rules in your project, each submission will be rated as good and you will receive the corresponding submission – even if it is spam.

If your rules are too restrictive, good submissions may also be blocked even though they don't contain unwanted content.

You should therefore regularly check that no solicited submissions have been identified as spam and/or spam requests have not been detected. If this is the case, you should adjust your rules.

The functionality of mosparo is basically based on two components. On the one hand, a special script must be  built  into your form, which adds a check box to your form. On the other hand, before processing your form, it must be checked whether the submission is valid. Depending on the CMS or framework, the appropriate solution is available for the integration of mosparo (see [Plugins](../integration/with_plugins)).

## Detailed operation

### Initial request

The first step is the request when opening the form. When the form is opened, a JavaScript file is automatically loaded by mosparo. This script creates the necessary elements that make up the box at the marked location.

Once all elements have been created,  the script sends  a request to the mosparo installation. This first request checks whether the user's IP address has not sent too many requests recently and/or is not blocked by the IP filter list. If too many requests have been sent from an IP address, either a delay is built in or the request is blocked (see [Security settings](../usage/settings#security-settings)).

If there are no objections, the request will be admitted.  A temporary submission code is created. This submission Cor is returned to the user's browser. In addition, the correct translations for the language used by the user (if any) or the translations in the mosparo standard language are returned.

The user's browser stores this information in the browser and displays the mosparo-Box accordingly.

If a delay was returned on the first request, mosparo will automatically try to receive a submission C again after the delay has expired and repeat the request.

### Review

After filling out the form, the user activates the mosparo checkbox. With this activation, all information of the form is automatically  collected and sent together with the submission Cor with a request to the mosparo installation for review. The collected form data includes the name of the field, the type of field (HTML5 type), and the value entered, among other things.

:::info
Certain fields are ignored because they cannot contain any data relevant for the check (see [ignored fields](../integration/ignored_fields)).
:::

The mosparo installation checks the submitted data. The type of the field can be used to decide which rule types are to be applied. For each field, it is  checked whether the entered values apply to one of the existing rules.  If this is the case for a rule, this hit is counted. One point is calculated per hit. However, this point can  be increased or decreased with the factor of the rule  entry and the factor of the rule (see [Spam detection](#spam-detection))

After all fields have been checked, it will be calculated how many points this submission has reached. If the number of points exceeds the spam limit set by the project, the submission will be recognized as spam.

:::info
If the honeypot function is active and the user has filled in the honeypot field, the submission will automatically be detected as spam.
:::

:::info
If the request-Mindestzeit function is active and the time between the first request and the review of the form data is less than the set request M, the submission will be considered spam.
:::

If a request is recognized as valid, a signature of the request is generated and all data is stored together with the signature. In addition, a verification code is generated and returned to the user's browser along with the result of the verification.

The user is shown whether the check was successful or whether a problem occurred. If the verification is successful, the user can submit the form.

The randomly generated verification code is stored in the form along with the submission code.

### Verification

After the user submits the form, Website checks whether the values entered are valid. For this purpose, the website uses the submission and verification codes and thus generates the submission signature, which mosparo itself has already created and saved.

The website transmits the submission code and the verification code together with the generated submission signature to the interface of the mosparo installation. mosparo loads the stored data from the database and checks whether the verification code has not yet been used and whether  the website has determined the same signature as the mosparo installation before.

This signature verification can be used to determine whether a request has really been checked beforehand or whether the user has manipulated the request. If the signatures do not match, the request is not valid and must be considered spam.

If everything was correct, the signatures are identical and therefore considered a valid request.

The submission will be marked accordingly and the result of the review will be returned to the website.

:::info
Certain fields are ignored because they cannot contain any data relevant for the check (see [ignored fields](../integration/ignored_fields)).
:::

:::info
The exact API functionality and how to create the signature can be found in [performing verification](../integration/custom#performing-verification).
:::

## Spam detection

In order to decide which submission is considered spam and which is not, the submitted data must be evaluated. This is basically done with the help of the existing rules. Each rule consists of at least one entry. For each existing entry, we verify that the entry matches the form data.

If this is the case, the form field receives a value in points. The default value is 1.0. When creating an entry in the rules, it is possible to enter a value between 0.0 and infinity. All rules and entries are now processed for each form field.

After all fields have been evaluated, the points of all fields are added together. The sum of all points will be considered as the evaluation of the entry. Whether a submission is considered spam is now determined by the spam limit set in the settings.

If the sum of the points of all fields is above the spam threshold, the submission will be considered spam. It is not possible to submit the form.

If the number of points is less than the spam limit, the submission will not be considered spam and the form can be submitted.

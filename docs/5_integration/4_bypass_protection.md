---
sidebar_position: 4
sidebar_label: Bypass protection
description: The frontend part of mosparo could be bypassed. Read here how to protect your form.
---

# Bypass protection

mosparo is a protection method that relies on the frontend for the most significant part of the process. Because the user can manipulate, what's happening in the browser, it's essential to ensure that the protection can not be bypassed.

In general, it is always possible to bypass a frontend protection method. You should never rely on browser form validation only because a bad actor can manipulate the frontend.

You could skip the mosparo protection with two different approaches. We explain these approaches and what you can do against them.

## Bypass mosparo in general

A bad actor could skip mosparo in general. It's pretty easy: remove the mosparo script from a form and submit it.

The protection against this is also easy: mosparo needs the frontend validation **and** the backend verification. Only with both of the mosparo methods can you be sure that the form got correctly checked by mosparo.

If you only use the frontend validation, you cannot be sure that the form was not manipulated after the validation.

## Bypass field validation

It's also possible to bypass the field validation without bypassing mosparo. This is done by modifying a field so that it gets ignored by mosparo and, therefore, not validated.

### Example

1. A form field looks like this
```html
<input type="text" name="first_name">
```
2. The bad actor enters the bad data into the field
3. Now the bad actor could change the type of the field with the developer tools of the browser to `password`
```html
<input type="password" name="first_name">
```
4. After that, the bad actor will click the mosparo checkbox. mosparo will execute the validation and return a validation token for the data.
5. The form gets submitted
6. The website's backend gets the fields and executes the verification. Since the field `first_name` was not validated by mosparo, the verification will return that everything is correct.
7. The backend processes the form data as developed. The field `first_name` will be used normally, and the backend will process the bad data.

Since it's more important for us to protect sensitive data like a password from validating, the solution for this bypass is to ensure that all verifiable fields got verified. Fields like a checkbox are not verifiable, so it doesn't matter if someone changes the type for that. But all text input fields usually are verifiable (`text`, `email`, `url`, `textarea`).

This check has to be done in the backend. As soon as you get the verification result from the mosparo API, please check that all verifiable fields got verified. If your backend can handle different forms (for example, like our WordPress plugin), it is recommended to find all verifiable fields in a form and check if these got verified.

### Examples in our plugins and integrations:

- [WordPress plugin (Contact Form 7 module)](https://github.com/mosparo/wordpress-plugin/blob/master/src/MosparoIntegration/Module/ContactForm7/MosparoField.php#L122)
- [Django integration](https://github.com/mosparo/django-integration/blob/master/mosparo_django/fields.py#L83)
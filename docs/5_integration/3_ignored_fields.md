---
sidebar_position: 3
sidebar_label: Ignored fields
description: Find out which fields are ignored by mosparo.
---

# Ignored fields

:::caution
Because mosparo ignores some fields, it is possible to bypass the field validation. Read more about this in [Bypass protection](bypass_protection).
:::

## Automatically ignored fields

mosparo automatically ignores the following fields:

- All fields which **do not** have a name (attribute `name`)
- HTML field type
  - _password_
  - _file_
  - _hidden_
  - _checkbox_
  - _radio_
  - _submit_
  - _reset_
- HTML button type
  - _submit_
  - _button_
- Fields containing `_mosparo_` in the name

## Manually ignored fields

### CSS class

If you give a form field the CSS class `mosparo__ignored-field`, the field will not be processed by mosparo.

### JavaScript initialisation

When initializing the JavaScript functionality, you can define the selector with which the fields are searched (see [Parameters of the mosparo class](custom#parameters-of-the-mosparo-class)).
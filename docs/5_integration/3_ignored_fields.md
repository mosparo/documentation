---
sidebar_position: 3
sidebar_label: Ignored fields
---

# Ignored fields

## Automatically ignored fields

mosparo automatically ignores the following fields:

- All fields which **do not** have a name (attribute `name`)
- HTML field type
    - _Password_
    - _File_
    - _Hidden_
    - _Checkbox_
    - _Radio_
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

When initialising the JavaScript functionality, the selector can be defined with which the fields are searched (see [Parameters of the mosparo class](custom/#parameters-of-the-mosparo-class)).
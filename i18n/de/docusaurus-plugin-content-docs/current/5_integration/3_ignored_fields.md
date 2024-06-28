---
sidebar_position: 3
sidebar_label: Ignorierte Felder
description: Erfahren Sie, welche Felder von mosparo ignoriert werden.
---

# Ingorierte Felder

:::caution
Weil mosparo einige Felder ignoriert, ist es möglich, die Validierung der Felder zu umgehen. Lesen Sie mehr darüber unter [Umgehungsschutz](bypass_protection).
:::

## Automatisch ignorierte Felder

mosparo ignoriert automatisch folgende Felder:

- Alle Felder, welche **keinen** Namen haben (Attribut `name`)
- HTML-Feldtyp
  - _password_
  - _file_
  - _hidden_
  - _checkbox_
  - _radio_
  - _submit_
  - _reset_
- HTML-Buttontyp
  - _submit_ 
  - _button_
- Felder, welche `_mosparo_` im Namen beinhalten


## Manuell ignorierte Felder

### CSS-Klasse

Wenn Sie einem Formularfeld die CSS-Klasse `mosparo__ignored-field` geben, wird das Feld nicht von mosparo verarbeitet.

### JavaScript-Initialisierung

Bei der Initialisierung der JavaScript Funktionalität kann der Selektor definiert werden, mit welchem die Felder gesucht werden (siehe [Parameter der mosparo-Klasse](custom#parameter-der-mosparo-klasse)).
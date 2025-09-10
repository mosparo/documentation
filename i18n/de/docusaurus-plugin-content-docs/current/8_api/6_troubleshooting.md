---
sidebar_position: 6
sidebar_label: Fehlersuche
description: Erfahren Sie mehr über die häufigsten Fehlermeldungen der API und was Sie dagegen tun können.
---

# Fehlersuche

## API-Fehlermeldung `Authorization header invalid.`

**API:** [Verification](./verification), [Statistic](./statistic)

Die mosparo APIs erwarten den öffentlichen Schlüssel und die Anfragesignatur (HMAC SHA256 Hash mit dem geheimen Schlüssel als Schlüssel) als Benutzernamen und Passwort in einer `Basic` `Autorisierung` Kopfzeile. Dazu berechnen Sie bitte den HMAC SHA256 Hash für Ihre Anfragedaten. Danach kombinieren Sie bitte den öffentlichen Schlüssel mit der
Anfrage-Signatur. Verwenden Sie einen Doppelpunkt `:`, um diese beiden Werte zu kombinieren. Kodieren Sie danach die kombinierte Zeichenkette als Base64 und fügen `Basic` vorne an.

### Beispiel

```php
<?php

$publicKey = 'XStQNakEiJk1oMIXJ6_Rxmd3j5gNcQae34n1G3aR6FU';
$requestSignature = '3bdd385caa53e3da76a8dcbfcaa0d9f4e04d8c189fab03ba41383deea236b2d3';
$authData = base64_encode($publicKey . ':' . $requestSignature);

// Set this header value as the Authorization header
$headerValue = 'Basic ' . $authData;
```

## API-Fehlermeldung `Request invalid.`

**API:** [Verification](./verification), [Statistic](./statistic)

Die häufigste Fehlermeldung der Verifizierungs- und Statistik-API ist die Meldung `Request invalid.`. Wenn Sie eine Anforderung an die API senden, müssen Sie den
öffentlichen Schlüssel und die Signatur der Anfragedaten (HMAC SHA256 Hash mit dem geheimen Schlüssel als Schlüssel) im `Authorization`-Header übermitteln. Wenn diese Signatur
ungültig ist antwortet die API mit `Request invalid.`.

### Mögliche Gründe für diese Fehlermeldung

Grundsätzlich gibt es für diese Fehlermeldung zwei mögliche Ursachen. Es ist möglich, dass der falsche geheime Schlüssel verwendet wurde. Bitte prüfen Sie, ob Sie den richten geheimen Schlüssel verwenden.

Falls der geheime Schlüssel korrekt ist, kann es ein Problem mit den Anfragedaten sein. Bitte stellen Sie sicher, dass die Anfragedaten für die Signatur die gleichen sind, welche auch an die API übermittelt werden.

## Feld als ungültig markiert

In manchen Fällen schlägt die Überprüfung fehl, und die Felder werden als ungültig markiert. Dies geschieht hauptsächlich aus zwei Gründen. Ein Grund ist, dass das Feld nicht zur Überprüfung übermittelt wird. Der andere Grund ist, dass die API eine andere Signatur für ein Feld berechnet als der API-Client.

Dieses zweite Problem tritt wahrscheinlich auf, weil die Signatur mit bereits validierten oder vorbereiteten Formulardaten erstellt wird. Ein einfaches Beispiel sind Leerzeichen, die am Anfang oder Ende eines Formularwertes abgeschnitten werden. mosparo nimmt bei der Validierung der Formulardaten im Frontend keine Feldmanipulationen vor, daher sollten Sie die ursprünglichen Formularwerte zur Verifizierung an die mosparo Backend-API senden.
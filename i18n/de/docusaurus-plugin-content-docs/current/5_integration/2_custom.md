---
sidebar_position: 2
sidebar_label: Eigene Integration
description: Erfahren Sie, wie Sie mosparo ohne Plugin in Ihre Website integrieren können.
---

# Eigene Integration

Sie können mosparo problemlos in Ihre eigene Website integrieren. Um mosparo nutzen zu können, brauchen Sie ein Formular, welches eines oder mehrere Formularfelder beinhaltet.

## Container einbauen

Fügen Sie in Ihrem Formular an der Stelle, an welcher die mosparo-Box angezeigt werden soll, einen leeren Div-Container ein, welcher mit einem ID-Attribut versehen ist:

```html
<div id="mosparo-box"></div>
```

## CSS-Ressourcen einbinden

Im Kopf Ihrer Website müssen Sie die CSS-Ressourcen von mosparo einbinden. Fügen Sie dazu folgenden Code im HTML-Head-Bereich ein:

```html
<link href="https://[host]/resources/[uuid]. css" rel="stylesheet"> 
```

Ersetzen Sie dabei `[host]` mit der Adresse Ihrer mosparo-Installation. Tragen Sie bei `[uuid]` die eindeutige Identifikationsnummer Ihres mosparo-Projektes ein.

:::info
Sie können die CSS-Ressourcen auch direkt vom Script beim Initialisieren der mosparo-Box einbinden. Verwenden Sie dazu die Option loadCssResource bei der Initialisierung (siehe [Parameter der mosparo-Klasse](#parameter-der-mosparo-klasse)).
:::

## JavaScript einbinden

Binden Sie das Script von mosparo auf Ihrer Website ein. Initialisieren Sie danach mosparo mit dem untenstehenden Code.

```html
<script  src="https://[host]/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo(
               '[htmlId]', 
               '[host]', 
               '[uuid]',
               '[publicKey]', 
               [options]
        );
    };
</script>
```

### Parameter der mosparo Klasse

| Parameter     | Typ    | Erforderlich | Beschreibung                                                               |
|---------------|--------|--------------|----------------------------------------------------------------------------|
| `[htmlId]`    | String | Erforderlich | HTML-ID des Div-Containers, welchen Sie in Ihrem Formular eingefügt haben. |
| `[host]`      | String | Erforderlich | Host Ihrer mosparo-Installation                                            |
| `[uuid]`      | String | Erforderlich | Eindeutige Identifikationsnummer des Projektes in mosparo                  |
| `[publicKey]` | String | Erforderlich | Öffentlicher Schlüssel des Projektes in mosparo                            |
| `[options]`   | Objekt | Optional     | Zusätzliche Optionen                                                       |

### Zusätzliche Optionen

| Parameter                | Typ       | Standard-Wert                         | Beschreibung                                                                                                                                                                                                                                                                                                               |
|--------------------------|-----------|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| allowBrowserValidation   | Boolean   | true                                  | Gibt an, ob die Browser-Validierung aktiv sein soll.                                                                                                                                                                                                                                                                       |
| cssResourceUrl           | String    | _leer_                                | Definiert die Adresse, unter welcher die CSS-Ressourcen geladen werden können. Kann verwendet werden, wenn die korrekte Ressourcenadresse gecached wird.                                                                                                                                                                   |
| designMode               | Boolean   | false                                 | Wird verwendet, um im Backend von mosparo die mosparo-Box in den unterschiedlichen Zuständen darzustellen. Die mosparo-Box ist nicht funktionsfähig, wenn diese Option auf `true` gesetzt wird.                                                                                                                            |
| inputFieldSelector       | String    | `[name]:not(.mosparo__ignored-field)` | Definiert den Selektor, mit welchem die Felder gesucht werden.                                                                                                                                                                                                                                                             |
| loadCssResource          | Boolean   | false                                 | Bestimmt, ob bei der Initialisierung auch die CSS-Ressourcen geladen werden sollen (siehe [CSS-Ressourcen einbinden](#css-ressourcen-einbinden)).                                                                                                                                                                          |
| name                     | String    | _leer_                                | Definiert den Namen der HTML-Checkbox. Standardmässig wird eine zufällige ID dafür verwendet.                                                                                                                                                                                                                              |
| onCheckForm              | Callable  | _leer_                                | Definiert ein Callback, welches aufgerufen wird, sobald das Formular überprüft wurde.                                                                                                                                                                                                                                      |
| requestSubmitTokenOnInit | Boolean   | `true`                                | Gibt an, ob bei der Initialisierung automatisch ein Einsendecode angefordert werden soll. Wenn zum Beispiel direkt nach der Initialisierung des Formulars das Formular zurückgesetzt wird (mit `reset()`) braucht es bei der Initialisierung keinen Einsendecode, da mit dem Zurücksetzen ein neuer Code angefordert wird. |

## Verifizierung durchführen

Nachdem das Formular abgesendet wurde, muss überprüft werden, ob die Einsendung überhaupt erlaubt war. Rein technisch wäre es vorstellbar, dass jemand zwar die Prüfung von mosparo besteht, danach mit technischen Mitteln die Anfrage wieder verändert und erst dann das Formular absendet. Daher ist es zwingend erforderlich, zu überprüfen, ob die getätigten Eingaben gültig waren.

### Vorbereiten der Formulardaten

Aus den eingesendeten Formulardaten müssen alle von mosparo ignorierten Felder entfernt werden (siehe [ignorierte Felder](../integration/ignored_fields)).

### Verifizieren mit Funktionsbibliothek

Anschliessend können Sie mit der Funktionsbibliothek die Verifizierung durchführen. Dazu benötigen Sie den Host Ihrer mosparo-Installation, den öffentlichen sowie den privaten Schlüssel sowie die bereinigten Formulardaten.

Konsultieren Sie für die genaue Vorgehensweise die Dokumentation der von Ihnen verwendeten Funktionsbibliothek.

#### Funktionsbibliotheken

Um die Verifizierung auf Ihrer Website zu vereinfachen, gibt es Funktionsbibliotheken, welche die Verifizierung vereinfachen. Falls Sie die Verifizierung ohne Funktionsbibliothek durchführen möchten, siehe [Verifizierung manuell durchführen](#verifizierung-manuell-durchführen).

| Name           | Sprache    | Verwaltet durch         | Website                                   |
|----------------|------------|-------------------------|-------------------------------------------|
| PHP API client | PHP        | mosparo Core Developers | https://github.com/mosparo/php-api-client |
| JS API Client  | JavaScript | mosparo Core Developers | https://github.com/mosparo/js-api-client  | 

### Verifizierung manuell durchführen

Wenn Sie keine Funktionsbibliothek verwenden möchten oder für Ihre Programmiersprache keine Funktionsbibliothek verfügbar ist, können Sie die Verifizierung problemlos manuell durchführen.

:::info
Alle Code-Beispiele in diesem Abschnitt sind in der Programmiersprache PHP geschrieben (aus der [PHP Funktionsbibliothek](https://github.com/mosparo/php-api-client/)). Grundsätzlich dient das aber nur zur besseren Darstellung und es kann jede beliebige Programmiersprache verwendet werden.
:::

#### Formulardaten weiter für die Anfrage vorbereiten 

Nachdem die Formulardaten gereinigten wurden (siehe [Vorbereiten der Formulardaten](#vorbereiten-der-formulardaten)), müssen Sie zusätzlich weitere Bereinigungen vornehmen:

1. Extrahieren Sie den Einsendecode `_mosparo_submitToken` sowie den Validierungscode `_mosparo_validationToken` aus den Formulardaten und speichern Sie diese Werte in einer Variable.
2. Alle Formularfelder, deren Name mit `_mosparo_` beginnt, müssen aus den Formulardaten entfernt werden. Es handelt sich dabei unter anderem um den Einsendecode sowie den Validierungscode von mosparo, welchen Sie für die Verifizierung benötigen, jedoch nicht in den Formulardaten vorhanden sein dürfen.
3. In allen Feldern müssen CRLF-Zeilenumbrüche mit LF-Zeilenumbrüchen ersetzt werden (`\r\n` zu `\n` konvertieren)
4. Die Namen der Formulardaten müssen zu Kleinbuchstaben konvertiert werden
5. Die Formularfelder sollen nach Namen alphabetisch aufsteigend (A-Z) sortiert werden

#### Generieren der Signaturen

Nachdem die Formulardaten bereinigt und sortiert wurden, müssen Sie die notwendigen Signaturen erstellen und anschliessend die Daten an mosparo senden.

Generieren Sie zuerst eine Signature der Formulardaten. Konvertieren Sie dazu die Formulardaten zu einem JSON-String. Erzeugen Sie anschliessend einen HMAC Hash mit dem Hash-Algorithmus SHA256 und dem privaten API-Schlüssel als Schlüssel.

```php
$formSignature = hmac_hash('sha256', json_encode($formData), $privateKey);
```

:::note
Beachten Sie, dass leere Arrays `[]` im JSON-String als leere Objete `{}` dargestellt werden sollten, da es ansonsten zu Problemen kommen kann. 
:::

Erzeugen Sie anschliessend eine Signatur des Validierungscode, welcher im Formular von mosparo übermittelt wurde.

```php
$validationSignature = hmac_hash('sha256', $validationToken, $privateKey);
```

Um eine Veränderung der Daten zu verunmöglichen, muss anschliessend eine Verifikationssignatur erzeugt werden, welche aus der Validierungssignature sowie der Formulardatensignatur besteht.

```php
$verificationSignature = hmac_hash('sha256', $validationSignature . $formSignature, $privateKey);
```

Diese Signaturen müssen zusammen mit dem Einsendecode sowie den Formulardaten an mosparo übermittelt werden.

```php
$apiEndpoint = '/api/v1/verification/verify';
$requestData = [
    'submitToken' => $submitToken,
    'validationSignature' => $validationSignature,
    'formSignature' => $formSignature,
    'formData' => $formData
];
```

Um die Echtheit der Anfrage zu bestätigen, wird eine Anfragesignatur erzeugt, welche aus dem API-Endpunkt sowie den Anfragedaten als JSON-String besteht.

```php
$requestSignature = hmac_hash('sha256', $apiEndpoint . json_encode($requestData), $privateKey);
```

#### Senden der Verifizierungs-Anfrage

Um die Anfrage zu starten, senden Sie eine POST-Anfrage an den Host Ihrer mosparo-Installation. Verwenden Sie den API-Endpunkt `/api/v1/verification/verify` und die Anfrage-Daten.

Um die Authentizität Ihrer Anfrage zu gewährleisten, senden Sie bitte den öffentlichen Schlüssel sowie die Anfragesignatur in der Authorization-Kopfzeile.

```php
$data = [
    'auth' => [$publicKey, $requestSignature],
    'headers' => [
        'Accept' => 'application/json'
    ],
    'json' => $requestData
];

$res = $this->sendRequest('POST', $apiEndpoint, $data);
```

#### Auswerten der Antwort

Die Antwort der API von mosparo gibt an, ob eine Antwort korrekt ist oder ob eine Anfrage ungültig ist. Die folgenden Felder können in der Anfrage enthalten sein:

| Feld                  | Typ      | Beschreibung                                                                                                                                           |
|-----------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| valid                 | Boolean  | Gibt an, ob eine Anfrage gültig (also abgesendet werden darf) oder ungültig (manipuliert) ist.                                                         |
| verificationSignature | String   | mosparo berechnet die eigene Verifikationssignatur, welche mit der vor dem Absenden der Anfrage berechneten Verifikationssignatur übereinstimmen muss. |
| issues                | Array    | Ein Array mit allen Problemen, welche bei der ÜBerprüfung festgestellt wurden.                                                                         |
| verifiedFields        | Objekt   | Gibt an, welche Felder der Formulardaten überprüft wurden und was der Zustand der jeweiligen Felder ist.                                               | 
| error                 | Boolean  | Wenn ein Fehler aufgetreten ist, ist dieses Feld auf `true` gesetzt.                                                                                   |
| errorMessage          | String   | Die Fehlermeldung des Fehlers.                                                                                                                         |

Als erstes sollte geprüft werden, ob das Feld `valid` gesetzt und auf `true` gesetzt ist. Falls das nicht der Fall ist, sind die Formulardaten ungültig.

Anschliessend sollte die `verificationSignature` überprüft werden. Damit eine Anfrage gültig ist, muss die Verifikationssignatur, welche vor dem Absenden der Anfrage erstellt wurde, mit der von der API zurückgegebenen Verifikationssignatur übereinstimmen. Ist das nicht der Fall, wurde die Anfrage manipuliert und ist damit ungültig.

Im Feld `issues` werden mögliche Probleme, welche bei der Verifizierung festgestellt wurden, festgehalten.

Mit dem Feld `verifiedFields` wird dokumentiert, welche Felder überprüft wurden und was das Ergebnis des jeweiligen Feldes ist.

##### Werte für `verifiedFields`

| Wert         | Beschreibung                                                                                                                                                                                     |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| valid        | Das Feld wurde korrekt überprüft und ist gültig.                                                                                                                                                 |
| invalid      | Das Feld wurde nicht korrekt validiert, sprich der Wert, welcher bei der Verifizierung übermittelt wurde, stimmt nicht mit dem Wert überein, welcher im Formular ursprünglich eingetragen wurde. |

Falls bei der Überprüfung ein Fehler aufgetreten ist, wird das Feld `error` sowie `errorMessage` gesetzt. Die beiden Felder geben an das ein Fehler aufgetreten ist und was die Fehlermeldung dazu ist. Dies passiert beispielsweise, wenn der öffentliche Schlüssel oder eine der Signaturen ungültig waren oder ein anderes Problem auftrat.

#### Nach der Verifizierung

Wenn das Feld `valid` den Wert `true` enthält und die Verifikationssignatur korrekt überprüft werden konnte, kann die Formulareingabe verarbeitet werden, zum Beispiel in dem das E-Mail abgesendet wird oder die Daten in der Datenbank gespeichert werden.
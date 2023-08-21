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

| Parameter               | Typ      | Standard-Wert                       | Beschreibung                                                                                                                                                                                                                                                                                                               |
|-------------------------|----------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowBrowserValidation`  | Boolean  | `true`                                | Gibt an, ob die Browser-Validierung aktiv sein soll.                                                                                                                                                                                                                                                                       |
| `cssResourceUrl`          | String   | _leer_                              | Definiert die Adresse, unter welcher die CSS-Ressourcen geladen werden können. Kann verwendet werden, wenn die korrekte Ressourcenadresse gecached wird.                                                                                                                                                                   |
| `customMessages`           | Objekt   | `{}`                                | Ermöglicht das überschreiben der Texte in der Frontend-Box (siehe [Benutzerdefinierte Texte](#benutzerdefinierte-texte)).                                                                                                                                                                                                  |
| `designMode`              | Boolean  | `false`                               | Wird verwendet, um im Backend von mosparo die mosparo-Box in den unterschiedlichen Zuständen darzustellen. Die mosparo-Box ist nicht funktionsfähig, wenn diese Option auf `true` gesetzt wird.                                                                                                                            |
| `doSubmitFormInvisible`    | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Mit dieser Methode ist die Ausführung einer benutzerdefinierten Übermittlungsaktion möglich, nachdem das Formular validiert wurde (z. B. durch XHR). Dadurch wird der Standardübermittlungsprozess übersprungen.                                                                             |
| `inputFieldSelector`      | String   | `[name]:not(.mosparo__ignored-field)` | Definiert den Selektor, mit welchem die Felder gesucht werden.                                                                                                                                                                                                                                                             |
| `loadCssResource`         | Boolean  | `false`                               | Bestimmt, ob bei der Initialisierung auch die CSS-Ressourcen geladen werden sollen (siehe [CSS-Ressourcen einbinden](#css-ressourcen-einbinden)).                                                                                                                                                                          |
| `name`                    | String   | _leer_                              | Definiert den Namen der HTML-Checkbox. Standardmässig wird eine zufällige ID dafür verwendet.                                                                                                                                                                                                                              |
| `onAbortSubmit`            | Callable | _leer_                               | _(Nur im sichtbaren Modus)_ Dieser Callback wird aufgerufen, nachdem der Absendevorgang abgebrochen wurde, z.B. wenn das Formular von mosparo erneut validiert werden muss.                                                                                                                                                |
| `onCheckForm`              | Callable | _leer_                               | Definiert einen Callback, der aufgerufen wird, sobald das Formular geprüft wurde. Das Überprüfungsergebnis wird als boolescher Parameter an den Callback übergeben (`true` wenn alles korrekt ist, `false` wenn nicht).                                                                                                    |
| `onResetState`             | Callable | _leer_                               | Definiert einen Callback, der ausgeführt wird, nachdem die mosparo Box zurückgesetzt wurde (z.B. nachdem das Formular zurückgesetzt wurde).                                                                                                                                                                                |
| `onSwitchToInvisible`      | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Wenn eine Website den unsichtbaren Modus verwendet, initialisiert sich mosparo im sichtbaren Modus und wechselt nach Erhalt des Einsende-Codes in den unsichtbaren Modus. Dieser Callback wird nach dem Wechsel in den unsichtbaren Modus aufgerufen.                                        |
| `onSubmitFormInvisible`    | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Dieser Callback wird aufgerufen, bevor das Formular abgeschickt wird.                                                                                                                                                                                                                        |
| `onValidateFormInvisible`  | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Dieser Callback wird aufgerufen, bevor das Formular validiert wird.                                                                                                                                                                                                                          |
| `requestSubmitTokenOnInit` | Boolean  | `true`                              | Gibt an, ob bei der Initialisierung automatisch ein Einsendecode angefordert werden soll. Wenn zum Beispiel direkt nach der Initialisierung des Formulars das Formular zurückgesetzt wird (mit `reset()`) braucht es bei der Initialisierung keinen Einsendecode, da mit dem Zurücksetzen ein neuer Code angefordert wird. |

#### Benutzerdefinierte Texte

Mit der Option `customMessages` ist es möglich, die in der Frontend-Box sichtbaren Texte anzupassen. Die Option akzeptiert ein Objekt, wobei der Eigenschaftsname das Gebietsschema und der Wert ein Objekt ist.

In dem Objekt für ein Gebietsschema ist der Eigenschaftsname der Name der Nachricht, während der Wert der übersetzte Text ist (siehe [Texte](#texte)).

Die Funktionalität verwendet die Sprachinformationen des Browsers durch Zugriff auf `navigator.languages`. Wenn diese Eigenschaft nicht verfügbar ist, wird das Skript die Übersetzungen verwenden, die es vom mosparo-Backend erhalten hat. Alle in der Eigenschaft `navigator.languages` verfügbaren Gebietsschemata werden getestet, wobei das erste, das übereinstimmt und nicht leer ist, verwendet wird. Wenn ein Bindestrich im Namen des Gebietsschemas enthalten ist (`-`, zum Beispiel `de-CH`), wird er durch einen Unterstrich ersetzt (`_`, zum Beispiel `de_CH`).

##### Texte

| Text-Name                     | Verwendungszweck                                                                                                                    | Standard-Wert                                                                                                   |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `label`                       | Dies ist der Hauptsatz der Box.                                                                                                     | Ich akzeptiere, dass die Formulareingaben auf Spam überprüft und für 14 Tage verschlüsselt gespeichert werden.  |
| `accessibilityCheckingData`   | Dies ist eine Statusaktualisierung, wenn mosparo die Daten überprüft. Sie ist nur für Screen Readers sichtbar.                      | Wir überprüfen Ihre Daten. Bitte warten Sie.                                                                    |
| `accessibilityDataValid`      | Dies ist ein Status-Update, wenn mosparo die Daten überprüft hat und alles in Ordnung ist. Sie ist nur für Screen Readers sichtbar. | Ihre Daten enthalten kein Spam. Sie können das Formular absenden.                                               |
| `errorGotNoToken`             | Sichtbar, wenn kein Einsendecode von mosparo zurückgegeben wurde.                                                                   | mosparo hat keinen Absende-Token ausgestellt.                                                                   |
| `errorInternalError`          | Sichtbar, wenn mosparo einen internen Fehler hatte.                                                                                 | Es trat ein Fehler auf. Bitte wiederholen Sie den Vorgang.                                                      |
| `errorNoSubmitTokenAvailable` | Sichtbar, wenn der Einsendecode aus dem Formular entfernt wurde, z. B. weil das Formular manipuliert wurde.                         | Kein Absende-Token verfügbar. Die Validierung Ihrer Daten ist nicht möglich.                                    |
| `errorSpamDetected`           | Wird angezeigt, wenn mosparo Spam in der Einsendung entdeckt hat.                                                                   | In Ihren Daten ist Spam enthalten.                                                                              |
| `errorLockedOut`              | Wird angezeigt, wenn der Benutzer zu viele Einsendungen eingereicht und mosparo den Benutzer ausgesperrt hat.                       | Sie wurden temporär gesperrt. Bitte versuchen Sie es nach `%datetime%` erneut.                                  |
| `errorDelay`                  | Wird angezeigt, wenn der Benutzer zu viele Einsendecodes angefordert und daher von mosparo verzögert wurde.                         | Ihre Anfrage wurde verzögert. Bitte warten Sie `%seconds%` Sekunden.                                              |
| `hpLeaveEmpty`                | Diese Meldung ist versteckt und nur für Screen Readers für das Honeypot-Feld sichtbar.                                              | Dieses Feld leer lassen                                                                                         |

##### Beispiel

```javascript
mosparo('mosparo-box', 'host', 'uuid', 'publicKey', {
    customMessages: {
        de_CH: {
            label: 'Ich akzeptiere aus der Schweiz'
        },
        en_GB: {
            label: 'I accept from United Kingdom'
        },
        en_AU: {
            label: 'I accept from Australia',
            errorSpamDetected: 'Spam from Australia? Impossible!'
        }
    }
});
```

### Ereignisse

Wenn Sie die Initialisierungsparameter nicht anpassen können, können Sie auch die benutzerdefinierten Ereignisse verwenden, um die Ausführung von mosparo zu steuern. Alle Ereignisse werden auf dem Formularelement (`<form>`) ausgelöst. mosparo löst die folgenden Ereignisse aus:

| Ereignisname              | Beschreibung                                                                                                                                                                                                                                         |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `form-checked`            | Definiert das Ereignis, welches ausgelöst wird, sobald das Formular geprüft wurde. Das Ergebnis der Prüfung wird als boolescher Wert `valid` an das Ereignis übergeben (`true` wenn alles korrekt ist, `false` wenn nicht).                          |
| `state-reseted`           | Definiert das Ereignis, welches ausgelöst wird, nachdem das mosparo-Feld zurückgesetzt wurde (zum Beispiel, nachdem das Formular zurückgesetzt wurde).                                                                                               |
| `switch-to-invisible`     | Wenn eine Website den unsichtbaren Modus verwendet, initialisiert sich mosparo im sichtbaren Modus und wechselt nach Erhalt des Einsende-Codes in den unsichtbaren Modus. Dieses Ereignis wird nach dem Wechsel in den unsichtbaren Modus ausgelöst. |
| `submit-aborted`          | _(Nur im sichtbaren Modus)_ Dieses Ereignis wird ausgelöst, wenn der Sendevorgang abgebrochen wird, z.B. wenn das Formular von mosparo erneut validiert werden muss.                                                                                 |
| `submit-form-invisible`   | _(Nur im unsichtbaren Modus)_ Dieses Ereignis wird vor dem Absenden des Formulars ausgelöst.                                                                                                                                                         |
| `validate-form-invisible` | _(Nur im unsichtbaren Modus)_ Dieses Ereignis wird ausgelöst, bevor das Formular validiert wird.                                                                                                                                                     |

#### Beispiele für Ereignisse und Callbacks

```javascript
mosparo('mosparo-box', 'host', 'uuid', 'publicKey', {
    onCheckForm: function (valid) {
        console.log('onCheckForm', valid);
    },
    onResetState: function () {
        console.log('onResetState');
    },
    onAbortSubmit: function () {
        console.log('onAbortSubmit');
    },
    onSwitchToInvisible: function () {
        console.log('onSwitchToInvisible');
    },
    onValidateFormInvisible: function () {
        console.log('onValidateFormInvisible');
    },
    onSubmitFormInvisible: function () {
        console.log('onSubmitFormInvisible');
    }
});

document.getElementById('contact-form').addEventListener('form-checked', function (ev) {
    console.log(ev, ev.detail.valid);
});

document.getElementById('contact-form').addEventListener('submit-aborted', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('state-reseted', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('switch-to-invisible', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('validate-form-invisible', function (ev) {
    console.log(ev);
});

document.getElementById('contact-form').addEventListener('submit-form-invisible', function (ev) {
    console.log(ev);
});
```

## Verifizierung durchführen

Nachdem das Formular abgesendet wurde, muss überprüft werden, ob die Einsendung überhaupt erlaubt war. Rein technisch wäre es vorstellbar, dass jemand zwar die Prüfung von mosparo besteht, danach mit technischen Mitteln die Anfrage wieder verändert und erst dann das Formular absendet. Daher ist es zwingend erforderlich, zu überprüfen, ob die getätigten Eingaben gültig waren.

### Vorbereiten der Formulardaten

Aus den eingesendeten Formulardaten müssen alle von mosparo ignorierten Felder entfernt werden (siehe [ignorierte Felder](../integration/ignored_fields/)).

### Verifizieren mit Funktionsbibliothek

Anschliessend können Sie mit der Funktionsbibliothek die Verifizierung durchführen. Dazu benötigen Sie den Host Ihrer mosparo-Installation, den öffentlichen sowie den privaten Schlüssel sowie die bereinigten Formulardaten.

Konsultieren Sie für die genaue Vorgehensweise die Dokumentation der von Ihnen verwendeten Funktionsbibliothek.

#### Funktionsbibliotheken

Um die Verifizierung auf Ihrer Website zu vereinfachen, gibt es Funktionsbibliotheken, welche die Verifizierung vereinfachen. Falls Sie die Verifizierung ohne Funktionsbibliothek durchführen möchten, siehe [Verifizierung manuell durchführen](#verifizierung-manuell-durchführen).

| Name              | Sprache    | Gepflegt durch          | Website                                      |
|-------------------|------------|-------------------------|----------------------------------------------|
| JS API client     | JavaScript | mosparo Core Developers | https://github.com/mosparo/js-api-client     |
| PHP API client    | PHP        | mosparo Core Developers | https://github.com/mosparo/php-api-client    |
| Python API client | Python     | mosparo Core Developers | https://github.com/mosparo/python-api-client |

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
4. Generierung der Signatur (HMAC SHA256 Hash) für jeden Wert (siehe [Argumente](../api/verification/#argumente)).
5. Die Namen der Formulardaten müssen zu Kleinbuchstaben konvertiert werden
6. Die Formularfelder sollen nach Namen alphabetisch aufsteigend (A-Z) sortiert werden

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
| `valid`                 | Boolean  | Gibt an, ob eine Anfrage gültig (also abgesendet werden darf) oder ungültig (manipuliert) ist.                                                         |
| `verificationSignature` | String   | mosparo berechnet die eigene Verifikationssignatur, welche mit der vor dem Absenden der Anfrage berechneten Verifikationssignatur übereinstimmen muss. |
| `issues`                | Array    | Ein Array mit allen Problemen, welche bei der ÜBerprüfung festgestellt wurden.                                                                         |
| `verifiedFields`        | Objekt   | Gibt an, welche Felder der Formulardaten überprüft wurden und was der Zustand der jeweiligen Felder ist.                                               | 
| `error`                 | Boolean  | Wenn ein Fehler aufgetreten ist, ist dieses Feld auf `true` gesetzt.                                                                                   |
| `errorMessage`          | String   | Die Fehlermeldung des Fehlers.                                                                                                                         |

Als erstes sollte geprüft werden, ob das Feld `valid` gesetzt und auf `true` gesetzt ist. Falls das nicht der Fall ist, sind die Formulardaten ungültig.

Anschliessend sollte die `verificationSignature` überprüft werden. Damit eine Anfrage gültig ist, muss die Verifikationssignatur, welche vor dem Absenden der Anfrage erstellt wurde, mit der von der API zurückgegebenen Verifikationssignatur übereinstimmen. Ist das nicht der Fall, wurde die Anfrage manipuliert und ist damit ungültig.

Im Feld `issues` werden mögliche Probleme, welche bei der Verifizierung festgestellt wurden, festgehalten.

Mit dem Feld `verifiedFields` wird dokumentiert, welche Felder überprüft wurden und was das Ergebnis des jeweiligen Feldes ist.

##### Werte für `verifiedFields`

| Wert         | Beschreibung                                                                                                                                                                                     |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `valid`        | Das Feld wurde korrekt überprüft und ist gültig.                                                                                                                                                 |
| `invalid`      | Das Feld wurde nicht korrekt validiert, sprich der Wert, welcher bei der Verifizierung übermittelt wurde, stimmt nicht mit dem Wert überein, welcher im Formular ursprünglich eingetragen wurde. |

Falls bei der Überprüfung ein Fehler aufgetreten ist, wird das Feld `error` sowie `errorMessage` gesetzt. Die beiden Felder geben an das ein Fehler aufgetreten ist und was die Fehlermeldung dazu ist. Dies passiert beispielsweise, wenn der öffentliche Schlüssel oder eine der Signaturen ungültig waren oder ein anderes Problem auftrat.

#### Nach der Verifizierung

Wenn das Feld `valid` den Wert `true` enthält und die Verifikationssignatur korrekt überprüft werden konnte, müssen Sie sicherstellen, dass der Schutz nicht umgangen wurde. Lesen Sie mehr darüber unter [Umgehungsschutz](bypass_protection). Anschliessend können die Formulareingabe verarbeitet werden, zum Beispiel in dem das E-Mail abgesendet wird oder die Daten in der Datenbank gespeichert werden.

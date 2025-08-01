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

### Einfache CSS-Integration

Im Kopf Ihrer Website müssen Sie die CSS-Ressourcen von mosparo einbinden. Fügen Sie dazu folgenden Code im HTML-Head-Bereich ein:

```html
<link href="https://<host>/resources/<uuid>.css" rel="stylesheet"> 
```

Ersetzen Sie dabei `<host>` mit der Adresse Ihrer mosparo-Installation. Tragen Sie bei `<uuid>` die eindeutige Identifikationsnummer Ihres mosparo-Projektes ein.

:::info
Sie können die CSS-Ressourcen auch direkt vom Script beim Initialisieren der mosparo-Box einbinden. Verwenden Sie dazu die Option loadCssResource bei der Initialisierung (siehe [Parameter der mosparo-Klasse](#parameter-der-mosparo-klasse)).
:::

### Erweiterte CSS-Integration

In den Darstellungseinstellungen von mosparo können Sie die optische Darstellung der mosparo-Box festlegen. Jedes Projekt kann aber nur eine Darstellung haben.

Wenn Sie mehr Darstellungsmöglichkeiten benötigen, zum Beispiel wenn Ihre Website einen hellen und einen dunklen Modus hat, dann können Sie die erweiterte CSS-Integration verwenden.

Im Gegensatz zur einfachen CSS-Integration müssen Sie in der erweiterten Integration die Farben und andere Darstellungseinstellungen im CSS-Code Ihrer Website als CSS-Variablen angeben. Die Einstellungen, welche Sie in mosparo definieren, haben keine Wirkung.

Um den erweiterten Modus zu nutzen, betten Sie die Standard-CSS-Datei aus Ihrer mosparo-Installation ein:

```html
<link href="https://<host>/build/mosparo-frontend.css" rel="stylesheet"> 
```

Ersetzen Sie `<host>` durch die Adresse Ihrer mosparo-Installation.

Danach geben Sie die erforderlichen CSS-Variablen an. Sie können den nachstehenden Code kopieren und die Werte anpassen, oder Sie können mit der Anpassung der Werte beginnen, indem Sie die Entwicklerwerkzeuge in Ihrem Browser verwenden.

#### Sichtbarer Spam-Schutz

```css
:root {
    --mosparo-content-display: block;
    --mosparo-container-position: relative;
    --mosparo-border-color: #000000;
    --mosparo-border-radius: 11px;
    --mosparo-border-width: 3px;
    --mosparo-background-color: #ffffff;
    --mosparo-text-color: #000000;
    --mosparo-shadow-color: transparent;
    --mosparo-shadow-inset-color: transparent;
    --mosparo-circle-border-color: #000000;
    --mosparo-circle-radius: 20px;
    --mosparo-circle-border-width: 3px;
    --mosparo-ping-animation-name: 'mosparo__ping-animation'; /* Oder 'none' um die Animation zu deaktivieren */
    --mosparo-focus-circle-border-color: #0000ff;
    --mosparo-focus-circle-shadow-color: transparent;
    --mosparo-loading-circle-border-color: transparent;
    --mosparo-loading-circle-animated-border-color: #0000ff;
    --mosparo-success-border-color: #00ff00;
    --mosparo-success-background-color: #ffffff;
    --mosparo-success-circle-border-color: #00ff00;
    --mosparo-success-text-color: #000000;
    --mosparo-success-shadow-color: transparent;
    --mosparo-success-shadow-inset-color: transparent;
    --mosparo-failure-border-color: #ff0000;
    --mosparo-failure-background-color: #ffffff;
    --mosparo-failure-circle-border-color: #ff0000;
    --mosparo-failure-text-color: #ff0000;
    --mosparo-failure-text-error-color: #ff0000;
    --mosparo-failure-shadow-color: transparent;
    --mosparo-failure-shadow-inset-color: transparent;
    --mosparo-show-logo: none; /* Um das Logo sehen zu können, brauchen Sie einen CORS-Header. Setzen Sie diese Variable zu 'block' und prüfen Sie die Developer Console Ihrer Website. */
}
```

#### Unsichtbarer Spam-Schutz

Um den unsichtbaren Spam-Schutz zu verwenden, müssen Sie zunächst in den mosparo Darstellungseinstellungen auf den einfachen unsichtbaren Spam-Schutz umschalten. Andernfalls wird mosparo diesen Modus nicht korrekt initialisieren.

```css
:root {
    /* Erforderlich, nicht ändern */
    --mosparo-content-display: none !important;
    --mosparo-container-position: static;
    --mosparo-border-radius: 0;
    --mosparo-border-width: 0;
    --mosparo-padding-top: 0;
    --mosparo-padding-left: 0;
    --mosparo-padding-right: 0;
    --mosparo-padding-bottom: 0;
    --mosparo-shadow-blur-radius: 0;
    --mosparo-shadow-spread-radius: 0;

    /* Passen Sie die untenstehenden Variablen an */
    --mosparo-loader-position: fixed; /* Benutzen Sie 'fixed' um die ganze Seite oder 'absolute' um nur das Formular zu überlagern. */
    --mosparo-loader-background-color: rgba(255, 0, 0, 0.8);
    --mosparo-loader-text-color: #ffffff;
    --mosparo-loader-circle-color: #ffffff;
}
```

## JavaScript einbinden

Binden Sie das Script von mosparo auf Ihrer Website ein. Initialisieren Sie danach mosparo mit dem untenstehenden Code.

```html
<script  src="https://<host>/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo(
               '<htmlId>', 
               '<host>', 
               '<uuid>',
               '<publicKey>', 
               <options>
        );
    };
</script>
```

:::info
Die Kleiner-als- (`<`) und Grösser-als-Zeichen (`>`) sind zur Kennzeichnung des Platzhalters eingefügt und müssen mit dem richtigen Wert ersetzt werden.
:::

### Parameter der mosparo Klasse

| Parameter     | Typ    | Erforderlich | Beschreibung                                                               |
|---------------|--------|--------------|----------------------------------------------------------------------------|
| `<htmlId>`    | String | Erforderlich | HTML-ID des Div-Containers, welchen Sie in Ihrem Formular eingefügt haben. |
| `<host>`      | String | Erforderlich | Host Ihrer mosparo-Installation                                            |
| `<uuid>`      | String | Erforderlich | Eindeutige Identifikationsnummer des Projektes in mosparo                  |
| `<publicKey>` | String | Erforderlich | Öffentlicher Schlüssel des Projektes in mosparo                            |
| `<options>`   | Objekt | Optional     | Zusätzliche Optionen                                                       |

### Zusätzliche Optionen

| Parameter               | Typ      | Standard-Wert                       | Beschreibung                                                                                                                                                                                                                                                                                                                                  |
|-------------------------|----------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowBrowserValidation`  | Boolean  | `true`                                | Gibt an, ob die Browser-Validierung aktiv sein soll.                                                                                                                                                                                                                                                                                          |
| `cssResourceUrl`          | String   | _leer_                              | Definiert die Adresse, unter welcher die CSS-Ressourcen geladen werden können. Kann verwendet werden, wenn die korrekte Ressourcenadresse gecached wird.                                                                                                                                                                                      |
| `customMessages`           | Objekt   | `{}`                                | Ermöglicht das überschreiben der Texte in der Frontend-Box (siehe [Benutzerdefinierte Texte](#benutzerdefinierte-texte)).                                                                                                                                                                                                                     |
| `designMode`              | Boolean  | `false`                               | Wird verwendet, um im Backend von mosparo die mosparo-Box in den unterschiedlichen Zuständen darzustellen. Die mosparo-Box ist nicht funktionsfähig, wenn diese Option auf `true` gesetzt wird.                                                                                                                                               |
| `doSubmitFormInvisible`    | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Mit dieser Methode ist die Ausführung einer benutzerdefinierten Übermittlungsaktion möglich, nachdem das Formular validiert wurde (z. B. durch XHR). Dadurch wird der Standardübermittlungsprozess übersprungen.                                                                                                |
| `inputFieldSelector`      | String   | `[name]:not(.mosparo__ignored-field)` | Definiert den Selektor, mit welchem die Felder gesucht werden.                                                                                                                                                                                                                                                                                |
| `language`                 | String   | _leer_                               | Legt die Sprache der mosparo-Box fest. Das Feld ist standardmässig leer, dass heisst, mosparo verwendet die vom Browser definierte Sprache (falls vorhanden) oder Englisch. Wenn die Übersetzung für die definierte Sprache nicht vorhanden ist, antwortet mosparo mit der englischen Übersetzung. Beispiel: `fr_FR`. _(Hinzugefügt in v1.1)_ |
| `loadCssResource`         | Boolean  | `false`                               | Bestimmt, ob bei der Initialisierung auch die CSS-Ressourcen geladen werden sollen (siehe [CSS-Ressourcen einbinden](#css-ressourcen-einbinden)).                                                                                                                                                                                             |
| `name`                    | String   | _leer_                              | Definiert den Namen der HTML-Checkbox. Standardmässig wird eine zufällige ID dafür verwendet.                                                                                                                                                                                                                                                 |
| `onBeforeGetFormData`      | Callable | _leer_                               | Dieser Callback wird aufgerufen, bevor die Formulardaten vom Formular abgeholt werden. Mit diesem Callback ist es möglich, die Formulardaten vorzubereiten (zum Beispiel für WYSIWYG-Felder, die den Inhalt in der `textarea` speichern müssen).                                                                                              |
| `onGetFormData`            | Callable | _leer_                               | Dieser Callback wird aufgerufen, nachdem die Formulardaten aus dem Formular gesammelt wurden. Mit diesem Callback ist es möglich, die gesammelten Formulardaten anzupassen (um Beispiel um zusätzliche Felder zu den Formulardaten oder der Liste der ignorierten Felder hinzuzufügen oder zu entfernen).                                     |
| `onGetFieldValue`          | Callable | _leer_                               | Mit diesem Callback ist es möglich, den Wert eines Feldes anzupassen. Die Callback-Methode erhält das Formularelement als erstes Argument und den Wert als zweites Argument und erwartet den Wert des Feldes als Rückgabewert.                                                                                                                |
| `onCheckForm`              | Callable | _leer_                               | Definiert einen Callback, der aufgerufen wird, sobald das Formular geprüft wurde. Das Überprüfungsergebnis wird als boolescher Parameter an den Callback übergeben (`true` wenn alles korrekt ist, `false` wenn nicht).                                                                                                                       |
| `onResetState`             | Callable | _leer_                               | Definiert einen Callback, der ausgeführt wird, nachdem die mosparo Box zurückgesetzt wurde (z.B. nachdem das Formular zurückgesetzt wurde).                                                                                                                                                                                                   |
| `onAbortSubmit`            | Callable | _leer_                               | _(Nur im sichtbaren Modus)_ Dieser Callback wird aufgerufen, nachdem der Absendevorgang abgebrochen wurde, z.B. wenn das Formular von mosparo erneut validiert werden muss.                                                                                                                                                                   |
| `onSwitchToInvisible`      | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Wenn eine Website den unsichtbaren Modus verwendet, initialisiert sich mosparo im sichtbaren Modus und wechselt nach Erhalt des Einsende-Codes in den unsichtbaren Modus. Dieser Callback wird nach dem Wechsel in den unsichtbaren Modus aufgerufen.                                                           |
| `onSubmitFormInvisible`    | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Dieser Callback wird aufgerufen, bevor das Formular abgeschickt wird.                                                                                                                                                                                                                                           |
| `onValidateFormInvisible`  | Callable | _leer_                               | _(Nur im unsichtbaren Modus)_ Dieser Callback wird aufgerufen, bevor das Formular validiert wird.                                                                                                                                                                                                                                             |
| `requestSubmitTokenOnInit` | Boolean  | `true`                              | Gibt an, ob bei der Initialisierung automatisch ein Einsendecode angefordert werden soll. Wenn zum Beispiel direkt nach der Initialisierung des Formulars das Formular zurückgesetzt wird (mit `reset()`) braucht es bei der Initialisierung keinen Einsendecode, da mit dem Zurücksetzen ein neuer Code angefordert wird.                    |

#### Benutzerdefinierte Texte

Mit der Option `customMessages` ist es möglich, die in der Frontend-Box sichtbaren Texte anzupassen. Die Option akzeptiert ein Objekt, wobei der Eigenschaftsname das Gebietsschema und der Wert ein Objekt ist.

In dem Objekt für ein Gebietsschema ist der Eigenschaftsname der Name der Nachricht, während der Wert der übersetzte Text ist (siehe [Texte](#texte)).

Die Funktionalität verwendet die Sprachinformationen des Browsers durch Zugriff auf `navigator.languages`. Wenn diese Eigenschaft nicht verfügbar ist, wird das Skript die Übersetzungen verwenden, die es vom mosparo-Backend erhalten hat. Alle in der Eigenschaft `navigator.languages` verfügbaren Gebietsschemata werden getestet, wobei das erste, das übereinstimmt und nicht leer ist, verwendet wird. Wenn ein Bindestrich im Namen des Gebietsschemas enthalten ist (`-`, zum Beispiel `de-CH`), wird er durch einen Unterstrich ersetzt (`_`, zum Beispiel `de_CH`).

##### Texte

| Text-Name                     | Verwendungszweck                                                                                                                                                                                           | Standard-Wert                                                                                                  |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `label`                       | Dies ist der Hauptsatz der Box.                                                                                                                                                                            | Ich akzeptiere, dass die Formulareingaben auf Spam überprüft und für 14 Tage verschlüsselt gespeichert werden. |
| `accessibilityCheckingData`   | Dies ist eine Statusaktualisierung, wenn mosparo die Daten überprüft. Sie ist nur für Screen Readers sichtbar.                                                                                             | Der Spamschutz prüft Ihre Daten. Bitte warten Sie.                                                             |
| `accessibilityDataValid`      | Dies ist ein Status-Update, wenn mosparo die Daten überprüft hat und alles in Ordnung ist. Sie ist nur für Screen Readers sichtbar.                                                                        | Ihre Daten enthalten kein Spam. Sie können das Formular absenden.                                              |
| `accessibilityProtectedBy`    | Wenn das mosparo-Logo für ein Projekt sichtbar ist, wird dieser zusätzliche Satz an den Hauptsatz angefügt, um Nutzer mit Screenreadern darauf hinzuweisen, dass das Formular durch mosparo geschützt ist. | Dieses Formular ist durch mosparo vor Spam geschützt.                                                          |
| `errorGotNoToken`             | Sichtbar, wenn kein Einsendecode von mosparo zurückgegeben wurde.                                                                                                                                          | mosparo hat keinen Absende-Token ausgestellt.                                                                  |
| `errorInternalError`          | Sichtbar, wenn mosparo einen internen Fehler hatte.                                                                                                                                                        | Es trat ein Fehler auf. Bitte wiederholen Sie den Vorgang.                                                     |
| `errorNoSubmitTokenAvailable` | Sichtbar, wenn der Einsendecode aus dem Formular entfernt wurde, z. B. weil das Formular manipuliert wurde.                                                                                                | Kein Absende-Token verfügbar. Die Validierung Ihrer Daten ist nicht möglich.                                   |
| `errorSpamDetected`           | Wird angezeigt, wenn mosparo Spam in der Einsendung entdeckt hat.                                                                                                                                          | In Ihren Daten ist Spam enthalten.                                                                             |
| `errorLockedOut`              | Wird angezeigt, wenn der Benutzer zu viele Einsendungen eingereicht und mosparo den Benutzer ausgesperrt hat.                                                                                              | Sie wurden temporär gesperrt. Bitte versuchen Sie es nach `%datetime%` erneut.                                 |
| `errorDelay`                  | Wird angezeigt, wenn der Benutzer zu viele Einsendecodes angefordert und daher von mosparo verzögert wurde.                                                                                                | Ihre Anfrage wurde verzögert. Bitte warten Sie `%seconds%` Sekunden.                                           |
| `hpLeaveEmpty`                | Diese Meldung ist versteckt und nur für Screen Readers für das Honeypot-Feld sichtbar.                                                                                                                     | Dieses Feld leer lassen                                                                                        |

##### Beispiel

```javascript
mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
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

Wenn Sie die Initialisierungsparameter nicht anpassen können, können Sie auch die benutzerdefinierten Ereignisse verwenden, um die Ausführung von mosparo zu steuern. mosparo löst die folgenden Ereignisse aus:

| Ereignisname              | Ausgelöst auf | Beschreibung                                                                                                                                                                                                                                         |
|---------------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `before-get-form-data`    | Formular      | Dieses Ereignis wird ausgelöst, bevor die Formulardaten aus dem Formular gesammelt werden. Mit diesem Ereignis ist es möglich, die Formulardaten vorzubereiten (zum Beispiel für WYSIWYG-Felder, die den Inhalt in der `textarea` speichern müssen). |
| `before-get-field-value`  | Formular-Feld | Mit diesem Ereignis ist es möglich, den Wert eines Feldes anzupassen, bevor der Wert erfasst wird.                                                                                                                                                   |
| `form-checked`            | Formular      | Definiert das Ereignis, welches ausgelöst wird, sobald das Formular geprüft wurde. Das Ergebnis der Prüfung wird als boolescher Wert `valid` an das Ereignis übergeben (`true` wenn alles korrekt ist, `false` wenn nicht).                          |
| `state-reseted`           | Formular      | Definiert das Ereignis, welches ausgelöst wird, nachdem das mosparo-Feld zurückgesetzt wurde (zum Beispiel, nachdem das Formular zurückgesetzt wurde).                                                                                               |
| `switch-to-invisible`     | Formular      | Wenn eine Website den unsichtbaren Modus verwendet, initialisiert sich mosparo im sichtbaren Modus und wechselt nach Erhalt des Einsende-Codes in den unsichtbaren Modus. Dieses Ereignis wird nach dem Wechsel in den unsichtbaren Modus ausgelöst. |
| `submit-aborted`          | Formular      | _(Nur im sichtbaren Modus)_ Dieses Ereignis wird ausgelöst, wenn der Sendevorgang abgebrochen wird, z.B. wenn das Formular von mosparo erneut validiert werden muss.                                                                                 |
| `submit-form-invisible`   | Formular      | _(Nur im unsichtbaren Modus)_ Dieses Ereignis wird vor dem Absenden des Formulars ausgelöst.                                                                                                                                                         |
| `validate-form-invisible` | Formular      | _(Nur im unsichtbaren Modus)_ Dieses Ereignis wird ausgelöst, bevor das Formular validiert wird.                                                                                                                                                     |

#### Beispiele für Ereignisse und Callbacks

```javascript
mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
    onBeforeGetFormData: function (formElement) {
        console.log('onBeforeGetFormData', formElement);
    },
    onGetFieldValue: function (fieldElement, value) {
        console.log('onGetFieldValue', fieldElement, value);
        return value;
    },
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

document.getElementById('contact-form').addEventListener('before-get-form-data', function (ev) {
    console.log(ev);
});

document.getElementById('name-field').addEventListener('before-get-field-value', function (ev) {
    console.log(ev);
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

### Vorbereiten der Formulardate

Aus den eingesendeten Formulardaten müssen alle von mosparo ignorierten Felder entfernt werden (siehe [ignorierte Felder](../integration/ignored_fields)). Ausserdem müssen die Formularfelder die gleiche Struktur aufweisen wie vor dem Absenden des Formulars. Die Formularfelder in HTML haben keine Hierarchie, und es ist erforderlich, dass dies auch im Backend der Fall ist. Es ist auch wichtig, dass der Name des Feldes im Backend derselbe ist und das gleiche Format hat wie im Frontend (zum Beispiel: `form[address][street]` oder `email[]`). Der Wert des Attributs `name` der Formularfelder muss mit dem Schlüssel in den vorbereiteten Formulardaten übereinstimmen.

Nach dem Vorbereiten der Formulardaten wird empfohlen, zu prüfen, ob die Schlüssel des vorbereiteten Formulardaten-Arrays mit den Namensattributen der Formularfelder in HTML übereinstimmen.

### Verifizieren mit Funktionsbibliothek

Anschliessend können Sie mit der Funktionsbibliothek die Verifizierung durchführen. Dazu benötigen Sie den Host Ihrer mosparo-Installation, den öffentlichen sowie den privaten Schlüssel sowie die bereinigten Formulardaten.

Konsultieren Sie für die genaue Vorgehensweise die Dokumentation der von Ihnen verwendeten Funktionsbibliothek.

#### Funktionsbibliotheken

Um die Verifizierung auf Ihrer Website zu vereinfachen, gibt es Funktionsbibliotheken, welche die Verifizierung vereinfachen. Falls Sie die Verifizierung ohne Funktionsbibliothek durchführen möchten, siehe [Verifizierung manuell durchführen](#verifizierung-manuell-durchführen).

| Name              | Sprache    | Gepflegt durch          | Website                                      |
|-------------------|------------|-------------------------|----------------------------------------------|
| gosparo           | Go         | deBarbarinAntoine       | https://github.com/deBarbarinAntoine/gosparo |
| Java API client   | Java       | mosparo Core Developers | https://github.com/mosparo/java-api-client   |
| JS API client     | JavaScript | mosparo Core Developers | https://github.com/mosparo/js-api-client     |
| PHP API client    | PHP        | mosparo Core Developers | https://github.com/mosparo/php-api-client    |
| Python API client | Python     | mosparo Core Developers | https://github.com/mosparo/python-api-client |

:::info
Wenn Sie eine Funktionsbibliothek für eine Programmiersprache entwickelt haben, [lassen Sie es uns bitte wissen](mailto:feedback@mosparo.io), damit wir sie hier auflisten können.
:::

### Verifizierung manuell durchführen

Wenn Sie keine Funktionsbibliothek verwenden wollen oder für Ihre Programmiersprache keine Funktionsbibliothek zur Verfügung steht, können Sie die Überprüfung leicht manuell durchführen.

:::info
Alle Codebeispiele in diesem Abschnitt sind in der Programmiersprache PHP geschrieben. Dies dient nur der besseren Darstellung. Sie können jede beliebige Programmiersprache verwenden.
:::

#### Formular

In diesem Beispiel verwenden wir ein einfaches Formular mit einem Feld für den Namen, die E-Mail-Adresse und einem Textfeld für die Nachricht.

```html
<form method="post" id="contact-form">
    <div class="row mb-3">
        <label class="col-sm-3 col-form-label required" for="name">Name</label>
        <div class="col-sm-9">
            <input type="text" name="name" id="name" class="form-control" required />
        </div>
    </div>
    <div class="row mb-3">
        <label class="col-sm-3 col-form-label required" for="emailAddress">Email address</label>
        <div class="col-sm-9">
            <input type="email" name="emailAddress" id="emailAddress" class="form-control" required />
        </div>
    </div>
    <div class="row mb-3">
        <label class="col-sm-3 col-form-label required" for="message">Message</label>
        <div class="col-sm-9">
            <textarea class="form-control" name="message" id="message" style="height: 300px;" required></textarea>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-sm-3"></div>
        <div class="col-sm-9">
            <div id="mosparo-box"></div>
        </div>
    </div>
        
    <div class="row mb-3">
        <div class="col-sm-3"></div>
        <div class="col-sm-9">
            <button type="submit" name="submitted" class="btn btn-primary btn-lg">
                Submit
            </button>
        </div>
    </div>
</form>

<script src="https://mosparo.example.com/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo('mosparo-box', 'https://mosparo.example.com', '<uuid>', '<publicKey>', {
            loadCssResource: true
        });
    };
</script>
```

#### Vor dem Hinzufügen von mosparo

Nachdem das Formular abgeschickt wurde, verarbeitet das Backend die Formulardaten und sendet die Formulardaten per E-Mail oder speichert sie in einer Datenbank.

```php
<?php

// Abrufen der Formulardaten
$formData = $_POST;

// Validierung der Formulardaten
if (!validateFormData($formData)) {
    // Wenn die Formulardaten nicht gültig sind, wird eine Fehlermeldung angezeigt
    echo 'Ihre Formulardaten sind nicht gültig.';
    exit;
}

// Wenn alles korrekt ist, kann das E-Mail versendet werden
mail('info@example.com', 'Nachricht des Kontakt-Formulars', 'Hallo Webmaster, hier ist eine Nachricht des Kontaktformulars .........');
```

#### Hinzufügen von mosparo zum Prozess

Mit mosparo müssen Sie nun Ihren Backend-Prozess anpassen, um die Einsendung mit mosparo zu verifizieren.

```php
<?php

// Abrufen der Formulardaten
$formData = $_POST;

// Überprüfen der Formulardaten mit mosparo
if (!verifyFormDataWithMosparo($formData)) {
    // Allgemeine Fehlermeldung, wir kennen den genauen Grund für die fehlgeschlagene Überprüfung hier nicht
    echo 'Die Formulardaten enthalten Spam.';
    exit;
}

// Validierung der Formulardaten
if (!validateFormData($formData)) {
    // Wenn die Formulardaten nicht gültig sind, wird eine Fehlermeldung angezeigt
    echo 'Ihre Formulardaten sind nicht gültig.';
    exit;
}

// Wenn alles korrekt ist, kann das E-Mail versendet werden
mail('info@example.com', 'Nachricht des Kontakt-Formulars', 'Hallo Webmaster, hier ist eine Nachricht des Kontaktformulars .........');
```

Die Verifizierung erfolgt in elf Schritten:

```php
<?php

function verifyFormDataWithMosparo(array $formData)
{
    // 1. Entfernen der ignorierten Felder aus den Formulardaten
    // 2. Extrahieren des Einsende- und Validierungs-Codes aus den Formulardaten
    // 3. Vorbereiten der Formulardaten
    // 4. Erzeugen der Hashes
    // 5. Generieren der Signatur der Formulardaten
    // 6. Erzeugen der Validierungssignatur
    // 7. Vorbereiten der Verifizierungssignatur
    // 8. Sammeln der Anfragedaten
    // 9. Generierung der Anfragesignatur
    // 10. Senden der API-Anfrage
    // 11. Prüfen der Antwort
}
```

##### 1. Entfernen der ignorierten Felder aus den Formulardaten

mosparo validiert keine Feldtypen wie Checkbox, Radio, Password und Hidden. Es gibt noch weitere ignorierte Felder, die Sie in dieser Liste hier finden können: [Ignorierte Felder](./ignored_fields)

Sie müssen diese aus den Formulardaten entfernen, da mosparo diese Felder nicht validiert hat (siehe [Vorbereiten der Formulardaten](#preparing-form-data)).

##### 2. Extrahieren des Einsende- und Validierungs-Codes aus den Formulardaten

mosparo fügt automatisch den Einsende- und den Validierungs-Code zu Ihren Formulardaten hinzu. Sie sollten also diese beiden Werte in Ihren Formulardaten haben. Extrahieren Sie die beiden Werte und speichern Sie sie in einer Variablen:

```php
$submitToken = $formData['_mosparo_submitToken'];
$validationToken = $formData['_mosparo_validationToken'];
```

##### 3. Vorbereiten der Formulardaten

Nun müssen wir die Formulardaten bereinigen. Dazu müssen wir über die Formulardaten iterieren. Wenn der Feldname mit `_mosparo_` beginnt, müssen wir dieses Feld aus den Formulardaten entfernen. Ausserdem müssen wir bei allen anderen Feldern CRLF-Zeilenumbrüche durch LF-Zeilenumbrüche ersetzen.

```php
$preparedFormData = [];
foreach ($formData as $fieldName => $value) {
    if (str_starts_with($fieldName, '_mosparo_')) {
        continue;
    }

    $preparedFormData[$fieldName] = str_replace("\r\n", "\n", $value);
}
```

:::info
Bitte stellen Sie sicher, dass Sie den Inhalt so verifizieren, wie der Benutzer ihn im Formular eingegeben hat. Einige Systeme schützen einige Zeichen und ändern so den Inhalt des Feldes. WordPress zum Beispiel schützt in allen Anfrageparametern automatisch die Zeichen `'` und `"` mit einem Backslash, wahrscheinlich um SQL-Injektionen zu verhindern. Die Felder entsprechen damit nicht mehr dem, was der Benutzer in das Formular eingegeben hat. Wenn mosparo ein oder mehrere Felder als ungültig markiert, überprüfen Sie bitte, ob der Inhalt der Felder genau so verifiziert wurde, wie er in mosparo angezeigt wird.
:::

##### 4. Erzeugen der Hashes

Da wir die Formulardaten nicht im Klartext an mosparo übertragen wollen, erstellen wir Hashes. Dazu iterieren wir über das Array der aufbereiteten Formulardaten und erstellen für jeden Wert einen SHA256-Hash. Bitte sortieren Sie das Array alphabetisch nach dem Feldnamen in aufsteigender Reihenfolge (A-Z).

```php
foreach ($preparedFormData as $fieldName => $value) {
    $preparedFormData[$fieldName] = hash('sha256', $value);
}

ksort($preparedFormData);
```

##### 5. Generieren der Signatur der Formulardaten

Nun erstellen wir eine Signatur, um die Gültigkeit der vorbereiteten Formulardaten zu beweisen. Dazu konvertieren wir die vorbereiteten Formulardaten in einen JSON-String und erstellen dann einen HMAC SHA256-Hash mit dem geheimen Schlüssel des Projekts.

```php
$jsonPreparedFormData = json_encode($preparedFormData);
$projectPrivateKey = '<privateKey>'; // Sie finden diesen Wert in den Projekteinstellungen in mosparo
$formDataSignature = hash_hmac('sha256', $jsonPreparedFormData, $projectPrivateKey);
```

##### 6. Erzeugen der Validierungssignatur

Mit der gleichen Methode wie in Schritt 5 erstellen wir die Signatur des Validierungs-Codes (ein HMAC SHA256 Hash):

```php
$validationSignature = hash_hmac('sha256', $validationToken, $projectPrivateKey);
```

##### 7. Vorbereiten der Verifizierungssignatur

Um später die Antwort von mosparo zu bestätigen, erstellen wir eine Verifizierungssignatur. Die Signatur ist die Kombination aus der Validierungsignatur und der Signatur der Formulardaten als HMAC SHA256 Hash.

```php
$combinedSignatures = $validationSignature . $formDataSignature;
$verificationSignature = hash_hmac('sha256', $combinedSignatures, $projectPrivateKey); 
```

##### 8. Sammeln der Anfragedaten

Nachdem wir die Formulardaten vorbereitet und die Signaturen erstellt haben, können wir nun die API-Anfrage für die Verifizierungs-API vorbereiten. Dazu bereiten wir die Anfragedaten vor, die wir benötigen, um die Verifizierungs-API zu kontaktieren:

```php
$apiEndpoint = '/api/v1/verification/verify'; // Dies ist die API von mosparo, also ein fester Wert
$requestData = [
    'submitToken' => $submitToken,
    'validationSignature' => $validationSignature,
    'formSignature' => $formDataSignature,
    'formData' => $preparedFormData,
];
```

##### 9. Generierung der Anfragesignatur

Um die Anfrage zu authentifizieren, benötigen wir eine Anfragesignatur. Wir erstellen einen weiteren HMAC SHA256-Hash mit der Kombination aus dem API-Endpunkt und den Anfragedaten als JSON-String als Wert.

```php
$jsonRequestData = json_encode($requestData);
$combinedApiEndpointJsonRequestData = $apiEndpoint . $jsonRequestData;
$requestSignature = hash_hmac('sha256', $combinedApiEndpointJsonRequestData, $projectPrivateKey);
```

##### 10. Senden der API-Anfrage

Wir haben alle notwendigen Werte vorbereitet und können die mosparo API kontaktieren. Dazu benötigen wir einen HTTP-Client, der die Anfrage an die API stellt. In diesem Beispiel verwenden wir die PHP-Bibliothek Guzzle, um die Anfrage zu stellen, aber Sie können natürlich auch jeden anderen Client verwenden. Die Anfrage an die API ist eine POST-Anfrage, und Sie müssen den öffentlichen Schlüssel und die Anfragesignatur in den `Authorization`-Header einfügen (als Basic-Authorization-Header, kodiert als Base64-String). Die Anfragedaten müssen als Post-Datenfelder der Anfrage gesendet werden.

```php
$projectPublicKey = '<publicKey>'; // Sie finden diesen Wert in den Projekteinstellungen in mosparo
$client = new \GuzzleHttp\Client([
    'base_uri' => 'https://mosparo.example.com', // Der Host Ihrer mosparo-Installation
]);
$response = $client->request(
    'POST',
    $apiEndpoint,
    [
        'auth' => [$projectPublicKey, $requestSignature],
        'form_params' => $requestData,
    ]
);
```

##### 11. Prüfen der Antwort

Die Anfrage wurde abgeschickt, und wir haben eine Antwort erhalten. Jetzt ist es an der Zeit, das Ergebnis der Überprüfung zu überprüfen. Dekodieren Sie dazu den von der API zurückgegebenen JSON-String. Wenn die Verifizierung korrekt verarbeitet wurde (ohne HTTP-Fehlermeldungen), dann sollten Sie in der Antwort von mosparo die folgenden Felder finden: `valid`, `verificationSignature`, `verifiedFields`, und `issues`.

Wenn das Feld `valid` auf `true` gesetzt ist und das Feld `verificationSignature` den gleichen Wert enthält wie die vorbereitete Verifizierungssignatur in Schritt 7, dann sind die Formulardaten gültig, und Sie können die Daten verarbeiten. Wenn `valid` nicht `true` ist oder die Verifizierungssignatur nicht die gleiche ist, dann war etwas mit der Anfrage nicht in Ordnung (oder der Benutzer hat versucht, sie zu manipulieren), und sie wird daher als Spam eingestuft.

Es gibt noch einen weiteren entscheidenden Schritt. mosparo kann nur überprüfen, was es im Frontend erhalten hat und was Sie im Backend gesendet haben. Der Benutzer könnte ein Pflichtfeld im Browser in ein für mosparo ignoriertes Feld ändern und mosparo damit umgehen. Nach erfolgreicher Verifizierung sollten Sie sicherstellen, dass alle Ihre Pflichtfelder verifiziert sind. Dazu gibt mosparo das Array mit den verifizierten Feldern zurück. Stellen Sie sicher, dass alle Ihre Felder dort eingetragen sind:

```php
$responseData = json_decode((string) $response->getBody(), true);

if (isset($responseData['valid']) && $responseData['valid'] && isset($responseData['verificationSignature']) && $responseData['verificationSignature'] == $verificationSignature) {
    // Stellen Sie sicher, dass alle erforderlichen Felder von mosparo überprüft wurden.
    if (!isset($responseData['verifiedFields']['name']) || !isset($responseData['verifiedFields']['emailAddress']) ||  !isset($responseData['verifiedFields']['message'])) {
        return false;
    }
    return true;
}

return false;
```

Mehr dazu finden Sie hier: [Umgehungsschutz](./bypass_protection)

#### Komplette Funktion

Die vollständige Funktion zur Durchführung der Überprüfung sieht nun wie folgt aus:

```php
<?php

function verifyFormDataWithMosparo(array $formData)
{
    // 1. Entfernen der ignorierten Felder aus den Formulardaten
    // Sie müssen dies nur tun, wenn Sie ignorierte Felder in Ihrem Formular haben
    
    // 2. Extrahieren des Einsende- und Validierungs-Codes aus den Formulardaten
    $submitToken = $formData['_mosparo_submitToken'];
    $validationToken = $formData['_mosparo_validationToken'];

    // 3. Vorbereiten der Formulardaten
    $preparedFormData = [];
    foreach ($formData as $fieldName => $value) {
        if (str_starts_with($fieldName, '_mosparo_')) {
            continue;
        }

        $preparedFormData[$fieldName] = str_replace("\r\n", "\n", $value);
    }

    // 4. Erzeugen der Hashes
    foreach ($preparedFormData as $fieldName => $value) {
        $preparedFormData[$fieldName] = hash('sha256', $value);
    }

    ksort($preparedFormData);

    // 5. Generieren der Signatur der Formulardaten
    $jsonPreparedFormData = json_encode($preparedFormData);
    $projectPrivateKey = '<privateKey>'; // Sie finden diesen Wert in den Projekteinstellungen in mosparo
    $formDataSignature = hash_hmac('sha256', $jsonPreparedFormData, $projectPrivateKey);

    // 6. Erzeugen der Validierungssignatur
    $validationSignature = hash_hmac('sha256', $validationToken, $projectPrivateKey);

    // 7. Vorbereiten der Verifizierungssignatur
    $combinedSignatures = $validationSignature . $formDataSignature;
    $verificationSignature = hash_hmac('sha256', $combinedSignatures, $projectPrivateKey); 

    // 8. Sammeln der Anfragedaten
    $apiEndpoint = '/api/v1/verification/verify'; // Dies ist die API von mosparo, also ein fester Wert
    $requestData = [
        'submitToken' => $submitToken,
        'validationSignature' => $validationSignature,
        'formSignature' => $formDataSignature,
        'formData' => $preparedFormData,
    ];

    // 9. Generierung der Anfragesignatur
    $jsonRequestData = json_encode($requestData);
    $combinedApiEndpointJsonRequestData = $apiEndpoint . $jsonRequestData;
    $requestSignature = hash_hmac('sha256', $combinedApiEndpointJsonRequestData, $projectPrivateKey);

    // 10. Senden der API-Anfrage
    $projectPublicKey = '<publicKey>'; // Sie finden diesen Wert in den Projekteinstellungen in mosparo
    $client = new \GuzzleHttp\Client([
        'base_uri' => 'https://mosparo.example.com', // Der Host Ihrer mosparo-Installation
    ]);
    $response = $client->request(
        'POST',
        $apiEndpoint,
        [
            'auth' => [$projectPublicKey, $requestSignature],
            'form_params' => $requestData,
        ]
    );

    // 11. Prüfen der Antwort
    $responseData = json_decode((string) $response->getBody(), true);

    if (isset($responseData['valid']) && $responseData['valid'] && isset($responseData['verificationSignature']) && $responseData['verificationSignature'] == $verificationSignature) {
        // Stellen Sie sicher, dass alle erforderlichen Felder von mosparo überprüft wurden.
        if (!isset($responseData['verifiedFields']['name']) || !isset($responseData['verifiedFields']['emailAddress']) ||  !isset($responseData['verifiedFields']['message'])) {
            return false;
        }
        return true;
    }

    return false;
}
``` 

#### Nach der Verifizierung

Wenn die Überprüfung erfolgreich war, können Sie die Formulardaten nun wie bisher weiterverarbeiten, z. B. per E-Mail versenden oder in einer Datenbank speichern.

#### Felder in der API-Antwort

Die Antwort der API von mosparo gibt an, ob eine Antwort korrekt ist oder ob eine Anfrage ungültig ist. Die folgenden Felder können in der Anfrage enthalten sein:

| Feld                  | Typ      | Beschreibung                                                                                                                                           |
|-----------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `valid`                 | Boolean  | Gibt an, ob eine Anfrage gültig (also abgesendet werden darf) oder ungültig (manipuliert) ist.                                                         |
| `verificationSignature` | String   | mosparo berechnet die eigene Verifikationssignatur, welche mit der vor dem Absenden der Anfrage berechneten Verifikationssignatur übereinstimmen muss. |
| `issues`                | Array    | Ein Array mit allen Problemen, welche bei der ÜBerprüfung festgestellt wurden.                                                                         |
| `verifiedFields`        | Objekt   | Gibt an, welche Felder der Formulardaten überprüft wurden und was der Zustand der jeweiligen Felder ist.                                               | 
| `error`                 | Boolean  | Wenn ein Fehler aufgetreten ist, ist dieses Feld auf `true` gesetzt.                                                                                   |
| `errorMessage`          | String   | Die Fehlermeldung des Fehlers.                                                                                                                         |

Falls bei der Überprüfung ein Fehler aufgetreten ist, wird das Feld `error` sowie `errorMessage` gesetzt. Die beiden Felder geben an das ein Fehler aufgetreten ist und was die Fehlermeldung dazu ist. Dies passiert beispielsweise, wenn der öffentliche Schlüssel oder eine der Signaturen ungültig waren oder ein anderes Problem auftrat.

##### Werte für `verifiedFields`

| Wert         | Beschreibung                                                                                                                                                                                     |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `valid`        | Das Feld wurde korrekt überprüft und ist gültig.                                                                                                                                                 |
| `invalid`      | Das Feld wurde nicht korrekt validiert, sprich der Wert, welcher bei der Verifizierung übermittelt wurde, stimmt nicht mit dem Wert überein, welcher im Formular ursprünglich eingetragen wurde. |

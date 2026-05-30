---
sidebar_position: 3
sidebar_label: Mehrstufige Formulare
description: Erfahren Sie, wie Sie Ihr mehrstufiges Formular mit mosparo schützen können.
---

# Mehrstufige Formulare

Seit Version 1.5 ist es auch möglich, ein mehrstufiges Formular mit mosparo zu schützen. Bei der Entwicklung des mehrstufigen Schutzes haben wir drei Möglichkeiten zur Erstellung eines mehrstufigen Formulars identifiziert: CSS-basiert, anforderungsbasiert und Single-Page-basiert (SPA).

## Wie funktioniert das?

Der wesentliche Unterschied zum üblichen Validierungsprozess bei mosparo besteht darin, dass mosparo die Daten nicht nach jedem Schritt validiert. Stattdessen sendet das Skript die Daten nach jedem Schritt an die mosparo-API, wo mosparo sie als Teilübermittlung speichert. Sobald der Benutzer im letzten Schritt auf das mosparo-Feld klickt, verwendet mosparo die Validierungsmethode anstelle der neuen Teilübermittlungsmethode und validiert so die gesamte Übermittlung.

Der Benutzer erhält das Feedback für das gesamte Formular – nicht nur für den letzten Schritt – und Sie als Eigentümer eines mosparo-Projekts sehen eine einzige Übermittlung (nicht eine pro Schritt).

## CSS-basiertes mehrstufiges Formular

Bei einem CSS-basierten mehrstufigen Formular fügen Sie alle Schritte Ihres Formulars zusammen mit allen Formularfeldern in die HTML-Struktur Ihrer Website ein und blenden mithilfe von CSS alle Schritte ausser dem aktiven aus. Diese Methode funktioniert hervorragend, hat aber auch ihre Nachteile. Da es sich um ein einziges Formular handelt, wird die teilweise Übermittlung nicht unterstützt, und mosparo validiert alle Felder auf einmal.

Wenn Sie ein mehrstufiges CSS-basiertes Formular verwenden, können Sie es ohne jegliche Änderungen mit mosparo schützen, und das sogar schon vor Version 1.5, da es sich um ein einziges grosses Formular handelt und Sie nur ein mosparo-Feld benötigen, um es zu schützen.

## Anfragebasiertes mehrstufiges Formular

Unter einem anforderungsbasierten mehrstufigen Formular verstehen wir ein Formular, das in mehrere HTTP-Anfragen aufgeteilt ist, zum Beispiel `/formular/schritt/1` und `/formular/schritt/2`. In diesem Szenario müssen wir mosparo in jedem Schritt initialisieren, da mosparo die Daten an die mosparo API senden muss, bevor die Website zum nächsten Schritt weitergeht. Mit Version 1.5 haben wir die erforderliche Funktionalität hinzugefügt, sodass dieses Formular automatisch geschützt ist, solange die Initialisierungsparameter korrekt gesetzt sind.

Wenn Sie besondere Anforderungen haben, können Sie diesen Vorgang auch manuell steuern. Sie haben die volle Kontrolle über den Verifizierungsprozess und können ihn jederzeit durchführen.

### Automatischer Modus

Im automatischen Modus löst mosparo den Prozess über das `submit`-Ereignis aus. Wenn Sie den automatischen Modus nutzen möchten, müssen Sie lediglich das `submit`-Ereignis im Formular auslösen (entweder durch Verwendung des Schaltflächentyps `submit` oder durch manuelles Auslösen des Ereignisses). Sie müssen mosparo mit vier zusätzlichen Parametern initialisieren:

```html
<script src="https://<host>/build/mosparo-frontend.js" defer></script>
<script>
    var m;
    window.onload = function(){
        m = new mosparo(
           '<htmlId>', 
           '<host>', 
           '<uuid>',
           '<publicKey>',
            {
                // Weitere Parameter...
                isMultiStepForm: true,
                submitToken: '<submitToken>',
                forceInvisible: (step !== lastStep),
                isLastStep: (step === lastStep),
            }
        );
    };
</script>
```

| Parameter         | Typ     | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isMultiStepForm` | Boolean | Setzen Sie diesen Wert auf `true`, wenn die Initialisierung für ein mehrstufiges Formular erfolgt.                                                                                                                                                                                                                                                                                                                                                                                |
| `submitToken`     | String  | Im ersten Schritt ist dieser Parameter leer (oder nicht gesetzt). In den weiteren Schritten müssen Sie hier jedoch den Einsende-Code eingeben, das Sie im vorherigen Schritt erhalten haben.                                                                                                                                                                                                                                                                                      |
| `forceInvisible`  | Boolean | Solange Sie sich nicht im letzten Schritt befinden, sollte die mosparo-Box als unsichtbare Box initialisiert werden, damit wir das Overlay zur Speicherung der Daten anzeigen und mit dem nächsten Schritt fortfahren können. Da wir in mosparo nicht wissen, wann wir uns im letzten Schritt befinden, müssen Sie dies bei der Initialisierung der mosparo-Box angeben. In der Regel handelt es sich dabei um einen einfachen logischen Vergleich wie: `activeStep != lastStep`. |
| `isLastStep`      | Boolean | Mit diesem Parameter weisen Sie die mosparo-Box an, dass mosparo beim Ausführen dieses Schritts die Daten überprüfen und nicht nur speichern soll. Dabei handelt es sich um einen einfachen logischen Vergleich wie: `activeStep == lastStep`.                                                                                                                                                                                                                                    |

### Manueller Modus

Sie können den gesamten Übermittlungsprozess manuell steuern. Dazu dürfen Sie keine Schaltflächen mit dem Typ `submit` verwenden und das `submit`-Ereignis im Formular nicht auslösen.

Dazu müssen Sie mindestens zwei der vier oben genannten Parameter angeben, damit mosparo weiss, was zu tun ist. In einem mehrstufigen Formular möchten Sie normalerweise nicht, dass der Benutzer das Kontrollkästchen anklicken muss, es sei denn, es handelt sich um den letzten Schritt. Dazu müssen Sie `forceInvisible` mit `true` angeben, damit mosparo den unsichtbaren Modus erzwingt (auch bei einem sichtbaren Feld).

Mit dem Parameter `submitToken` teilen Sie mosparo mit, welches `submitToken` im ersten Schritt generiert wurde. Das bedeutet, dass der Parameter im ersten Schritt leer ist (oder nicht gesetzt wurde) und Sie mosparo anschliessend den im ersten Schritt erhaltenen Einsende-Code mitteilen.

Um den Übermittlungsprozess manuell zu steuern, stehen Ihnen nun zwei Methoden zur Verfügung, die Sie dazu benötigen. Hier ein Beispiel, wie das aussehen kann:

```html
<script>
    var m;
    var step = 1;
    var maxSteps = 3;
    window.onload = function(){
        m = new mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
            submitToken: '<submitToken>', // Im ersten Schritt empfangen, leer oder nicht gesetzt für den ersten Schritt
            forceInvisible: (step < maxSteps),
            //isMultiStepForm: true, // Optional
            //isLastStep: (step === maxSteps, // Optional
        });

        document.getElementById('submit-form').addEventListener('click', function () {
            document.getElementById('loader').classList.remove('d-none'); // Ein Overlay anzeigen, um die Benutzereingabe zu blockieren
            // Sie können auch alle erforderlichen Schritte ausführen, bevor Sie die Formulardaten verarbeiten
            
            setTimeout(function () { // Verzögern Sie den Absendevorgang, damit der Browser alle erforderlichen Elemente rendern kann
                if (step === maxSteps) {
                    if (!m.verifyCheckedFormData()) {
                        // WENN Sie den unsichtbaren Modus verwenden, überprüfen Sie die Formulardaten automatisch
                        m.checkFormData(m.getRequestData()); // Überprüfen Sie die Formulardaten aus diesem und allen vorherigen Schritten mit mosparo.

                        // WENN Sie den sichtbaren Modus verwenden, weisen Sie den Benutzer an, das mosparo-Kontrollkästchen anzuklicken
                        //document.getElementById('loader').classList.add('d-none'); // Das Overlay ausblenden, um die Benutzereingabe freizugeben
                    } else {
                        document.getElementById('form').submit(); // Wenn die Formulardaten gültig sind, starten des Absendevorgang (beispielsweise durch Absenden des Formulars).
                    }
                } else {
                    m.storeFormData(m.getRequestData()); // Speicheren der neuen Formulardaten in der Übermittlung, führt jedoch keine Validierung durch.
                }
            }, 1000);
        });
    };
</script>
```

## Single-Page-basiertes (SPA) mehrstufiges Formular 

Wenn Sie mosparo in einer Single-Page-Anwendung oder auf einer Website verwenden, die die Seite während des Besuchs eines Nutzers nicht neu lädt, können Sie die Daten im Speicher des Browsers behalten und die Formularfelder im letzten Schritt validieren. Es wird dringend empfohlen, den Einsende-Code bei der Initialisierung des Formulars anzufordern, damit andere Funktionen, wie beispielsweise die Sicherheitsmassnahme zur Mindestzeit, korrekt funktionieren können. Sie müssen die Daten nicht nach jedem Schritt in mosparo speichern.

Hier ist eine Zusammenfassung des Anwendungsfalls:

1. Initialisieren Sie mosparo beim Starten des ersten Schritts Ihres Formulars
2. Speichere die Formulardaten nach jedem Schritt – mit Ausnahme des letzten – in einem JavaScript-Objekt im Speicher des Browsers
3. Überprüfen Sie alle Formulardaten im letzten Schritt Ihres Formulars
4. Verifizieren Sie die Formulardaten im Backend (wie in jedem anderen mosparo-Anwendungsfall).

Um all dies zu ermöglichen, musst du Code verwenden, der dem Code in der offiziellen Datei `mosparo-frontend.js` ähnelt, insbesondere `getFormData`. Diese Methode solltest du als Beispiel verwenden (https://github.com/mosparo/mosparo/blob/master/assets/mosparo-frontend.js).

### mosparo initialisieren

Sobald der erste Schritt Ihres Formulars gerendert wird, sollten Sie mosparo initialisieren. Dazu können Sie das mosparo-Skript wie in allen anderen Anwendungsfällen verwenden:

```html
<script>
    var m;
    window.onload = function(){
        m = new mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
            forceInvisible: true, // Für alle Schritte bis auf den letzten (falls Sie den sichtbaren Modus verwenden möchten)
            onGetFormData: function (formData) {},
        });
    };
</script>
```

:::info
Der erste Parameter ist die ID eines HTML-Elements. Dieses HTML-Element muss sich im normalen DOM befinden, nicht im Shadow DOM, und es muss in einem Formularelement platziert sein. Sowohl das Element als auch das Formular können jedoch ausgeblendet sein (`display: none;`).
:::

Indem Sie mosparo im ersten Schritt Ihres Formulars initialisieren, geben Sie mosparo die Möglichkeit, alle zusätzlichen Funktionen zu verarbeiten, wie beispielsweise die Sicherheitsfunktion zur Mindestdauer.

### Speichern der Formulardaten im Speicher

Sobald der Benutzer zum nächsten Schritt übergeht, müssen Sie die Formulardaten in einem JavaScript-Objekt speichern. Andernfalls gehen die Formulardaten verloren, wenn die Felder aus dem DOM entfernt werden, und mosparo kann sie nicht überprüfen. Um sich die Arbeit zu erleichtern, sollten Sie die Formulardaten in der von mosparo geforderten Struktur speichern.

```javascript
// Das können Sie an einer beliebigen Stelle in Ihrem Code einfügen
/**
 * @type {{name: string, value: mixed, fieldPath: string}[]} Ein Array von Objekten, das den Feldnamen, den Wert sowie den Feldpfad enthält.
 */
var yourFormData = [];
/**
 * @type {string[]} Ein Array mit den Feldnamen der ignorierten Felder
 */
var yourIgnoredFields = [];

// Beim 'Absenden' eines Formularschritts:
/**
 * @param {Element} form Das Formular als Element-Objekt, aber Sie können verwenden, was Sie möchten.
 */
function onSubmittingFormStep(form) {
    let processedFields = [];
    form.querySelectorAll('[name]:not(.mosparo__ignored-field)').forEach(function (el) {
        let name = el.getAttribute('name');
        
        // Sie sollten Felder wie 'password', 'checkbox' und 'radio' ignorieren, da mosparo diese nicht überprüft
        if (el.getAttribute('type') === 'password') {
            return;
        }
        
        yourFormData.push({
            name: name,
            value: el.value,
            fieldPath: el.tagName.toLowerCase() + '.' + name, // Die vollständige Logik zum Aufbau des Dateipfads finden Sie in „getFormData“: https://github.com/mosparo/mosparo/blob/master/assets/mosparo-frontend.js
        });
        processedFields.push(name);
    });
    
    // Füge alle ignorierten Felder zum Array der ignorierten Felder hinzu.
    form.querySelectorAll('[name]').forEach(function (el) {
        let name = el.getAttribute('name');

        // Nur Felder hinzufügen, die nicht von mosparo stammen oder nicht bearbeitet wurden
        if (name.indexOf('_mosparo_') !== 0 && processedFields.indexOf(name) === -1 && yourIgnoredFields.indexOf(name) === -1) {
            yourIgnoredFields.push(name);
        }
    });
}
```

:::danger
Jeder Feldname sollte in den Formular-Daten nur einmal vorkommen. Sie können beispielsweise ein Array als Wert übermitteln, wenn Sie eine Liste von Werten für ein Feld haben. Der Name sollte jedoch nur einmal im Array vorkommen; achten Sie daher bitte darauf, denselben Namen nicht mehrfach hinzuzufügen. Ein anschauliches Beispiel dafür, wie Sie vorgehen sollten, finden Sie in der Methode `getFormData` in der Datei `mosparo-frontend.js`: https://github.com/mosparo/mosparo/blob/master/assets/mosparo-frontend.js
:::

Bei Bedarf können Sie dem Feld-Objekt zusätzliche Informationen hinzufügen, beispielsweise um welchen Schritt und welches Formularfeld es sich handelt. Für mosparo sind nur diese drei Schlüssel erforderlich. Der `fieldPath` setzt sich aus dem Feldtyp (`input`, `textarea` oder `select`) und dem Eingabetyp (falls es sich um ein `input`-Feld handelt) zusammen. Anschliessend wird der Feldname hinzugefügt, getrennt durch einen Punkt. Zum Beispiel:

```text
input[text].name
textarea.message
select.country
```

Der Feldpfad legt fest, welche Regeln auf welches Feld angewendet werden sollen. Wenn Sie einen falschen Feldpfad angeben, werden die Regeln falsch angewendet, was bei der Validierung der Formulardaten zu Fehlern oder Falsch-Bewertungen führen kann.

### Formulardaten überprüfen

Sobald der Benutzer den letzten Schritt Ihres mehrstufigen Formulars erreicht hat, übermitteln Sie alle Formulardaten an mosparo, sobald der Benutzer das Formular bestätigt. Dies kann geschehen, wenn der Benutzer auf das mosparo-Feld klickt (sofern Sie den sichtbaren Modus verwenden) oder im Hintergrund wenn der Benutzer das Formular absendet.

Dazu fügen Sie bei der Initialisierung von mosparo einen Callback für `onGetFormData` hinzu:

```html
<script>
    var m;
    window.onload = function(){
        m = new mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
            forceInvisible: true, // Für alle Schritte bis auf den letzten (falls Sie den sichtbaren Modus verwenden möchten)
            onGetFormData: function (form, formData) {
                // Je nachdem, wie Ihr Formular funktioniert, können Sie nun die Formulardaten aus dem letzten Schritt ersetzen oder ergänzen:
                
                // WENN Sie die Daten aus allen Schritten erfassen:
                formData.fields = yourFormData;
                formData.ignoredFields = yourIgnoredFields;

                // WENN Sie mosparo die Formulardaten aus dem letzten Schritt erfassen lassen, führen Sie diese mit Ihren Daten zusammen:
                //formData.fields = yourFormData.concat(formData.fields);
                //formData.ignoredFields = yourIgnoredFields.concat(formData.ignoredFields);
                
                return formData;
            },
        });
    };
</script>
```

mosparo sendet die Daten nun an die API Ihrer mosparo-Installation und überprüft sie.

Wenn die Validierung erfolgreich war, kann der Benutzer das Formular absenden. Bitte denken Sie daran, alle Formulardaten sowie die beiden mosparo-Felder (`_mosparo_submitToken` und `_mosparo_validationToken`) zu übermitteln. Wenn Sie das Formular über eine XHR-Anfrage übermitteln möchten, können Sie diese beiden Werte mithilfe Ihrer mosparo-Instanz abrufen: `m.submitTokenElement.value` und `m.validationTokenElement.value`.

### Daten verifizieren

Wie bei jeder mosparo-Integration müssen die Daten vor der Verarbeitung im Backend bei mosparo verifiziert werden. Dies verhindert, dass ein Formular verändert wird, nach dem mosparo die Daten überprüft hat.

Mehr Informationen zur Verifizierung finden Sie unter [Verifizierung durchführen](custom#verifizierung-durchführen).


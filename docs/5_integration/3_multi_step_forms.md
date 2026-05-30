---
sidebar_position: 3
sidebar_label: Multi-step forms
description: Learn how to protect your multi-step form with mosparo.
---

# Multi-step forms

Since version 1.5, it's also possible to protect a multi-step form with mosparo. While developing the multi-step protection, we identified three ways to build a multi-step form: CSS-based, request-based, and single-page-based (SPA).

## How does it work?

The big difference with the normal validation process with mosparo is that mosparo does not validate the data after every step. Instead, the script sends the data to the mosparo API after every step, where mosparo stores it as a partial submission. As soon as the user clicks the mosparo box in the last step, mosparo will use the validate method instead of the new partial one, thereby validating the whole submission.

The user will receive the feedback for the whole form - not just the last step - and you, as owner of a mosparo project, will see one submission (not one per step).

## CSS-based multi-step form

In a CSS-based multi-step form, you add all steps of your form together with all form fields to the HTML structure of your website and use CSS to hide all except the active steps. This method works great, but it also has its downsides. Since it is one single form, the partial submission will not be used, and mosparo will validate all fields at once.

If you use a CSS-based multi-step form, you can protect it with mosparo without any changes, and even before v1.5, since it is one big form and you only need one mosparo box to protect it.

## Request-based multi-step form

By request-based multi-step form, we mean a form split into multiple HTTP requests, for example, `/form/step/1` and `/form/step/2`. In this scenario, we need to initialize mosparo in every step, since mosparo needs to send the data to mosparo before the website navigates to the next step. With v1.5, we've added the required functionality so that this form is automatically protected as long as the initialization parameters are set correctly.

If you have special requirements, you can also control this method manually. You have full control over the verification process and can do it whenever you like.

### Automatic mode

In the automatic mode, mosparo uses the submit event to trigger the process. If you want to use the automatic mode, all you need to do is trigger the submit event in the form (by using the button type `submit` or by manually triggering the event). You need to initialize mosparo with four additional parameters:

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
                // Other parameters...
                isMultiStepForm: true,
                submitToken: '<submitToken>',
                forceInvisible: (step !== lastStep),
                isLastStep: (step === lastStep),
            }
        );
    };
</script>
```

| Parameter         | Type    | Description                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isMultiStepForm` | Boolean | Set this to true if the initialization is for a multi-step form.                                                                                                                                                                                                                                                                                                                    |
| `submitToken`     | String  | In the first step, this parameter is empty (or not set). But in the other steps, you need to set this to the submit token you've received from the previous step.                                                                                                                                                                                                                   |
| `forceInvisible`  | Boolean | As long as you are not in the last step, the mosparo box should be initialized as an invisible box so we can show the overlay to store the data and continue with the next step. Since we don't know in mosparo when we are in the last step, you need to tell it when you initialize the mosparo box. Usually, this is a simple logical comparison like: `activeStep != lastStep`. |
| `isLastStep`      | Boolean | With this parameter, you tell the mosparo box that when submitting this step, mosparo should verify the data and not just store the data. This is a simple logical comparison like: `activeStep == lastStep`.                                                                                                                                                                       |

### Manual mode

You can control the whole submission process manually. For this, you mustn't use buttons with type `submit`, and you must not trigger the `submit` event on the form.

To do this, you need to specify at least two of the four parameters above so mosparo knows what to do. In a multi-step form, you normally do not want the user to have to click the checkbox unless it is the last step. For this, you need to specify `forceInvisible` with `true`, so mosparo forces the invisible mode (even for a visible box).

With the `submitToken` parameter, you tell mosparo which `submitToken` was generated in the first step. This means that the parameter is empty (or not set) in the first step, and after that, you tell mosparo the submit token you received in the first step.

To manually control the submission process, you now have two methods that are required to get the job done. Here is an example of how that can look:

```html
<script>
    var m;
    var step = 1;
    var maxSteps = 3;
    window.onload = function(){
        m = new mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
            submitToken: '<submitToken>', // Received in the first step, empty or unset for the first step
            forceInvisible: (step < maxSteps),
            //isMultiStepForm: true, // Optionally
            //isLastStep: (step === maxSteps, // Optionally
        });

        document.getElementById('submit-form').addEventListener('click', function () {
            document.getElementById('loader').classList.remove('d-none'); // Show an overlay to block the user input
            // You can also do whatever you need before you process the form data
            
            setTimeout(function () { // Delay the submission process to let the browser render all the required stuff
                if (step === maxSteps) {
                    if (!m.verifyCheckedFormData()) {
                        // IF you use the invisible mode, check the form data automatically
                        m.checkFormData(m.getRequestData()); // Validate the form data from this and all previous steps with mosparo.

                        // IF you use the visible mode, tell the user to click the mosparo checkbox
                        //document.getElementById('loader').classList.add('d-none'); // Hide the overlay to unblock the user input
                    } else {
                        document.getElementById('form').submit(); // If the form data is valid, start the submit process (for example, by submitting the form).
                    }
                } else {
                    m.storeFormData(m.getRequestData()); // Store the new form data to the submission, but do not validate it.
                }
            }, 1000);
        });
    };
</script>
```

## Single-page-based (SPA) multi-step form

If you use mosparo in a single-page application or on any website that does not reload the page during a user's visit, you can keep the data in the browser's memory and validate the form fields at the last step. It is strongly recommended to request the submit token when initializing the form so that other features, like the minimum time security measurement, can work correctly. You do not need to store the data in mosparo after every step.

Here is a summary of the use case:

1. Initialize mosparo when initializing the first step of your form
2. Store the form data in a JavaScript object in the memory of the browser after every step except the last one
3. Validate all the form data on the last step of your form
4. Verify the form data in the backend (as in every other mosparo use case).

To make this all possible, you need to use code that is similar to the code in the official `mosparo-frontend.js` file, especially `getFormData`. You should use this method as an example (https://github.com/mosparo/mosparo/blob/master/assets/mosparo-frontend.js).

### Initialize mosparo

As soon as the first step of your form is rendered, you should initialize mosparo. To do this, you can use the mosparo script as in all other use cases:

```html
<script>
    var m;
    window.onload = function(){
        m = new mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
            forceInvisible: true, // For all steps except the last one (if you want to use the visible mode)
            onGetFormData: function (formData) {},
        });
    };
</script>
```

:::info
The first parameter is the ID of an HTML element. This HTML element must be in the normal DOM, not the Shadow DOM, and it must be placed in a form element. But the element as well as the form can be hidden (`display: none;`).
:::

By initializing mosparo in the first step of your form, you give mosparo the chance to process all additional features, like the minimum time security feature.

### Store the form data in the memory

As soon as the user continues to the next step, you need to store the form data in a JavaScript object. Otherwise, removing the fields from the DOM will remove the form data and mosparo cannot verify them. To make life easier, you should store the form data in the correct structure as mosparo requires it.

```javascript
// You can place that anywhere in your code
/**
 * @type {{name: string, value: mixed, fieldPath: string}[]} An array of objects containing the field name, the value, as well as the field path.
 */
var yourFormData = [];
/**
 * @type {string[]} An array with the field names of the ignored fields
 */
var yourIgnoredFields = [];

// When 'submitting' a form step:
/**
 * @param {Element} form The form is an Element object, but you can use what you want.
 */
function onSubmittingFormStep(form) { // In this example, form is an Element (https://developer.mozilla.org/en-US/docs/Web/API/Element), but you can do whatever you want.
    let processedFields = [];
    form.querySelectorAll('[name]:not(.mosparo__ignored-field)').forEach(function (el) {
        let name = el.getAttribute('name');
        
        // You should ignore fields like `password`, `checkbox`, and `radio`, because mosparo does not want to verify them
        if (el.getAttribute('type') === 'password') {
            return;
        }
        
        yourFormData.push({
            name: name,
            value: el.value,
            fieldPath: el.tagName.toLowerCase() + '.' + name, // See the full logic how to build the file path in 'getFormData': https://github.com/mosparo/mosparo/blob/master/assets/mosparo-frontend.js
        });
        processedFields.push(name);
    });
    
    // Add all ignored fields to the array with the ignored fields.
    form.querySelectorAll('[name]').forEach(function (el) {
        let name = el.getAttribute('name');

        // Only add non-mosparo or not processed fields
        if (name.indexOf('_mosparo_') !== 0 && processedFields.indexOf(name) === -1 && yourIgnoredFields.indexOf(name) === -1) {
            yourIgnoredFields.push(name);
        }
    });
}
```

:::danger
Every field name should be in the form data only once. You can submit an array as a value, for example, if you have a list of values for a field. But the name should be in the array only once, so please ensure that you do not add the same name multiple times. For a better example of how you should do it, please have a look at the method `getFormData` in the `mosparo-frontend.js`: https://github.com/mosparo/mosparo/blob/master/assets/mosparo-frontend.js
:::

If you need, you can add additional information to the field array, for example, which step and which form field it is. For mosparo, only these three keys are required. The `fieldPath` is a combination of the field type (`input`, `textarea`, or `select`), combined with the input type (if it's an `input` field). After that, the field name is added, separated by a dot. For example:

```text
input[text].name
textarea.message
select.country
```

The field path determines which rules should be applied to which field. If you submit a wrong field path, the rules will be applied incorrectly, resulting in errors or false positives when validating the form data.

### Validate the form data

As soon as the user reaches the last step of your multi-step form, submit all the form data to mosparo when the user validates it. This can happen when the user clicks the mosparo box (if you use the visible mode) or when the user submits the form in the background.

To do that, you add a callback for `onGetFormData` when you initialize mosparo:

```html
<script>
    var m;
    window.onload = function(){
        m = new mosparo('<htmlId>', '<host>', '<uuid>', '<publicKey>', {
            forceInvisible: true, // For all steps except the last one (if you want to use the visible mode)
            onGetFormData: function (form, formData) {
                // Now, depending on how your form works, you can replace or add your data to the form data from the last step:
                
                // IF you collect the data from all steps:
                formData.fields = yourFormData;
                formData.ignoredFields = yourIgnoredFields;

                // IF you let mosparo collect the form data from the last step, combine it with your data:
                //formData.fields = yourFormData.concat(formData.fields);
                //formData.ignoredFields = yourIgnoredFields.concat(formData.ignoredFields);
                
                return formData;
            },
        });
    };
</script>
```

mosparo will now send the data to the API of your mosparo installation and validate it.

If the validation was successful, the user can submit the form. Please remember to submit all the form data as well as the two mosparo fields (`_mosparo_submitToken` and `_mosparo_validationToken`). If you want to submit the form via an XHR request, you can get these two values by using your mosparo instance: `m.submitTokenElement.value` and `m.validationTokenElement.value`.

### Verify the data

As with any mosparo integration, the data must be verified by mosparo before it is processed on the backend. This prevents the form from being modified after mosparo has validated the data.

For more information on verification, see [Performing verification](custom#performing-verification).
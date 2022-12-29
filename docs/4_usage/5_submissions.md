---
sidebar_position: 5
sidebar_label: Submissions
---

# Submissions

Under "Submissions" you will find all submissions that have not yet been deleted. Submissions will be automatically deleted after 14 days and will no longer be included in the list of entries.

## Explanation of columns

| Column      | Description                                                                                                                                                                                       |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID          | Consecutive identification number of the entry                                                                                                                                                    |
| Site        | Indicates on which website the form was completed and submitted. The name of the page is the page title.                                                                                          |
| IP address  | The IP address of the user. If you have enabled GeoIP functionality, the AS number and the country and name of the organization are also displayed, if this information exists for an IP address. |
| Spam        | Indicates whether the submission was considered spam or not.                                                                                                                                      |
| Spam Rating | Shows the points a submission has received and how many points would be required to be considered spam.                                                                                           |
| Posted on   | Indicates when the submission was sent.                                                                                                                                                           |
| Valid       | Indicates whether the submission has been correctly verified by the backend of a website.                                                                                                         |
| Reviewed on | Indicates when the submission was reviewed.                                                                                                                                                       |

## View Submission

When you view a submission, you will see much more information about the submission.  Technical information about the submission is displayed on the left. In the right column you will find the information entered by the user as well as technical information about the user.

| Label           | Description                                                                                                                                                       |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Is spam         | Indicates whether the submission is spam.                                                                                                                         |
| Spam Rating     | Shows the points a submission has received and how many points would be required to be considered spam.                                                           |
| Posted on       | Indicates when the submission was sent.                                                                                                                           |
| Is valid        | Indicates whether the submission has been correctly verified by the backend of a website.                                                                         |
| Reviewed on     | Indicates when the submission was reviewed.                                                                                                                       |
| Page Title      | Title of the website on which the form is placed.                                                                                                                 |
| Page URL        | Address of the website where the form is placed.                                                                                                                  |
| Requested on    | Displays the date and time the form was accessed and the submission code requested.                                                                               |
| Ignored fields  | Lists all fields that have not been checked by mosparo, because the fields were hidden fields or checkbox fields, for example.                                    |
| Form            | Displays a list of all fields that exist in the form and may have been filled in. See 3.5.2.1 Form data                                                           |
| IP address      | The IP address of the user who accessed the form.                                                                                                                 |
| User-Agent      | The identifier of the browser with which the user accessed the form. The value can be manipulated by the browser and is not to be regarded as unique information. |
| AS number       | Number of the organization registered as the owner of an IP address.                                                                                              |
| AS Organisation | Name of the organization registered as the owner of an IP address.                                                                                                |
| Country         | The country to which the IP address  is assigned due to the AS organization.                                                                                      |

### Form data
The "Form data" box lists all form fields that have been or could be filled in in the form.

The name of the field is displayed for each form field. This is the technical name of a field and not necessarily the name of a field. In addition, it shows how many points a field has received and based on which word or rule.

You will also see a status indicator behind the name of a field. This progress bar shows whether the field in the check was checked correctly by the backend, whether there was a problem with the check, or whether the field was not checked  at all.

| Status indicator                                                         | Description                                                                                                                                                                                                                                                                                     |
|--------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![Field is valid](./assets/status_valid.jpg)                             | Indicates that the field has been verified and that the data has been submitted correctly.                                                                                                                                                                                                      |
| ![Field has points](./assets/status_points_en.jpg)                       | Indicates if this field contains spam and has therefore received points in the rating.                                                                                                                                                                                                          |
| ![Field verification failed](./assets/status_verification_failed_en.jpg) | Indicates that the field validation was unsuccessful, for example, because the data was not submitted correctly.                                                                                                                                                                                |
| ![Field not verified](./assets/status_not_verified_en.jpg)               | Indicates that a field has not been validated by site backend validation. This means that the field can be changed and is therefore rather uncertain. It is not necessarily bad, because, for example, it is a not so important field and therefore has not been checked again by the backend.  |
| ![Honeypot field](./assets/status_honeypot.jpg)                          | Displayed if the field is the honeypot field. This field should always be empty, otherwise the submission is spam.                                                                                                                                                                              |


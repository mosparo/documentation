---
sidebar_position: 4
sidebar_label: Data processing
---

# Data processing

## Processing

mosparo only processes the data that is transmitted when checking the form data. This includes:

- The address and title of the website where the form was completed
- All data entered by the user in the form fields
- The user's IP address and User-Agent
- The AS number and the country of the IP address, if GeoIP2 is enabled

## Saving

All personal data stored for a submission is automatically encrypted. If someone should gain unauthorized access to the mosparo database, they can see all submissions, but not a little data has been entered, as the data is encrypted.

In certain places, the IP address of the user is not stored encrypted. In order to enable the security measures, it is important that the system can search for the IP address. However, the non-encrypted IP addresses are stored as a hash and are no longer directly recognizable.

Other data that has nothing to do with the submissions (e.g. user accounts, settings, rules) will not  be stored in encrypted form.

## Delete

All submissions will be considered obsolete after 14 days. The next time a system cleanup is performed, all stale data is automatically deleted. A system cleanup is performed either automatically when opening a form (requesting a submission code), when using mosparo, or automatically by the cleanup action. However, the automatic cleanup action must  be configured manually as a cronjob.

Submission codes(and thus the IP address used for it), which were not used, are considered obsolete after 24 hours and deleted during the next system cleanup.

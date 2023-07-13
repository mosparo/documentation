---
sidebar_position: 4
sidebar_label: Rule packages
description: Learn more about the use of rule packages and the structure of a rule package.
---

# Rule packages

## Manage rule packages

Rule packages combine one or more rules created by someone and hosted on an external server. These rule packages can be added to mosparo and are automatically updated at regular intervals. A checksum is created and checked when the rule package is updated to ensure the integrity of the rule packages.

To add a new rule package, you need to know the URL of the rule package. You can also specify a factor with which the rule package can be strengthened or weakened.

After a rule package is added, you can view the rules contained in the rule package. However, you cannot edit or delete the rules in the rules package.

## Format of rule packages

### Saving the rule package

A rule package consists of a JSON file, which is available for download on a web server. The JSON file must conform to the rule package and rules pattern. The schema for the rule package and the rules are available in the [specifications repository](https://github.com/mosparo/specifications).

In addition to the JSON file, you must store the checksum of the JSON file on the same web server at the same address. The SHA256 hash of the file must be created and saved with the same file name but with the suffix ".sha256".

:::note Example
Address of the rule package (entered in mosparo)<br />
https://example.com/ruleset.json

Checksum address:<br />
https://example.com/ruleset.json.sha256
:::

### Structure of a rule package

The JSON structure of the rule package is built as a JSON object. The object has the following properties:

| Property        | Type     | Description                                                                                                                                                                                       |
|-----------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Indicates when the rule package was last modified. This value is used to decide whether mosparo needs to update the rule package or if the latest version is already available.              |
| refreshInterval | Integer  | Defines the time in seconds when mosparo is allowed to retrieve the rule package again. mosparo stores the rule package in a cache and the rule package is downloaded again only after this time. |
| rules           | Array    | Is an array that contains all rules as a JSON object                                                                                                                                              |

### Building a rule

A rule's JSON object consists of the following properties:

| Property         | Type   | Description                                                                                                                                                             |
|------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | A unique identification number of the rule                                                                                                                              |
| name             | String | Name of the rule                                                                                                                                                        |
| description      | String | Description of the rule                                                                                                                                                 |
| type             | String | Type of rule (for example: `word` or `user-agent`)                                                                                                                      |
| items            | Array  | Array with all rule item                                                                                                                                                |
| spamRatingFactor | Float  | Rating factor of the rule to strengthen or weaken the rule items. A value greater than 1.0 strengthens the items, and a value less than 1.0 weakens the items. |

### Structure of a rule item

The JSON object of a rule item consists of the following properties:

| Property | Type   | Description                                                                                                       |
|----------|--------|-------------------------------------------------------------------------------------------------------------------|
| uuid     | UUID   | A unique identification number of the rule item                                                                   |
| type     | String | Defines the type of rule (for example: `text` or `regex`)                                                         | 
| value    | String | The actual value of the item                                                                                      |
| rating   | Float  | Defines the spam value of the item. This value is multiplied by the spam score to give the submission score. |


---
sidebar_position: 4
sidebar_label: Rules packages
---

# Rules packages

## Manage rules packages

Rules are a combination of one or more rules created by someone and hosted on an external server. These rules can be added and are automatically updated at a regular interval.

To ensure the integrity of the rule parameters, a checksum is automatically created and checked when the rule page is updated.

In mosparo you can manage your rule rights.  You can add new rule settings. All you need is the URL of the rule page. You can also specify a factor  with which the rule package can be strengthened or weakened. 

After a rules package is added, you can view the rules contained in the  rules  package. However, you cannot edit or delete the rules in the rules package.

## Format of rule packages

### Saving the Rule Package
A rules package consists of a JSON file, which is made available for download on a web server. The JSON file must conform to the rule package and rules pattern. The schema for the rules package and the rule are available in the specifications repository.

In addition to the JSON file, the checksum of the JSON file must be stored on the same web server at the same address. To do this, the SHA256 hash of the file must be created and saved with the same file name, but with the suffix ".sha256".

:::note Example
Address of the rule package (entered in mosparo)<br />
https://example.com/ruleset.json

Checksum address:<br />
https://example.com/ruleset.json.sha256
:::

### Structure of a rules package

The JSON structure of the rules package is built as a JSON object. The object has the following properties:

| Property        | Type     | Description                                                                                                                                                                                      |
|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Indicates when the rule package was last modified. This value is used to decide whether mosparo needs to update the rule package or whether the latest version is already available.             |
| refreshInterval | Integer  | Defines the time in seconds when mosparo is allowed to retrieve the rule package again.mosparo stores the rule package in a cache and only after this time the rule package is downloaded again. |
| rules           | Array    | Is an array that contains all rules as a JSON object                                                                                                                                             |

### Building a rule

A rule's JSON object consists of the following properties:

| Property         | Type   | Description                                                                                                                                                             |
|------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | A unique identification number of the rule                                                                                                                              |
| name             | String | Name of the rule                                                                                                                                                        |
| description      | String | Description of the rule                                                                                                                                                 |
| type             | String | Type of rule (for example: `word` or `user-agent`)                                                                                                                      |
| items            | Array  | Array with all rule entries                                                                                                                                             |
| spamRatingFactor | Float  | Rating factor of the rule to strengthen or weaken the entries of the rule. A value greater than 1.0 strengthens the entries, a value less than 1.0 weakens the entries. |

### Structure of a rule entry

The JSON object of a ruleentry consists of the following properties:

| Property | Type   | Description                                                                                                        |
|----------|--------|--------------------------------------------------------------------------------------------------------------------|
| uuid     | UUID   | A unique identification number of the rule entry                                                                   |
| type     | String | Defines the type of rule (for example: `text` or `regex`)                                                              | 
| value    | String | The actual value of the entry                                                                                      |
| rating   | Float  | Defines the spam value of the entry. This value is multiplied by the spam score to give the score of a submission. |


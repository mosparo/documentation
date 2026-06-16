---
sidebar_position: 5
sidebar_label: Rule packages
description: Learn more about the use of rule packages and the structure of a rule package.
---

# Rule packages

## Manage rule packages

Rule packages combine one or more rules into a file. There are four different types of rule packages in mosparo. Two of the types are automatically updated (load automatically from URL or file), while the other two are updated manually via CLI command or an API request.

To add a new rule package, you choose "Add rule package" in the rule package interface. After that, you have to select the type.

After choosing the type, you have to fill in all the information for the rule package. For the automatic rule packages, you have to set the path or URL. You can also specify a factor that can be used to strengthen or weaken the rule package.

After a rule package is added, you can view the rule package. If you choose a manual rule package type, you first need to import the rule package content depending on the selected type. To import the rule package via CLI, see [CLI](../cli#import-rule-package). To import the rule package via API, you find all the details in the [API documentation](../api/rule_package).

Since the rule package is created in a different place and delivered to your mosparo installation, you cannot edit or delete the rules in the rules package.

## Format of rule packages

The first rule package format was a simple JSON format. This works great for small rule packages because it's simple to create and manage. But for larger rule packages with hundreds of items, the JSON format has a negative side that mosparo needs a lot of RAM to parse and validate the rule package. When importing a rule package with thousands of items, this method is no longer usable.

For this reason, we've added a new rule package format in version 1.5. The new format is a ZIP file containing multiple smaller JSON files, loaded one by one. With this approach, mosparo can import and use gigantic rule packages with thousands of items.

### ZIP-based rule package (added in v1.5)

The ZIP-based rule package consists of at least three different files. The files have the following names and use cases:

| File name         | Occurrence  | Description                                                                                                                                                                                                          |
|-------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rule-package.json | Only once   | This is the main JSON file for a rule package, which contains the most important information about the rule package and also lists all the other files.                                                              |
| rules-*.json      | One or more | Contains the information for 1000 rules, but without the rule items. There can be an unlimited number of rule files.                                                                                                 |
| rule-items-*.json | One or more | Contains the information for 1000 rule items. One file can contain rule items for multiple rules and is not directly associated with any one rule or rule file. There can be an unlimited number of rule item files. |

:::info
The number of 1000 rules or rule items in a file is not technically limited. We ran some performance tests, and processing 1000 rules and items at a time was the best choice, with the least RAM requirements. If you build your own rule package, you can store more than 1000 rules or rule items, but please remember that you may need to increase the available memory for your mosparo installation.
:::

:::info
From a technical perspective, the names of the rule and rule item files are not fixed, and you can change them to whatever you want. The only fixed file name is rule-package.json.
:::

The file schemas are available in the [specifications repository](https://github.com/mosparo/specifications).

#### rule-package.json

The main rule package file has the following structure:

| Property        | Type     | Description                                                                                                                                                                          |
|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Indicates when the rule package was last modified. This value is used to decide whether mosparo needs to update the rule package or if the latest version is already available.      |
| refreshInterval | Integer  | Defines the time in seconds when mosparo is allowed to retrieve the rule package again. mosparo stores the rule package in a cache, and it is downloaded again only after this time. |
| rFiles          | Array    | An array containing all the filenames of the rule files. mosparo will use this array to process all the files in the ZIP archive.                                                    |
| riFiles         | Array    | An array containing all the filenames of the rule item files in this rule package. mosparo will use this array to process all the files in the ZIP archive.                          |           

##### Example

```json
{
  "lastUpdatedAt": "2026-05-01T12:00:00+00:00",
  "refreshInterval": 60,
  "rFiles": [
    "rules-0.json"
  ],
  "riFiles": [
    "rule-items-0.json"
  ]
}
```

#### rules-*.json

The rules file contains an array with 1000 rules. Every rule is an object containing the following properties:

| Property         | Type   | Description                                                                                                                                                    |
|------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | A unique identification number of the rule                                                                                                                     |
| name             | String | Name of the rule                                                                                                                                               |
| description      | String | Description of the rule                                                                                                                                        |
| type             | String | Type of rule (for example: `word` or `user-agent`)                                                                                                             |
| spamRatingFactor | Float  | Rating factor of the rule to strengthen or weaken the rule items. A value greater than 1.0 strengthens the items, and a value less than 1.0 weakens the items. |

##### Example

```json
[
  {
    "uuid": "1f6615f2-5fcd-4d71-9271-8ac7d1e4252b",
    "name": "Name of the rule",
    "description": "Description of the rule",
    "type": "word",
    "spamRatingFactor": 1
  }
]
```

#### rule-items-*.json

The rule items file contains an array with 1000 rule items. Every rule item is an object containing the following properties:

| Property | Type   | Description                                                                                                  |
|----------|--------|--------------------------------------------------------------------------------------------------------------|
| ruleUuid | UUID   | The unique identification number of the rule to which this item belongs.                                     |
| uuid     | UUID   | A unique identification number of the rule item                                                              |
| type     | String | Defines the type of rule (for example: `text` or `regex`)                                                    | 
| value    | String | The actual value of the item                                                                                 |
| rating   | Float  | Defines the spam value of the item. This value is multiplied by the spam score to give the submission score. |

When mosparo is importing a ZIP-based rule package, mosparo will first process all rule files, creating all the rules without items. After that, mosparo will process all rule item files and add the rule items to the previously created rules.

##### Example

```json
[
  {
    "ruleUuid": "1f6615f2-5fcd-4d71-9271-8ac7d1e4252b",
    "uuid": "7a2c0c93-ff35-4a34-93f6-bd7f91f3ebb0",
    "type": "text",
    "value": "test",
    "rating": 2
  }
]
```

#### Storing the rule package

In addition to the ZIP file, you must store its checksum at the same location. The SHA256 hash of the file must be generated and saved with the same filename, but with the suffix ".sha256".

:::note Example
**Address of the rule package (entered in mosparo)**<br />
https://example.com/rulepackage.zip<br />
/home/mosparo/my-rulepackage.zip

**Checksum address:**<br />
https://example.com/rulepackage.zip.sha256<br />
/home/mosparo/my-rulepackage.zip.sha256
:::

### JSON-based rule package

A JSON-based rule package is a simple JSON file containing all the data. While we recommend using the ZIP-based rule package format, mosparo still supports JSON-based rule packages, and we have **no** plans to remove that compatibility in an upcoming version.

#### Saving the rule package

The JSON file must conform to the rule package and rules pattern. The schema for the rule package and the rules are available in the [specifications repository](https://github.com/mosparo/specifications).

In addition to the JSON file, you must store the checksum of the JSON file in the same location. The SHA256 hash of the file must be created and saved with the same file name but with the suffix ".sha256".

:::note Example
**Address of the rule package (entered in mosparo)**<br />
https://example.com/rulepackage.json<br />
/home/mosparo/my-rulepackage.json

**Checksum address:**<br />
https://example.com/rulepackage.json.sha256<br />
/home/mosparo/my-rulepackage.json.sha256
:::

#### Structure of a rule package

The JSON structure of the rule package is built as a JSON object. The object has the following properties:

| Property        | Type     | Description                                                                                                                                                                                       |
|-----------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lastUpdatedAt   | DateTime | Indicates when the rule package was last modified. This value is used to decide whether mosparo needs to update the rule package or if the latest version is already available.              |
| refreshInterval | Integer  | Defines the time in seconds when mosparo is allowed to retrieve the rule package again. mosparo stores the rule package in a cache and the rule package is downloaded again only after this time. |
| rules           | Array    | Is an array that contains all rules as a JSON object                                                                                                                                              |

#### Building a rule

A rule's JSON object consists of the following properties:

| Property         | Type   | Description                                                                                                                                                             |
|------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid             | UUID   | A unique identification number of the rule                                                                                                                              |
| name             | String | Name of the rule                                                                                                                                                        |
| description      | String | Description of the rule                                                                                                                                                 |
| type             | String | Type of rule (for example: `word` or `user-agent`)                                                                                                                      |
| items            | Array  | Array with all rule item                                                                                                                                                |
| spamRatingFactor | Float  | Rating factor of the rule to strengthen or weaken the rule items. A value greater than 1.0 strengthens the items, and a value less than 1.0 weakens the items. |

#### Structure of a rule item

The JSON object of a rule item consists of the following properties:

| Property | Type   | Description                                                                                                  |
|----------|--------|--------------------------------------------------------------------------------------------------------------|
| uuid     | UUID   | A unique identification number of the rule item                                                              |
| type     | String | Defines the type of rule (for example: `text` or `regex`)                                                    | 
| value    | String | The actual value of the item                                                                                 |
| rating   | Float  | Defines the spam value of the item. This value is multiplied by the spam score to give the submission score. |


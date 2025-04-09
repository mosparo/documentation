---
sidebar_position: 8
sidebar_label: Tools
description: The tools support you in the use of mosparo.
---

# Tools

## Rule Tester

:::tip
Do you prefer a video instead of reading text? Watch our HowTo about testing a rule on [YouTube](https://www.youtube.com/watch?v=oFq3j7kP8TQ).
:::

With the rule tester, you can test how the created rules work and whether the rules detect spam or not.

Enter the value you want to test in the "Test value" field. Then select what type of field or value it is. Certain types of rules are applied only to certain types of fields. 

:::info
You can see which rule types are used for which data types in the [list of rule types](./rule_types).
:::

Additionally, you can select whether rule and rule packages should be used for the test (or only rule packages, for example).

Once you have made the desired settings, you can start the test by clicking the "Test" button.

After the test has been performed, you will see the test result. Next to the entered test data, you will see whether the entry is considered spam, how many points were calculated, and what the limit value is. You will also see a list of rules matching the entered test value.

## Export

The Export function allows you to transfer the settings of a mosparo project to another project (possibly in another mosparo installation).

### Web

To start an export, select which data you want to export. The main settings include the name, the description, the hosts, and the spam score of a project. The display settings, as well as the security settings, contain the respective specific settings. All entered rules, or rule packages will be exported if you select the rules or rule packages.

After you have made your selection, you can start the export by clicking on the "Export" button. You will receive a JSON file containing the selected data of your project.

:::info
Sensitive data such as submissions, submission codes, unique project ID (UUID), API keys, or project members will not be exported.
:::

### CLI

Alternatively, you can export a project using the CLI. To do this, use the following command:

```
php bin/console mosparo:export <projectId> [<filePath>]
```

The most important argument to the command is the project ID. You can find the ID when you click on the button with the gear icon in the project list in the web interface. Then the dropdown will open where you can see the project ID.

The command will output the export directly to your terminal (STDOUT). If you want to save the export to a file, specify the path to the file as the second argument.

You can also determine which parts should or should not be exported. If none are specified, all are automatically exported.

| Argument                                     | Default  | Description                                           |
|----------------------------------------------|----------|-------------------------------------------------------|
| --generalSettings<br/>--no-generalSettings   | Yes      | Exports (or does not export) the main settings.       |
| --designSettings<br/>--no-designSettings     | Yes      | Exports (or does not export) the appearance settings. |
| --securitySettings<br/>--no-securitySettings | Yes      | Exports (or does not export) the security settings.   |
| --rules<br/>--no-rules                       | Yes      | Exports (or does not export) the rules.               |
| --rulesets<br/>--no-rulesets                 | Yes      | Exports (or does not export) the rule packages.       |

## Import

With the import function, you can import the settings of another mosparo project into your project. To do this, you need an export file that was created with the [Export function](#export) (or uses the same schema).

### Web

Select the file in the provided field and then choose which data you want to import. You can select all possible sections here, even if they are not in the file.

The settings (main, display as well as security settings) will always be overwritten.

Select how mosparo should handle existing rules if you want the rules imported. mosparo can either overwrite the existing rules (Overwrite mode), update the existing rule items or add additional rule items (Append mode), or add the existing rules as a new rule with a new identification number (Add mode).

Rule packages are searched by their address (URL). The rule package will be updated if a rule package with the same address exists.

:::info
When importing, no rules or rule packages are deleted. In the "Overwrite" mode, rule entries can be deleted.
:::

Then click on "Simulate import". mosparo will upload the file, validate it and then determine which settings must be changed. In the following overview, you can see which changes are necessary. If the changes are okay for you, you can execute them by clicking the "Execute changes" button.

### CLI

Alternatively, you can also import a project via the CLI. To do this, use the following command:

```
php bin/console mosparo:import <projectId> <filePath>
```

The main argument to the command is the project ID. You can find the ID by clicking on the button with the gear icon in the project list on the web interface. Then the dropdown opens, in which you can see the project ID.

As the second argument, specify the exported file you want to import.

You must also determine which parts to import. The desired parts must be specified since the command does not carry out an import in the standard.

| Argument                                     | Default    | Description                                                                                          |
|----------------------------------------------|------------|------------------------------------------------------------------------------------------------------|
| --generalSettings<br/>--no-generalSettings   | No         | Imports (or does not import) the main settings.                                                      |
| --designSettings<br/>--no-designSettings     | No         | Imports (or does not import) the appearance settings.                                                |
| --securitySettings<br/>--no-securitySettings | No         | Imports (or does not import) the security settings.                                                  |
| --rules<br/>--no-rules                       | No         | Imports (or does not import) the rules.                                                              |
| --rulesets<br/>--no-rulesets                 | No         | Imports (or does not import) the rule packages.                                                      |
| <nobr>--handlingExistingRules=VALUE</nobr>   | `override` | Defines how mosparo should deal with the existing rules. Allowed values: `override`, `append`, `add` |

After you have started the command, the import is simulated. The determined changes are then displayed. Confirm the import if you are okay with all the changes.

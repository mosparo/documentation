---
sidebar_position: 7
sidebar_label: Tools
description: The tools support you in the use of mosparo.
---

# Tools

## Rule Tester

With the rule tester, you can test how the created rules work and whether the rules detect spam or not.

Enter the value you want to test in the "Test value" field. Then select what type of field or value it is. Certain types of rules are applied only to certain types of fields. Additionally, you can select whether rule and rule packages should be used for the test (or only rule packages, for example).

Once you have made the desired settings, you can start the test by clicking the "Test" button.

After the test has been performed, you will see the test result. Next to the entered test data, you will see whether the entry is considered spam, how many points were calculated, and what the limit value is. You will also see a list of rules matching the entered test value.

## Export

The Export function allows you to transfer the settings of a mosparo project to another project (possibly in another mosparo installation).

To start an export, select which data you want to export. The main settings include the name, the description, the hosts, and the spam score of a project. The display settings, as well as the security settings, contain the respective specific settings. All entered rules, or rule packages will be exported if you select the rules or rule packages.

After you have made your selection, you can start the export by clicking on the "Export" button. You will receive a JSON file containing the selected data of your project.

:::info
Sensitive data such as submissions, submission codes, unique project ID (UUID), API keys, or project members will not be exported.
:::

## Import

With the import function, you can import the settings of another mosparo project into your project. To do this, you need an export file that was created with the [Export function](#export) (or uses the same schema).

Select the file in the provided field and then choose which data you want to import. You can select all possible sections here, even if they are not in the file.

The settings (main, display as well as security settings) will always be overwritten.

Select how mosparo should handle existing rules if you want the rules imported. mosparo can either overwrite the existing rules (Overwrite mode), update the existing rule items or add additional rule items (Append mode), or add the existing rules as a new rule with a new identification number (Add mode).

Rule packages are searched by their address (URL). The rule package will be updated if a rule package with the same address exists.

:::info
When importing, no rules or rule packages are deleted. In the "Overwrite" mode, rule entries can be deleted.
:::

Then click on "Simulate import". mosparo will upload the file, validate it and then determine which settings must be changed. In the following overview, you can see which changes are necessary. If the changes are okay for you, you can execute them by clicking the "Execute changes" button.
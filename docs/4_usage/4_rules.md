---
sidebar_position: 4
sidebar_label: Rules
description: Learn how to create and manage rules in mosparo.
---

# Rules

With the help of rules, mosparo recognizes whether a submission is spam or valid. You must select a rule type for each rule. Within a rule, any number of items can be created, which are always based on the same rule type. A rule is always entered per project and cannot be automatically exchanged between projects.

## Creating a rule

:::tip
Do you prefer a video instead of reading text? Watch our HowTo about creating a rule on [YouTube](https://www.youtube.com/watch?v=LKv9uzlkrhU).
:::

To create a rule, select "Rules" in the navigation and then "Create rule" on the right. After that, a list of all rule types is displayed. Select the rule type you want to use to create a rule.

After you have selected a rule type, you see a field to enter the name of the rule. Give the rule a name so that you have a better overview when managing the rules.

After creating the rule, you see the rule editor. You can add a description of the rule in the "Description" field. You can also choose whether the rule should be active or inactive. The spam rating factor increases or decreases the entries in this rule. Each entry usually has a value of 1 by default. The spam rating factor can increase or decrease this value for all items.

On the right side, you can manage the items. The list of items is an editable table. You can click on a cell to edit the value. Depending on the rule type, you have to either insert a value or select a value from the list (for example, Unicode Block). Certain rule types also have subtypes that you can choose for each item (for example: "Text" and "Regular Expression" for the rule type "Word").

The cells with an orange background are unsaved and will be saved automatically after a few seconds. At the bottom of the screen, you can see the save button as well as a summary of how many unsaved changes you have.

With the checkbox at the front of each row, you can select multiple rows and then use the dropdown at the top of the table to delete the selected items at once.

To add items, you can either add a single item or multiple items. When you choose multiple items, you can enter a list of values and add them at once. You can also choose to import a text or a CSV file directly into the rule. When you use import functionality or the option to add multiple items at once, you'll see an overlay when the system processes the data. If you close the window, then the import process will be stopped. Please keep the window open until the screen shows that the process is completed. When importing or adding multiple items at once, the import process will skip all existing items.

With the "Filter" button on the right side, you can filter the visible items.

The rating field defines the spam score of an entry. If the field is empty, the value 1.0 is used. However, you can enter a numeric value from -1000000 to 1000000. If a negative number is entered, the item will decrease the number of points a submission receives. See [Rating example](#rating-example)

The save button at the bottom of the screen will save all unsaved changes. Usually, after some seconds, a change is saved to the database. But if that is not the case, or you want to leave the page, you can use the button to save them manually.

With the "Export items" button at the bottom of the screen, you can get a CSV export of your rule items. You can import the CSV again later.

## Managing the Rules

In the administration of the rules, you will find all stored rules. You can create additional rules using the "Create Rule" button in the upper right.

In the list of rules, you can see the rule's name, the rule type, and whether the rule is active. You can edit or delete the existing rules if a rule is no longer needed.

With the filter dropdown in the top right corner, you can filter the list for only one of the rule types.

Before a rule is deleted, you must confirm that you want to delete the rule.

## Rating example

:::tip
Do you prefer a video instead of reading text? Watch our HowTo about spam rating on [YouTube](https://www.youtube.com/watch?v=mFcbiDDJl-A).
:::

You have two rules configured in mosparo:

- Rule 1 is a rule of the type _Word_. It has an item for the word `Medicine` with a spam rating of `5.0`
- Rule 2 is a rule of the type _Unicode Block_. It has an item for the Unicode block `Emoticons` with a spam rating of `-10.0`

If a submission contains the text `Medicine 💊`, the rating will be `-5.0` (`= 5.0 + (-10.0)`) and, with that, below the configured spam detection minimum of `5.0` for this project. mosparo will not block the submission.
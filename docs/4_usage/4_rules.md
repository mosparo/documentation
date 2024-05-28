---
sidebar_position: 4
sidebar_label: Rules
description: Learn how to create and manage rules in mosparo.
---

# Rules

With the help of rules, mosparo recognizes whether a submission is spam or valid. You must select a rule type for each rule. Within a rule, any number of items can be created, which are always based on the same rule type. A rule is always entered per project and cannot be automatically exchanged between projects.

## Creating Rules

To create a rule, select "Rules" in the navigation and then "Create rule" on the right. After that, a list of all rule types is displayed. Select the rule type you want to use to create a rule.

After you have selected a rule type, you see the editing interface of a rule. Give the rule a name so that you have a better overview when managing the rules.

In addition, you can enter a more detailed description of the rule in the "Description" field. You can also choose whether the rule should be active or inactive.

The spam rating factor increases or decreases the entries in this rule. Each entry usually has a value of 1 by default. The spam rating factor can increase or decrease this value for all items.

On the right side, you can add the items. Depending on the rule type, insert a value, or select a value from the list (for example, Unicode Block). Certain rule types also have subtypes that you can choose for each item (for example: "Text" and "Regular Expression" for the rule type "Word").

With the "Add multiple entries" function, you can enter a list of entries with just a few clicks. For example, you can insert a list of words in the field and create them as items with one click.

The rating field defines the spam score of an entry. If the field is empty, the value 1.0 is used. However, you can enter a numeric value from -1000000 to 1000000. If a negative number is entered, the item will decrease the number of points a submission receives. See [Rating example](#rating-example)

If an item is no longer necessary, you can delete the item with the delete symbol. However, the item is only deleted when the rule is saved with the button at the bottom right.

## Managing the Rules

In the administration of the rules, you will find all stored rules. You can create additional rules using the "Create Rule" button in the upper right.

In the list of rules, you can see the rule's name, the rule type, and whether the rule is active. You can edit or delete the existing rules if a rule is no longer needed.

With the filter dropdown in the top right corner, you can filter the list for only one of the rule types.

Before a rule is deleted, you must confirm that you want to delete the rule.

## Rating example

You have two rules configured in mosparo:

- Rule 1 is a rule of the type _Word_. It has an item for the word `Medicine` with a spam rating of `5.0`
- Rule 2 is a rule of the type _Unicode Block_. It has an item for the Unicode block `Emoticons` with a spam rating of `-10.0`

If a submission contains the text `Medicine 💊`, the rating will be `-5.0` (`= 5.0 + (-10.0)`) and, with that, below the configured spam detection minimum of `5.0` for this project. mosparo will not block the submission.
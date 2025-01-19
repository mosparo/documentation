---
sidebar_position: 1
sidebar_label: Projects
description: To use mosparo on a website, you must create a project for the website.
---

# Projects

Projects in mosparo are a website. You can use a project on any number of websites and in any number of forms. All settings, rules, and rule packages apply equally to all websites and forms that use this project.

## List projects

The user's project list is visible after logging into mosparo. The user can decide to show the projects in a list of boxes or a tabular list. This selection is stored in the user account settings. The type of list which the user used last will be used the next time the user visits the list of projects.

The user has additional options to filter the list of projects if the user uses the tabular layout. Additionally, it's possible to search for a project. This is a good help if there are a lot of projects in a mosparo installation.

## Create a project

### 1. Project information

To create a project, please open the "Create" dropdown in the right corner in the project list and choose "Create project". Enter the name of your project and configure the hosts on which you plan to use the project. This is required to configure the project (CORS header) correctly. If you want to describe the project, you can enter your description in the field.

### 2. Select design

After you've created the project, you will see the project creation wizard. With this, you can configure the most important things for your project.

The first step is to choose the design of the frontend box. With the four visible fields, you can set the colors and the size of the box in simple mode. Choose your website's background, foreground, and accent color. mosparo will automatically determine the best available colors for the success and failure state.

If you want more options to customize the design, you can switch to the advanced mode in the design settings after the project creation wizard is finished.

Save your selection and continue with the wizard.

### 3. Enable security features

Next, you can choose which security features you want to enable. If you want to tune the features, you can do that after the wizard in the security settings of your project.

You can find all information about the security features [here](./settings#security-settings).

You do not have to enable any features in the wizard. You can enable or disable these features anytime in the security settings.

### 4. Connection details

In the last step of the wizard, you will find all the connection details to connect your website with mosparo. Please copy the values and paste them into your website's fields.

You can find these connection details in the project settings after the wizard.

## Delete a project

If you want to delete a project, you can do that in the project list.

For this, open the dropdown with the cog icon and choose "Delete project". Before the project is deleted, you'll see a confirmation screen. Please confirm that you want to delete the project by clicking the red button.

Please note that all data related to this project will be deleted.

## Project groups

_Project groups were added with version 1.3._

Project groups allow you to organize your projects. You can create as many groups as you want and assign as many projects as you wish to one group. You can also assign a group to another group to create a tree.

### Create a project group

To create a project group, select the functionality "Create project group" in the project dropdown in the top left corner or in the "Create" dropdown in the right corner of the project list.

Enter a name and, if you want, a description of the project group. You can also choose where you want to assign the project group to. You can assign it to the main group (to the tree's root) or to an existing project group as a subgroup.

Create the project group by clicking the save button.

### Assign a project to a project group

When you create a new project, you can choose the group to which you want to assign the new project in the "Create Project" wizard. You can assign the project to a different group later.

To assign an existing project to a project group, go to the [General settings](./settings#general-settings) of the project and choose the group to which you want to assign the project.

### Edit a project group

To edit a project group, open the action dropdown (the one with the cog icon) in the project list and select the function "Edit group". Edit the group as you want and save your changes.

### Delete a project group

To delete a project group, open the action dropdown (the one with the cog icon) in the project list and select the function "Delete group". Then, confirm that you want to delete the project group.

:::info
All assigned subgroups and projects are assigned to the parent group. If the group you want to delete is assigned to the main group, then all subgroups and projects in this group are assigned to the main group.
:::

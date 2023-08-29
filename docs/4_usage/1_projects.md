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

To create a project, please click the button "Create project" in the project list. Enter the name of your project and configure the domains on which you plan to use the project. This is required to configure the project (CORS header) correctly. If you want to describe the project, you can enter your description in the field.

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

---
sidebar_position: 9
sidebar_label: CLI
---

# CLI

This page describes the CLI commands that are included in mosparo.

## Maintenance

### Database cleanup

One of the main features of mosparo is to ensure that the form data is removed from mosparo after two weeks. To clean the database after two weeks, mosparo executes the cleanup process every 6 hours automatically when a form is loaded. If you prefer to execute the cleanup at a specified time, you can use this command and set up a cron job.

This command uses a slight delay when executed. The idea behind this command is to make sure that the command is only executed once, especially in a multi-node setup where multiple nodes may execute the command at the same time.

```shell
./bin/console mosparo:cleanup-database
```

#### Arguments

_This command does not offer any arguments._

#### Use case

Use this command in a cron job to execute this functionality automatically.

### GeoIP2 database download

This command can be used to download the latest GeoIP2 database from the MaxMind servers automatically.

```shell
./bin/console mosparo:geoip2:download-database
```

#### Arguments

_This command does not offer any arguments._

#### Use case

Use this command in a cron job to execute this functionality automatically.

### Health

The health command checks the health of the mosparo installation.

```shell
./bin/console mosparo:health
```

#### Arguments

_This command does not offer any arguments._

#### Use case

This command is used as the Docker Healthcheck to detect the health of the container automatically.

### Update

The update command is an interactive command to update mosparo to the latest version automatically.

```shell
./bin/console mosparo:self-update
```

#### Arguments

_This command does not offer any arguments._

#### Use case

Use this command to update your mosparo installation.

### Finalize update

The `finalize-update` command can be executed after updating mosparo. The command executes the same steps as in the frontend when the user opens the web interface after an update.

The command will:

- Update the database
- Clear the cache
- Check for other upgrade steps, for example to recalculate the prepared rule items

```shell
./bin/console mosparo:finalize-update
```

#### Arguments

| Argument         | Required | Description                                                                                                                                                              |
|---------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| --force            | Optional | Finalizes the update although the installed version is already the current version.                                                                                     |
| --wait-for-database | Optional | Waits for the given number of seconds until the database is available, which is useful if mosparo and the database are started at the same time. 0 does not wait at all. _Default: 0_ |

#### Use case

Use this command to finalize an update of your mosparo installation.

### Refresh frontend resources

Refreshes the frontend resources of all projects. The frontend resources contain the project designs and are built from the assets of the installed version, so they must be refreshed after an update. The update in the administration interface does that on its own. An installation that is updated by replacing the files, for example by starting a new container image, never runs that update, and this command refreshes the resources instead.

```shell
./bin/console mosparo:refresh-frontend-resources
```

#### Arguments

_This command does not offer any arguments._

#### Use case

Use this command to refresh the frontend resources of all projects of your mosparo installation after an update.

## User

### Create a user

The command creates a user without the setup wizard or the administration interface so that an installation can be prepared in an automated deployment.

```shell
./bin/console mosparo:user:create [--password PASSWORD] [--password-from-stdin] [--role ROLE] [--update] [--] <email>
```

#### Arguments

| Argument              | Required | Description                                                     |
|-----------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| email                | Required | The email address of the user, which is also the username.|
| --password            | Optional | The password of the user. The command asks for the password if it is needed and neither this option nor --password-from-stdin is used. |
| --password-from-stdin | Optional | Read the password from the standard input instead of the --password option. |
| --role | Optional | The role of the user, usable multiple times. Every user gets ROLE_USER. Without this option, a new user gets only ROLE_USER, and --update keeps the existing roles. |
| --update | Optional | Update an existing user instead of stopping with an error. The password is changed if --password or --password-from-stdin is used, and the roles if --role is used. Without any of these options, the command asks for a new password. |

#### Use case

Use this command to create or update a user, for example, in any automation.

## Project

### Create a project

The command creates a project so that an installation can be prepared in an automated deployment. The UUID and the keys are generated if they are not given, which is why the command prints them.

```shell
./bin/console mosparo:project:create [--owner OWNER] [--host HOST] [--description DESCRIPTION] [--uuid UUID] [--public-key PUBLIC-KEY] [--private-key PRIVATE-KEY] [--private-key-from-stdin] [--update] [--] <name>
```

#### Arguments

| Argument                | Required | Description                                                                                                                                             |
|--------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| name               | Required | The name of the project.|
| --owner         | Optional | The email address of the user who becomes the owner of the project.                                                                                    |
| --host         | Optional | A host that is allowed to use the project, usable multiple times.                                                                                 |
| --description | Optional | The description of the project.|
| --uuid | Optional | The UUID of the project. A random UUID is generated if the option is not used.|
| --public-key | Optional | The public key of the project, to be used together with --private-key or --private-key-from-stdin. Both keys are generated if the options are not used. |
| --private-key | Optional | The private key of the project, to be used together with --public-key. Visible in the process list; prefer --private-key-from-stdin. |
| --private-key-from-stdin | Optional | Read the private key from the standard input instead of the --private-key option, to be used together with --public-key. |
| --update | Optional | Set the name, the description, the hosts, and the keys of the project with the given UUID instead of stopping with an error. Requires --uuid. |

#### Use case

Use this command to create or update a project, for example, as part of any automation.

### Import project settings

With the import command, you can import the settings from a previously exported project into a project. You can use this command to make a backup of the settings.

```shell
./bin/console mosparo:import [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--translations|--no-translations] [--submissionRules|--no-submissionRules] [--fieldRules|--no-fieldRules] [--handlingExistingFieldRules HANDLINGEXISTINGFIELDRULES] [--rulePackages|--no-rulePackages] [-f|--force] [--] <projectId> <filePath>
```

#### Arguments

| Argument                     | Required | Description                                                                                                                                                                                                                                              |
|------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| projectId                    | Required | The project ID of the project into which you want to import the settings. You can find the ID of a project in the project list in mosparo.                                                                                                            |
| filePath                     | Required | The location of the file you want to import.                                                                                                                                                                                                             |
| --generalSettings            | Optional | Import the general settings of a project.                                                                                                                                                                                                                |
| --no-generalSettings         | Optional | Do not import the general settings of a project.                                                                                                                                                                                                         |
| --designSettings             | Optional | Import the design settings of a project.                                                                                                                                                                                                                 |
| --no-designSettings          | Optional | Do not import the design settings of a project.                                                                                                                                                                                                          |
| --securitySettings           | Optional | Import the security settings of a project.                                                                                                                                                                                                               |
| --no-securitySettings        | Optional | Do not import the security settings of a project.                                                                                                                                                                                                        |
| --translations               | Optional | Import the translations of a project.                                                                                                                                                                                                                    |
| --no-translations            | Optional | Do not import the translations of a project.                                                                                                                                                                                                             |
| --submissionRules            | Optional | Import the submission rules of a project.                                                                                                                                                                                                                |
| --no-submissionRules         | Optional | Do not import the submission rules of a project.                                                                                                                                                                                                         |
| --fieldRules                 | Optional | Import the field rules of a project.                                                                                                                                                                                                                     |
| --no-fieldRules              | Optional | Do not import the field rules of a project.                                                                                                                                                                                                              |
| --handlingExistingFieldRules | Optional | Defines how mosparo should handle existing field rules. Use `override`, to override a field rule that already exists. Use `append` to append the rule items if a field rule already exists. Use `add` to add an existing field rule as a new field rule. |
| --rulePackages               | Optional | Import the rule packages of a project.                                                                                                                                                                                                                   |
| --no-rulePackages            | Optional | Do not import the rule packages of a project.                                                                                                                                                                                                            |
| --force                      | Optional | If force is set, the command will execute all changes without asking. Otherwise, the command will be executed interactively, and you need to tell the command which changes to apply.                                                                    |

#### Use case

Use this command to import the settings, rules, and rule packages from a file into a project.

### Export project settings

With the export command, you can export the settings of a project. You can later import the settings into a different project in the same or a different mosparo installation.

mosparo will not export any sensitive data, such as submitted form data or the UUID, public or private key of a project.

```shell
./bin/console mosparo:export [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--translations|--no-translations] [--submissionRules|--no-submissionRules] [--fieldRules|--no-fieldRules] [--rulePackages|--no-rulePackages] [--] <projectId> [<filePath>]
```

#### Arguments

| Argument              | Required | Description                                                                                                        |
|-----------------------|----------|--------------------------------------------------------------------------------------------------------------------|
| projectId             | Required | The project ID of the project you want to export. You can find the ID of a project in the project list in mosparo. |
| filePath              | Optional | The location where the command should store the export file.                                                       |
| --generalSettings     | Optional | Export the general settings of a project.                                                                          |
| --no-generalSettings  | Optional | Do not export the general settings of a project.                                                                   |
| --designSettings      | Optional | Export the design settings of a project.                                                                           |
| --no-designSettings   | Optional | Do not export the design settings of a project.                                                                    |
| --securitySettings    | Optional | Export the security settings of a project.                                                                         |
| --no-securitySettings | Optional | Do not export the security settings of a project.                                                                  |
| --translations        | Optional | Export the translations of a project.                                                                              |
| --no-translations     | Optional | Do not export the translations of a project.                                                                       |
| --submissionRules     | Optional | Export the submission rules of a project.                                                                          |
| --no-submissionRules  | Optional | Do not export the submission rules of a project.                                                                   |
| --fieldRules          | Optional | Export the field rules of a project.                                                                               |
| --no-fieldRules       | Optional | Do not export the field rules of a project.                                                                        |
| --rulePackages        | Optional | Export the rule packages of a project.                                                                             |
| --no-rulePackages     | Optional | Do not export the rule packages of a project.                                                                      |

#### Use case

Use this command to export the settings, rules, and rule packages of a project into a file.

## Rule packages

### Import rule package

With the rule package import command, you can import a rule package from a local file or via standard input (stdin).

```shell
./bin/console mosparo:rule-package:import [-f|--file FILE] [-i|--input] [-s|--hash HASH] [--] <projectId> <rulePackageId>
```

#### Arguments

| Argument      | Required | Description                                                                                                                                    |
|---------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| projectId     | Required | The project ID of the project into which you want to import the rule package. You can find the ID of a project in the project list in mosparo. |
| rulePackageId | Required | The rule package ID of the rule package into which you want to import the rule package. This rule package needs to be of the correct type.     |
| -f / --file   | Optional | The path to the rule pacakge file.                                                                                                             |
| -i / --input  | Optional | With this option, you can tell the command to read the package content from the standard input.                                                |
| -s / --hash   | Optional | Specify the SHA256 hash of the content of the rule package.                                                                                    |

At least one of `-f`/`--file` or `-i`/`--input` is required.

#### Use case

Use this command to import a locally generated or stored rule package.

### Refresh rule packages

Refreshes all automatic rule packages. Packages that are hosted on a URL are downloaded and cached in mosparo. Packages, which are loaded from a specified file path, are directly loaded and cached in mosparo.

```shell
./bin/console mosparo:rule-package:refresh
```

#### Arguments

_This command does not offer any arguments._

#### Use case

Use this command in a cron job to execute this functionality automatically.

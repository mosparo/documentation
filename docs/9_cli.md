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

## Import & Export

### Import project settings

With the import command, you can import the settings from a previously exported project into a project. You can use this command to make a backup of the settings.

```shell
./bin/console mosparo:import [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--rules|--no-rules] [--handlingExistingRules HANDLINGEXISTINGRULES] [--rulePackages|--no-rulePackages] [-f|--force] [--] <projectId> <filePath>
```

#### Arguments

| Argument                | Required | Description                                                                                                                                                                                                                |
|-------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| projectId               | Required | The project ID of the project into which you want to import the settings. You can find the ID of a project in the project list in mosparo.                                                                                 |
| filePath                | Required | The location of the file you want to import.                                                                                                                                                                               |
| --generalSettings       | Optional | Import the general settings of a project.                                                                                                                                                                                  |
| --no-generalSettings    | Optional | Do not import the general settings of a project.                                                                                                                                                                           |
| --designSettings        | Optional | Import the design settings of a project.                                                                                                                                                                                   |
| --no-designSettings     | Optional | Do not import the design settings of a project.                                                                                                                                                                            |
| --securitySettings      | Optional | Import the security settings of a project.                                                                                                                                                                                 |
| --no-securitySettings   | Optional | Do not import the security settings of a project.                                                                                                                                                                          |
| --rules                 | Optional | Import the rules of a project.                                                                                                                                                                                             |
| --no-rules              | Optional | Do not import the rules of a project.                                                                                                                                                                                      |
| --handlingExistingRules | Optional | Defines how mosparo should handle existing rules. Use `override`, to override a rule that already exists. Use `append` to append the rule items if a rule already exists. Use `add` to add an existing rule as a new rule. |
| --rulePackages          | Optional | Import the rule packages of a project.                                                                                                                                                                                     |
| --no-rulePackages       | Optional | Do not import the rule packages of a project.                                                                                                                                                                              |
| --force                 | Optional | If force is set, the command will execute all changes without asking. Otherwise, the command will be executed interactively, and you need to tell the command which changes to apply.                           |

#### Use case

Use this command to import the settings, rules, and rule packages from a file into a project.

### Export project settings

With the export command, you can export the settings of a project. You can later import the settings into a different project in the same or a different mosparo installation.

mosparo will not export any sensitive data, such as submitted form data or the UUID, public or private key of a project.

```shell
./bin/console mosparo:export [--generalSettings|--no-generalSettings] [--designSettings|--no-designSettings] [--securitySettings|--no-securitySettings] [--rules|--no-rules] [--rulePackages|--no-rulePackages] [--] <projectId> [<filePath>]
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
| --rules               | Optional | Export the rules of a project.                                                                                     |
| --no-rules            | Optional | Do not export the rules of a project.                                                                              |
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

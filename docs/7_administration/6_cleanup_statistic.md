---
sidebar_position: 6
sidebar_label: Cleanup statistic
description: The cleanup statistic gives an overview of when mosparo cleaned the database.
---

# Cleanup statistic

One of the main features of mosparo is the automatic cleaning of the database. This process removes the data submitted by the user after 14 days automatically. The cleanup statistic gives the administrator an overview of when the cleanup process was executed, how much data was deleted, and how long it took.

The `Executor` column tells you how the process was started. If the executor is `Frontend API`, it means that the cleanup process is executed when a user opens a form where mosparo is integrated. `Cleanup command`, on the other side, means that the cleanup process was executed by the CLI command, for example, by a cron job.

The columns `Submit tokens` and `Submissions` indicate the number of objects that mosparo contains and the amount that was deleted in this cleanup (the red negative numbers).

The `Execution time` column shows how long the cleanup process took, and the `Status` column indicates the status of the cleanup process. If the cleanup is complete, then the next regular cleanup will be executed after at least 6 hours. If the status is `Incomplete`, the next cleanup will be executed in 10 minutes. An incomplete cleanup process means that a limit was reached, typically only when the Frontend API executes the cleanup process, and more data needs to be deleted.
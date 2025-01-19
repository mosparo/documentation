---
sidebar_position: 4
sidebar_label: Health
description: With the health API, you can check the health of the mosparo installation.
---

# Health

## `check`

**Method**: GET<br />
**Endpoint**: /api/v1/health/check

This API route checks mosparo's health and returns the information. The Docker Healthcheck uses this route to check the health of the Docker container. But the API can also be used with other monitoring tools and non-Docker installations.

### Authentication

This API does not have any authentication. However, the client's IP address requesting this API must be listed in the environment variable `MOSPARO_HEALTH_ALLOW_LIST`. Read more about the environment variables [here](../installation/configure/environment_variables).

### Request

#### Arguments

_No arguments_

### Response

#### Status code

If the connection to the database could not be established or there is another problem, the API response code is `500`. If everything is healthy or mosparo has not yet been installed, the API response code is `200`.

#### Example
```json
{
  "service": "mosparo",
  "healthy": true,
  "databaseStatus": "connected",
  "error": null
}
```

#### Properties

| Name             | Type         | Description                                                                                                                                                                                                                                                              |
|------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `serivce`        | String       | The responding service. For now, this is always set to `mosparo`.                                                                                                                                                                                                        |
| `healthy`        | Boolean      | If everything is healthy, this will be set to `true`, otherwise, `false`.                                                                                                                                                                                                |
| `databaseStatus` | String       | If the database is available and the connection was successful, this will be set to `connected`. If an error occurred while testing the connection, then this will be set to `connection-failed`. If mosparo is not installed yet, this will be set to `not-configured`. |
| `error`          | String\|null | If an error occurs, this will contain the error message. If no error occurred, this will be set to `null`                                                                                                                                                                |


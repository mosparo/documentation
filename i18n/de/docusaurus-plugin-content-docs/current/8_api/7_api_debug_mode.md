---
sidebar_position: 7
sidebar_label: API-Debugging-Modus
description: Der API-Debugging-Modus fügt den API-Antworten weitere Details hinzu, um eine Antwort oder einen Fehler zu erklären.
---

# API-Debugging-Modus


## Aktivieren des API-Debugging-Modus

Um den API-Debugging-Modus zu verwenden, müssen Sie ihn aktivieren. Sie finden diese Einstellung in den [Projekteinstellungen](../usage/settings), und Sie müssen sie für jedes Projekt aktivieren, für das Sie den API-Debugging-Modus verwenden möchten.

## Verwenden des API-Debugging-Modus

Wenn eine Hintergrund-API-Anfrage (Verifizierung, Statistik oder Regelpakete) fehlschlägt oder eine nicht erfolgreiche Antwort zurückgibt, fügt die API weitere Daten hinzu, wenn der API-Debugging-Modus aktiviert ist. Dies kann helfen, um zu verstehen, warum eine Anfrage fehlgeschlagen ist.

### Beispiel

Wenn die Anfragesignatur für eine Anfrage nicht erfolgreich überprüft wurde, gibt die API die folgende Antwort zurück:

#### Ohne aktiviertem API-Debugging-Modus

```json
{
   "error":true,
   "errorMessage":"Request invalid."
}
```

#### Mit aktiviertem API-Debugging-Modus

```json
{
   "error":true,
   "errorMessage":"Request invalid.",
   "debugInformation":{
      "reason":"hmac_hash_invalid",
      "expectedHmacHash":"85def7eb34fb888b0f7cc81e2ce416bf991498021cb302bf74cd1ed014384240",
      "receivedHmacHash":"85def7eb34fb888b0f7cc81e2ce416bf991498021cb302bf74cd1ed014384241",
      "payload":"\/api\/v1\/verification\/verify{\u0022submitToken\u0022:\u0022tMGF3RKb7u0Lg43R0aNmEvqFiBeb5f4jFu9jRnMGx2Q\u0022,\u0022validationSignature\u0022:\u00220d3aaea371261e6c7500dcee54fe23dceb12762a315df8bf539a9f5694442dbb\u0022,\u0022formSignature\u0022:\u002239a1b002684efdffb4255960520cc98d30de62a56299b585ebebd6beb090ed1f\u0022,\u0022formData\u0022:{\u0022emailAddress\u0022:\u002290adf74020cede3f838394bfc64d2981f7a60f06bd91dd55fcdf299970a3b1b9\u0022,\u0022first-name\u0022:\u00222d973910e3661a7aa7b6652ea399ad0134baabf8b8ede57e8061fe5e699c20fd\u0022,\u0022last-name\u0022:\u002246807bff9019eb387190a79fc24ccff43220ffd92cbf5897dd7cd0b3deddb4ea\u0022,\u0022message\u0022:\u0022304cc1877b9b333c560188e306f9f21a4880fdf2ff98e33f7c840fffd41a19cb\u0022,\u0022website\u0022:\u0022e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\u0022}}"
   }
}
```

## Zusätzlich verfügbare Daten

Die zusätzlichen Debug-Daten werden der Antwort im Feld `debugInformation` hinzugefügt. Wenn dieses Feld in der Antwort nicht vorhanden ist, ist der API-Debug-Modus entweder nicht aktiviert, oder die Anfrage war erfolgreich. Wenn die Verifizierungs-Anfrage erfolgreich war, aber nicht alle Felder erfolgreich überprüft werden konnten, werden die Debugging-Daten der Liste der Probleme für jedes Feld hinzugefügt.

Die nachstehenden Felder werden je nach Art des Fehlers in der Antwort angegeben:

| Feldname                 | APIs          | Fehlerart                 | Beschreibung                                                                               |
|--------------------------|---------------|---------------------------|--------------------------------------------------------------------------------------------|
| `reason`                 | Alle          | Bei allen Fehlerarten     | Gibt den Grund an, warum die Anfrage fehlgeschlagen ist (siehe [Gründe](#gründe)).         |
| `expectedHmacHash`       | Alle          | Autorisierungsfehler      | Gibt den Hash an, den mosparo berechnet hat.                                               |
| `receivedHmacHash`       | Alle          | Autorisierungsfehler      | Gibt den Hash an, den mosparo erhalten hat.                                                |
| `payload`                | Alle          | Autorisierungsfehler      | Gibt die Daten an, welche mosparo zur Berechnung des HMAC-Hashes verwendet hat.            |
| `hasSubmitToken`         | Verifizierung | Verifizierungsfehler      | Gibt an, ob der Einsende-Code in der Anfrage gesetzt wurde.                                |
| `hasValidationSignature` | Verifizierung | Verifizierungsfehler      | Gibt an, ob die Validierungssignatur in der Anfrage gesetzt wurde.                         |
| `hasFormSignature`       | Verifizierung | Verifizierungsfehler      | Gibt an, ob die Formularsignatur in der Anfrage gesetzt wurde.                             |
| `minimumTimeExpected`    | Verifizierung | Verifizierungsfehler      | Gibt die erwartete Mindestzeit an, wenn die Mindestzeit-Sicherheitsfunktion aktiviert ist. |
| `minimumTimeElapsed`     | Verifizierung | Verifizierungsfehler      | Gibt die verstrichene Zeit an, wenn die Mindestzeit-Sicherheitsfunktion aktiviert ist.     |
| `expectedSignature`      | Verifizierung | Verifizierungsfehler      | Gibt die erwartete Validierungssignatur an.                                                |
| `receivedSignature`      | Verifizierung | Verifizierungsfehler      | Gibt die empfangene Validierungssignatur an.                                               |
| `signtaurePayload`       | Verifizierung | Verifizierungsfehler      | Gibt die Daten an, die zur Berechnung der erwarteten Signatur verwendet wird.              |
| `expectedValue`          | Verifizierung | Feld-Verifizierungsfehler | Gibt den erwarteten Wert für das Feld an.                                                  |
| `receivedValue`          | Verifizierung | Feld-Verifizierungsfehler | Gibt den empfangenen Wert für das Feld an.                                                 |
| `hasRulePackageId`       | Regelpaket    | Genereller Fehler         | Gibt an, ob die Regelpaket-ID in der Anfrage übermittelt wurde.                            |
| `hasRulePackageContent`  | Regelpaket    | Genereller Fehler         | Gibt an, ob der Inhalt des Regelpakets in der Anfrage übermittelt wurde.                   |
| `expectedType`           | Regelpaket    | Art-Fehler                | Gibt den erwarteten Typ des Regelpakets an.                                                |
| `receivedType`           | Regelpaket    | Art-Fehler                | Gibt den Typ des Regelpakets an, das mit der angegebenen Regelpaket-ID gefunden wurde.     |
| `sentHash`               | Regelpaket    | Hash-Fehler               | Gibt den Hash an, der in der Anfrage gesendet wurde.                                       |
| `generatedHash`          | Regelpaket    | Hash-Fehler               | Gibt den generierten Hash basierend auf dem Inhalt des Regelpakets an.                     |

### Gründe

| Grund                               | Beschreibung                                                                                                                             |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `general_error`                     | Bei der Bearbeitung der Anfrage ist ein allgemeiner Fehler aufgetreten.                                                                  |
| `field_not_in_received_data`        | Der Hash für dieses Feld wurde in der Anfrage nicht gesetzt.                                                                             |
| `field_signature_invalid`           | Der von mosparo berechnete Hash für das Feld unterscheidet sich von dem in der Anfrage angegebenen Hash.                                 |
| `hmac_hash_invalid`                 | Die Anfragesignatur, ein HMAC-Hash, der als Passwort im `Authorization`-Header angegeben wurde, entsprach nicht der erwarteten Signatur. |
| `minimum_time_invalid`              | Die Mindestzeit ist noch nicht verstrichen und die Überprüfung ist zu früh.                                                              |
| `required_parameter_missing`        | Einer der erforderlichen Parameter fehlt.                                                                                                |
| `submit_token_not_found`            | Der angegebene Einsende-Code kann nicht in der Datenbank gefunden werden.                                                                |
| `submit_token_not_valid`            | Der angegebene Einsende-Code ist ungültig, möglicherweise weil der Einsende-Code bereits verwendet wurde.                                |
| `validation_signature_invalid`      | Die angegebene Validierungssignatur unterscheidet sich von der, die mosparo berechnet hat.                                               |
| `rule_package_type_invalid`         | Der Typ des Regelpakets ist falsch.                                                                                                      |
| `rule_package_content_hash_invalid` | Der angegebene Hash stimmt nicht mit dem Hash für den Inhalt des angegebenen Regelpakets überein.                                        |
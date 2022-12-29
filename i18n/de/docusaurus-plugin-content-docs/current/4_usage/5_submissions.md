---
sidebar_position: 5
sidebar_label: Einsendungen
description: In der Liste der Einsendungen finden Sie alle Daten, welche eingesendet wurden.
---

# Einsendungen

Unter “Einsendungen” finden Sie alle getätigten Einsendungen, die noch nicht gelöscht wurden. Die Einsendungen werden automatisch nach 14 Tagen gelöscht und sind daher nicht mehr in der Liste der Einsendungen zu finden.

## Erklärung der Spalten

| Spalte         | Beschreibung                                                                                                                                                                                                                            |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID             | Fortlaufende Identifikationsnummer der Einsendung                                                                                                                                                                                       |
| Seite          | Gibt an, auf welcher Website das Formular ausgefüllt und abgesendet wurde. Die Bezeichnung der Seite ist der Seitentitel.                                                                                                               |
| IP-Adresse     | Die IP-Adresse des Benutzers. Wenn Sie die GeoIP-Funktionalität aktiviert haben, werden zusätzlich die AS-Nummer sowie das Land und der Name der Organisation angezeigt, sofern diese Informationen für eine IP-Adresse vorhanden sind. |
| Spam           | Gibt an, ob die Einsendung als Spam gewertet wurde oder nicht.                                                                                                                                                                          |
| Spam-Bewertung | Zeigt die Punkte an, welche eine Einsendung erhalten hat und wie viele Punkte notwendig wären, um als Spam gewertet zu werden.                                                                                                          |
| Gesendet am    | Gibt an, wann die Einsendung gesendet wurde.                                                                                                                                                                                            |
| Gültig         | Gibt an, ob die Einsendung vom Backend einer Website korrekt überprüft wurde.                                                                                                                                                           |
| Überprüft am   | Gibt an, wann die Einsendung überprüft wurde.                                                                                                                                                                                           |

## Einsendung anschauen

Wenn Sie eine Einsendung anschauen, sehen Sie viele weitere Informationen zur Einsendung. Auf der linken Seite werden technische Informationen zur Einsendung angezeigt. In der rechten Spalte finden Sie die vom Benutzer eingegebenen Informationen sowie technische Informationen zum Benutzer.

| Bezeichnung       | Description                                                                                                                                                                          |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ist Spam          | Gibt an, ob es sich bei der Einsendung um Spam handelt.                                                                                                                              |
| Spam-Bewertung    | Zeigt die Punkte an, welche eine Einsendung erhalten hat und wie viele Punkte notwendig wären, um als Spam gewertet zu werden.                                                       |
| Gesendet am       | Gibt an, wann die Einsendung gesendet wurde.                                                                                                                                         |
| Ist gültig        | Gibt an, ob die Einsendung korrekt vom Backend einer Website überprüft wurde.                                                                                                        |
| Überprüft am      | Gibt an, wann die Einsendung überprüft wurde.                                                                                                                                        |
| Seiten-Titel      | Titel der Webseite, auf welcher das Formular untergebracht ist.                                                                                                                      |
| Seiten-URL        | Adresse der Webseite, auf welcher das Formular untergebracht ist.                                                                                                                    |
| Angefordert am    | Zeigt das Datum und die Uhrzeit an, zu welcher das Formular aufgerufen wurde und der Einsende-Code beantragt wurde.                                                                  |
| Ignorierte Felder | Listet alle Felder auf, welche nicht von mosparo überprüft wurden, weil es sich bei den Feldern zum Beispiel um versteckte Felder oder um Checkbox-Feldern gehandelt hat.            |
| Formulardaten     | Zeigt eine Liste aller Felder an, welche im Formular vorhanden sind und ggf. ausgefüllt wurden. Siehe 3.5.2.1 Formulardaten                                                          |
| IP-Adresse        | Die IP-Adresse des Benutzers, welcher das Formular aufgerufen hat.                                                                                                                   |
| User-Agent        | Die Kennung des Browsers, mit welchem der Benutzer das Formular aufgerufen hat. Der Wert kann vom Browser her manipuliert werden und ist nicht als eindeutige Information zu werten. |
| AS Nummer         | Nummer der Organisation, welcher als Besitzer einer IP-Adresse eingetragen ist.                                                                                                      |
| AS Organisation   | Name der Organisation, welche als Besitzer einer IP-Adresse eingetragen ist.                                                                                                         |
| Land              | Das Land, welchem die IP-Adresse aufgrund der AS Organisation zugeordnet ist.                                                                                                        |

### Formulardaten

In der Box “Formulardaten” werden alle Formularfelder aufgelistet, welche im Formular ausgefüllt wurden bzw. ausgefüllt werden könnten.

Pro Formularfeld wird der Name des Feldes angezeigt. Es handelt sich dabei um den technischen Namen eines Feldes und nicht zwingend um die Bezeichnung eines Feldes. Zusätzlich wird angezeigt, wie viele Punkte ein Feld erhalten hat und aufgrund von welchem Wort oder welcher Regel.

Weiter sehen Sie hinter dem Namen eines Feldes eine Statusanzeige. Diese Statusanzeige zeigt an, ob das Feld in der Überprüfung vom Backend korrekt überprüft wurde, ob es bei der Überprüfung ein Problem gab oder ob das Feld gar nicht überprüft wurde.

| Statusanzeige                                                            | Beschreibung                                                                                                                                                                                                                                                                                                                                  |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![Field is valid](./assets/status_valid.jpg)                             | Zeigt an, dass das Feld überprüft wurde und die Daten korrekt übermittelt wurden.                                                                                                                                                                                                                                                             |
| ![Field has points](./assets/status_points_de.jpg)                       | Zeigt an, falls dieses Feld Spam enthält und daher Punkte in der Bewertung erhalten hat.                                                                                                                                                                                                                                                      |
| ![Field verification failed](./assets/status_verification_failed_de.jpg) | Zeigt an, dass die Überprüfung des Feldes nicht erfolgreich war, weil beispielsweise die Daten nicht korrekt übermittelt wurden.                                                                                                                                                                                                              |
| ![Field not verified](./assets/status_not_verified_de.jpg)               | Zeigt an, dass ein Feld nicht von der Überprüfung des Backends der Website überprüft wurde. Dies bedeutet, dass das Feld hätte verändert werden können und daher eher unsicher ist. Es ist nicht zwingend schlimm, weil es sich dabei zum Beispiel um ein nicht so wichtiges Feld handelt und daher vom Backend nicht erneut überprüft wurde. |
| ![Honeypot field](./assets/status_honeypot.jpg)                          | Wird angezeigt, wenn es sich bei dem Feld um das Honeypot-Feld handelt. Dieses Feld sollte immer leer sein, ansonsten handelt es sich bei der Einsendung um Spam.                                                                                                                                                                             |


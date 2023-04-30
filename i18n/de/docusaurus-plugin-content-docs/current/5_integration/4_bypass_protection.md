---
sidebar_position: 4
sidebar_label: Umgehungsschutz
description: Der Frontend-Teil von mosparo kann umgangen werden. Erfahren Sie, wie Sie Ihr Formular dagegen schützen können.
---

# Umgehungsschutz

mosparo ist eine Schutzmethode, welche für die Funktionsweise zu einem beachtlichen Teil auf dem Frontend basiert. Da das Frontend im Browser ausgeführt wird, könnte es manipuliert werden. Es ist daher wichtig, dass die Schutzmethode nicht umgangen werden kann.

Grundsätzlich ist es immer möglich, eine Schutzmassnahme im Frontend zu umgehen. Sie sollten nie darauf vertrauen, dass die Browser-Formularvalidierung korrekt ausgeführt wurde und alle Daten valid sind, da ein Übeltäter das Frontend manipulieren kann.

Die mosparo Schutzmethode kann auf zwei unterschiedlichen Arten umgangen werden. Wir möchten Ihnen diese Arten erklären und aufzeigen, was Sie dagegen tun können.

## mosparo grundsätzlich umgehen

Ein Übeltäter kann mosparo grundsätzlich umgehen. Das ist sehr einfach möglich: entfernen Sie einfach das JavaScript im Frontend von Ihrem Formular und senden Sie das Formular ab.

Der Schutz gegen diese Umgehung ist ebenfalls sehr einfach: mosparo braucht die Frontend-Validierung **sowie** die Backend-Verifizierung. Nur mit beiden mosparo Methoden kann sichergestellt werden, dass das Formular von mosparo korrekt geprüft wurde. 

Wenn Sie nur die Frontend-Validierung verwenden, können Sie nicht sicher sein, ob die Daten nicht nach der Validierung noch verändert wurden.

## Umgehen der Feld-Validierung

Es ist ebenfalls möglich, die Validierung eines Feldes zu umgehen, ohne mosparo grundsätzlich zu umgehen. Das kann gemacht werden, in dem der Typ eines Feldes so verändert wird, damit mosparo das Feld ignoriert und daher nicht validiert.

### Beispiel

1. Nehmen wir an, Sie haben ein Formular mit einem Feld wie das folgende
```html
<input type="text" name="first_name">
```
2. Ein Übeltäter gibt die unerwünschten Daten im Feld ein
3. Der Übeltäter ändert nun mit den Entwicklertools des Browsers den Typ des Feldes auf `password`
```html
<input type="password" name="first_name">
```
4. Anschliessend klickt der Übeltäter auf die mosparo Kontrollbox. mosparo führt die Validierung aus und gibt einen Validierungscode für die Daten zurück.
5. Das Formular wird abgesendet
6. Das Backend der Website erhält die Daten und führt die Verifizierung aus. Da das Feld `first_name` nicht von mosparo validiert wurde, wird die Verifizierung keine Probleme feststellen.
7. Das Backend verarbeitet die Formular daten wie es programmiert wurde. Das Feld `first_name` wird ganz normal verwendet und das Backend wird die unerwünschten Daten verarbeiten.

Da es für uns sehr wichtig ist, dass sensible Informationen wie ein Passwort automatisch von der Validierung ausgeschlossen werden, gehört das Ignorieren von Feldern zu der mosparo Validierungsmethode dazu. Die Lösung, um die Umgehung zu verhindern, ist sicherzustellen, dass alle verifizierbaren Felder auch wirklich von mosparo verifiziert wurden. Felder wie zum Beispiel eine Kontrollbox sind nicht verifizierbar und es ist daher nicht problematisch, wenn jemand den Typ des Feldes ändert. Alle Felder, in denen ein Text eingegeben werden kann, sind grundsätzlich verifizierbar (`text`, `email`, `url`, `textarea`).

Diese Überprüfung muss im Backend der Website gemacht werden. Nach dem die API von mosparo das Verifizierungsergebnis zurückgegeben hat, muss überprüft werden, ob alle verifizierbaren Felder verifiziert wurden. Wenn Ihr Backend mehrere unterschiedliche Formulare verarbeiten kann (wie zum Beispiel unser WordPress Plugin), empfehlen wir alle verifizierbaren Felder in einem Formular zu finden und zu prüfen, ob diese verifiziert wurden. 

### Beispiele in unseren Plugins und Integrationen

- [WordPress Plugin (Contact Form 7 Module)](https://github.com/mosparo/wordpress-plugin/blob/master/src/MosparoIntegration/Module/ContactForm7/MosparoField.php#L122)
- [Django Integration](https://github.com/mosparo/django-integration/blob/master/mosparo_django/fields.py#L83)
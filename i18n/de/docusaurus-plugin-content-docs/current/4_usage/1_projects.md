---
sidebar_position: 1
sidebar_label: Projekte
description: Damit mosparo in einer Website verwendet werden kann, muss für die Website ein Projekt erstellt werden.
---

# Projekte

Unter Projekten ist in mosparo eine Website zu verstehen. Ein Projekt kann auf beliebig vielen Websites und in beliebig vielen Formularen eingesetzt werden. Alle Einstellungen, Regeln und Regel-Pakete gelten für alle Websites und Formulare gleichermassen, welche dieses Projekt verwenden.

## Projekt auflisten

Die Projektliste des Benutzers ist nach dem Einloggen in mosparo sichtbar. Der Benutzer kann entscheiden, ob er die Projekte in einer Liste von Kästchen oder in einer tabellarischen Liste anzeigen lassen möchte. Diese Auswahl wird in den Einstellungen des Benutzerkontos gespeichert. Die zuletzt verwendete Listenart wird beim nächsten Aufgruf der Projektliste verwendet.

Der Benutzer hat zusätzliche Möglichkeiten, die Liste der Projekte zu filtern, wenn er das tabellarische Layout verwendet. Ausserdem ist es möglich, nach einem Projekt zu suchen. Dies ist eine gute Hilfe, wenn es in einer mosparo Installation viele Projekte gibt.

## Projekt erstellen

### 1. Projektinformationen

Um ein Projekt zu erstellen, öffnen Sie bitte das Dropdown-Menü "Erstellen" in der rechten Ecke in der Projektliste und wählen Sie "Projekt erstellen". Geben Sie den Namen Ihres Projekts ein und konfigurieren Sie die Domains, auf denen Sie das Projekt verwenden möchten. Dies ist erforderlich, um das Projekt (CORS-Header) korrekt zu konfigurieren. Wenn Sie das Projekt beschreiben möchten, können Sie Ihre Beschreibung in das Feld eingeben.

### 2. Darstellung wählen

Nachdem Sie das Projekt erstellt haben, sehen Sie den Assistenten zur Projekterstellung. Mit diesem können Sie die wichtigsten Dinge für Ihr Projekt konfigurieren.

Der erste Schritt ist die Auswahl des Designs der Frontend-Box. Mit den vier sichtbaren Feldern können Sie die Farben und die Grösse der Box im einfachen Modus einstellen. Wählen Sie die Hintergrund-, Vordergrund- sowie Akzentfarbe Ihrer Website. mosparo ermittelt automatisch die besten verfügbaren Farben für den Erfolgs- und Fehlerstatus.

Wenn Sie weitere Optionen zur Anpassung der Darstellung wünschen, können Sie nach Abschluss des Projektierungsassistenten in den Designeinstellungen in den erweiterten Modus wechseln.

Speichern Sie Ihre Auswahl und fahren Sie mit dem Assistenten fort.

### 3. Sicherheits-Funktionen aktivieren

Als nächstes können Sie auswählen, welche Sicherheits-Funktionen Sie aktivieren möchten. Wenn Sie die Funktionen anpassen möchten, können Sie das nach dem Assistenten in den Sicherheits-Einstellungen Ihres Projekts tun.

Alle Informationen zu den Sicherheits-Funktionen finden Sie [hier](./settings#sicherheits-einstellungen).

Sie müssen keine der Funktionen im Assistenten aktivieren. Sie können diese Funktionen jederzeit in den Sicherheits-Einstellungen aktivieren oder deaktivieren.

### 4. Verbindungsdetails

Im letzten Schritt des Assistenten finden Sie alle Verbindungsdetails, um Ihre Website mit mosparo zu verbinden. Bitte kopieren Sie die Werte und fügen Sie sie in die Felder Ihrer Website ein.

Sie finden diese Verbindungsdetails nach dem Assistenten in den Projekteinstellungen.

## Projekt löschen

Wenn Sie ein Projekt löschen möchten, können Sie dies in der Projektliste tun.

Öffnen Sie dazu das Dropdown-Menü mit dem Zahnradsymbol und wählen Sie "Projekt löschen". Bevor das Projekt gelöscht wird, sehen Sie einen Bestätigung. Bestätigen Sie bitte, dass Sie das Projekt löschen möchten, indem Sie auf die rote Schaltfläche klicken.

Bitte beachten Sie, dass alle Daten, die mit diesem Projekt verknüpft sind, gelöscht werden.

## Projektgruppen

_Projektgruppen wurden mit Version 1.3 hinzugefügt._

Mit Projektgruppen können Sie Ihre Projekte organisieren. Sie können beliebig viele Gruppen erstellen und einer Gruppe beliebig viele Projekte zuordnen. Sie können auch eine Gruppe einer anderen Gruppe zuordnen, um einen Baum zu erstellen.

### Projektgruppe erstellen

Um eine Projektgruppe zu erstellen, wählen Sie die Funktion „Projektgruppe erstellen“ im Projekt-Dropdown oben links oder im Dropdown-Menü „Erstellen“ in der rechten Ecke der Projektliste.

Geben Sie einen Namen und ggf. eine Beschreibung für die Projektgruppe ein. Sie können auch wählen, wo Sie die Projektgruppe zuordnen möchten. Sie können sie der Hauptgruppe (der Wurzel des Baums) oder einer bestehenden Projektgruppe als Untergruppe zuordnen.

Erstellen Sie die Projektgruppe, indem Sie auf die Schaltfläche „Speichern“ klicken.

### Ein Projekt einer Projektgruppe zuordnen

Wenn Sie ein neues Projekt erstellen, können Sie im Assistenten „Projekt erstellen“ die Gruppe auswählen, der Sie das neue Projekt zuordnen möchten. Sie können das Projekt später einer anderen Gruppe zuordnen.

Um ein bestehendes Projekt einer Projektgruppe zuzuordnen, gehen Sie zu den [Allgemeinen Einstellungen](./settings#allgemeine-einstellungen) des Projektes und wählen Sie die Gruppe aus, der Sie das Projekt zuordnen möchten.

### Projektgruppe bearbeiten

Um eine Projektgruppe zu bearbeiten, öffnen Sie das Aktions-Dropdown (das mit dem Zahnradsymbol) in der Projektliste und wählen Sie die Funktion „Gruppe bearbeiten“. Bearbeiten Sie die Gruppe wie gewünscht und speichern Sie Ihre Änderungen.

### Projektgruppe löschen

Um eine Projektgruppe zu löschen, öffnen Sie in der Projektliste das Aktions-Dropdown (das mit dem Zahnradsymbol) und wählen Sie die Funktion „Gruppe löschen“. Bestätigen Sie dann, dass Sie die Projektgruppe löschen möchten.

:::info
Alle zugeordneten Untergruppen und Projekte werden der übergeordneten Gruppe zugeordnet. Wenn die zu löschende Gruppe der Hauptgruppe zugeordnet ist, werden alle Untergruppen und Projekte dieser Gruppe der Hauptgruppe zugeordnet.
:::
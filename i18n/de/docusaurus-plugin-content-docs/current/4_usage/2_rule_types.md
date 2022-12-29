---
sidebar_position: 2
sidebar_label: Regelarten
description: mosparo verfügt über verschiedene Regelarten. Hier finden Sie eine Übersicht über alle Regelarten.
---

# Regelarten

mosparo kennt verschiedene Regelarten. Je nach Regelart werden nur gewisse Felder überprüft (zum Beispiel bei URL- oder E-Mail-Feldern). Die Regelart wird vor dem Erstellen einer Regel vom Benutzer ausgewählt. Innerhalb der Regelart kann es mehrere Regeltypen geben.

## Wort

### Normales Wort

Mit dem Regeltyp "Normales Wort" können Sie ein einzelnes Wort, einen Teil eines Wortes oder eine Kombination aus Wörtern definieren. Der eingegebene Wert muss im Formular exakt so vorkommen, damit die Regel gilt. Sie können den Stern (*) als Platzhalter verwenden. Beim Suchen wird automatisch nach *wort* gesucht, dass bedeutet, Sie müssen den Platzhalter vor- und nach dem gesuchten Wort nicht einfügen.

:::note Beispiel
pills<br />
lo*ery
:::

### Regular Expression

Wenn Sie als Regeltyp "RegEx" auswählen, können Sie ein beliebiges Regular Expression Muster definieren, anhand dessen geprüft wird. Bitte füllen Sie das gesamte Regular Expression Muster in das Feld beim Erstellen der Regel. Das Muster muss den Regular Expression Anforderungen von PHP entsprechen.

:::note Beispiel
/(seo|s3o)/i
:::

## E-Mail-Adresse

Mit der Regelart E-Mail-Adresse kann eine E-Mail-Adresse erfasst werden, die nicht in ein E-Mail-Feld eingegeben werden darf.

:::note Beispiel
info@example.com
:::

## Domain

Mit der Regelart Domain kann eine Domain erfasst werden, welche nicht in ein E-Mail- oder URL-Feld eingegeben werden darf.

:::note Beispiel
example.com
:::

## IP-Adresse

### Einzelne IP-Adresse

Mit diese Regeltyp haben Sie die Möglichkeit, eine einzelne IP-Adresse zu erfassen, welche keine Einsendung vornehmen darf.

:::note Beispiel
192.168.10.10

abcd:ef01::1
:::

### Subnetz

Mit dem Regeltyp Subnetz können Sie ein gesamtes Subnetz eingeben, welches keine Einsendung vornehmen darf.

:::note Beispiel
192.168.10.0/24

abcd:ef01::/48
:::

## Website

Mit der Regelart Website kann eine URL zu einer Website angegeben werden, welche in einem URL- oder Freitext-Feld nicht eingegeben werden darf.

:::caution
Es wird empfohlen, Ihre Eingabe mit dem Protokoll oder zwei Slashes für eine Protokoll-unabhängige URL zu starten. Wenn die Eingabe nicht mit dem Protokoll bzw. mindestens mit zwei Slashes startet, könnte die Regel falsche Domains als Spam erkennen.
:::

:::note Beispiel
//example.com/spam/test-form.html
:::

## Anbieter

Um den Anbieter-Regelart verwenden zu können, ist es erforderlich, dass die MindMax GeoLite2 Datenbank konfiguriert ist. Ansonsten hat der Regeltyp keinen Einfluss. Zusätzlich muss bedacht werden, dass für diese Regeltypen keine korrekte Funktionsweise garantiert werden kann. Die Zuordnung von AS Nummer und Land zu einer IP-Adresse können veraltet oder allgemein fehlerhaft sein.

:::info
Bevor Sie die Regelart Anbieter verwenden können, müssen Sie GeoIP2 konfigurieren. Siehe 5.1.3 GeoIP2
:::

### AS Nummer

Mit dem Regeltyp AS Nummer kann eine AS Nummer definiert werden, die nicht erlaubt ist. Falls eine Anfrage von einer IP-Adresse kommt, welche sich zu dieser AS Nummer auflösen lässt, kann der Benutzer seine Anfrage nicht absenden.
:::note Beispiel
123456
:::

### Country

Mit dem Regeltyp Land kann ein Land definiert werden, aus welchem es nicht erlaubt ist, eine Anfrage abzusenden. Geben Sie einen ISO-Ländercode ein, der nicht berechtigt ist, eine Einsendung vorzunehmen. Alle IP-Adressen, welche diesem Ländercode zugeordnet werden, werden blockiert.

:::caution
Wenn Sie ein Land zur Regel hinzufügen, bedeutet das, dass niemand aus diesem Land eine Einsendung machen kann. Auf der einen Seite klingt das gut, auf der anderen Seite könnte diese Regel reale Benutzer davon abhalten, Einsendungen vorzunehmen. Bitte benutzen Sie diese Option vorsichtig. Die genaue Lokalisierung einer IP-Adresse ist nie garantiert.
:::

:::note Beispiel
CH
:::

## User-Agent

### Text

Mit dem Regeltyp "Text" können Sie ein einzelnes Wort, einen Teil eines Wortes oder eine Kombination aus Wörtern definieren. Der eingegebene Wert muss im User-Agent exakt so vorkommen, damit die Regel gilt. Sie können den Stern (*) als Platzhalter verwenden. Beim Suchen wird automatisch nach *wort* gesucht, dass bedeutet, Sie müssen den Platzhalter vor- und nach dem gesuchten Wort nicht einfügen.

:::note Beispiel
Best Browser<br />
Br*ws*r
:::

### Regular Expression

Wenn Sie als Regeltyp "RegEx" auswählen, können Sie ein beliebiges Regular Expression Muster definieren, anhand dessen geprüft wird. Bitte füllen Sie das gesamte Regular Expression Muster in das Feld beim Erstellen der Regel. Das Muster muss den Regular Expression Anforderungen von PHP entsprechen.

:::note Beispiel
/(browser|brows3r)/i
:::

## Unicode-Block

Mit der Regelart Unicode-Block können bestimmte Zeichen aus dem Unicode-Zeichensatz ausgeschlossen werden. Wenn Sie in Ihrem Formular beispielsweise keine Währungszeichen wie € oder £ erlauben wollen, können Sie den Unicode-Block “Währungszeichen” als Regel hinzufügen. Das Absenden des Formulars mit Zeichen aus diesem Block ist damit nicht mehr möglich.

:::note Beispiel
Currency Sign
:::

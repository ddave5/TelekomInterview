# Interjú feladat

## Kérdések

A kérdések válaszai a [feladatok.md](https://github.com/ddave5/TelekomInterview/edit/main/feladatok.md) file-ban találhatóak.

## Applikáció

Az applikáció PostgreSQL adatbázissal, Spring boot backenddel és Angular frontenddel készült el. Jelenleg az backend a 8080-as porton indul el, ha ezt szeretnénk megváltoztatni, akkor a frontend projekt [environments.ts](https://github.com/ddave5/TelekomInterview/blob/main/AngularFrontend/src/environments/environment.ts) fájlját is meg kell változtatni. Az oldal az elvárt funkciókat tartalmazza, több idő esetén még a látványt lehetne átalakítani (például reszponzivitás), illetve egyéb funkciók kialakítását is meg lehetne tenni.

Az indításhoz szükséges parancsok:

#### Spring boot:

A projekt Java 18-at használ, illetve IntelliJ IDEA Ultimate Edition-ben egy new configuration segítségével lehet egy spring boot configuration-t hozzáadni és onnantól indítható is a projekt. Fontos, hogy jelenlegi konfiguráció szerint a 8080-as porton indul!

#### Angular:

A projekt Angular 14-et használ. A frontend indításához be kell lépni a projekt könyvtárába és egy ```ng serve``` parancs segítségével indítható.

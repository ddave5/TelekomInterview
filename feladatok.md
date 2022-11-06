#### Milyen életciklus kampókat (lifecycle hook) ismer? Magyarázza el a használatukat!  
0. constructor: Igazából ez nem Angular, hanem a JavaScript feature. Minden class létrejöttekor ez a függvény fut le elsőnek, viszont nem lehet sem az input dekorációval ellátott változókat, sem bármely gyerek komponens nincs még létrehozva, így leginkább itt service vagy router inicializáláshoz szokták használni.  
1. ngOnChanges: Ez a hook fut le elsőnek a komponens létrejöttekor, illetve lefut minden olyan @Input() dekorációval történt változó változása esetén, amely a komponensben történik. Mivel a komponens létrejöttekor értéket ad ezen változóknak, emiatt fut le az ngOnChanges hamarabb, mint az ngOnInit.  
2. ngOnInit: Ez a hook akkor fut le, miután létre lett hozva a komponens és inicializálva vannak az input property-k. Ez a függvény csak egyszer fut le, a komponens létrejöttekor és ha valamilyen logikát szeretnénk a komponenshez illeszteni, akkor gyakran itt valósítjuk meg (pl.: adatok hívása back-end felől). Viszont itt még olyan változókat, melyek a @ViewChild, @ViewChildren, @ContentChild és @ContentChildren dekorációval vannak ellátva nem érhetőek el.  
3. ngDoCheck: Ez a hook akkor fut le, ha valamilyen event történt a komponens során (pl egy gombnyomás történt). Ez nem jelenti azt, hogy tényleges változás történne a komponensben.  
4. ngAfterContentInit: Ez a hook akkor fut le, mikor a komponens contentje teljesen betöltődött. Mielőtt a hook lefut, előtte a @ContentChild és a @ContentChildren dekorációval ellátott változók inicializálása megtörténik.  
5. ngAfterContentChecked: Ez a hook akkor fut le, mikor olyan változóval történik változás, melyek @ContentChild vagy @ContentChildren dekorációval ellátott változókkal történnek. A különbség ngAfterContentChecked és ngAfterContentInit közt az, hogy az ngAfterContentInit csak egyszer fut le, míg a ngAfterContentChecked minden változás esetén.  
6. ngAfterViewInit: Ez a hook akkor fut le, mikor a komponens view része teljesen betöltődött. Mielőtt a hook lefut, előtte a @ViewChild és a @ViewChildren dekorációval ellátott változók inicializálása megtörténik.  
7. ngAfterViewChecked: Ez a hook akkor fut le, mikor olyan változóval történik változás, melyek @ViewChild vagy @ViewChildren dekorációval ellátott változókkal történnek. A különbség ngAfterViewCheckedés ngAfterViewInit közt az, hogy az ngAfterViewInit csak egyszer fut le, míg a ngAfterViewCheckedminden változás esetén.  
8. ngOnDelete: Ez a hook azelőtt fut le, mielőtt a component a DOM-ból törlődne. Ennek segítségével tudunk egyes cleanup-okat végrehajtani illetve leiratkozni Observable-ről, hogy ne történjen memory leak.  
  
#### Mi az az adatkötés? Milyen típusaik vannak? Adjon példát a használatukra!  
Az adatkötés egy kapcsolat, mely a View réteg és a mögötte található alkalmazást (mi esetünkben TypeScript) között található. Irányuk szerint két fajta adatkötést különböztetünk meg: egyirányú adatkötést, mikor az adat vagy az alkalmazásból megy a DOM-ba vagy fordítva, illetve a kétirányút, mikor mindkét irányba történik az adatok áramoltatása. Ezenkívül fajtáját tekintve 4 különböző adatkötésről beszélhetünk:  
  
1. Beszúrás (Interpolation): Ebben az esetben az adatok az Alkalmazásból mennek a View irányába. Beszúrás esetén a HTML file-ba {{ ... }} -közötti változó értékei lesznek beszúrva. Példa:  
**Book.html**  
```  
<p> {{ title }} </p>.  
```  
**book.component.ts**  
```  
export class BookComponent {  
	title = 'Cím';  
}  
```  
2. Változó alapú kötés (Property binding): Ebben az esetben is az Alkalmazásból mennek a View irányába. Változó alapú kötés esetén a HTML egy tagjének a viselkedését, attribútumának értékét lehet módosítani az Alkalmazásban található változó értékének beállításával. Azokat az attribútumokat, melyeknek az értéke változó alapú kötésben van, [] közé kell tenni. Példa:  
**Book.html**  
```  
<input [disabled] = "isCreate" ... >  
<app-fav-book [book]="selectedBook" ></app-fav-book>  
```  
**book.component.ts**  
```  
export class BookComponent {  
	isCreate = false;  
	book!: Book;  
}  
```  
3. Esemény alapú kötés (Event binding): Ebben az esetben a View réteg irányából érkezik az adat az Alkalmazás felé. Amikor a view rétegben egy esemény megtörténik (például kattintanak egy gombra), akkor a view elküldi az adatokat az alkalmazás felé és ott történik meg a folyamat végrehajtása. Ezen eseményeket () közé tesszük. Példa:  
**Book.html**  
```  
<button (click) = "create()" ... >  
```  
**book.component.ts**  
```  
export class BookComponent {  
	create(): void {  
		console.log('létrehozva');  
	}  
}  
```  
4. Két irányú adatkötés (Two-way data binding): Ebben az esetben az adat mind a View irányából és irányába, mind az alkalmazás irányából és irányába is átadódik. A View és az alkalmazás közt ilyenkor egy folyamatos kapcsolat van és adatváltozás esetén mindkét helyen megtörténik a módosulás. Leginkább formok esetében szokás használni. Ezen eseményeket [()] közé tesszük. Példa:  
**Book.html**  
```  
<input type="text [(ngModel)] ="title" ... >  
```  
**book.component.ts**  
```  
export class BookComponent {  
	title: string = "Throne of Glass";  
}  
```  
  
#### Mi a különbség egy konstruktor és a ngOnInit metódus között?  
A konstruktor egy Javascript feature, az ngOnInit pedig Angular feature. A component osztály létrejöttekor elsőnek a konstruktor fut le, ennek a törzsében található kód fut le, viszont az osztályon belül @Input(), @Output(), stb. dekorációkkal ellátott változók értékeit nem tudja elérni, míg ngOnInit esetében a @Input(), @Output() értékei már elérhetőek. Általánosságban konstruktorban érdemes service, router, stb osztályokat deklarálni, míg a tényleges kezdeti állapot elérését segítő függvényeket (például adatok lekérdezése backendről vagy adat feldolgozása, mely más komponenstől érkezett), az ngOnInit függvényben érdemes kezelni.
  
#### Mi az RxJs?  
RxJs egy javascript library, melynek segítségével tudjuk tudunk aszinkron adathívásokat kezelni. Az adatok egy folyamban érkeznek, ezekre fel- és leiratkozhatunk innen ki tudjuk nyerni a számunkra megfelelő adatokat.
  
#### Mi a különbség egy observable és egy promise között? Adjon példát a használatukra!  
Mindkettő aszinkronikus módon működik, a különbség köztük az események láncolata között van. Promise esetében aszinkron módon történik a függvények meghívása, viszont minden függvény csak akkor hívódik meg, miután a másik befejezte a folyamatát, így egy láncot képezve. Az observable esetében viszont egy folyamra iratkozunk fel, ahonnan kérjük le az adatokat és egyes folyamatok közt nincs egy várakoztatás. Például, szeretnénk egy felhasználónak a github repositorait látni, akkor előbb meg kell szerezni a felhasználónevét (mondjuk adatbázisból), utána kell egy hívást csinálni arra a felhasználónak a github repository-jára és utána tudjuk megszerezni az adott felhasználó publikus repositorait, így ebben az esetben Promise-ra lesz szükség. Viszont ha például egy rest api-n keresztül szeretnénk megszerezni egy felhasználókat tartalmazó listát, akkor egy get kérést kell indítani a megfelelő url-re és fel kell iratkozni arra a csatornára, amely ezt a kérést indította és így tudjuk kinyerni az adatokat, azaz Observable-nak kell lennie.
Példa **Promise**-ra:
```
function loadGithubUser(name: string): Promise<any> {
	return this.httpClient.get(`https://api.github.com/users/${name}`)
	.toPromise()
	.then(response => response.json());
}
function loadAvatar(githubUser): Promise<any> {
	return new Promise ( function( resolve, reject) {
		console.log(githubUser.avatar_url);
	});
}
loadGithubUser('ddave5').then(loadAvatar);
```
Példa **Observable**-re:
```
getAllMovies() : Observable<Movie[]>{
	return  this.http.get<Movie[]>(this.apiUrl + 'movies')
}
	
const movies!: Movie;
fetchData() : void {
	this.movieService.getAllMovies().subscribe( (data) => 
		this.movies = data;
	});
}
```
  
#### Mik az observable létrehozó függvények? Adjon példát a használatukra!
A kérdést pontosan nem értem, emiatt írok inkább az observable-ről. Maga az observable segítségével aszinkron módon tudunk több adatot kezelni. Ha egy esemény megtörténik, akkor arra fel tudunk iratkozni a ```subscribe()```  függvény segítségével, az eseményben kapott adatot pedig a ```pipe()```  függvény segítségével tudjuk manipulálni. Ha egy eseményt már nem akarunk tovább futtatni, mert sikeresen feldolgoztuk, akkor érdemes az ```unsubscribe()```  függvényt meghívni rajta, hogy elkerüljük azt, hogy feleslegesen foglaljon memóriát. Példa observable használatára:
```
getAllMovies() : Observable<Movie[]>{
	return  this.http.get<Movie[]>(this.apiUrl + 'movies')
}

getAllMovies().pipe(
	map((data) => data.value)
).subscribe( (data) => {
	console.log(data);
});
``` 
  
#### Vegyük az alábbi kódrészleteket. Hogyan kell módosítani, hogy reactive form-ot használjon? 
**app.module.ts**
```
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component'; 
import { UserregistrationComponent } from './userregistration/userregistration.component'; @NgModule({ 
	declarations: [ 
		AppComponent, 
		UserregistrationComponent, 
	], 
	imports: [ 
		BrowserModule, 
		AppRoutingModule, 
	], 
	providers: [], 
	bootstrap: [AppComponent] 
}) 
export class AppModule { }
```
**userregistration.component.ts**
``` 
import { Component, OnInit } from '@angular/core'; 
@Component({
	selector: 'app-userregistration',
	templateUrl: './userregistration.component.html',
	styleUrls: ['./userregistration.component.scss'] 
})
export class UserregistrationComponent implements OnInit { 
	constructor() { } 
	ngOnInit(): void { 

	} 
	save(){ 
	} 
}
```

**app.module.ts**
```
import { NgModule } from '@angular/core'; 
import { ReactiveFormsModule } from  '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component'; 
import { UserregistrationComponent } from './userregistration/userregistration.component'; 
@NgModule({ 
	declarations: [ 
		AppComponent, 
		UserregistrationComponent, 
	], 
	imports: [ 
		BrowserModule, 
		AppRoutingModule,
		ReactiveFormsModule
	], 
	providers: [], 
	bootstrap: [AppComponent] 
}) 
export class AppModule { }
```
**userregistration.component.ts**
``` 
import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup } from  '@angular/forms';
@Component({
	selector: 'app-userregistration',
	templateUrl: './userregistration.component.html',
	styleUrls: ['./userregistration.component.scss'] 
})
export class UserregistrationComponent implements OnInit { 
	form!: FormGroup;
	
	constructor() { } 
	
	ngOnInit(): void { 
		this.form = new  FormGroup({
			usname:  new  FormControl(''),
			password:  new  FormControl('')
		});
	} 
	save(){ 
		//Saving logic here
		console.log(this.form.value);
	} 
}
```
## Java kérdések  
  
#### Mit ír ki az alábbi program és miért?  
```  
int x = 3;  
int result = x+++x+++x;  
System.out.println( result );  
```  
A kiértékelés zárójelekkel ha ellátjuk, akkor lehet látni a leginkább a megoldást: ((x++)+(x++))+x.  
1. balról első x++: kiértékeli 3-ra az x-et és növeli az értékét 1-gyel (azaz ezután az x értéke 4 lesz). Legyen a kiértékelt változó y, aminek az értéke így 3.  
2. balról második x++: kiértékeli 4-re az x-et és növeli az értékét 1-gyel (azaz ezután az x értéke 5 lesz). Legyen a kiértékelt változó z, aminek az értéke így 4.  
3. ((x++)+(x++)): aminek akkor az átírása: y + z = 3 + 4 = 7.  
4. ((x++)+(x++))+x: aminek akkor az átírása y + z + x = 3 + 4 + 5 = 12.  
5. Így összegezve x+++x+++x = 12.  
  
#### Mi a szerializáció Java-ban?  
A szerializáció lényege, hogy az osztályokat, a benne található adattal együtt egy byte kóddá lehet alakítani, ezáltal lehetővé téve, hogy az osztályt a tartalmával együtt könnyebben lehessen küldeni a hálózaton keresztül vagy egy osztály tartalmát könnyebben lehessen kiírni fájlba. Megvalósítási módja, hogy az osztályon implementáljuk a Serializable interface-t. Ha egy szerializált osztálynak valamelyik adattagja egy nem primitív adattag, akkor annak az osztálynak is szerializálva kell lennie.
  
#### Mi a különbség az interface és abstract osztály között?  
Az absztrakt osztály olyan osztály, melynek van olyan függvénye, melynek van olyan függvénye, melynek nincs törzse, mivel azt majd az osztályból származó osztályok fogják megvalósítani. Míg az interface egy teljesen absztract osztály. Benne minden függvénynek csak fejléce van és minden változó benne public, static és final. Mivel Java-ban nincs többszörös öröklődés, emiatt mindig csak egy ősosztálya lehet, viszont implementálhat több interface-t is. Például egy abstrakt osztály legyen az Animal osztály. Minden állatnak van szeme, feje, stb. Viszont nincs minden állatnak ugyanannyi lába, így legyen egy függvény, amely a mozgásokért felel egy absztrakt függvény (azaz ne legyen törzse). Ekkor bármelyik osztály, amely öröklődik az Animal osztályból meg kell valósítania a mozgás függvényt. Ilyen cselekvéseket viszont lehet egy interface-ben is összeszedni (milyen hangot adjon ki, mit egyen, stb.). 
#### Hogyan lehet átalakítani a következő függvényt generikusok segítségével, hogy ne csak Long-okat tartalmaző tömböket legyen képes kezelni?  
```  
public List<Long> fromArrayToList(Long[] a) {  
	return Arrays.stream(a).collect(Collectors.toList();  
}  
```  
  
```  
public List<T> fromArrayToList(T[] a) {  
	return Arrays.stream(a).collect(Collectors.toList();  
}  
```  
#### Mi a különbség az == és .equals() között?  
  
== esetén két változó referencia szintű azonosságának ellenőrzése történik, míg .equals() esetén tényleges értékellenőrzés csak. == operátort Immutable osztályoknál érdemes használni, melyek a stack-ben tárolódnak, míg .equals() függvényt Mutable esetében érdemes, melyek értéke a heap-ben tárolódnak. Példa:  
```  
Integer x = new Integer(2); // Immutable  
String b = new String("b"); // Mutable  
System.out.println(x == 2); // return true  
System.out.println(x.equals(2)); // return true  
System.out.println(b == "b"); // return false  
System.out.println(b.equals("b")); // return true  
```  
  
#### Mi a Java Stream API? Hogyan alakítanád át a következő függvényt, hogy Stream API-t használjon?  
```  
public static String myConcat(Integer[] a) {  
	StringBuilder sb = new StringBuilder();  
	for (int value: a) {  
		sb.append(value);  
		sb.append(",");  
	}  
	return sb.toString();  
}  
```  
  
A Java Stream API segítségével egyes collection-ben (Set, List, Map, stb.) tárolt objektumok feldolgozásáért felel. Stream segítségével pipeline-osított keretek között tudjuk az adatot feldolgozni és visszaadni azt, amit az üzleti logika igényel. A Stream során az eredeti adatstruktúra adatai nem változnak, és minden Stream-ben használt függvény (map, filter, stb) stream-mel tér vissza, a pipeline-osítás segítése végett.  
  
```  
public static String myConcat(Integer[] a) {  
	return Arrays
		.stream(a)
		.map(Object::toString)  
		.collect(Collectors.joining(", "));  
}  
```

#### Vegyük az alábbi osztályokat. Hogyan módosítsuk az Employee osztályt, hogy a Main osztályban lévő equals metódus kimenete Ugyanaz a személy! legyen.

**Employee osztály:**
```
public class Employee { 
	private int id; 
	private String firstName; 
	private String lastName; 	
	public Employee(int id, String firstName, String lastName) { 
		this.id = id; 
		this.firstName = firstName; 
		this.lastName = lastName; 
	} 
}
```
**Main osztály:**
```
public class Main { 
	public static void main(String[] args) { 
		Employee employee = new Employee(1,"John", "Doe"); 
		Employee employee2 = new Employee(1,"John", "Doe"); 
		if(employee.equals(employee2)){ 
			System.out.println("Ugyanaz a személy!"); 
		} else { 
			System.out.println("Két különböző személy."); 
		} 
	} 
}
```

Felül kell írni az Employee osztály equals függvényét az alábbi módon:
```
@Override  
public boolean equals(Object o) {  
	if (this == o) return true;  
	if (o == null || getClass() != o.getClass()) return false;  
	Employee employee = (Employee) o;  
	return id == employee.id && Objects.equals(firstName, employee.firstName) && Objects.equals(lastName, employee.lastName);  
}
```

#### Milyen �letciklus kamp�kat (lifecycle hook) ismer? Magyar�zza el a haszn�latukat!  
0. constructor: Igaz�b�l ez nem Angular, hanem a JavaScript feature. Minden class l�trej�ttekor ez a f�ggv�ny fut le els�nek, viszont nem lehet sem az input dekor�ci�val ell�tott v�ltoz�kat, sem b�rmely gyerek komponens nincs m�g l�trehozva, �gy legink�bb itt service vagy router inicializ�l�shoz szokt�k haszn�lni.  
1. ngOnChanges: Ez a hook fut le els�nek a komponens l�trej�ttekor, illetve lefut minden olyan @Input() dekor�ci�val t�rt�nt v�ltoz� v�ltoz�sa eset�n, amely a komponensben t�rt�nik. Mivel a komponens l�trej�ttekor �rt�ket ad ezen v�ltoz�knak, emiatt fut le az ngOnChanges hamarabb, mint az ngOnInit.  
2. ngOnInit: Ez a hook akkor fut le, miut�n l�tre lett hozva a komponens �s inicializ�lva vannak az input property-k. Ez a f�ggv�ny csak egyszer fut le, a komponens l�trej�ttekor �s ha valamilyen logik�t szeretn�nk a komponenshez illeszteni, akkor gyakran itt val�s�tjuk meg (pl.: adatok h�v�sa back-end fel�l). Viszont itt m�g olyan v�ltoz�kat, melyek a @ViewChild, @ViewChildren, @ContentChild �s @ContentChildren dekor�ci�val vannak ell�tva nem �rhet�ek el.  
3. ngDoCheck: Ez a hook akkor fut le, ha valamilyen event t�rt�nt a komponens sor�n (pl egy gombnyom�s t�rt�nt). Ez nem jelenti azt, hogy t�nyleges v�ltoz�s t�rt�nne a komponensben.  
4. ngAfterContentInit: Ez a hook akkor fut le, mikor a komponens contentje teljesen bet�lt�d�tt. Miel�tt a hook lefut, el�tte a @ContentChild �s a @ContentChildren dekor�ci�val ell�tott v�ltoz�k inicializ�l�sa megt�rt�nik.  
5. ngAfterContentChecked: Ez a hook akkor fut le, mikor olyan v�ltoz�val t�rt�nik v�ltoz�s, melyek @ContentChild vagy @ContentChildren dekor�ci�val ell�tott v�ltoz�kkal t�rt�nnek. A k�l�nbs�g ngAfterContentChecked �s ngAfterContentInit k�zt az, hogy az ngAfterContentInit csak egyszer fut le, m�g a ngAfterContentChecked minden v�ltoz�s eset�n.  
6. ngAfterViewInit: Ez a hook akkor fut le, mikor a komponens view r�sze teljesen bet�lt�d�tt. Miel�tt a hook lefut, el�tte a @ViewChild �s a @ViewChildren dekor�ci�val ell�tott v�ltoz�k inicializ�l�sa megt�rt�nik.  
7. ngAfterViewChecked: Ez a hook akkor fut le, mikor olyan v�ltoz�val t�rt�nik v�ltoz�s, melyek @ViewChild vagy @ViewChildren dekor�ci�val ell�tott v�ltoz�kkal t�rt�nnek. A k�l�nbs�g ngAfterViewChecked�s ngAfterViewInit k�zt az, hogy az ngAfterViewInit csak egyszer fut le, m�g a ngAfterViewCheckedminden v�ltoz�s eset�n.  
8. ngOnDelete: Ez a hook azel�tt fut le, miel�tt a component a DOM-b�l t�rl�dne. Ennek seg�ts�g�vel tudunk egyes cleanup-okat v�grehajtani illetve leiratkozni Observable-r�l, hogy ne t�rt�njen memory leak.  
  
#### Mi az az adatk�t�s? Milyen t�pusaik vannak? Adjon p�ld�t a haszn�latukra!  
Az adatk�t�s egy kapcsolat, mely a View r�teg �s a m�g�tte tal�lhat� alkalmaz�st (mi eset�nkben TypeScript) k�z�tt tal�lhat�. Ir�nyuk szerint k�t fajta adatk�t�st k�l�nb�ztet�nk meg: egyir�ny� adatk�t�st, mikor az adat vagy az alkalmaz�sb�l megy a DOM-ba vagy ford�tva, illetve a k�tir�ny�t, mikor mindk�t ir�nyba t�rt�nik az adatok �ramoltat�sa. Ezenk�v�l fajt�j�t tekintve 4 k�l�nb�z� adatk�t�sr�l besz�lhet�nk:  
  
1. Besz�r�s (Interpolation): Ebben az esetben az adatok az Alkalmaz�sb�l mennek a View ir�ny�ba. Besz�r�s eset�n a HTML file-ba {{ ... }} -k�z�tti v�ltoz� �rt�kei lesznek besz�rva. P�lda:  
**Book.html**  
```  
<p> {{ title }} </p>.  
```  
**book.component.ts**  
```  
export class BookComponent {  
title = 'C�m';  
}  
```  
2. V�ltoz� alap� k�t�s (Property binding): Ebben az esetben is az Alkalmaz�sb�l mennek a View ir�ny�ba. V�ltoz� alap� k�t�s eset�n a HTML egy tagj�nek a viselked�s�t, attrib�tum�nak �rt�k�t lehet m�dos�tani az Alkalmaz�sban tal�lhat� v�ltoz� �rt�k�nek be�ll�t�s�val. Azokat az attrib�tumokat, melyeknek az �rt�ke v�ltoz� alap� k�t�sben van, [] k�z� kell tenni. P�lda:  
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
3. Esem�ny alap� k�t�s (Event binding): Ebben az esetben a View r�teg ir�ny�b�l �rkezik az adat az Alkalmaz�s fel�. Amikor a view r�tegben egy esem�ny megt�rt�nik (p�ld�ul kattintanak egy gombra), akkor a view elk�ldi az adatokat az alkalmaz�s fel� �s ott t�rt�nik meg a folyamat v�grehajt�sa. Ezen esem�nyeket () k�z� tessz�k. P�lda:  
**Book.html**  
```  
<button (click) = "create()" ... >  
```  
**book.component.ts**  
```  
export class BookComponent {  
create(): void {  
console.log('l�trehozva');  
}  
}  
```  
4. K�t ir�ny� adatk�t�s (Two-way data binding): Ebben az esetben az adat mind a View ir�ny�b�l �s ir�ny�ba, mind az alkalmaz�s ir�ny�b�l �s ir�ny�ba is �tad�dik. A View �s az alkalmaz�s k�zt ilyenkor egy folyamatos kapcsolat van �s adatv�ltoz�s eset�n mindk�t helyen megt�rt�nik a m�dosul�s. Legink�bb formok eset�ben szok�s haszn�lni. Ezen esem�nyeket [()] k�z� tessz�k. P�lda:  
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
  
#### Mi a k�l�nbs�g egy konstruktor �s a ngOnInit met�dus k�z�tt?  
A konstruktor egy Javascript feature, az ngOnInit pedig Angular feature. A component oszt�ly l�trej�ttekor els�nek a konstruktor fut le, ennek a t�rzs�ben tal�lhat� k�d fut le, viszont az oszt�lyon bel�l @Input(), @Output(), stb. dekor�ci�kkal ell�tott v�ltoz�k �rt�keit nem tudja el�rni, m�g ngOnInit eset�ben a @Input(), @Output() �rt�kei m�r el�rhet�ek. �ltal�noss�gban konstruktorban �rdemes service, router, stb oszt�lyokat deklar�lni, m�g a t�nyleges kezdeti �llapot el�r�s�t seg�t� f�ggv�nyeket (p�ld�ul adatok lek�rdez�se backendr�l vagy adat feldolgoz�sa, mely m�s komponenst�l �rkezett), az ngOnInit f�ggv�nyben �rdemes kezelni.
  
#### Mi az RxJs?  
RxJs egy javascript library, melynek seg�ts�g�vel tudjuk tudunk aszinkron adath�v�sokat kezelni. Az adatok egy folyamban �rkeznek, ezekre fel- �s leiratkozhatunk innen ki tudjuk nyerni a sz�munkra megfelel� adatokat.
  
#### Mi a k�l�nbs�g egy observable �s egy promise k�z�tt? Adjon p�ld�t a haszn�latukra!  
Mindkett� aszinkronikus m�don m�k�dik, a k�l�nbs�g k�zt�k az esem�nyek l�ncolata k�z�tt van. Promise eset�ben aszinkron m�don t�rt�nik a f�ggv�nyek megh�v�sa, viszont minden f�ggv�ny csak akkor h�v�dik meg, miut�n a m�sik befejezte a folyamat�t, �gy egy l�ncot k�pezve. Az observable eset�ben viszont egy folyamra iratkozunk fel, ahonnan k�rj�k le az adatokat �s egyes folyamatok k�zt nincs egy v�rakoztat�s. P�ld�ul, szeretn�nk egy felhaszn�l�nak a github repositorait l�tni, akkor el�bb meg kell szerezni a felhaszn�l�nev�t (mondjuk adatb�zisb�l), ut�na kell egy h�v�st csin�lni arra a felhaszn�l�nak a github repository-j�ra �s ut�na tudjuk megszerezni az adott felhaszn�l� publikus repositorait, �gy ebben az esetben Promise-ra lesz sz�ks�g. Viszont ha p�ld�ul egy rest api-n kereszt�l szeretn�nk megszerezni egy felhaszn�l�kat tartalmaz� list�t, akkor egy get k�r�st kell ind�tani a megfelel� url-re �s fel kell iratkozni arra a csatorn�ra, amely ezt a k�r�st ind�totta �s �gy tudjuk kinyerni az adatokat, azaz Observable-nak kell lennie.
P�lda **Promise**-ra:
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
P�lda **Observable**-re:
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
  
#### Mik az observable l�trehoz� f�ggv�nyek? Adjon p�ld�t a haszn�latukra!  
  
#### Vegy�k az al�bbi k�dr�szleteket. Hogyan kell m�dos�tani, hogy reactive form-ot haszn�ljon? 
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
## Java k�rd�sek  
  
#### Mit �r ki az al�bbi program �s mi�rt?  
```  
int x = 3;  
int result = x+++x+++x;  
System.out.println( result );  
```  
A ki�rt�kel�s z�r�jelekkel ha ell�tjuk, akkor lehet l�tni a legink�bb a megold�st: ((x++)+(x++))+x.  
1. balr�l els� x++: ki�rt�keli 3-ra az x-et �s n�veli az �rt�k�t 1-gyel (azaz ezut�n az x �rt�ke 4 lesz). Legyen a ki�rt�kelt v�ltoz� y, aminek az �rt�ke �gy 3.  
2. balr�l m�sodik x++: ki�rt�keli 4-re az x-et �s n�veli az �rt�k�t 1-gyel (azaz ezut�n az x �rt�ke 5 lesz). Legyen a ki�rt�kelt v�ltoz� z, aminek az �rt�ke �gy 4.  
3. ((x++)+(x++)): aminek akkor az �t�r�sa: y + z = 3 + 4 = 7.  
4. ((x++)+(x++))+x: aminek akkor az �t�r�sa y + z + x = 3 + 4 + 5 = 12.  
5. �gy �sszegezve x+++x+++x = 12.  
  
#### Mi a szerializ�ci� Java-ban?  
A szerializ�ci� l�nyege, hogy az oszt�lyokat, a benne tal�lhat� adattal egy�tt egy byte k�dd� lehet alak�tani, ez�ltal lehet�v� t�ve, hogy az oszt�lyt a tartalm�val egy�tt k�nnyebben lehessen k�ldeni a h�l�zaton kereszt�l vagy egy oszt�ly tartalm�t k�nnyebben lehessen ki�rni f�jlba. Megval�s�t�si m�dja, hogy az oszt�lyon implement�ljuk a Serializable interface-t. Ha egy szerializ�lt oszt�lynak valamelyik adattagja egy nem primit�v adattag, akkor annak az oszt�lynak is szerializ�lva kell lennie.
  
#### Mi a k�l�nbs�g az interface �s abstract oszt�ly k�z�tt?  
Az absztrakt oszt�ly olyan oszt�ly, melynek van olyan f�ggv�nye, melynek van olyan f�ggv�nye, melynek nincs t�rzse, mivel azt majd az oszt�lyb�l sz�rmaz� oszt�lyok fogj�k megval�s�tani. M�g az interface egy teljesen absztract oszt�ly. Benne minden f�ggv�nynek csak fejl�ce van �s minden v�ltoz� benne public, static �s final. Mivel Java-ban nincs t�bbsz�r�s �r�kl�d�s, emiatt mindig csak egy �soszt�lya lehet, viszont implement�lhat t�bb interface-t is. P�ld�ul egy abstrakt oszt�ly legyen az Animal oszt�ly. Minden �llatnak van szeme, feje, stb. Viszont nincs minden �llatnak ugyanannyi l�ba, �gy legyen egy f�ggv�ny, amely a mozg�sok�rt felel egy absztrakt f�ggv�ny (azaz ne legyen t�rzse). Ekkor b�rmelyik oszt�ly, amely �r�kl�dik az Animal oszt�lyb�l meg kell val�s�tania a mozg�s f�ggv�nyt. Ilyen cselekv�seket viszont lehet egy interface-ben is �sszeszedni (milyen hangot adjon ki, mit egyen, stb.). 
#### Hogyan lehet �talak�tani a k�vetkez� f�ggv�nyt generikusok seg�ts�g�vel, hogy ne csak Long-okat tartalmaz� t�mb�ket legyen k�pes kezelni?  
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
#### Mi a k�l�nbs�g az == �s .equals() k�z�tt?  
  
== eset�n k�t v�ltoz� referencia szint� azonoss�g�nak ellen�rz�se t�rt�nik, m�g .equals() eset�n t�nyleges �rt�kellen�rz�s csak. == oper�tort Immutable oszt�lyokn�l �rdemes haszn�lni, melyek a stack-ben t�rol�dnak, m�g .equals() f�ggv�nyt Mutable eset�ben �rdemes, melyek �rt�ke a heap-ben t�rol�dnak. P�lda:  
```  
Integer x = new Integer(2); // Immutable  
String b = new String("b"); // Mutable  
System.out.println(x == 2); // return true  
System.out.println(x.equals(2)); // return true  
System.out.println(b == "b"); // return false  
System.out.println(b.equals("b")); // return true  
```  
  
#### Mi a Java Stream API? Hogyan alak�tan�d �t a k�vetkez� f�ggv�nyt, hogy Stream API-t haszn�ljon?  
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
  
A Java Stream API seg�ts�g�vel egyes collection-ben (Set, List, Map, stb.) t�rolt objektumok feldolgoz�s��rt felel. Stream seg�ts�g�vel pipeline-os�tott keretek k�z�tt tudjuk az adatot feldolgozni �s visszaadni azt, amit az �zleti logika ig�nyel. A Stream sor�n az eredeti adatstrukt�ra adatai nem v�ltoznak, �s minden Stream-ben haszn�lt f�ggv�ny (map, filter, stb) stream-mel t�r vissza, a pipeline-os�t�s seg�t�se v�gett.  
  
```  
public static String myConcat(Integer[] a) {  
return Arrays.stream(a).map(Object::toString)  
.collect(Collectors.joining(", "));  
}  
```

#### Vegy�k az al�bbi oszt�lyokat. Hogyan m�dos�tsuk az Employee oszt�lyt, hogy a Main oszt�lyban l�v� equals met�dus kimenete �Ugyanaz a szem�ly!� legyen.

**Employee oszt�ly:**
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
**Main oszt�ly:**
```
	public class Main { 
		public static void main(String[] args) { 
			Employee employee = new Employee(1,"John", "Doe"); 
			Employee employee2 = new Employee(1,"John", "Doe"); 
			if(employee.equals(employee2)){ 
				System.out.println("Ugyanaz a szem�ly!"); 
			} else { 
			System.out.println("K�t k�l�nb�z� szem�ly."); 
			} 
		} 
	}
```

Fel�l kell �rni az Employee oszt�ly equals f�ggv�ny�t az al�bbi m�don:
```
	@Override  
	public boolean equals(Object o) {  
	    if (this == o) return true;  
		if (o == null || getClass() != o.getClass()) return false;  
		Employee employee = (Employee) o;  
		return id == employee.id && Objects.equals(firstName, employee.firstName) && Objects.equals(lastName, employee.lastName);  
}
```
A kész feladat feltöltésének helye:
Repo: str-hgk-sajat-munka

Almappa: mongo-feladat-04

## Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing

Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.

0.1. Használjuk a videoStore adatbázist!
```
use videoStore
```

0.2. Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:


- _id: kötelező megadni és csak egész számokból (integer) állhat
- 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
- 'movies' mező: 'array' lehet és kötelező megadni
- 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)
```
db.createCollection("cinemas", {
 validator: {
   $jsonSchema: {
     required: ["_id", "name", "movies", "address"],
     properties: {
        _id: {bsonType: "int"},
        name: {bsonType: "string", pattern: "^([a-zA-Z0-9]+( [a-zA-Z0-9]+)+)$"},
        movies: {bsonType: "array"},
        address: {bsonType: "object"}
        }
     }
 }
 })
```

1. Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!
```
db.cinemas.insertOne({ 
  _id: NumberInt(11), 
  name: "AquaCinema Kisvarda", 
  movies: [
    ObjectId("60f2f267b565d48aad003969"), 
    ObjectId("60f2f281b565d48aad00396a"), 
    ObjectId("60f2f29bb565d48aad00396b")
    ],
  address: {city: "Kisvarda"} 
  })
```
```
db.cinemas.insertMany([ {
  _id: NumberInt(22), 
  name: "Campona Cinema Budafok", 
  movies: [
    ObjectId("60f2f119b565d48aad003966"), 
    ObjectId("60f2f1f4b565d48aad003967"), 
    ObjectId("60f2f215b565d48aad003968")
    ],
  address: {city: "Budapest"} 
  }, 
  {
_id: NumberInt(33), 
  name: "CineTrip Movie Theater Eger", 
  movies: [
    ObjectId("60f2f2fab565d48aad00396c"), 
    ObjectId("60f2f31fb565d48aad00396d"), 
    ObjectId("60f2f35db565d48aad00396e")
    ],
  address: {city: "Eger"} 
  }
])
```

2. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!
```
db.cinemas.aggregate([ {$match: { _id: 11 }}, 
{     
  $lookup:        
    {
      from: "movies",         
      localField: "movies",   
      foreignField: "_id",
      as: "movies"       
    } 
} 
]).pretty()
```

3. Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!
```
db.cinemas.aggregate([ 
  {$match: { _id: 11 }}, 
  {$project: {_id: 0, movies: 1}}, 
  {     
    $lookup:        
    {        
      from: "movies",         
      localField: "movies",          
      foreignField: "_id",          
      as: "movies"       
    }  
  } 
]).pretty()
```

4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.
```
db.directors.find()
```


5. Kérdezzük le az egyik rendező által rendezett filmek adatait!
```
db.directors.aggregate([ 
  {$match: { name: "James Cameron" }}, 
  {$project: {_id: 0, movies: 1}}, 
  {     
    $lookup:        
    {       
      from: "movies",         
      localField: "movies",          
      foreignField: "_id",          
      as: "movies"       
    }  
  } 
]).pretty()
```

6. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!

```
db.directors.aggregate([ 
  {$match: { name: "Clint Eastwood" }}, 
  {$project: {_id: 0, name: 1, movies: 1}}, 
  {     
    $lookup:        
    {       
      from: "movies",         
      localField: "movies",          
      foreignField: "_id",          
      as: "movies"       
    }
  },
]).pretty()
```


7. Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!
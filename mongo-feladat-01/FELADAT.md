A kész feladat feltöltésének helye:
Repo: str-hgk-sajat-munka

Almappa: mongo-feladat-01



## MongoDB alapfeladatok terminálban (Mongo shell-ben)

Elsőként olvasd végig az összes pontot!

- Készíts egy videoStore nevű MongoDB adatbázist!
```
use videoStore
```
- Hozz létre benne egy movies listát!
```
db.movies.save({ title: "<title>", category: "<category>", director: "<director>"})
```
- Ments el benne 10 új filmet (save()) a következő mezőkkel:
  - _id: legyen generált, ObjectId
  - title: egy-egy kedvenc film címe, szöveges tartalom
  - category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
  - director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron
```
db.movies.save({ title: "<title>", category: "<category>", director: "<director>"})
```

- Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!
```
db.movies.updateMany({}, {$set:{ratings:[]}})
```
- Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!
```
db.movies.update({title: "<title>"}, {$push: {ratings: <ratings>}})
```
- Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!
```
db.movies.updateMany({}, {$set:{releaseYear: 2000}})   
```
- Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!
```
db.movies.updateMany( {category: "action"}, [{$set: {category: {$toUpper: "$category"} }}] )

db.movies.updateMany( {category: "romantic"}, {$set: {category:"ROMANTIC"}} )    

db.movies.updateMany( {category: "fantasy"}, [{$set: {category:{$toUpper: "$category"}}}] )
```

Tipp: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )

## RESULT: 

```
{ "_id" : ObjectId("60f2f119b565d48aad003966"), "title" : "Die Hard I.", "category" : "ACTION", "director" : "James 
Cameron", "ratings" : [ ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f1f4b565d48aad003967"), "title" : "Die Hard II.", "category" : "ACTION", "director" : "Clint Eastwood", "ratings" : [ ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f215b565d48aad003968"), "title" : "Die Hard III.", "category" : "ACTION", "director" : "Steven Spielberg", "ratings" : [ ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f267b565d48aad003969"), "title" : "Avatar I.", "category" : "FANTASY", "director" : "Steven 
Spielberg", "ratings" : [ 5, 5 ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f281b565d48aad00396a"), "title" : "Avatar II.", "category" : "FANTASY", "director" : "James 
Cameron", "ratings" : [ ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f29bb565d48aad00396b"), "title" : "Avatar III.", "category" : "FANTASY", "director" : "Clint Eastwood", "ratings" : [ ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f2fab565d48aad00396c"), "title" : "Love Is All Around", "category" : "ROMANTIC", "director" 
: "Clint Eastwood", "ratings" : [ ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f31fb565d48aad00396d"), "title" : "East of Eden", "category" : "ROMANTIC", "director" : "James Cameron", "ratings" : [ 4, 3 ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f35db565d48aad00396e"), "title" : "Love Story", "category" : "ROMANTIC", "director" : "Steven Spielberg", "ratings" : [ 5, 4 ], "releaseYear" : 2000 }
{ "_id" : ObjectId("60f2f381b565d48aad00396f"), "title" : "Conspiracy Theory", "category" : "ACTION", "director" : "Steven Spielberg", "ratings" : [ ], "releaseYear" : 2000 }
```
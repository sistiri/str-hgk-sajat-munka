Repo: str-hgk-sajat-munka

Almappa: mongo-feladat-02

A videoStore feladat folytatása (update, find, projection)

Normalization elve: Csak a közvetlen összetartozó elemeket tároljuk egy táblázatban (listában). Minél összetettebb egy adat (több tulajdonsággal rendelkezhet, pl.: rendezőnek lehet neve, díjai, filmjei, születési adatai), annál inkább külön listába kell kiszervezni a tárolását.

1. Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!
```
db.directors.insertOne({_id: 1, name: "Steven Spielberg", birthYear: 1946, movies: []})
```
2. Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:
"_id": egész szám 1-estől indulva
"name": Steven Spielberg, Clint Eastwood, James Cameron
"birthYear": születési év (tetszőlegesen megadott egész szám)
"movies": kezdetben egy üres lista
```
db.directors.insertOne({_id: 2, name: "Clint Eastwood", birthYear: 1930, movies: []})
db.directors.insertOne({_id: 3, name: "James Cameron", birthYear: 1954, movies: []}) 

```
4. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés:

```
db.directors.update({_id:3}, {$push: {movies: ObjectId("60f2f119b565d48aad003966") }})
db.directors.update({_id:3}, {$push: {movies: ObjectId("60f2f281b565d48aad00396a") }}) 
db.directors.update({_id:3}, {$push: {movies: ObjectId("60f2f31fb565d48aad00396d") }}) 

db.directors.update({name: "Clint Eastwood"}, {$push: 
  {movies: 
    {$each: [
      ObjectId("60f2f1f4b565d48aad003967"), 
      ObjectId("60f2f29bb565d48aad00396b"), 
      ObjectId("60f2f2fab565d48aad00396c")
      ]
    } 
  }})

db.directors.update({name: "Steven Spielberg"}, {$push: 
  {movies: 
    {$each: [
      ObjectId("60f2f215b565d48aad003968"), 
      ObjectId("60f2f267b565d48aad003969"), 
      ObjectId("60f2f35db565d48aad00396e"),
      ObjectId("60f2f381b565d48aad00396f")
      ]
    } 
  }})

```

5. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)! Ehhez hasonló eredményt kell látnod:
```
db.movies.find().pretty()   
```

6. Ha elkészültél a rendezői listával, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.
```
db.movies.updateMany({}, {$unset: {director:''}})
```
7. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)
```
db.movies.find({releaseYear: {$lt: 2000}})
db.movies.find({releaseYear: {$gt: 2000}})
```

8. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)
```
db.movies.find({ $and: [
  {releaseYear: {$gt: 2000}}, 
  {releaseYear: {$lt: 2010}}
  ]}) 

```

9. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!
```
db.movies.find({releaseYear: {$lt: 2001}, category: "ROMANTIC"})
```
10. Kérdezd le a filmeket, amelyeknek a kategóriája NEM FANTASY ($ne)!
```
db.movies.find( { category: {$ne:  "FANTASY" } })
```

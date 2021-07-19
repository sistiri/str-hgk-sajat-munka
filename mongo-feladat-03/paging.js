(function paging () {
  const moviesCount = db.movies.count()

  const SortedTitleCategoryArray = db.movies.find({}, { _id: 0, title: 1, category: 1 }).sort({ _id: 1 }).toArray()

  for (let i = 0; i < moviesCount; i += 3) {
    const moviesPerPage = [SortedTitleCategoryArray[i], SortedTitleCategoryArray[i + 1], SortedTitleCategoryArray[i + 2]]

    moviesPerPage.forEach(function (movie) {
      if (movie) {
        print(movie.title + ': ' + movie.category.toLowerCase() + ' movie')
      } else {
        return true
      }
    })

    print('-- page over --')
  }
})()

//

//

//

/*
db.movies.find({}, { _id: 0, title: 1, category: 1 }).sort({ _id: 1 }).toArray().forEach(function (data) { print(data.title + ': ' + data.category.toLowerCase() + ' movie') })
*/

// SortedTitleCategoryArray.forEach(function (data) { print(data.title + ': ' + data.category.toLowerCase() + ' movie') })

/////////////////////////////
// -- CARGA DE COMICS --  //
///////////////////////////
const loadComics = async (orderBy) => {

    const params = new URLSearchParams(window.location.search) //define valores de la url
    const comicsResponse = await getComics(0 , orderBy || 'title')
    const data = comicsResponse.data
    const comics = data.results

    const results = document.getElementById('comics-results');
    const container = document.createElement('div')
    const row = document.createElement('div')
    results.innerHTML = ""

    results.appendChild(container)
    container.appendChild(row)

    

    comics.forEach(comic => {

        const card = document.createElement('div')
        const cardImg = document.createElement('img')
        const cardBody = document.createElement('div')
        const col = document.createElement('div')
        const title = document.createElement('h4')

        const titleText= document.createTextNode(comic.title)
        
        card.appendChild(cardImg)
        card.appendChild(cardBody)
        col.appendChild(card)
        card.appendChild(titleText)

        container.classList.add('container')
        row.classList.add('row')
        card.classList.add('card')
        cardImg.classList.add('card-img-top')
        cardBody.classList.add('card-body')
        col.classList.add('col-md-3')
        title.classList.add('h5')

        row.appendChild(col)

        cardImg.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`)

    });
}

// loadComics()


/////////////////////////////////
// -- CARGA DE PERSONAJES --  //
///////////////////////////////
const loadCharacters = async (orderBy) => {
    const charactersResponse = await getCharacters(orderBy)
    const data = charactersResponse.data
    const characters = data.results
    
    const results = document.getElementById('characters-results')
    const container = document.createElement('div')
    const row = document.createElement('div')

    results.appendChild(container)
    container.appendChild(row)

    characters.forEach(character => {

        const card = document.createElement('div')
        const cardImg = document.createElement('img')
        const cardBody = document.createElement('div')
        const col = document.createElement('div')
        const title = document.createElement('h4')

        const titleText= document.createTextNode(character.name)
        
        card.appendChild(cardImg)
        card.appendChild(cardBody)
        col.appendChild(card)
        card.appendChild(titleText)

        container.classList.add('container')
        row.classList.add('row')
        card.classList.add('card')
        cardImg.classList.add('card-img-top')
        cardBody.classList.add('card-body')
        col.classList.add('col-md-3')
        title.classList.add('h5')

        row.appendChild(col)

        cardImg.setAttribute('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)

    });
}




////////////////////////////////////
// -- FORMULARIO DE BÚSQUEDA --  //
//////////////////////////////////
const formSearch = document.getElementById('search-comic')
const resultsComic = document.getElementById('comics-results')
const resultsCharacter = document.getElementById('characters-results')

formSearch.addEventListener('submit', (e) => {
    e.preventDefault()

    const orderBy = e.target["control-order-by"].value
    const type = e.target["search-type"].value


    if(type === 'comics'){
        loadComics(orderBy)
        resultsCharacter.classList.add('d-none')
        resultsComic.classList.remove('d-none')
    } else if (type === 'personajes'){
        loadCharacters('-name')
        resultsComic.classList.add('d-none')
        resultsCharacter.classList.remove('d-none')
    }


})

/*

  const params = new URLSearchParams(window.location.search)

    params.set('orderBy', orderBy)

    params.set('offset', 20)

    window.location.href = window.location.pathname + '?' + params.toString()

*/
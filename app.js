const searchType = document.getElementById("search-type")
const results = document.getElementById("results")
const resultsNumbers = document.querySelector('#results-numbers')
const comicCover = document.querySelector('.comic-cover')
const comicTitle = document.querySelector('.comic-title')
const comicPublished = document.querySelector('.comic-published')
const comicWriters = document.querySelector('.comic-writers')
const comicDescription = document.querySelector('.comic-description')
const comicSection = document.querySelector('.comic-section')


const apiPublic = 'fca344d9b053eb0626fd93234dd00258';
const apiPrivate = 'f820b07cc07c9d1207856b4b709d34310c4456ab';


const baseUrl = 'http://gateway.marvel.com/v1/public/';
let offset =0;
let resultsCount = 0;


const getSearchParams = (isSearch) => {
    let searchParams =`?apikey=${apiPublic}&offset=${offset}` 

    if(!isSearch){
        return searchParams
    }  
  return searchParams
}

//////////////////////////////////

const getApiUrl = (resourse, resourseId, subResourse) => {
    const isSearch = !resourseId && !subResourse;
    let url = `${baseUrl}${resourse}`

    if(resourseId){
        url += `/${resourseId}`
    }

    if(subResourse){
        url +=`/${subResourse}` 
    }

    url += getSearchParams(isSearch)
    return url
}

getApiUrl('comics')

//////////////////////////////////

const fetchUrl = async url => {
    const response = await fetch(url)
    const json = await response.json();
    return json
}

//////////////////////////////////

const fetchComics = async () => {
    const {data : {results, total}}  = await fetchUrl(getApiUrl('comics'))
    printComics(results)
    updateResultsCount(total)
}


const updateResultsCount = count => {
    resultsNumbers.innerHTML = `${count} RESULTADOS`
    resultsCount = count;
}



const printComics = comics => {
    for (const comic of comics) {
        const comicCard = document.createElement('div')
        comicCard.classList.add('d-flex')
        comicCard.onclick = () => {
            fetchComic(comic.id)
        }
        comicCard.innerHTML = `
        <div class="card" style="width: 13rem;">
            <img src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" class="card-img-top" alt="${comic.title}">
            <div class="card-body">
                <p class="card-text">${comic.title}</p>
            </div>
        </div>
        `
        results.append(comicCard)
    }
    }

   
const fetchComic = async comicId => {
    const {data : {results : [comic]}} = await fetchUrl(getApiUrl('comics', comicId))
const coverPath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
const releaseDate = new Intl.DateTimeFormat('es-AR').format(
    new Date(comic.dates.find(date => date.type === 'onsaleDate').date)
    
)
const writers = comic.creators.items
.filter(creator => creator.role === 'writer')
.map(creator => creator.name)
.join(', ')
    updateComicDetails(coverPath, comic.title, releaseDate, writers, comic.description)
    showComicDetails()
}

const updateComicDetails = (img, title, releaseDate, writers, description) => {
    comicCover.src = img;
    comicTitle.innerHTML = title;
    comicPublished.innerHTML = releaseDate;
    comicWriters.innerHTML = writers;
    comicDescription.innerHTML = description;

}

const showComicDetails = () => {
    comicSection.classList.remove('d-none')
}

//////////////////////////////////

const search = () => {
    if(searchType.value === 'comics'){
        fetchComics()
  }
}

//////////////////////////////////

const inicio = () => {
  search()
}

window.onload = inicio

getSearchParams()
  

/*

*/
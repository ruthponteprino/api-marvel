const searchType = document.getElementById("search-type")

const apiPublic = 'fca344d9b053eb0626fd93234dd00258';
const apiPrivate = 'f820b07cc07c9d1207856b4b709d34310c4456ab';
const baseUrl = 'http://gateway.marvel.com/v1/public/';
let offset = 0;

const getData = () => {
    let url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;
    fetch(url)
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
}

getData()

/*
const getSearchParams = {isSearch} => {
    let url = baseUrl;
    let searchParams = `?apikey=${apiPublic}
    if(searchType.value === 'comics')
}*/
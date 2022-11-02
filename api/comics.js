const baseURL = "http://gateway.marvel.com/v1/public"
const apiKey = "fca344d9b053eb0626fd93234dd00258"

const getComics = async (offset, orderBy) => {

    const response = await fetch(`${baseURL}/comics?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`)
    const data = await response.json()
    return data
}


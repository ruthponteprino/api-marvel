const getCharacters = async (orderBy) => {
    const response = await fetch(`${baseURL}/characters?apikey=${apiKey}&orderBy=${orderBy}`)
    const data = await response.json()
    return data
}
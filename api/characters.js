const getCharacters = async () => {
    const response = await fetch(`${baseURL}/characters?apikey=${apiKey}`)
    const data = await response.json()
    return data
}
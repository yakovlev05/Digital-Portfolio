const GetRecipeRequestResponse = async (nameUrl) => {
    return await fetch(`/api/v1/recipe/${nameUrl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export default GetRecipeRequestResponse;
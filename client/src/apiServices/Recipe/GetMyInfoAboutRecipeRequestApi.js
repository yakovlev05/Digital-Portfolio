const GetMyInfoAboutRecipeRequestApi = async (token, nameUrl) => {
    return await fetch(`/api/v1/recipe/${nameUrl}/info`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default GetMyInfoAboutRecipeRequestApi;
const GetRecipeCommentsRequestApi = async (recipeUrl, page = 1, count = 5) => {
    return await fetch(`/api/v1/recipe/${recipeUrl}/comments?page=${page}&count=${count}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export default GetRecipeCommentsRequestApi;
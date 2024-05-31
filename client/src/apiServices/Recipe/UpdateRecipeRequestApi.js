const UpdateRecipeRequestApi = async (token, recipeModel, recipeUrl) => {
    return await fetch(`/api/v1/recipe/${recipeUrl}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(recipeModel)
    })
}

export default UpdateRecipeRequestApi;
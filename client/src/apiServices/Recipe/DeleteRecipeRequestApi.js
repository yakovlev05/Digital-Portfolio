const DeleteRecipeRequestApi = async (token, recipeUrl) => {
    return await fetch(`/api/v1/recipe/${recipeUrl}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default DeleteRecipeRequestApi;
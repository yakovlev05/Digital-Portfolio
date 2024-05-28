const AddRecipeRequestApi = async (token, recipeModel) => {
    return await fetch('/api/v1/recipe/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(recipeModel)
    })
}

export default AddRecipeRequestApi;
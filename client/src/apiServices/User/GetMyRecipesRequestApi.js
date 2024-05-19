const GetMyRecipesRequestApi = async (token, page = 1, count = 3) => {
    return await fetch(`/api/v1/user/me/recipes?page=${page}&count=${count}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}


export default GetMyRecipesRequestApi;
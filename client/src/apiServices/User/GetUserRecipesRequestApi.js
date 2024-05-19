const GetUserRecipesRequestApi = async (username, page = 1, count = 3) => {
    return await fetch(`/api/v1/user/${username}/recipes?page=${page}&count=${count}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}


export default GetUserRecipesRequestApi;
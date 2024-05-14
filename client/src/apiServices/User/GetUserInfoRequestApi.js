const GetUserInfoRequestApi = async (username) => {
    return await fetch(`/api/v1/user/${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export default GetUserInfoRequestApi;
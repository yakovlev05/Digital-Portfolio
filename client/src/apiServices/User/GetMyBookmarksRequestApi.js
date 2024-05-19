const GetMyBookmarksRequestApi = async (token, page, count) => {
    return await fetch(`/api/v1/user/me/bookmarks?page=${page}&count=${count}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default GetMyBookmarksRequestApi;
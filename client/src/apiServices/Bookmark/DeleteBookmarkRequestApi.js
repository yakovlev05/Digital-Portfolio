const DeleteBookmarkRequestApi = async (token, nameUrl) => {
    return await fetch(`/api/v1/bookmark/delete/${nameUrl}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default DeleteBookmarkRequestApi;
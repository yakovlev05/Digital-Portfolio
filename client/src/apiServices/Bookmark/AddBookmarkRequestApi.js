const AddBookmarkRequestApi = async (token, nameUrl) => {
    return await fetch(`/api/v1/bookmark/add/${nameUrl}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default AddBookmarkRequestApi;
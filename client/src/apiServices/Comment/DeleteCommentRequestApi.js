const DeleteCommentRequestApi = async (token, guid) => {
    return await fetch(`/api/v1/comment/${guid}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default DeleteCommentRequestApi;
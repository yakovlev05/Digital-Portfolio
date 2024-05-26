const UpdateCommentRequestApi = async (token, comment) => {
    return await fetch(`/api/v1/comment/${comment.guid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            newRating: comment.newRating,
            newDescription: comment.newDescription
        })
    })
}

export default UpdateCommentRequestApi;
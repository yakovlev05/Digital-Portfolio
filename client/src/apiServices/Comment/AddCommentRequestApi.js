const AddCommentRequestApi = async (token, comment) => {
    return await fetch('/api/v1/comment/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            recipeUrl: comment.recipeUrl,
            rating: comment.rating,
            description: comment.description
        })
    })
}

export default AddCommentRequestApi;
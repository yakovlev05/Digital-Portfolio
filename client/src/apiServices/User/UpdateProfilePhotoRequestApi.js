const UpdateProfilePhotoRequestApi = async (token, imageName) => {
    return await fetch('/api/v1/user/me/photo', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            imageName: imageName
        })
    })
}

export default UpdateProfilePhotoRequestApi;
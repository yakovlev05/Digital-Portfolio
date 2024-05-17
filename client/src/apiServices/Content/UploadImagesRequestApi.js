const UploadImagesRequestApi = async (token, files, width = 1920, height = 1080, quality = 50) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('fileRequest', files[i]);
    }

    return await fetch(`/api/v1/content/images/add?width=${width}&height=${height}&quality=${quality}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
}

export default UploadImagesRequestApi;
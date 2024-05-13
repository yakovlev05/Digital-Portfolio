const GetMyInfo = async (token) => {
    return await fetch('/api/v1/user/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default GetMyInfo;
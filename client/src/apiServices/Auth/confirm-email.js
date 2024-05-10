const ConfirmEmailRequestApi = async (token) => {
    return await fetch('/api/v1/auth/email/confirm', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default ConfirmEmailRequestApi;
const RevokeTokenRequestApi = async (token) => {
    return await fetch('/api/v1/auth/token/revoke', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default RevokeTokenRequestApi;
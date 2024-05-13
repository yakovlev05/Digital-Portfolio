const ValidateTokenRequest = async (token) => {
    return await fetch('/api/v1/auth/token/validate', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export default ValidateTokenRequest;
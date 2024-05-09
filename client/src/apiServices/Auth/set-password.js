const ChangePasswordRequestApi = async (password, confirmPassword, token) => {
    return await fetch('/api/v1/auth/password/change', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            'password': password,
            'confirmPassword': confirmPassword
        })
    })
}

export default ChangePasswordRequestApi;
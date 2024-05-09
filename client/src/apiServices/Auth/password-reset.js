const PasswordResetRequestApi = async (email) => {
    return await fetch('/api/v1/auth/password/reset', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email
        })
    });
}

export default PasswordResetRequestApi;
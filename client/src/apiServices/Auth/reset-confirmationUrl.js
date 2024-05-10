const ConfirmationUrlResetRequestApi = async (email) =>{
    return await fetch('/api/v1/auth/email/reset-url',{
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

export default ConfirmationUrlResetRequestApi;
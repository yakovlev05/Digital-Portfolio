const RegistrationRequestApi = async (login, email, name, secondName, password, confirmPassword) => {
    const response = await fetch('/api/v1/auth/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            login: login,
            email: email,
            name: name,
            secondName: secondName,
            password: password,
            confirmPassword: confirmPassword
        })
    })
    
    return response;
}

export default RegistrationRequestApi;
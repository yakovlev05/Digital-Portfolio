const LoginRequestApi = async (login, password) => {
    const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'login': login,
            'password': password
        })
    });
    
    return response;
}

export default LoginRequestApi;
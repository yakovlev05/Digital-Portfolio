const ChangeMyPasswordRequestApi = async(token, passwords)=>{
    return await fetch('/api/v1/user/me/password',{
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            password: passwords.password,
            newPassword: passwords.newPassword
        })
    })
}

export default ChangeMyPasswordRequestApi;
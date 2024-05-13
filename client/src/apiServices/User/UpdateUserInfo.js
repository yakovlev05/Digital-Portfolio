const UpdateUserInfoRequestApi = async (token, userInfo)=>{
    return await fetch(`/api/v1/user/me`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            profilePhoto: userInfo.profilePhoto,
            name: userInfo.name,
            secondName: userInfo.secondName,
            patronymic: userInfo.patronymic,
            login: userInfo.login,
            email: userInfo.email,
            description: userInfo.description
        })
    })
}

export default UpdateUserInfoRequestApi;
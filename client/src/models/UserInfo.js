class UserInfo {
    constructor(json) {
        this.login = json.login;
        this.email = json.email;
        this.name = json.name;
        this.secondName = json.secondName;
        this.patronymic = json.patronymic;
        this.dateRegistration = json.dateRegistration;
        this.description = json.description;
        this.profilePhoto = json.profilePhoto;
    }
}

export default UserInfo;
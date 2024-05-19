class UserInfo {
    constructor(json) {
        if (json) {
            this.login = json.login;
            this.email = json.email;
            this.name = json.name;
            this.secondName = json.secondName;
            this.patronymic = json.patronymic;
            this.dateRegistration = json.dateRegistration;
            this.description = json.description;
            this.profilePhoto = json.profilePhoto;
            this.recipesCount = json.recipesCount;
        } else {
            this.login = null;
            this.email = null;
            this.name = null;
            this.secondName = null;
            this.patronymic = null;
            this.dateRegistration = null;
            this.description = null;
            this.profilePhoto = null;
            this.recipesCount = null;
        }

    }
}

export default UserInfo;
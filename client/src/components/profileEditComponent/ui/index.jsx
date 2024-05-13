import styles from './styles.module.scss';
import UserInfoContext from "../../../contexts/UserInfoContext";
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import UpdateUserInfoRequestApi from "../../../apiServices/User/UpdateUserInfo";
import updateToast from "../../../utilities/updateToast";
import {toast} from "react-toastify";


const ProfileEditComponent = () => {
    const navigate = useNavigate();
    const userInfo = useContext(UserInfoContext);
    const [formState, setFromState] = useState({
        profilePhoto: userInfo.profilePhoto,
        name: userInfo.name,
        secondName: userInfo.secondName,
        patronymic: userInfo.patronymic,
        email: userInfo.email,
        login: userInfo.login,
        description: userInfo.description
    })

    const handleButtonSave = async () => {
        const response = UpdateUserInfoRequestApi(localStorage.getItem('token'), formState);
        const id = toast.loading('Обработка...')

        response
            .then(async (response) => {
                if (response.ok) updateToast('success', 'Изменения сохранены', id)
                else updateToast('error', 'Непредвиденная ошибка', id)
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка', id));
    }

    return (
        <div className={styles.body}>
            <div className={styles.formsContainer}>
                <div className={styles.photoCont}>
                    <div>
                        <p className={styles.label}>Фотография</p>
                        <img className={styles.avatar}
                             src={`/api/v1/content/image/${userInfo.profilePhoto}`} width='100'
                             height='100'
                             alt='logo'/>
                    </div>
                    <button className={styles.updatePhotoButton}>Обновить фото</button>
                </div>
                <div className={styles.backCont}>
                    <a className={styles.url} onClick={() => navigate('/me')}>Вернуться к профилю</a>
                </div>
                <div className={styles.nameCont}>
                    <p className={styles.label}>Имя</p>
                    <input className={styles.inputField} placeholder={'Имя'} defaultValue={userInfo.name}
                           onChange={(e) => setFromState({...formState, name: e.target.value})}/>
                </div>
                <div className={styles.secondNameCont}>
                    <p className={styles.label}>Фамилия</p>
                    <input className={styles.inputField} placeholder={'Фамилия'} defaultValue={userInfo.secondName}
                           onChange={(e) => setFromState({...formState, secondName: e.target.value})}/>
                </div>
                <div className={styles.thirdNameCont}>
                    <p className={styles.label}>Отчество</p>
                    <input className={styles.inputField} placeholder={'Отчество'} defaultValue={userInfo.patronymic}
                           onChange={(e) => setFromState({...formState, patronymic: e.target.value})}/>
                </div>
                <div className={styles.emailCont}>
                    <p className={styles.label}>Почта</p>
                    <input className={styles.inputField} placeholder={'Почта'} defaultValue={userInfo.email}
                           onChange={(e) => setFromState({...formState, email: e.target.value})}/>
                </div>
                <div className={styles.loginCont}>
                    <p className={styles.label}>Логин</p>
                    <input className={styles.inputField} placeholder={'Логин'} defaultValue={userInfo.login}
                           onChange={(e) => setFromState({...formState, login: e.target.value})}/>
                </div>
                <div className={styles.aboutCont}>
                    <p className={styles.label}>Обо мне</p>
                    <textarea className={styles.aboutTextArea} name={'about'} placeholder={'Обо мне'}
                              defaultValue={userInfo.description}
                              onChange={(e) => setFromState({...formState, description: e.target.value})}></textarea>
                </div>
                <a className={`${styles.changePassword} ${styles.url}`}>Сменить пароль</a>
                <a className={`${styles.exit} ${styles.url}`}>Выйти из аккаунта</a>
                <button className={styles.save} type={"submit"} onClick={handleButtonSave}>Сохранить изменения</button>
                <button className={styles.delete}>Удалить аккаунт</button>
            </div>
        </div>
    )
}

export default ProfileEditComponent;
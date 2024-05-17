import styles from './styles.module.scss';
import UserInfoContext from "../../../contexts/UserInfoContext";
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import UpdateUserInfoRequestApi from "../../../apiServices/User/UpdateUserInfoRequestApi";
import updateToast from "../../../utilities/updateToast";
import {toast} from "react-toastify";
import emptyProfilePhoto from "../../../img/emptyProfilePhoto.jpg";
import ModalComponent from "../../modal";
import DeleteUserInfoRequestApi from "../../../apiServices/User/DeleteUserInfoRequestApi";


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
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleButtonSave = async () => {
        if (!validateForm()) return;

        const response = UpdateUserInfoRequestApi(localStorage.getItem('token'), formState);
        const id = toast.loading('Обработка...')

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Изменения сохранены', id);
                } else {
                    const error = await response.json();
                    if (error.message === 'Login is too short, need at least 5 characters')
                        updateToast('error', 'Логин не может быть короче 5 символов', id);
                    else if (error.message === 'Invalid email')
                        updateToast('error', 'Введите корректную почту', id);
                    else if (error.message === 'Login already exists')
                        updateToast('error', 'Логин уже занят', id);
                    else if (error.message === 'Email already exists')
                        updateToast('error', 'Почта занята', id);
                    else
                        updateToast('error', error.message, id)
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка', id));
    }

    const handleModalDeleteOk = async () => {
        const response = DeleteUserInfoRequestApi(localStorage.getItem('token'))
        const id = toast.loading('Обработка...')

        response
            .then(async (response) => {
                if (response.ok) {
                    window.location.href = "/login";
                } else {
                    updateToast('error', 'Произошла ошибка', id)
                }
            })
            .catch(() => updateToast('error', 'Произошла ошибка', id))
    }

    const validateForm = () => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (formState.name.length === 0) {
            toast.warning('Имя не должно быть пустым')
            return;
        } else if (formState.secondName.length === 0) {
            toast.warning('Фамилия не должна быть пустой')
            return;
        } else if (!emailRegex.test(formState.email)) {
            toast.warning('Введите корректную почту')
            return;
        } else if (formState.login.length < 5) {
            toast.warning('Логин не может быть короче 5 символов')
            return;
        }

        return true;
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.formsContainer}>
                    <div className={styles.photoCont}>
                        <div>
                            <p className={styles.label}>Фотография</p>
                            <img className={styles.avatar}
                                 src={userInfo.profilePhoto ? `/api/v1/content/image/${userInfo.profilePhoto}` : emptyProfilePhoto}
                                 width='100'
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
                                  onChange={(e) => setFromState({
                                      ...formState,
                                      description: e.target.value
                                  })}></textarea>
                    </div>
                    <a className={`${styles.changePassword} ${styles.url}`}>Сменить пароль</a>
                    <a className={`${styles.exit} ${styles.url}`}>Выйти из аккаунта</a>
                    <button className={styles.save} type={"submit"} onClick={handleButtonSave}>Сохранить изменения
                    </button>
                    {/*<button className={styles.delete} onClick={() => setShowModalDelete(true)}>Удалить аккаунт</button>*/}
                    <div className={styles.delete}>
                        <ModalComponent
                            stylesButton={styles.delete}
                            message={'Вы точно хотите удалить аккаунт? Данные безвозвратно будут утеряны'}
                            title={'Удаление аккаунта'}
                            handleSubmit={handleModalDeleteOk}
                        />
                    </div>
                </div>
            </div>

            {showModalDelete && <ModalComponent/>}
        </>
    )
}

export default ProfileEditComponent;
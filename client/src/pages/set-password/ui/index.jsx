import styles from './styles.module.scss'
import {Helmet} from "react-helmet";
import {useState} from "react";
import ChangePasswordRequestApi from "../../../apiServices/Auth/set-password";
import {toast} from 'react-toastify';


const SetPasswordPage = () => {
    const [passwordForm, setPasswordForm] = useState({password: '', confirmPassword: ''});

    const [invalidForm, setInvalidForm] = useState({password: false, confirmPassword: false});

    const checkForm = () => {
        setInvalidForm({
            password: passwordForm.password.length === 0,
            confirmPassword: passwordForm.confirmPassword.length === 0
        });
        return passwordForm.password.length > 0 && passwordForm.confirmPassword.length > 0;
    }

    const updateToast = (type, message, id, autoClose = 5000) => {
        toast.update(id, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: autoClose
        });
    }

    const handleSubmit = async () => {
        console.log('1')
        if (!checkForm()) return;
console.log(2)
        if (passwordForm.password.length < 8) {
            toast.error('Пароль слишком короткий, нужно минимум 8 символов')
            return;
        }

        if (passwordForm.password !== passwordForm.confirmPassword) {
            toast.error('Пароли не совпадают')
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log(token);

        const response = ChangePasswordRequestApi(passwordForm.password, passwordForm.confirmPassword, token);

        const id = toast.loading('Смена пароля...');

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Пароль успешно изменён', id)
                } else {
                    if (response.status === 401) {
                        updateToast('error', 'Токен истёк, запорсите новую ссылку', id)
                        return;
                    }
                    const error = await response.json();

                    if (error.message === "Passwords do not match")
                        updateToast('error', 'Пароли не совпадают', id)
                    else if (error.message === "Password is too short, need at least 8 characters")
                        updateToast('error', 'Пароль слишком короткий, нужно минимум 8 символов', id)
                }
            })
            .catch(() => {
                updateToast('error', 'Непредвиденная ошибка сети111', id)
            })

    }

    return (
        <>
            <Helmet>
                <title>Смена пароля</title>
            </Helmet>

            <main className={styles.body}>
                <div className={styles.form}>
                    <ul className={styles.listForm}>
                        <li><h1 className={styles.title}>Введите новый пароль</h1></li>
                        <li className={styles.label}>Новый пароль</li>
                        <li>
                            <input
                                className={styles.field}
                                type={"password"}
                                placeholder={""}
                                required
                                autoComplete={"off"}
                                onChange={(e) => setPasswordForm({...passwordForm, password: e.target.value})}
                                style={{borderColor: invalidForm.password ? '#FF0000' : '#696969'}}
                            />
                        </li>
                        <li className={styles.errorLabel}
                            style={{display: invalidForm.password ? 'block' : 'none'}}>Введите новый пароль
                        </li>
                        <li className={styles.label}>Подтверждение пароля</li>
                        <li>
                            <input
                                className={styles.field}
                                type={"password"}
                                placeholder={""}
                                required
                                autoComplete={"off"}
                                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                style={{borderColor: invalidForm.confirmPassword ? '#FF0000' : '#696969'}}
                            />
                        </li>
                        <li className={styles.errorLabel}
                            style={{display: invalidForm.confirmPassword ? 'block' : 'none'}}>Введите пароль ещё раз
                        </li>
                        <li>
                            <button className={styles.button} type={"submit"} onClick={handleSubmit}>Сохранить</button>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default SetPasswordPage;
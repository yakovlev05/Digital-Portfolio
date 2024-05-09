import styles from './index.module.css';
import {Helmet} from "react-helmet";
import {toast} from 'react-toastify';
import RegistrationRequestApi from "../../../apiServices/Auth/registration";
import {useState} from "react";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        name: '',
        secondName: '',
        password: '',
        confirmPassword: ''
    });

    const [invalidForm, setInvalidForm] = useState({
        login: false,
        email: false,
        name: false,
        secondName: false,
        password: false,
        confirmPassword: false
    });

    const checkFields = () => {
        setInvalidForm({
            login: formData.login.length === 0,
            email: formData.email.length === 0,
            name: formData.name.length === 0,
            secondName: formData.secondName.length === 0,
            password: formData.password.length === 0,
            confirmPassword: formData.confirmPassword.length === 0
        });

        return formData.login.length !== 0 && formData.email.length !== 0 && formData.name.length !== 0
            && formData.secondName.length !== 0 && formData.password.length !== 0 && formData.confirmPassword.length !== 0;
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
        if (!checkFields()) return;
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (formData.password !== formData.confirmPassword) {
            toast.error("Пароли не сопадают");
            return;
        }
        if (formData.password < 8) {
            toast.error("Пароль должен быть не менее 8 символов");
            return;
        }
        if (formData.login.length < 5) {
            toast.error("Логин должен быть не менее 5 символов");
            return;
        }
        if (!emailRegex.test(formData.email)) {
            toast.error("Некорректный email");
            return;
        }

        const response = RegistrationRequestApi(formData.login, formData.email, formData.name,
            formData.secondName, formData.password, formData.confirmPassword);

        const id = toast.loading('Регистрация...');

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Перейдите по ссылке из письма', id);
                } else {
                    const error = await response.json();
                    if (error.message === 'Passwords do not match') updateToast('error', 'Пароли не совпадают', id);
                    if (error.message === 'Password is too short, need at least 8 characters') updateToast('error', 'Пароль должен быть не менее 8 символов', id);
                    if (error.message === 'Login is too short, need at least 5 characters') updateToast('error', 'Логин должен быть не менее 5 символов', id);
                    if (error.message === 'Invalid email') updateToast('error', 'Некорректный email', id);
                    if (error.message === 'Name or second name is empty') updateToast('error', 'Имя или фамилия пустые', id);
                    if (error.message === 'Login already exists') updateToast('error', 'Логин занят', id);
                    if (error.message === 'Email already exists') updateToast('error', 'Email занят', id);
                }
            })
            .catch(() => {
                updateToast('error', 'Непредвиденная ошибка сети', id)
            })
    }

    return (
        <>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            <div className={styles.body}>
                <main className={styles.form}>
                    <img className={styles.imgElement} src="/img/pizza.jpg" alt="Сочный кусок пиццы" height="867"
                         width="630"/>
                    <ul className={styles.listForm}>
                        <li className={styles.field}><h1 className={styles.title}>Зарегистрироваться</h1></li>
                        <li className={styles.label}>Логин</li>
                        <li className={styles.field}><input className={styles.input}
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            autoComplete={"off"}
                                                            onChange={(e) => {
                                                                setFormData({...formData, login: e.target.value})
                                                            }}
                                                            style={{borderColor: invalidForm.login ? '#FF0000' : '#696969'}}/>
                        </li>
                        <li className={styles.label}>Почта</li>
                        <li className={styles.field}><input className={styles.input}
                                                            type="email"
                                                            placeholder=""
                                                            required
                                                            autoComplete={"off"}
                                                            onChange={(e) => {
                                                                setFormData({...formData, email: e.target.value})
                                                            }}
                                                            style={{borderColor: invalidForm.email ? '#FF0000' : '#696969'}}/>
                        </li>
                        <li className={styles.label}>Фамилия</li>
                        <li className={styles.field}><input className={styles.input}
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            autoComplete={"off"}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    secondName: e.target.value
                                                                })
                                                            }}
                                                            style={{borderColor: invalidForm.secondName ? '#FF0000' : '#696969'}}/>
                        </li>
                        <li className={styles.label}>Имя</li>
                        <li className={styles.field}><input className={styles.input}
                                                            type="text"
                                                            placeholder=""
                                                            required
                                                            autoComplete={"off"}
                                                            onChange={(e) => {
                                                                setFormData({...formData, name: e.target.value})
                                                            }}
                                                            style={{borderColor: invalidForm.name ? '#FF0000' : '#696969'}}/>
                        </li>
                        <li className={styles.label}>Пароль</li>
                        <li className={styles.field}><input className={styles.input}
                                                            type="password"
                                                            placeholder=""
                                                            required
                                                            autoComplete={"off"}
                                                            onChange={(e) => {
                                                                setFormData({...formData, password: e.target.value})
                                                            }}
                                                            style={{borderColor: invalidForm.password ? '#FF0000' : '#696969'}}/>
                        </li>
                        <li className={styles.label}>Подтверждение пароля</li>
                        <li className={styles.field}><input className={styles.input}
                                                            type="password"
                                                            placeholder=""
                                                            required
                                                            autoComplete={"off"}
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    confirmPassword: e.target.value
                                                                })
                                                            }}
                                                            style={{borderColor: invalidForm.confirmPassword ? '#FF0000' : '#696969'}}/>
                        </li>
                        <li className={styles.errorLabel}
                            style={{display: Object.values(invalidForm).includes(true) ? 'block' : 'none'}}>
                            Заполните все поля
                        </li>
                        <li>
                            <button className={styles.button} type="submit" onClick={handleSubmit}>Создать аккаунт
                            </button>
                        </li>
                        <li className={styles.question}>Уже есть аккаунт? <a className={styles.url}
                                                                             href="/login">Войти</a>
                        </li>
                    </ul>
                </main>
            </div>
        </>
    )
}

export default RegistrationPage;
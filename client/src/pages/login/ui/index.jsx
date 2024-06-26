import styles from './styles.module.css'
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRequestApi from '../../../apiServices/Auth/login'
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    // Поля формы входа
    const [user, setUser] = useState({login: '', password: ''});
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/me")
        }
    }, [navigate]);

    const handlePasswordChange = (e) => {
        setUser({...user, password: e.target.value})
    }

    const handleLoginChange = (e) => {
        setUser({...user, login: e.target.value})
    }

    const [invalidForm, setInvalidForm] = useState({login: false, password: false});

    const checkInputFiled = () => {
        setInvalidForm({login: user.login.length === 0, password: user.password.length === 0});
        return user.login.length !== 0 && user.password.length !== 0;
    }

    const updateToast = (type, message, id, autoClose = 5000) => {
        toast.update(id, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: autoClose
        });
    }

    const handleLogin = async () => {
        if (!checkInputFiled()) return;

        const response = LoginRequestApi(user.login, user.password)

        const id = toast.loading('Вход...');

        response
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token)
                    updateToast('success', 'Вход выполнен', id)
                    window.location.href = "/me"
                } else {
                    const error = await response.json()
                    if (error.message === "User not found" || error.message === "Invalid password") {
                        updateToast('error', 'Неверный логин или пароль', id)
                    } else if (error.message === "Email confirmation is required")
                        updateToast('error', 'Подтвердите почту', id)
                    else updateToast('error', `Error: ${error.message}`, id);
                }
            })
            .catch(() => {
                updateToast('error', 'Непредвиденная ошибка', id)
            })
    }

    return (
        <>
            <Helmet>
                <title>Войти</title>
            </Helmet>
            <div className={styles.body}>
                <section className={styles.loginForm}>
                    <div className={styles.photo}>
                        <img className={styles.photoElement} src="/img/pizza.jpg" alt="Сочный кусок пиццы"
                             width="630"
                             height="867"/>
                    </div>
                    <div className={styles.formContainer}>
                        <ul className={styles.form}>
                            <li className={styles.header}><h1>Войти</h1></li>
                            <li className={styles.label}>Логин или почта</li>
                            <li className={styles.email}>
                                <input className={styles.input}
                                       onChange={handleLoginChange}
                                       style={{borderColor: invalidForm.login ? '#FF0000' : '#696969'}}
                                       type="email" placeholder=""
                                       required/>
                                <p className={styles.errorLabel}
                                   style={{display: invalidForm.login ? "block" : "none"}}>Введите логин или
                                    почту</p>
                            </li>
                            <li className={styles.label}>Пароль</li>
                            <li className={styles.password}>
                                <input className={styles.input}
                                       style={{borderColor: invalidForm.password ? '#FF0000' : '#696969'}}
                                       onChange={handlePasswordChange}
                                       type="password"
                                       placeholder=""
                                       required/>
                                <p className={styles.errorLabel}
                                   style={{display: invalidForm.password ? "block" : "none"}}>Введите пароль</p>
                            </li>
                            <li className={styles.button}>
                                <button className={styles.buttonElement} type="submit" onClick={handleLogin}>Войти
                                </button>
                            </li>
                            <li>Нет аккаунта?</li>
                            <li className={styles.accountUrl}><a className={styles.url}
                                                                 href="/registration">Зарегистрироваться</a>
                            </li>
                            <li className={styles.passwordQuestion}>Забыли пароль?</li>
                            <li><a className={styles.url} href="/reset-password">Сбросить</a></li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LoginPage;
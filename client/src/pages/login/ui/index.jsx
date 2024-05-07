import styles from './styles.module.css'
import {Helmet} from "react-helmet";
import React, {useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRequestApi from '../../../apiServices/Auth/login'

const LoginPage = () => {
    const handleNotify = () => toast.error("Пока не ворк!!!!")

    const handleLogin = async()=>{
        const response = await LoginRequestApi('login', 'password');
        if (response.status === 200) {
            toast.success('Успешно');
        } else {
            toast.error('Ошибка');
        }
    }

    return (
        <>
            <Helmet>
                <title>Войти</title>
            </Helmet>
            <div className={styles.body}>
                <section className={styles.loginForm}>
                    <div className={styles.photo}>
                        <img className={styles.photoElement} src="/img/pizza.jpg" alt="Сочный кусок пиццы" width="630"
                             height="867"/>
                    </div>
                    <div className={styles.formContainer}>
                        <ul className={styles.form}>
                            <li className={styles.header}><h1>Войти</h1></li>
                            <li className={styles.label}>Логин или почта</li>
                            <li className={styles.email}><input className={styles.input} type="email" placeholder=""
                                                                required/></li>
                            <li className={styles.label}>Пароль</li>
                            <li className={styles.password}><input className={styles.input} type="password"
                                                                   placeholder="" required/></li>
                            <li className={styles.button}>
                                <button className={styles.buttonElement} type="submit" onClick={handleNotify}>Войти</button>
                            </li>
                            <li>Нет аккаунта?</li>
                            <li className={styles.accountUrl}><a className={styles.url} href="/registration">Зарегистрироваться</a>
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
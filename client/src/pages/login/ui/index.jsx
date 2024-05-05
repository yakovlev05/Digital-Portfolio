import styles from './styles.module.css'
import {Helmet} from "react-helmet";

const LoginPage = () => {
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
                                <button className={styles.buttonElement} type="submit">Войти</button>
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
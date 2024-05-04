import styles from './index.module.css';
import {Helmet} from "react-helmet";


const RegistrationPage = () => {
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
                        <li className={styles.field}><input className={styles.input} type="text" placeholder="" required autoComplete={"off"}/></li>
                        <li className={styles.label}>Почта</li>
                        <li className={styles.field}><input className={styles.input} type="email" placeholder="" required autoComplete={"off"}/></li>
                        <li className={styles.label}>Фамилия</li>
                        <li className={styles.field}><input className={styles.input} type="text" placeholder="" required autoComplete={"off"}/></li>
                        <li className={styles.label}>Имя</li>
                        <li className={styles.field}><input className={styles.input} type="text" placeholder="" required autoComplete={"off"}/></li>
                        <li className={styles.label}>Пароль</li>
                        <li className={styles.field}><input className={styles.input} type="password" placeholder="" required autoComplete={"off"}/></li>
                        <li className={styles.label}>Подтверждение пароля</li>
                        <li className={styles.field}><input className={styles.input} type="password" placeholder="" required autoComplete={"off"}/></li>
                        <li>
                            <button className={styles.button} type="submit">Создать аккаунт</button>
                        </li>
                        <li className={styles.question}>Уже есть аккаунт? <a className={styles.url} href="/login">Войти</a>
                        </li>
                    </ul>
                </main>
            </div>
        </>
    )
}

export default RegistrationPage;
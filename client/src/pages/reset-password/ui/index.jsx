import styles from './styles.module.css';
import {Helmet} from "react-helmet";


const ResetPasswordPage = () => {
    return (
        <>
            <Helmet>
                <title>Сброс пароля</title>
            </Helmet>

            <main className={styles.body}>
                <div className={styles.form}>
                    <ul className={styles.listForm}>
                        <li><h1 className={styles.title}>Сброс пароля</h1></li>
                        <li className={styles.label}>Почта</li>
                        <li><input className={styles.field} type={"email"} placeholder={""} required/></li>
                        <li>
                            <button className={styles.button} type={"submit"}>Сбросить</button>
                        </li>
                        <li className={styles.info}>Мы вышлем ссылку<br/>сброса пароля на почту</li>
                    </ul>
                </div>
            </main>
        </>
)
}

export default ResetPasswordPage;
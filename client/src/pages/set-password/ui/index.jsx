import styles from './styles.module.scss'
import {Helmet} from "react-helmet";


const SetPasswordPage = () => {
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
                        <li><input className={styles.field} type={"password"} placeholder={""} required autoComplete={"off"}/></li>
                        <li className={styles.label}>Подтверждение пароля</li>
                        <li><input className={styles.field} type={"password"} placeholder={""} required autoComplete={"off"}/></li>
                        <li>
                            <button className={styles.button} type={"submit"}>Сохранить</button>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default SetPasswordPage;
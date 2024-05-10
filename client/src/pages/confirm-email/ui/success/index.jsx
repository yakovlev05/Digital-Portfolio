import styles from './styles.module.scss'
import {Helmet} from "react-helmet";
import {toast} from "react-toastify";
import {useEffect} from "react";


const ConfirmEmailSuccessPage = (props) => {
    useEffect(() => {
        toast.update(props.id, {
            render: 'Почта подтверждена',
            type: 'success',
            isLoading: false,
            autoClose: 5000
        })
    })
    
    return (
        <>
            <Helmet>
                <title>Подтверждение почты</title>
            </Helmet>

            <main className={styles.body}>
                <div className={styles.form}>
                    <ul className={styles.listForm}>
                        <li className={styles.title}>Подтверждение почты</li>
                        <li className={styles.info}>Ваша почта подтверждена</li>
                        <li>
                            <button
                                className={styles.button}
                                onClick={() => window.location.href = '/login'}>
                                Войти
                            </button>
                        </li>
                        <li className={styles.emailInfo}>Почта: {(() => {
                            const urlParams = new URLSearchParams(window.location.search);
                            return urlParams.get('email');
                        })()}</li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default ConfirmEmailSuccessPage;
import styles from './styles.module.scss'
import {Helmet} from "react-helmet";
import ConfirmationUrlResetRequestApi from "../../../../apiServices/Auth/reset-confirmationUrl";
import {toast} from "react-toastify";
import {useEffect} from "react";

const ConfirmEmailErrorPage = (props) => {

    useEffect(() => {
        console.log(props.id)
        toast.update(props.id, {
            render: 'Ошибка при подтверждении',
            type: 'error',
            isLoading: false,
            autoClose: 5000
        });
    })

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    const updateToast = (type, message, id, autoClose = 5000) => {
        toast.update(id, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: autoClose
        });
    }

    const handleSubmit = async () => {
        const response = ConfirmationUrlResetRequestApi(email)

        const id = toast.loading('Отправка ссылки...')

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Ссылка отправлена', id)
                } else {
                    const error = await response.json()

                    if (error.message === "Email not found") updateToast('error', 'Пользователь с такой почтой не найден', id)
                    else if (error.message === "Email already confirmed") updateToast('error', 'Почта уже подтверждена', id)
                    else updateToast('error', 'Непредвиденная ошибка', id)
                }
            })
            .catch(() => {
                updateToast('error', 'Непредвиденная ошибка сети', id)
            })
    }

    return (
        <>
            <Helmet>
                <title>Подтверждение почты</title>
            </Helmet>

            <main className={styles.body}>
                <div className={styles.form}>
                    <ul className={styles.listForm}>
                        <li className={styles.title}>Подтверждение почты</li>
                        <li className={styles.info}>Срок действия ссылки истёк,<br/>запросите ссылку повторно</li>
                        <li>
                            <button
                                className={styles.button}
                                onClick={handleSubmit}>
                                Отправить
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

export default ConfirmEmailErrorPage;
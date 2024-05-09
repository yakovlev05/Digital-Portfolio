import styles from './styles.module.css';
import {Helmet} from "react-helmet";
import PasswordResetRequestApi from "../../../apiServices/Auth/password-reset";
import {useState} from "react";
import {toast} from "react-toastify";


const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');

    const [invalidEmail, setInvalidEmail] = useState(false);

    const checkInputFiled = () => {
        setInvalidEmail(email.length === 0)
        return email.length !== 0
    }

    const handleSubmit = async () => {
        if (!checkInputFiled()) return;

        const regexEmail = /^\S+@\S+\.\S+$/;
        if (!regexEmail.test(email)) {
            toast.error('Некорректный email');
            return;
        }

        const response = PasswordResetRequestApi(email);

        const id = toast.loading('Обработка...');
        response
            .then(async (response) => {
                if (response.ok) {
                    toast.update(id, {
                        render: 'Ссылка для сброса пароля отправлена на почту',
                        type: 'success',
                        isLoading: false,
                        autoClose: 5000
                    });
                } else {
                    const error = await response.json();
                    if (error.message === "Invalid email") toast.update(id, {
                        render: 'Некорректный email',
                        type: 'error',
                        isLoading: false,
                        autoClose: 5000
                    });
                    else if (error.message === 'Email not found') toast.update(id, {
                        render: 'Пользователь с такой почтой не найден',
                        type: 'error',
                        isLoading: false,
                        autoClose: 5000
                    });
                    else toast.update(id, {
                            render: `Error ${error.message}`,
                            type: 'error',
                            isLoading: false,
                            autoClose: 5000
                        });
                }
            })
            .catch(() => {
                toast.update(id, {
                    render: 'Непредвиденная ошибка сети',
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000
                });
            });

        // await toast.promise(
        //     response,
        //     {
        //         pending: 'Обработка...'
        //     }
        // )
        //
        // response
        //     .then(async (response) => {
        //         if (response.ok) {
        //             toast.success('Ссылка для сброса пароля отправлена на почту')
        //         } else {
        //             const error = await response.json();
        //             if (error.message === "Invalid email") toast.error('Некорректный email')
        //             else if (error.message === 'Email not found') toast.error('Пользователь с такой почтой не найден')
        //         }
        //     })
        //     .catch(() => {
        //         toast.error('Непредвиденная ошибка сети')
        //     })
    }

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
                        <li>
                            <input
                                className={styles.field}
                                type={"email"}
                                placeholder={""}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                style={{borderColor: invalidEmail ? '#FF0000' : '#696969'}}
                            />
                        </li>
                        <li className={styles.errorLabel} style={{display: invalidEmail ? 'block' : 'none'}}>Введите
                            почту
                        </li>
                        <li>
                            <button className={styles.button} type={"submit"} onClick={handleSubmit}>Сбросить</button>
                        </li>
                        <li className={styles.info}>Мы вышлем ссылку<br/>сброса пароля на почту</li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default ResetPasswordPage;
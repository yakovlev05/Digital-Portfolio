import './index.css'
import {Helmet} from "react-helmet";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Войти</title>
            </Helmet>
            <div className="body">
                <section className="login-form">
                    <div className="photo">
                        <img src="/img/pizza.png" alt="Сочный кусок пиццы" width="630" height="867"/>
                    </div>
                    <div className="form-container">
                        <ul className="form">
                            <li className="header"><h1>Войти</h1></li>
                            <li className="label">Логин или почта</li>
                            <li className="email"><input type="email" placeholder="" required/></li>
                            <li className="label">Пароль</li>
                            <li className="password"><input type="password" placeholder="" required/></li>
                            <li className="button">
                                <button type="submit">Войти</button>
                            </li>
                            <li className="account-question">Нет аккаунта?</li>
                            <li className="account-url"><a href="">Зарегистрироваться</a></li>
                            <li className="password-question">Забыли пароль?</li>
                            <li className="password-url"><a href="">Сбросить</a></li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LoginPage;
import styles from './styles.module.scss'
import logo from './img/logo.png'
import {useContext} from "react";
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import emptyProfilePhoto from '../../../img/emptyProfilePhoto.jpg'

const MainHeaderComponent = (imageName) => {
    const userInfo = useContext(UserInfoContext);
    const auth = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <a className={styles.logo} href='/'>
                <img src={logo} alt='логотип' width='96' height='96'/>
            </a>
            <ul className={styles.navList}>
                <li className={styles.navElement}>
                    <a className={styles.url} href='/'>Главная</a>
                </li>
                <li className={styles.navElement}>
                    <a className={styles.url} href='/'>Рецепты</a>
                </li>
                <li className={styles.navElement}>
                    <a className={styles.url} href='/'>Портфолио</a>
                </li>
            </ul>
            <input className={styles.searchField} type='search' placeholder='Поиск'/>
            <div className={styles.auth} style={{display: auth ? 'none' : 'block'}}>
                <a className={styles.url} href={'/login'}>Вход</a>
                /
                <a className={styles.url} href={'/registration'}>Регистрация</a>
            </div>
            <div style={{display: auth ? 'block' : 'none'}}>
                <a href={'/profile'}>
                    <img className={styles.avatar}
                         src={userInfo.profilePhoto ? `/api/v1/content/image/${userInfo.profilePhoto}` : emptyProfilePhoto}
                         alt='аватар'></img>
                </a>
            </div>
        </header>
    )
}

export default MainHeaderComponent;

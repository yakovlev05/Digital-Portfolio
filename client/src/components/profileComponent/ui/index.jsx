import styles from './styles.module.scss';
import {useContext, useState} from "react";
import UserInfoContext from "../../../contexts/UserInfoContext";
import ProfilePortfolioComponent from "./components/profilePortfolioComponent";
import ProfileBookmarkComponent from "./components/profileBookmarkComponent";
import ProfileAboutComponent from "./components/profileAboutComponent";


const ProfileComponent = () => {
    const userInfo = useContext(UserInfoContext);
    const [currentNavElement, setCurrentNavElement] = useState('Портфолио')


    return (
        <div className={styles.profile}>
            <img className={styles.image} src={`/api/v1/content/image/${userInfo.profilePhoto}`}
                 alt={'avatar'} width='250' height='250'/>
            <h1 className={styles.username}>{userInfo.login}</h1>
            <div className={styles.containerButtons}>
                <button className={styles.button}>Поделиться</button>
                <button className={styles.button}>Редактировать</button>
            </div>
            <ul className={styles.navList}>
                <li className={styles.navElement}
                    onClick={() => setCurrentNavElement('Портфолио')}>Портфолио/
                </li>
                <li className={styles.navElement}
                    onClick={() => setCurrentNavElement('Избранное')}>Избранное
                </li>
                <li className={styles.navElement}
                    onClick={() => setCurrentNavElement('Обо мне')}>/Обо мне
                </li>
            </ul>
            {currentNavElement === 'Портфолио' && <ProfilePortfolioComponent/>}
            {currentNavElement === 'Избранное' && <ProfileBookmarkComponent/>}
            {currentNavElement === 'Обо мне' && <ProfileAboutComponent/>}
        </div>
    )
}

export default ProfileComponent
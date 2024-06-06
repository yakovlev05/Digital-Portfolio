import styles from './styles.module.scss';
import {useContext, useState} from "react";
import UserInfoContext from "../../../contexts/UserInfoContext";
import ProfilePortfolioComponent from "./components/profilePortfolioComponent";
import ProfileBookmarkComponent from "./components/profileBookmarkComponent";
import ProfileAboutComponent from "./components/profileAboutComponent";
import AuthContext from "../../../contexts/AuthContext";
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import emptyProfilePhoto from '../../../img/emptyProfilePhoto.jpg'


const ProfileComponent = () => {
    const auth = useContext(AuthContext);
    const myUserInfo = useContext(UserInfoContext);
    const [currentNavElement, setCurrentNavElement] = useState('Портфолио')
    const navigate = useNavigate();

    const handleShare = async () => {
        await navigator.clipboard.writeText(`https://pp.yakovlev05.ru/${myUserInfo.login}`)
        toast.success('Ссылка скопирована в буфер обмена')
    }

    return (
        <div className={styles.profile}>
            <img className={styles.image}
                 src={myUserInfo.profilePhoto ? `/api/v1/content/image/${myUserInfo.profilePhoto}` : emptyProfilePhoto}
                 alt={'avatar'}
                 width='200' height='200'/>
            <h1 className={styles.username}>{myUserInfo.login}</h1>
            {auth.canChange &&
                (
                    <div className={styles.mainContainerButtons}>
                        <div className={styles.containerButtons}>
                            <button className={styles.button} onClick={handleShare}>Поделиться</button>
                            <button className={styles.button} onClick={() => navigate('/me/edit')}>Редактировать
                            </button>
                        </div>
                        {myUserInfo.recipesCount !== 0 &&
                            <button className={styles.button} onClick={()=>navigate('/recipe/new')}>Опубликовать</button>
                        }
                    </div>
                )
            }
            <ul className={styles.navList}>
                <li className={styles.navElement}
                    onClick={() => setCurrentNavElement('Портфолио')}>Портфолио
                </li>
                <li className={styles.navSep}> /</li>
                {auth.canChange &&
                    <>
                        <li className={styles.navElement}
                            onClick={() => setCurrentNavElement('Избранное')}>Избранное
                        </li>
                        <li className={styles.navSep}> /</li>
                    </>
                }
                <li className={styles.navElement}
                    onClick={() => setCurrentNavElement('Обо мне')}>Обо мне
                </li>
            </ul>
            {currentNavElement === 'Портфолио' && <ProfilePortfolioComponent/>}
            {auth && currentNavElement === 'Избранное' && <ProfileBookmarkComponent/>}
            {currentNavElement === 'Обо мне' && <ProfileAboutComponent/>}
        </div>
    )
}

export default ProfileComponent
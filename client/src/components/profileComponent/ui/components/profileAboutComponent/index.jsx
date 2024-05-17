import styles from './styles.module.scss';
import UserInfoContext from "../../../../../contexts/UserInfoContext";
import AuthContext from "../../../../../contexts/AuthContext";
import {useContext} from "react";


const ProfileAboutComponent = () => {
    const auth = useContext(AuthContext);
    const userInfo = useContext(UserInfoContext);
    if (!userInfo.patronymic) userInfo.patronymic = '';
    return (
        <>
            {auth.canChange &&
                <div className={styles.about}>
                    <h2 className={styles.name}>{`${userInfo.secondName} ${userInfo.name} ${userInfo.patronymic}`}</h2>
                    <p className={styles.description}>
                        {userInfo.description || 'Вы не оставили о себе никакой информации :('}
                    </p>
                </div>
            }

            {!auth.canChange &&
                <div className={styles.about}>
                    <h2 className={styles.name}>{`${userInfo.secondName} ${userInfo.name} ${userInfo.patronymic}`}</h2>
                    <p className={styles.description}>
                        {userInfo.description || 'Пользователь не оставил о себе никакой информации :('}
                    </p>
                </div>
            }
        </>
    )
}

export default ProfileAboutComponent;
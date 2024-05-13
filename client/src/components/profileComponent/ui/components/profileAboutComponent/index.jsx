import styles from './styles.module.scss';
import UserInfoContext from "../../../../../contexts/UserInfoContext";
import {useContext} from "react";


const ProfileAboutComponent = () => {
    const userInfo = useContext(UserInfoContext);
    return (
        <div className={styles.about}>
            <h2 className={styles.name}>{`${userInfo.secondName} ${userInfo.name}`}</h2>
            <p className={styles.description}>
                {userInfo.description || 'Пользователь не добавил описание :('}
            </p>
        </div>
    )
}

export default ProfileAboutComponent;
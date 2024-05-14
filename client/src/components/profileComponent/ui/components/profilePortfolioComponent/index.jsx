import styles from './styles.module.scss'
import AuthContext from "../../../../../contexts/AuthContext";
import {useContext} from "react";

const Index = () => {
    const auth = useContext(AuthContext);

    return (
        <>
            {auth.logged &&
                <div className={styles.profile}>
                    <p>Здесь пока ничего нету. Тут будут отображаться ваши рецепты</p>
                    <button className={styles.button}>Опубликовать</button>
                </div>
            }

            {!auth.logged &&
                <div className={styles.profile}>
                    <p>Здесь пока ничего нету. Тут будут отображаться рецепты пользователя</p>
                </div>
            }
        </>
    )
}

export default Index;
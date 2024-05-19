import styles from './styles.module.scss';
import UserInfoContext from "../../../../../contexts/UserInfoContext";
import {useContext} from "react";
import RecipesCardsComponent from "../../../../recipesCardsComponent";
import AuthContext from "../../../../../contexts/AuthContext";

const ProfileBookmarkComponent = () => {
    const user = useContext(UserInfoContext);
    const auth = useContext(AuthContext);

    return (
        <>
            {user.bookmarksCount === 0 &&
                <div className={styles.bookmark}>
                    <p>Здесь пока ничего нету. Тут будут отображаться ваши избранные рецепты</p>
                    <button className={styles.button}>Добавить</button>
                </div>
            }

            {user.bookmarksCount !== 0 &&
                <RecipesCardsComponent isBookmarks={true} isAuthorized={auth.logged}/>
            }
        </>
    )
}

export default ProfileBookmarkComponent;
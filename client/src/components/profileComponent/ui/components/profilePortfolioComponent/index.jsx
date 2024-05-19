import styles from './styles.module.scss'
import AuthContext from "../../../../../contexts/AuthContext";
import userInfoContext from "../../../../../contexts/UserInfoContext";
import {useContext} from "react";
import RecipesCardsComponent from "../../../../recipesCardsComponent";

const ProfilePortfolioComponent = () => {
    const auth = useContext(AuthContext);
    const user = useContext(userInfoContext);

    return (
        <>
            {auth.canChange && user.recipesCount === 0 &&
                <div className={styles.profile}>
                    <p>Здесь пока ничего нет. Тут будут отображаться ваши рецепты</p>
                    <button className={styles.button}>Опубликовать</button>
                </div>
            }

            {!auth.canChange && user.recipesCount === 0 &&
                <div className={styles.profile}>
                    <p>Пользователь не опубликовал ни одного рецепта</p>
                </div>
            }

            {user.recipesCount !== 0 &&
                <RecipesCardsComponent isPortfolio={true} isAuthorized={auth.logged}/>}
        </>
    )
}

export default ProfilePortfolioComponent;
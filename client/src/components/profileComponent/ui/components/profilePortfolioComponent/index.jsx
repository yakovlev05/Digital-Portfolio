import styles from './styles.module.scss'
import AuthContext from "../../../../../contexts/AuthContext";
import {useContext} from "react";
import RecipesCardsComponent from "../../../../recipesCardsComponent";

const Index = () => {
    const auth = useContext(AuthContext);

    return (
        <>
            {/*{auth.canChange &&*/}
            {/*    <div className={styles.profile}>*/}
            {/*        <p>Здесь пока ничего нет. Тут будут отображаться ваши рецепты</p>*/}
            {/*        <button className={styles.button}>Опубликовать</button>*/}
            {/*    </div>*/}
            {/*}*/}

            {/*{!auth.canChange &&*/}
            {/*    <div className={styles.profile}>*/}
            {/*        <p>Пользователь не опубликовал ни одного рецепта</p>*/}
            {/*    </div>*/}
            {/*}*/}

            <RecipesCardsComponent/>
        </>
    )
}

export default Index;
import styles from './styles.module.scss'
import RecipesCardsComponent from "../../recipesCardsComponent";


const MoreRecipesFromAuthorComponent = ({isAuthorized = false, userLogin = null, filterNameUrl = null, recipeCount = 0}) => {
    return (
        <>
            {
                recipeCount - 1 !== 0 &&

                <div className={styles.moreRecipesContainer}>
                    <h1 className={styles.title}>Ещё рецепты от автора</h1>
                    <RecipesCardsComponent isAuthorized={isAuthorized}
                                           isAnother={true}
                                           userRequest={userLogin}
                                           isPortfolio={true}
                                           // filterNameUrl={filterNameUrl} // Лучше на бэке сделать отдельный эндпоинт
                    />
                </div>
            }
        </>
    )
}

export default MoreRecipesFromAuthorComponent;
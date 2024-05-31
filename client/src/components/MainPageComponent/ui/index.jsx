import styles from './styles.module.scss';
import RecipesCardsComponent from "../../recipesCardsComponent";


const MainPageComponent = ({isLogged, userLogin}) => {
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.mainTitle}>Открой для себя удивительный мир кулинарии</h1>
            <div className={styles.cardFirst}>
                <h2 className={styles.cardFirstTitle}>Создайте профессиональное и аппетитное веб-портфолио для ваших
                    кулинарных шедевров</h2>
                <p className={styles.cardFirstDescription}>Приветствуем всех поваров, шеф-поваров и кулинарных
                    энтузиастов!
                    Позвольте нам раскрыть ваши таланты
                    миру с помощью нашего сервиса по созданию веб-портфолио</p>
            </div>
            <div className={styles.cardSecond}>
                <div className={styles.cardSecondCont}>
                    <h2 className={styles.cardSecondTitle}>Создайте свое портфолио</h2>
                    <ol className={styles.cardSecondList}>
                        <li>Зарегистрируйтесь</li>
                        <li>Настройте профиль</li>
                        <li>Добавьте свой контент</li>
                        <li>Опубликуйте и поделитесь своим портфолио</li>
                    </ol>
                </div>
            </div>

            <div className={styles.recipeContainer}>
                <h3 className={styles.recipeTitle}>Рецепты</h3>
                <RecipesCardsComponent
                    isAuthorized={isLogged}
                    isAnother={true}
                    isPortfolio={true}
                    userRequest={userLogin}
                />
            </div>
        </div>
    )
}

export default MainPageComponent;
import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import AddBookmarkRequestApi from "../../../apiServices/Bookmark/AddBookmarkRequestApi";
import {toast} from "react-toastify";
import updateToast from "../../../utilities/updateToast";
import DeleteBookmarkRequestApi from "../../../apiServices/Bookmark/DeleteBookmarkRequestApi";
import {useState} from "react";

const RecipePageComponent = ({recipe, isMyRecipe = false, isMyBookmark = false, isAuthorized = false}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [myRequirements, setMyRequirements] = useState({isMyRecipe: isMyRecipe, isMyBookmark: isMyBookmark});

    console.log(myRequirements.isMyBookmark)
    const addBookmarkHandle = async () => {
        if (!isAuthorized) {
            navigate('/login');
            return;
        }
        const id = toast.loading('Добавление в избранное...');

        const response = AddBookmarkRequestApi(token, recipe.recipeUrl);

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Добавлено в избранное', id);
                    setMyRequirements({...myRequirements, isMyBookmark: true});
                } else {
                    updateToast('error', 'Ошибка добавления в избранное', id);
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошика при добавлении в избранное', id))
    }

    const removeBookmarkHandle = async () => {
        const id = toast.loading('Удаление из избранного...');

        const response = DeleteBookmarkRequestApi(token, recipe.recipeUrl);

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Удалено из избранного', id);
                    setMyRequirements({...myRequirements, isMyBookmark: false})
                } else {
                    updateToast('error', 'Ошибка удаления из избранного', id);
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошика при удалении из избранного', id));
    }

    return (
        <div className={styles.body}>
            <div className={styles.recipeContainer}>
                <h1 className={styles.recipeName}>{recipe.name}</h1>
                <div className={styles.recipeInfoContainer}>
                    <img className={styles.mainImage} src={`/api/v1/content/image/${recipe.imageName}`}
                         alt='главное фото блюда'/>
                    <ul className={styles.cardsInfoList}>
                        <li className={styles.cardAuthor} onClick={() => navigate(`/${recipe.authorLogin}`)}>
                            <img className={styles.photoAuthor} src={`/api/v1/content/image/${recipe.authorImage}`}
                                 alt='автор'/>
                            <a className={styles.loginAuthor} href={`/${recipe.authorLogin}`}>{recipe.authorLogin}</a>
                        </li>
                        <li className={styles.cardInfo}>{recipe.category}</li>
                        <li className={styles.cardTime}>{recipe.cookingTimeInMinutes} минут</li>
                        {
                            (!isAuthorized || !myRequirements.isMyBookmark) && !myRequirements.isMyRecipe &&
                            <li className={styles.cardBookmark} onClick={addBookmarkHandle}>Добавить в избранное</li>
                        }
                        {
                            myRequirements.isMyBookmark && !myRequirements.isMyRecipe &&
                            <li className={styles.cardBookmark} onClick={removeBookmarkHandle}>Удалить из
                                избранного</li>
                        }
                        {
                            myRequirements.isMyRecipe &&
                            <li className={styles.cardEdit} onClick={() => navigate(`edit`)}>Редактировать</li>
                        }
                    </ul>
                </div>
                <div className={styles.descriptionContainer}>
                    <h2 className={styles.descriptionTitle}>Описание</h2>
                    <p className={styles.descriptionText}>{recipe.description}</p>
                </div>
                <div className={styles.ingredientsContainer}>
                    <h2 className={styles.ingredientsTitle}>Ингредиенты</h2>
                    <ul className={styles.ingredientsList}>
                        {
                            recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <li key={index}>
                                        <div className={styles.ingredientElement}>
                                            <span>{ingredient.name}</span>
                                            <span className={styles.ingredientElementLine}></span>
                                            <span>{ingredient.quantity} {ingredient.unit}</span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.energyContainer}>
                    <h2 className={styles.energyTitle}>Энергетическая ценность</h2>
                    <ul className={styles.energyList}>
                        <li className={styles.energyElement}>
                            <h2 className={styles.energyElementTitle}>Калории</h2>
                            <p className={styles.energyElementValue}>{recipe.energy.caloriesFrom} - {recipe.energy.caloriesTo} ккал</p>
                        </li>
                        <li className={styles.energyElement}>
                            <h2 className={styles.energyElementTitle}>Жиры</h2>
                            <p className={styles.energyElementValue}>{recipe.energy.fatsFrom} - {recipe.energy.fatsTo} г</p>
                        </li>
                        <li className={styles.energyElement}>
                            <h2 className={styles.energyElementTitle}>Углеводы</h2>
                            <p className={styles.energyElementValue}>{recipe.energy.carbohydratesFrom} - {recipe.energy.carbohydratesTo} г</p>
                        </li>
                        <li className={styles.energyElement}>
                            <h2 className={styles.energyElementTitle}>Белки</h2>
                            <p className={styles.energyElementValue}>{recipe.energy.proteinsFrom} - {recipe.energy.proteinsTo} г</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.stepsContainer}>
                    <h2 className={styles.stepsTitle}>Инструкция приготовления</h2>
                    <ul className={styles.stepsList}>
                        {
                            recipe.steps.map((step, index) => {
                                return (
                                    <li className={styles.stepElement} key={index}>
                                        <h3 className={styles.stepElementTitle}>{step.stepNumber} шаг</h3>
                                        <p className={styles.stepElementDescription}>{step.description}</p>
                                        <img className={styles.stepElementImage}
                                             src={`/api/v1/content/image/${step.imageName}`}
                                             alt='шаг'/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RecipePageComponent;
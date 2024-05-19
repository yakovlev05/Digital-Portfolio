import styles from './styles.module.scss';
import star from './img/star.png'
import {useParams} from "react-router-dom";


const RecipeCardComponent = ({recipe}) => {
    const {username} = useParams();
    if (recipe.rating === 0) recipe.rating = 5;
    const canChange = username === undefined;

    return (
        <div className={styles.recipeCard}>
            <img className={styles.image} src={`/api/v1/content/image/${recipe.imageName}`} alt='блюдо' width='150'
                 height='150'/>
            <h3 className={styles.name}>{recipe.name}</h3>
            <p className={styles.rating}>
                <span>Рейтинг :</span>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 1 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 2 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 3 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 4 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 5 ? 'visible' : 'hidden'}}/>
            </p>
            <p className={styles.time}>Время: {recipe.cookingTimeInMinutes} минут</p>
            <p className={styles.ingredients}>ингредиентов: {recipe.ingredientsCount}</p>
            <p className={styles.category}>{recipe.category}</p>
            <button className={styles.button} style={{display: canChange ? 'block' : 'none'}}>Редактировать</button>
            <button className={styles.buttonBookmark} style={{display: canChange ? 'none' : 'block'}}>Добавить в
                избранное
            </button>
        </div>
    )
}


export default RecipeCardComponent;
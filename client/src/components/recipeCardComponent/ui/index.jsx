import styles from './styles.module.scss';
import placeimg from './img/test.jpg'
import star from './img/star.png'


const RecipeCardComponent = () => {
    return (
        <div className={styles.recipeCard}>
            <img className={styles.image} src={placeimg} alt='блюдо' width='150' height='150'/>
            <h3 className={styles.name}>Поке</h3>
            <p className={styles.rating}>
                <span>Рейтинг :</span>
                <img className={styles.star} src={star} alt='rating' width='20'  height='20'/>
                <img className={styles.star} src={star} alt='rating' width='20'  height='20'/>
                <img className={styles.star} src={star} alt='rating' width='20'  height='20'/>
                <img className={styles.star} src={star} alt='rating' width='20'  height='20'/>
                <img className={styles.star} src={star} alt='rating' width='20'  height='20'/>
            </p>
            <p className={styles.time}>Время: 40 минут</p>
            <p className={styles.ingredients}>11 ингредиентов</p>
            <p className={styles.category}>Гавайская кухня</p>
            <button className={styles.button}>Редактировать</button>
        </div>
    )
}


export default RecipeCardComponent;
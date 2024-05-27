import styles from './styles.module.scss';
import emptyImg from './img/emptyImg.png';
import RecipeModel from "../../../models/RecipeModel";

const CreateRecipeMainInfoComponent = ({recipe, setRecipe}) => {
    return (
        <>
            <div className={styles.infoContainer}>
                <img src={recipe.mainImageName ? `/api/v1/content/image/${recipe.mainImageName}` : emptyImg}
                     alt='фото блюда' className={styles.infoImage}/>
                <ul className={styles.infoList}>
                    <li className={styles.infoListElement}>
                        <p className={styles.inputLabel}>Название*</p>
                        <input
                            type={"text"}
                            placeholder={'Добавть название'}
                            className={styles.infoInputField}
                            onInput={(e) => setRecipe(prevRecipe => new RecipeModel({
                                ...prevRecipe,
                                name: e.target.value
                            }))}
                            value={recipe.name}
                        />
                    </li>
                    <li className={styles.infoListElement}>
                        <p className={styles.inputLabel}>Время приготовления*</p>
                        <input type={"text"}
                               placeholder={'Добавить время'}
                               className={styles.infoInputField}
                               onInput={e => setRecipe(prevRecipe => {
                                   if (isNaN(e.target.value)) return prevRecipe;
                                   return new RecipeModel({
                                       ...prevRecipe,
                                       cookingTimeInMinutes: e.target.value
                                   })
                               })}
                               value={recipe.cookingTimeInMinutes}
                        />
                    </li>
                    <li>
                        <p className={styles.inputLabel}>Кухня*</p>
                        <input
                            type={'text'}
                            placeholder={'Выберите кухню'}
                            className={styles.infoInputField}
                            onInput={e => setRecipe(prevRecipe => new RecipeModel({
                                ...prevRecipe,
                                category: e.target.value
                            }))}
                            value={recipe.category}
                        />
                    </li>
                </ul>
            </div>
            <div className={styles.descriptionContainer}>
                <p className={styles.inputLabel}>Описание*</p>
                <textarea
                    placeholder={'Добавьте описание'}
                    className={styles.descriptionInput}
                    onInput={e => setRecipe(prevRecipe => new RecipeModel({
                        ...prevRecipe,
                        description: e.target.value
                    }))}
                    value={recipe.description}
                ></textarea>
            </div>
        </>
    )
}

export default CreateRecipeMainInfoComponent;
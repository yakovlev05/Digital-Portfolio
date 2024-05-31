import styles from './styles.module.scss';
import CreateRecipeMainInfoComponent from "../../CreateRecipeMainInfoComponent";
import CreateRecipeIngredientsComponent from "../../CreateRecipeIngredientsComponent";
import CreateRecipeEnergyComponent from "../../CreateRecipeEnergyComponent";
import CreateRecipeStepsComponent from "../../CreateRecipeStepsComponent";
import EditRecipeSubmitButtonsComponent from "../../EditRecipeSubmitButtonsComponent";

const EditRecipeComponent = ({recipe, setRecipe, recipeUrl}) => {
    return (
        <div className={styles.mainContainer}>
            <CreateRecipeMainInfoComponent
                recipe={recipe}
                setRecipe={setRecipe}
            />
            <CreateRecipeIngredientsComponent
                recipe={recipe}
                setRecipe={setRecipe}
            />
            <CreateRecipeEnergyComponent
                recipe={recipe}
                setRecipe={setRecipe}
            />
            <CreateRecipeStepsComponent
                recipe={recipe}
                setRecipe={setRecipe}
            />
            <EditRecipeSubmitButtonsComponent
                recipe={recipe}
                recipeUrl={recipeUrl}
            />
        </div>
    )
}

export default EditRecipeComponent;
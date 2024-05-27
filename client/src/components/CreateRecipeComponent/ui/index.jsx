import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import RecipeModel from "../../../models/RecipeModel";
import CreateRecipeMainInfoComponent from "../../CreateRecipeMainInfoComponent";
import CreateRecipeIngredientsComponent from "../../CreateRecipeIngredientsComponent";

const CreateRecipeComponent = () => {
    const [recipe, setRecipe] = useState(new RecipeModel());


    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    return (
        <div className={styles.mainContainer}>
            <CreateRecipeMainInfoComponent
                recipe={recipe}
                setRecipe={setRecipe}
            />
            <CreateRecipeIngredientsComponent
                setRecipe={setRecipe}
                recipe={recipe}
            />
        </div>
    )
}

export default CreateRecipeComponent;
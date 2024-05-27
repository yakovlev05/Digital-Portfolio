import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import RecipeModel from "../../../models/RecipeModel";

const CreateRecipeComponent = () => {
    const [recipe, setRecipe] = useState(new RecipeModel());
    
    return (
        <h1>Делаем рецепт</h1>
    )
}

export default CreateRecipeComponent;
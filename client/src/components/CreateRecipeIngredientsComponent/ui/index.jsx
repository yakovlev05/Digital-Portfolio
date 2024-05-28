import styles from './styles.module.scss';
import CreateRecipeIngredientComponent from "../../CreateRecipeIngredientComponent";
import RecipeIngredientEntity from "../../../models/RecipeIngredientEntity";
import RecipeModel from "../../../models/RecipeModel";

const CreateRecipeIngredientsComponent = ({recipe, setRecipe}) => {

    const onInputName = (e, index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = new RecipeIngredientEntity({...newIngredients[index], name: e.target.value});
        setRecipe(new RecipeModel({...recipe, ingredients: newIngredients}));
    }

    const onInputQuantity = (e, index) => {
        if (isNaN(e.target.value)) return;
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = new RecipeIngredientEntity({...newIngredients[index], quantity: e.target.value});
        setRecipe(new RecipeModel({...recipe, ingredients: newIngredients}));
    }

    const onInputUnit = (e, index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = new RecipeIngredientEntity({...newIngredients[index], unit: e.target.value});
        setRecipe(new RecipeModel({...recipe, ingredients: newIngredients}));
    }

    const onDelete = (indexRemove) => {
        if (recipe.ingredients.length === 1) return;
        const newIngredients = recipe.ingredients.filter((ingredient, index) => index !== indexRemove)
        setRecipe(new RecipeModel({...recipe, ingredients: newIngredients}));
    }

    const onAdd = () => {
        const newIngredients = [...recipe.ingredients, new RecipeIngredientEntity()]
        setRecipe(new RecipeModel({...recipe, ingredients: newIngredients}));
    }

    return (
        <div>
            <p className={styles.label}>Список ингредиентов*</p>
            {
                recipe.ingredients.map((ingredient, index) =>
                    <CreateRecipeIngredientComponent
                        key={index}
                        ingredient={ingredient}
                        index={index}
                        onInputName={onInputName}
                        onInputQuantity={onInputQuantity}
                        onInputUnit={onInputUnit}
                        onDelete={onDelete}
                        onAdd={onAdd}
                        addButtonVisible={index === recipe.ingredients.length - 1}
                        deleteIsVisible={index > 0}
                    />
                )
            }
        </div>
    )
}

export default CreateRecipeIngredientsComponent;
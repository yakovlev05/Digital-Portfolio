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

    return (
        <div>
            {
                recipe.ingredients.map((ingredient, index) =>
                    <CreateRecipeIngredientComponent
                        key={index}
                        ingredient={ingredient}
                        index={index}
                        onInputName={onInputName}
                        onInputQuantity={onInputQuantity}
                        onInputUnit={onInputUnit}
                    />
                )
            }
        </div>
    )
}

export default CreateRecipeIngredientsComponent;
import RecipeEnergyEntity from "./RecipeEnergyEntity";
import RecipeIngredientEntity from "./RecipeIngredientEntity";
import RecipeStepEntity from "./RecipeStepEntity";

class RecipeModel {
    constructor(json) {
        if (json) {
            this.name = json.name;
            this.mainImageName = json.mainImageName ? json.mainImageName : json.imageName;
            this.category = json.category;
            this.cookingTimeInMinutes = json.cookingTimeInMinutes;
            this.description = json.description;
            this.ingredients = json.ingredients.map(ingredient => new RecipeIngredientEntity(ingredient));
            this.energy = new RecipeEnergyEntity(json.energy);
            this.steps = json.steps.map(step => new RecipeStepEntity(step));
        } else {
            this.name = '';
            this.mainImageName = '';
            this.category = '';
            this.cookingTimeInMinutes = '';
            this.description = '';
            this.ingredients = [new RecipeIngredientEntity()];
            this.energy = new RecipeEnergyEntity()//Изменить
            this.steps = [new RecipeStepEntity()];
        }

    }
}

export default RecipeModel;
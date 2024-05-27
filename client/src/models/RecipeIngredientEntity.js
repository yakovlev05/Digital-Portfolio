class RecipeIngredientEntity {
    constructor(json) {
        if (json) {
            this.name = json.name;
            this.quantity = json.quantity;
            this.unit = json.unit;
        } else {
            this.name = null;
            this.quantity = null;
            this.unit = null;
        }
    }
}

export default RecipeIngredientEntity;
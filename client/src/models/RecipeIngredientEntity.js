class RecipeIngredientEntity {
    constructor(json) {
        if (json) {
            this.name = json.name;
            this.quantity = json.quantity;
            this.unit = json.unit;
        } else {
            this.name = '';
            this.quantity = 0;
            this.unit = '';
        }
    }
}

export default RecipeIngredientEntity;
class RecipeEnergyEntity {
    constructor(json) {
        if (json) {
            this.caloriesFrom = json.caloriesFrom;
            this.caloriesTo = json.caloriesTo;
            this.fatsFrom = json.fatsFrom;
            this.fatsTo = json.fatsTo;
            this.carbohydratesFrom = json.carbohydratesFrom;
            this.carbohydratesTo = json.carbohydratesTo;
            this.proteinsFrom = json.proteinsFrom;
            this.proteinsTo = json.proteinsTo;
        } else {
            this.caloriesFrom = null;
            this.caloriesTo = null;
            this.fatsFrom = null;
            this.fatsTo = null;
            this.carbohydratesFrom = null;
            this.carbohydratesTo = null;
            this.proteinsFrom = null;
            this.proteinsTo = null;
        }
    }
}

export default RecipeEnergyEntity;
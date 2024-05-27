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
            this.caloriesFrom = 0;
            this.caloriesTo = 0;
            this.fatsFrom = 0;
            this.fatsTo = 0;
            this.carbohydratesFrom = 0;
            this.carbohydratesTo = 0;
            this.proteinsFrom = 0;
            this.proteinsTo = 0;
        }
    }
}

export default RecipeEnergyEntity;
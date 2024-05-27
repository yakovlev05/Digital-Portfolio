class RecipeStepEntity {
    constructor(json) {
        if (json) {
            this.stepNumber = json.stepNumber;
            this.description = json.description;
            this.imageName = json.imageName;
        } else {
            this.stepNumber = null;
            this.description = null;
            this.imageName = null;
        }
    }
}

export default RecipeStepEntity;
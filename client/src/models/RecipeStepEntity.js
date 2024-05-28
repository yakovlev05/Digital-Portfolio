class RecipeStepEntity {
    constructor(json) {
        if (json) {
            this.stepNumber = json.stepNumber;
            this.description = json.description;
            this.imageName = json.imageName;
        } else {
            this.stepNumber = 1;
            this.description = '';
            this.imageName = '';
        }
    }
}

export default RecipeStepEntity;
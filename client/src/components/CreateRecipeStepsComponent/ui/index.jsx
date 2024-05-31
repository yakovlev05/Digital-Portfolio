import styles from './styles.module.scss';
import CreateRecipeStepComponent from "../../CreateRecipeStepComponent";
import RecipeStepEntity from "../../../models/RecipeStepEntity";
import RecipeModel from "../../../models/RecipeModel";

const CreateRecipeStepsComponent = ({recipe, setRecipe}) => {

    const onUpdateImage = (imageName, index) => {
        const newSteps = [...recipe.steps];
        newSteps[index] = new RecipeStepEntity({...newSteps[index], imageName});
        setRecipe(new RecipeModel({...recipe, steps: newSteps}));
    }

    const onUpdateDescription = (description, index) => {
        const newSteps = [...recipe.steps];
        newSteps[index] = new RecipeStepEntity({...newSteps[index], description});
        setRecipe(new RecipeModel({...recipe, steps: newSteps}));
    }

    const onDelete = (indexRemove) => {
        if (recipe.steps.length === 1) return;
        const newSteps = recipe.steps.filter((step, index) => index !== indexRemove);
        newSteps.forEach((step, index) => step.stepNumber = index + 1);
        setRecipe(new RecipeModel({...recipe, steps: newSteps}));
    }

    const onAdd = () => {
        const newEntity = new RecipeStepEntity({stepNumber: recipe.steps.length + 1, imageName: '', description: ''})
        const newSteps = [...recipe.steps, newEntity];
        setRecipe(new RecipeModel({...recipe, steps: newSteps}));
    }

    return (
        <div className={styles.container}>
            <p className={styles.label}>Инструкция приготовления*</p>
            {
                recipe.steps.map((step, index) =>
                    <CreateRecipeStepComponent
                        step={step}
                        index={index}
                        key={index}
                        onUpdateImage={onUpdateImage}
                        onUpdateDescription={onUpdateDescription}
                        onDelete={onDelete}
                        deleteIsVisible={index > 0}
                    />
                )
            }
            <button className={styles.addButton} onClick={onAdd}></button>
        </div>
    )
}

export default CreateRecipeStepsComponent;
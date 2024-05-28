import styles from './styles.module.scss';
import RecipeModel from "../../../models/RecipeModel";
import RecipeEnergyEntity from "../../../models/RecipeEnergyEntity";

const CreateRecipeEnergyComponent = ({recipe, setRecipe}) => {

    const updateField = (e, field) => {
        if (isNaN(e.target.value)) return;
        const newEnergy = new RecipeEnergyEntity({...recipe.energy, [field]: e.target.value});
        setRecipe(new RecipeModel({...recipe, energy: newEnergy}))
    }

    return (
        <div className={styles.container}>
            <p className={styles.mainLabel}>Энергетическая ценность*</p>
            <ul className={styles.energyList}>
                <li>
                    <p className={styles.energyLabel}>Калории</p>
                    <div>
                        <input
                            type={"text"}
                            placeholder={'От'}
                            className={styles.inputField}
                            value={recipe.energy.caloriesFrom}
                            onInput={e => updateField(e, 'caloriesFrom')}
                        />
                        <span className={styles.inputSeparator}>-</span>
                        <input
                            type={"text"}
                            placeholder={'До'}
                            className={styles.inputField}
                            value={recipe.energy.caloriesTo}
                            onInput={e => updateField(e, 'caloriesTo')}
                        />
                    </div>
                </li>
                <li>
                    <p className={styles.energyLabel}>Жиры</p>
                    <div>
                        <input
                            type={"text"}
                            placeholder={'От'}
                            className={styles.inputField}
                            value={recipe.energy.fatsFrom}
                            onInput={e => updateField(e, 'fatsFrom')}
                        />
                        <span className={styles.inputSeparator}>-</span>
                        <input
                            type={"text"}
                            placeholder={'До'}
                            className={styles.inputField}
                            value={recipe.energy.fatsTo}
                            onInput={e => updateField(e, 'fatsTo')}
                        />
                    </div>
                </li>
                <li>
                    <p className={styles.energyLabel}>Углеводы</p>
                    <div>
                        <input
                            type={"text"}
                            placeholder={'От'}
                            className={styles.inputField}
                            value={recipe.energy.carbohydratesFrom}
                            onInput={e => updateField(e, 'carbohydratesFrom')}
                        />
                        <span className={styles.inputSeparator}>-</span>
                        <input
                            type={"text"}
                            placeholder={'До'}
                            className={styles.inputField}
                            value={recipe.energy.carbohydratesTo}
                            onInput={e => updateField(e, 'carbohydratesTo')}
                        />
                    </div>
                </li>
                <li>
                    <p className={styles.energyLabel}>Белки</p>
                    <div>
                        <input
                            type={"text"}
                            placeholder={'От'}
                            className={styles.inputField}
                            value={recipe.energy.proteinsFrom}
                            onInput={e => updateField(e, 'proteinsFrom')}
                        />
                        <span className={styles.inputSeparator}>-</span>
                        <input
                            type={"text"}
                            placeholder={'До'}
                            className={styles.inputField}
                            value={recipe.energy.proteinsTo}
                            onInput={e => updateField(e, 'proteinsTo')}
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CreateRecipeEnergyComponent;
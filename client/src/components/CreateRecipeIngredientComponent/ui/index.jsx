import styles from './styles.module.scss';

const CreateRecipeIngredientComponent = ({ingredient, index, onInputName, onInputQuantity, onInputUnit}) => {

    return (
        <div>
            <input
                type={"text"}
                placeholder={'Введите ингредиент'}
                className={styles.name}
                value={ingredient.name}
                onInput={e => onInputName(e, index)}
            />
            <input
                type={"text"}
                placeholder={'Кол-во'}
                className={styles.quantity}
                value={ingredient.quantity}
                onInput={e => onInputQuantity(e, index)}
            />
            <input
                type={"text"}
                placeholder={'Ед. измерения'}
                className={styles.unit}
                value={ingredient.unit}
                onInput={e => onInputUnit(e, index)}
            />
        </div>
    )
}

export default CreateRecipeIngredientComponent;
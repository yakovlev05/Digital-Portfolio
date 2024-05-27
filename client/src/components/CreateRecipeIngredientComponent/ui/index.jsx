import styles from './styles.module.scss';

const CreateRecipeIngredientComponent = ({
                                             ingredient,
                                             index,
                                             onInputName,
                                             onInputQuantity,
                                             onInputUnit,
                                             onDelete,
                                             onAdd,
                                             addButtonVisible
                                         }) => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.ingredientContainer}>
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
                <button className={styles.closeButton} onClick={() => onDelete(index)}>X</button>
            </div>
            {
                addButtonVisible &&
                <button className={styles.addButton} onClick={() => onAdd()}></button>
            }

        </div>
    )
}

export default CreateRecipeIngredientComponent;
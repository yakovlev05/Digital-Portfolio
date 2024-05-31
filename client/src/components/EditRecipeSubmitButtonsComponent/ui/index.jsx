import styles from './styles.module.scss';
import ModalComponent from "../../modal";
import UpdateRecipeRequestApi from "../../../apiServices/Recipe/UpdateRecipeRequestApi";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import updateToast from "../../../utilities/updateToast";
import DeleteRecipeRequestApi from "../../../apiServices/Recipe/DeleteRecipeRequestApi";

const EditRecipeSubmitButtonsComponent = ({recipe, recipeUrl}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const updateRecipeHandle = async () => {
        const id = toast.loading('Сохранение изменений...')
        const response = await UpdateRecipeRequestApi(token, recipe, recipeUrl);
        if (response.ok) {
            updateToast('success', 'Изменения сохранены', id);
            const json = await response.json();
            const newUrl = json.recipeUrl;
            navigate(`/recipe/${newUrl}`);
        } else {
            updateToast('error', 'Ошибка сохранения изменений', id);
        }
    }

    const deleteRecipeHandle = async () => {
        const id = toast.loading('Удаление рецепта...');
        const response = await DeleteRecipeRequestApi(token, recipeUrl);
        if (response.ok) {
            updateToast('success', 'Рецепт удалён', id);
            navigate('/me');
        } else {
            updateToast('error', 'Ошибка удаления рецепта', id);
        }
    }

    return (
        <div className={styles.buttonsContainer}>
            <ModalComponent
                titleButton={'Удалить'}
                title={'Удаление рецепта'}
                message={'Рецепт будет удалён, восстановить его не получится'}
                okButtonText={'Удалить'}
                stylesButton={styles.deleteButton}
                timeout={9999999999}
                handleSubmit={deleteRecipeHandle}
            />
            <button className={styles.saveButton} onClick={updateRecipeHandle}>Сохранить</button>
        </div>
    )
}

export default EditRecipeSubmitButtonsComponent;
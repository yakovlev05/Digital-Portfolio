import styles from './styles.module.scss';
import {toast} from "react-toastify";
import AddRecipeRequestApi from "../../../apiServices/Recipe/AddRecipeRequestApi";
import {useNavigate} from "react-router-dom";
import updateToast from "../../../utilities/updateToast";

const CreateRecipeSubmitButton = ({recipe}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const submitButtonHandle = async () => {
        const id = toast.loading('Публикация рецепта...');

        const response = AddRecipeRequestApi(token, recipe);

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Рецепт опубликован', id);
                    const json = await response.json();
                    navigate(`/recipe/${json.recipeUrl}`)
                } else {
                    const error = await response.json();
                    updateToast('error', `Заполните все поля`, id)
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка при отправке запроса', id))
    }

    return (
        <div className={styles.container}>
            <button className={styles.submitButton} onClick={submitButtonHandle}>Опубликовать</button>
        </div>
    )
}

export default CreateRecipeSubmitButton;
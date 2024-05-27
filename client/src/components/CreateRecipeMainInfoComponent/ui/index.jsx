import styles from './styles.module.scss';
import emptyImg from './img/emptyImg.png';
import RecipeModel from "../../../models/RecipeModel";
import {useRef} from "react";
import UploadImagesRequestApi from "../../../apiServices/Content/UploadImagesRequestApi";
import {toast} from "react-toastify";
import updateToast from "../../../utilities/updateToast";

const CreateRecipeMainInfoComponent = ({recipe, setRecipe}) => {
    const fileInputRef = useRef();
    const token = localStorage.getItem('token');

    const onFileChange = async (e) => {
        if (e.target.files.length === 0) return;
        const id = toast.loading("Загрузка фото...");
        const response = UploadImagesRequestApi(token, e.target.files, 450, 450, 100);

        response
            .then(async (response) => {
                if (response.ok) {
                    const json = await response.json();
                    setRecipe(prevRecipe => new RecipeModel({
                        ...prevRecipe,
                        mainImageName: json.imagesNames[0]
                    }))
                    updateToast('success', 'Фото загружено', id);
                } else {
                    updateToast('error', 'Ошибка загрузки фото', id);
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка при загрузке фото', id))
    }

    return (
        <>
            <div className={styles.infoContainer}>
                <img src={recipe.mainImageName ? `/api/v1/content/image/${recipe.mainImageName}` : emptyImg}
                     alt='фото блюда' className={styles.infoImage}
                     onClick={() => fileInputRef.current.click()}
                />
                <input
                    type={'file'}
                    accept={"image/*"}
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={onFileChange}
                />
                <ul className={styles.infoList}>
                    <li className={styles.infoListElement}>
                        <p className={styles.inputLabel}>Название*</p>
                        <input
                            type={"text"}
                            placeholder={'Добавьте название'}
                            className={styles.infoInputField}
                            onInput={(e) => setRecipe(prevRecipe => new RecipeModel({
                                ...prevRecipe,
                                name: e.target.value
                            }))}
                            value={recipe.name}
                        />
                    </li>
                    <li className={styles.infoListElement}>
                        <p className={styles.inputLabel}>Время приготовления*</p>
                        <input type={"text"}
                               placeholder={'Добавить время'}
                               className={styles.infoInputField}
                               onInput={e => setRecipe(prevRecipe => {
                                   if (isNaN(e.target.value)) return prevRecipe;
                                   return new RecipeModel({
                                       ...prevRecipe,
                                       cookingTimeInMinutes: e.target.value
                                   })
                               })}
                               value={recipe.cookingTimeInMinutes}
                        />
                    </li>
                    <li>
                        <p className={styles.inputLabel}>Кухня*</p>
                        <input
                            type={'text'}
                            placeholder={'Выберите кухню'}
                            className={styles.infoInputField}
                            onInput={e => setRecipe(prevRecipe => new RecipeModel({
                                ...prevRecipe,
                                category: e.target.value
                            }))}
                            value={recipe.category}
                        />
                    </li>
                </ul>
            </div>
            <div className={styles.descriptionContainer}>
                <p className={styles.inputLabel}>Описание*</p>
                <textarea
                    placeholder={'Добавьте описание'}
                    className={styles.descriptionInput}
                    onInput={e => setRecipe(prevRecipe => new RecipeModel({
                        ...prevRecipe,
                        description: e.target.value
                    }))}
                    value={recipe.description}
                ></textarea>
            </div>
        </>
    )
}

export default CreateRecipeMainInfoComponent;
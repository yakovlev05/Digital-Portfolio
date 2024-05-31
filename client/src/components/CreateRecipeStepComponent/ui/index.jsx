import styles from './styles.module.scss';
import emptyImg from './img/emptyImg.png'
import {useRef} from "react";
import {toast} from "react-toastify";
import UploadImagesRequestApi from "../../../apiServices/Content/UploadImagesRequestApi";
import updateToast from "../../../utilities/updateToast";

const CreateRecipeStepComponent = ({step, index, onUpdateImage, onUpdateDescription, onDelete, deleteIsVisible}) => {
    const fileInputRef = useRef();
    const token = localStorage.getItem('token');

    const onFileUpload = async (e) => {
        if (e.target.files.length === 0) return;
        const id = toast.loading("Загрузка фото...");
        const response = UploadImagesRequestApi(token, e.target.files, 400, 400, 100);

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Фото загружено', id)
                    const json = await response.json();
                    onUpdateImage(json.imagesNames[0], index)
                } else {
                    updateToast('error', 'Ошибка загрузки фото', id)
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка при загрузке фото', id))
    }

    return (
        <div className={styles.container}>
            <p className={styles.stepNumber}>{step.stepNumber} шаг</p>
            <img src={step.imageName ? `/api/v1/content/image/${step.imageName}` : emptyImg} alt='фото шага'
                 className={styles.image} onClick={() => fileInputRef.current.click()}/>
            <input
                type={'file'}
                accept={"image/*"}
                style={{display: 'none'}}
                ref={fileInputRef}
                onChange={onFileUpload}
            />
            <div className={styles.inputContainer}>
                <textarea placeholder='Описание шага' className={styles.inputField}
                          onInput={(e) => onUpdateDescription(e.target.value, index)}
                          value={step.description}
                ></textarea>
                {
                    deleteIsVisible &&
                    <button className={styles.closeButton} onClick={() => onDelete(index)}>X</button>
                }
            </div>
        </div>
    )
}

export default CreateRecipeStepComponent;
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import styles from './styles.module.scss';
import star from './img/star.png'
import {useEffect, useState} from "react";
import GetMyInfoAboutRecipeRequestApi from "../../../apiServices/Recipe/GetMyInfoAboutRecipeRequestApi";
import {toast} from "react-toastify";
import AddBookmarkRequestApi from "../../../apiServices/Bookmark/AddBookmarkRequestApi";
import updateToast from "../../../utilities/updateToast";
import DeleteBookmarkRequestApi from "../../../apiServices/Bookmark/DeleteBookmarkRequestApi";
import {useNavigate} from "react-router-dom";


const RecipeCardComponent = ({recipe, isAuthorized = false}) => {
    const navigate = useNavigate();
    if (recipe.rating === 0) recipe.rating = 5;
    const [myRequirements, setMyRequirements] = useState({isMyRecipe: false, isMyBookmark: false});
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (isAuthorized) IsMyBookmarkRequest(token, recipe.nameUrl);
        }

        fetchData()
            .then(() => setTimeout(() => setIsLoading(false), 500))
            .catch(() => toast.error('Ошибка при обращении к серверу'));
    }, [isAuthorized, recipe.nameUrl, token]);

    const IsMyBookmarkRequest = async (token, recipeUrl) => {
        const response = GetMyInfoAboutRecipeRequestApi(token, recipeUrl);

        response
            .then(async (response) => {
                var json = await response.json();
                if (response.ok) setMyRequirements(json);
            })
            .catch(() => toast.error("Ошибка при проверке наличия в избранном"));
    }

    const handleButtonAddBookmark = () => {
        if (!isAuthorized) {
            navigate('/login')
            return;
        }
        
        const id = toast.loading('Добавление в избранное...')
        const response = AddBookmarkRequestApi(token, recipe.nameUrl);

        response
            .then(async (response) => {
                if (response.ok) {
                    setMyRequirements({...myRequirements, isMyBookmark: true})
                    updateToast('success', 'Добавлено в избранное', id)
                } else updateToast('error', 'Ошибка при добавлении в избранное', id)
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка при добавлении в избранное', id));
    }

    const handleButtonDeleteBookmark = () => {
        const id = toast.loading('Удаление из избранного...')
        const response = DeleteBookmarkRequestApi(token, recipe.nameUrl);

        response
            .then(async (response) => {
                if (response.ok) {
                    setMyRequirements({...myRequirements, isMyBookmark: false})
                    updateToast('success', 'Удалено из избранного', id)
                } else updateToast('error', 'Ошибка при удалении из избранного', id)
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка при удалении из избранного', id));
    }

    return (
        <div className={styles.recipeCard}>
            <img className={styles.image} src={`/api/v1/content/image/${recipe.imageName}`} alt='блюдо' width='150'
                 height='150'/>
            <h3 className={styles.name}>{recipe.name}</h3>
            <p className={styles.rating}>
                <span>Рейтинг :</span>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 1 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 2 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 3 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 4 ? 'visible' : 'hidden'}}/>
                <img className={styles.star} src={star} alt='rating' width='20' height='20'
                     style={{visibility: recipe.rating >= 5 ? 'visible' : 'hidden'}}/>
            </p>
            <p className={styles.time}>Время: {recipe.cookingTimeInMinutes} минут</p>
            <p className={styles.ingredients}>ингредиентов: {recipe.ingredientsCount}</p>
            <p className={styles.category}>{recipe.category}</p>

            {!isLoading && myRequirements.isMyRecipe &&
                <button className={styles.button}>Редактировать</button>
            }

            {!isLoading && (!isAuthorized || !myRequirements.isMyRecipe) && !myRequirements.isMyBookmark &&
                <button className={styles.buttonBookmark} onClick={handleButtonAddBookmark}>Добавить в
                    избранное</button>
            }

            {!isLoading && myRequirements.isMyBookmark &&
                <button className={styles.buttonBookmark} onClick={handleButtonDeleteBookmark}>Удалить из
                    избранного</button>
            }

            <Spin indicator={<LoadingOutlined style={{fontSize: 40}} spin/>}
                  className={styles.spinner}
                  spinning={isLoading}
            />

        </div>
    )
}


export default RecipeCardComponent;
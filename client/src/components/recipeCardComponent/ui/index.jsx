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


const RecipeCardComponent = ({recipe, isAuthorized = false, isBookmarks = false, isPortfolio = false}) => {
    const navigate = useNavigate();
    const [myRequirements, setMyRequirements] = useState({isMyRecipe: false, isMyBookmark: false});
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (!isAuthorized) return;

            const response = await GetMyInfoAboutRecipeRequestApi(token, recipe.nameUrl);
            if (response.ok) {
                const json = await response.json();
                setMyRequirements(json);
            } else {
                toast.error("Ошибка при проверке наличия в избранном");
            }
        }

        const promise = Promise.all([fetchData()]);

        promise
            .then(() => setTimeout(() => setIsLoading(false), 500))
            .catch(() => toast.error('Ошибка при обращении к серверу'));

    }, [isAuthorized, recipe.nameUrl, token]);

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
            <a className={styles.name} href={`/recipe/${recipe.nameUrl}`}>
                {recipe.name.length > 25 ? recipe.name.slice(0, 25) + '...' : recipe.name}
            </a>
            <p className={styles.rating}>
                <span>Рейтинг:</span>
                {
                    recipe.rating === 0 &&
                    <span><b>&#8212;</b></span>
                }
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
            <p className={styles.time}>Время: {recipe.cookingTimeInMinutes} мин</p>
            <p className={styles.ingredients}>Ингредиентов: {recipe.ingredientsCount}</p>
            <p className={styles.category}>{recipe.category}</p>

            {!isLoading && myRequirements.isMyRecipe && !isBookmarks &&
                <button className={styles.button}
                        onClick={() => navigate(`/recipe/${recipe.nameUrl}/edit`)}>Редактировать</button>
            }

            {!isLoading && ((!isPortfolio && !myRequirements.isMyBookmark) || (isPortfolio && !myRequirements.isMyRecipe && !myRequirements.isMyBookmark)) &&
                <button className={styles.buttonBookmark} onClick={handleButtonAddBookmark}>Добавить в
                    избранное</button>
            }

            {!isLoading && ((!isPortfolio && myRequirements.isMyBookmark) || (isPortfolio && !myRequirements.isMyRecipe && myRequirements.isMyBookmark)) &&
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
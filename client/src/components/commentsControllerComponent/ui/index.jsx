import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import GetRecipeCommentsRequestApi from "../../../apiServices/Recipe/GetRecipeCommentsRequestApi";
import {toast} from "react-toastify";
import StarRatings from "react-star-ratings/build/star-ratings";
import AddCommentRequestApi from "../../../apiServices/Comment/AddCommentRequestApi";
import updateToast from "../../../utilities/updateToast";

const CommentsControllerComponent = ({recipeUrl, isAuthorized = false}) => {
    const [comments, setComments] = useState(null);
    const [page, setPage] = useState(1);
    const [newComment, setNewComment] = useState({recipeUrl: recipeUrl, rating: 0, description: ''});
    const [isLoaded, setIsLoaded] = useState(false);
    const token = localStorage.getItem('token');

    const getComments = async () => {
        const response = GetRecipeCommentsRequestApi(recipeUrl, page, 5);

        response
            .then(async (response) => {
                if (response.ok) {
                    const comments = await response.json();
                    setComments(comments);
                }
            })
            .catch(() => toast.error('Ошибка загрузки комментариев'))

        return response;
    }

    useEffect(() => {
        const fetchData = async () => Promise.all([getComments()]);

        fetchData()
            .then(() => setTimeout(() => setIsLoaded(true), 1000))
            .catch(() => toast.error('Ошибка загрузки данных'));
    }, [page]);

    const submitNewCommentHandle = async () => {
        if (!isAuthorized) {
            toast.error('Доступно только авторизованным пользователям');
            return;
        } else if (newComment.rating === 0) {
            toast.error('Оцените рецепт');
            return;
        } else if (newComment.description.length === 0) {
            toast.error('Напишите отзыв');
            return;
        }

        const id = toast.loading("Отправка отзыва...");
        const response = AddCommentRequestApi(token, newComment);

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Отзыв опубликован', id);
                } else {
                    if (response.statusCode === 401) updateToast('error', 'Доступно только авторизованным пользователям', id);
                    const error = await response.json();
                    updateToast('error', error.message, id);
                }
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка', id));
    }

    return (
        <div className={styles.reviewsSection}>
            <h1 className={styles.title}>Отзывы</h1>
            <div className={styles.reviewsContainer}>
                <div className={styles.newRatingContainer}>
                    <h2>Ваша оценка:</h2>
                    <StarRatings
                        numberOfStars={5}
                        rating={newComment.rating}
                        changeRating={(newRating) => setNewComment({...newComment, rating: newRating})}
                        starRatedColor={'#ED8A19'}
                        starHoverColor={'#ED8A19'}
                        starEmptyColor={'#959595'}
                        starDimension={'30px'}
                        starSpacing={'1px'}
                    />
                </div>
                <textarea className={styles.inputComment}
                          placeholder='Ваш отзыв'
                          onChange={(e) => setNewComment({...newComment, description: e.target.value})}></textarea>
                <button className={styles.commentButton} onClick={submitNewCommentHandle}>Отправить</button>
            </div>
        </div>
    )
}

export default CommentsControllerComponent;
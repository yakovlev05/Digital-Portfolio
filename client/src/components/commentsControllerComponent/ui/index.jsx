import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import GetRecipeCommentsRequestApi from "../../../apiServices/Recipe/GetRecipeCommentsRequestApi";
import {toast} from "react-toastify";
import StarRatings from "react-star-ratings/build/star-ratings";

const CommentsControllerComponent = ({recipeUrl}) => {
    const [comments, setComments] = useState(null);
    const [page, setPage] = useState(1);
    const [newRating, setNewRating] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

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


    return (
        <div className={styles.reviewsSection}>
            <h1 className={styles.title}>Отзывы</h1>
            <div className={styles.reviewsContainer}>
                <div className={styles.newRatingContainer}>
                    <h2>Ваша оценка:</h2>
                    <StarRatings
                        numberOfStars={5}
                        rating={newRating}
                        changeRating={(newRating) => setNewRating(newRating)}
                        starRatedColor={'#ED8A19'}
                        starHoverColor={'#ED8A19'}
                        starEmptyColor={'#959595'}
                        starDimension={'30px'}
                        starSpacing={'1px'}
                    />
                </div>
                <textarea className={styles.inputComment} placeholder='Ваш отзыв'></textarea>
                <button className={styles.commentButton}>Отправить</button>
            </div>
        </div>
    )
}

export default CommentsControllerComponent;
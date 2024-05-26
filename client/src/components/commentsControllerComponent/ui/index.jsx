import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import GetRecipeCommentsRequestApi from "../../../apiServices/Recipe/GetRecipeCommentsRequestApi";
import {toast} from "react-toastify";
import StarRatings from "react-star-ratings/build/star-ratings";
import AddCommentRequestApi from "../../../apiServices/Comment/AddCommentRequestApi";
import updateToast from "../../../utilities/updateToast";
import CommentComponent from "../../CommentComponent";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const CommentsControllerComponent = ({recipeUrl, isAuthorized = false}) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const count = 5;
    const [newComment, setNewComment] = useState({recipeUrl: recipeUrl, rating: 0, description: ''});
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    const getComments = async () => {
        const response = GetRecipeCommentsRequestApi(recipeUrl, page, count);

        response
            .then(async (response) => {
                if (response.ok) {
                    const jsonComments = await response.json();
                    if (jsonComments.comments.length < count) setIsEnd(true);
                    setComments([...comments, ...jsonComments.comments]);
                }
            })
            .catch(() => toast.error('Ошибка загрузки комментариев'))

        return response;
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => Promise.all([getComments()]);

        fetchData()
            .then(() => setTimeout(() => setIsLoading(false), 1000))
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
                <div className={styles.newCommentContainer}>
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

                <div className={styles.commentsContainer}>

                    {
                        comments.map((comment, index) => {
                            if (isLoading) {
                                if (index < page * count - count) return <CommentComponent
                                    comment={comment}
                                    key={index}/>
                            } else {
                                return <CommentComponent
                                    comment={comment}
                                    key={index}/>
                            }
                        })
                    }

                    <Spin indicator={<LoadingOutlined style={{fontSize: 56}} spin/>}
                          className={styles.spinner}
                          spinning={isLoading}
                    />

                    <button className={styles.moreButton} onClick={() => setPage(page + 1)}
                            style={{display: isLoading || isEnd ? 'none' : 'block'}}
                    >Больше
                    </button>

                </div>
            </div>
        </div>
    )
}

export default CommentsControllerComponent;
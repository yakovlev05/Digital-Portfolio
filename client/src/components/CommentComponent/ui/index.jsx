import styles from './styles.module.scss';
import StarRatings from "react-star-ratings/build/star-ratings";
import {useState} from "react";
import UpdateCommentRequestApi from "../../../apiServices/Comment/UpdateCommentRequestApi";
import {toast} from "react-toastify";
import updateToast from "../../../utilities/updateToast";


const CommentComponent = ({comment, myLogin = null}) => {
    const isMyComment = comment.userLogin === myLogin;
    const [showEdit, setShowEdit] = useState(false);
    const [editComment, setEditComment] = useState({
        guid: comment.guid,
        newRating: comment.rating,
        newDescription: comment.description
    });
    const token = localStorage.getItem('token');

    const saveButtonHandle = async () => {
        if (editComment.newRating === 0) {
            alert('Оценка не может быть равна 0');
            return;
        } else if (editComment.newDescription.length === 0) {
            alert('Введите комментарий');
            return;
        }

        const id = toast.loading('Сохранение изменений...')
        const response = UpdateCommentRequestApi(token, editComment);

        response
            .then(async (response) => {
                if (response.ok) {
                    updateToast('success', 'Изменения сохранены', id)
                    setShowEdit(false)
                    comment.rating = editComment.newRating;
                    comment.description = editComment.newDescription;
                } else updateToast('error', 'Ошибка при сохранении изменений', id)
            })
            .catch(() => updateToast('error', 'Непредвиденная ошибка при сохранении изменений', id));
    }

    return (
        <div className={styles.commentContainer}>
            <div className={styles.headerComment}>
                <h1 className={styles.authorLogin}>{comment.userLogin}</h1>
                {
                    !showEdit &&
                    <StarRatings
                        numberOfStars={5}
                        rating={comment.rating}
                        starEmptyColor={'#959595'}
                        starRatedColor={'#ED8A19'}
                        starDimension={'30px'}
                        starSpacing={'1px'}
                    />
                }
                <span className={styles.commentDate}>{comment.datePublished}</span>
            </div>
            {
                !showEdit &&
                <div>
                    <p className={styles.commentDescription}>{comment.description}</p>
                </div>
            }
            {
                showEdit &&
                <StarRatings
                    numberOfStars={5}
                    rating={editComment.newRating}
                    starEmptyColor={'#959595'}
                    starRatedColor={'#ED8A19'}
                    starHoverColor={'#ED8A19'}
                    changeRating={(newRating) => setEditComment({...editComment, newRating: newRating})}
                    starDimension={'30px'}
                    starSpacing={'1px'}
                />
            }
            {
                showEdit &&
                <textarea
                    defaultValue={comment.description}
                    className={styles.inputComment}
                    onChange={(e) => setEditComment({...editComment, newDescription: e.target.value})}></textarea>
            }
            {
                isMyComment && !showEdit &&
                <button className={styles.editButton} onClick={() => setShowEdit(true)}>Редактировать</button>
            }
            {
                showEdit &&
                <button className={styles.submitButton} onClick={saveButtonHandle}>Сохранить</button>
            }
        </div>
    )
}

export default CommentComponent;
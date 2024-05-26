import styles from './styles.module.scss';
import StarRatings from "react-star-ratings/build/star-ratings";


const CommentComponent = ({comment}) => {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.headerComment}>
                <h1 className={styles.authorLogin}>{comment.userLogin}</h1>
                <StarRatings
                    numberOfStars={5}
                    rating={comment.rating}
                    starEmptyColor={'#959595'}
                    starRatedColor={'#ED8A19'}
                    starDimension={'30px'}
                    starSpacing={'1px'}
                />
                <span className={styles.commentDate}>{comment.datePublished}</span>
            </div>
            <div>
                <p className={styles.commentDescription}>{comment.description}</p>
            </div>
        </div>
    )
}

export default CommentComponent;
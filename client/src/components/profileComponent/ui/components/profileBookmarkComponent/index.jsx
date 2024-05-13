import styles from './styles.module.scss';

const ProfileBookmarkComponent = ()=>{
    return(
        <div className={styles.bookmark}>
            <p>Здесь пока ничего нету. Тут будут отображаться ваши избранные рецепты</p>
            <button className={styles.button}>Добавить</button>
        </div>
    )
}

export default ProfileBookmarkComponent;
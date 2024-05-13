import styles from './styles.module.scss'

const Index = () => {
    return (
        <div className={styles.profile}>
            <p>Здесь пока ничего нету. Тут будут отображаться ваши рецепты</p>
            <button className={styles.button}>Опубликовать</button>
        </div>
    )
}

export default Index;
import styles from './styles.module.scss'
import logo from './img/logo.png'

const MainHeaderComponent = ({imageName}) => {
    return (
        <header className={styles.header}>
            <a className={styles.logo} href='/'>
                <img src={logo} alt='логотип' width='96' height='96'/>
            </a>
            <ul className={styles.navList}>
                <li className={styles.navElement}>
                    <a className={styles.url} href='/'>Главная</a>
                </li>
                <li className={styles.navElement}>
                    <a className={styles.url} href='/'>Рецепты</a>
                </li>
                <li className={styles.navElement}>
                    <a className={styles.url} href='/'>Портфолио</a>
                </li>
            </ul>
            <input className={styles.searchField} type='search' placeholder='Поиск'/>
            <div className={styles.auth} style={{display: imageName === undefined ? 'block' : 'none'}}>
                <a className={styles.url} href={'/login'}>Вход</a>
                /
                <a className={styles.url} href={'/registration'}>Регистрация</a>
            </div>
            <div style={{display: imageName !== undefined ? 'block' : 'none'}}>
                <a href={'/me'}>
                    <img className={styles.avatar} src={`/api/v1/content/image/${imageName}`} alt='аватар'></img>
                </a>
            </div>
        </header>
    )
}

export default MainHeaderComponent;

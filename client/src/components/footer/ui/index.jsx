import styles from './styles.module.scss';
import logo from './img/logo.png';


const FooterComponent = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <a className={styles.photoUrl} href={"/"}>
                    <img src={logo} alt={"logo"} width="96" height="96"/>
                </a>
                <ul className={styles.listNavigation}>
                    <li className={styles.listElement}>
                        <a className={styles.url} href={'/'}>Главная</a>
                    </li>
                    <li className={styles.listElement}>
                        <a className={styles.url} href={'/'}>Рецепты</a>
                    </li>
                    <li className={styles.listElement}>
                        <a className={styles.url} href={'/me'}>Портфолио</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default FooterComponent;
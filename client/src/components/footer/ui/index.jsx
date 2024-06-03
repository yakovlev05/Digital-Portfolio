import styles from './styles.module.scss';
import logo from './img/logo.png';
import {Link} from "react-router-dom";


const FooterComponent = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <Link to={'/'} className={styles.photoUrl}>
                    <img className={styles.photo} src={logo} alt={"logo"} width="96" height="96"/>
                </Link>
                <ul className={styles.listNavigation}>
                    <li className={styles.listElement}>
                        <Link to={'/'} className={styles.url}>Главная</Link>
                    </li>
                    <li className={styles.listElement}>
                        <Link to={'/recipes'} className={styles.url}>Рецепты</Link>
                    </li>
                    <li className={styles.listElement}>
                        <Link to={'/me'} className={styles.url}>Портфолио</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default FooterComponent;
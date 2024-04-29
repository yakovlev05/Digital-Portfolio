import './main.css'

const IndexPage = () => {
    return (
        <header>
            <nav>
                <ul className="main-list">
                    <li className="logo-element"><a href=""><img src="./img/logo-header.png" alt="logo" width="100"
                                                                 height="100"/></a></li>
                    <li className="main-element"><a href="">Главная</a></li>
                    <li className="recipes-element"><a href="">Рецепты</a></li>
                    <li className="portfolio-element"><a href="">Портфолио</a></li>
                    <li className="search-element">
                        <input type="search" id="search" placeholder="Поиск" aria-label="Поиск"/>
                    </li>
                    <li className="login-element">
                        <a href="/#">Войти</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default IndexPage;
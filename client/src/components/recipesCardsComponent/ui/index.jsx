import styles from './styles.module.scss';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import RecipeCardComponent from "../../recipeCardComponent";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import GetMyRecipesRequestApi from "../../../apiServices/User/GetMyRecipesRequestApi";
import GetUserRecipesRequestApi from "../../../apiServices/User/GetUserRecipesRequestApi";
import GetMyBookmarksRequestApi from "../../../apiServices/User/GetMyBookmarksRequestApi";
import {toast} from "react-toastify";
import SearchRecipesRequestApi from "../../../apiServices/Recipe/SearchRecipesRequestApi";


const RecipesCardsComponent = ({
                                   isPortfolio = false,
                                   isBookmarks = false,
                                   isSearch = false,
                                   isAuthorized = false,
                                   isAnother = false,
                                   userRequest = null,
                                   filterNameUrl = null,
                                   querySearch = null
                               }) => {
    const {username} = useParams();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(3);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            let response = null;
            if (isPortfolio && !isAnother && !isSearch) {
                if (username === undefined) response = GetMyRecipesRequestApi(token, page, count);
                else response = GetUserRecipesRequestApi(username, page, count);
            } else if (isBookmarks) {
                response = GetMyBookmarksRequestApi(token, page, count);
            } else if (isAnother) {
                response = response = GetUserRecipesRequestApi(userRequest, page, count);
            } else if (isSearch) {
                response = SearchRecipesRequestApi(querySearch ? {...querySearch, page: page} : {
                    page: page,
                    count: count
                })
            } else (response = GetMyRecipesRequestApi(token, page, count)); //  Временно, убери

            response
                .then(async (response) => {
                    if (response.ok) {
                        const data = await response.json();
                        if (data.recipes.length < count) setIsEnd(true);
                        if (querySearch && data.recipes.length < querySearch.count) setIsEnd(true);
                        setRecipes(recipes => [...recipes, ...data.recipes]);
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 1000)
                    } else {
                        toast.error('Ошибка при загрузке рецептов')
                    }
                })
                .catch(() => toast.error('Ошибка при загрузке рецептов'))
        }

        fetchData()
            .catch(() => toast.error('Непредвиденная ошибка при загрузке рецептов'))
    }, [count, isAnother, isBookmarks, isPortfolio, isSearch, page, token, userRequest, username, querySearch]);

    return (
        <>
            <div className={styles.container}>

                {recipes.map((recipe, index) => {
                    if (filterNameUrl === recipe.nameUrl) return null;
                    if (isLoading) {
                        if (index < page * count - count) return <RecipeCardComponent recipe={recipe}
                                                                                      key={index}
                                                                                      isAuthorized={isAuthorized}
                                                                                      isBookmarks={isBookmarks}
                                                                                      isPortfolio={isPortfolio}/>
                    } else {
                        return <RecipeCardComponent
                            recipe={recipe}
                            key={index}
                            isAuthorized={isAuthorized}
                            isBookmarks={isBookmarks}
                            isPortfolio={isPortfolio}/>
                    }
                })}

                <Spin indicator={<LoadingOutlined style={{fontSize: 56}} spin/>}
                      className={styles.spinner}
                    // style = {{visibility: isLoading ? 'visible' : 'hidden'}}
                      spinning={isLoading}
                />

                <button className={styles.button} onClick={() => setPage(page + 1)}
                        style={{display: isLoading || isEnd ? 'none' : 'block'}}
                    // style = {{visibility: isLoading ? 'hidden' : 'visible'}}
                >Больше
                </button>

            </div>
        </>
    )
}

export default RecipesCardsComponent;
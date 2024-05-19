import styles from './styles.module.scss';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import RecipeCardComponent from "../../recipeCardComponent";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import GetMyRecipesRequestApi from "../../../apiServices/User/GetMyRecipesRequestApi";
import GetUserRecipesRequestApi from "../../../apiServices/User/GetUserRecipesRequestApi";
import {toast} from "react-toastify";
import LoaderComponent from "../../LoaderComponent";


const RecipesCardsComponent = () => {
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
            if (username === undefined) response = await GetMyRecipesRequestApi(token, page, count);
            else response = await GetUserRecipesRequestApi(username, page, count);


            if (response.ok) {
                const data = await response.json();
                if (data.recipes.length < count) setIsEnd(true);
                setRecipes(recipes => [...recipes, ...data.recipes]);

            } else {
                toast.error('Ошибка при загрузке рецептов')
            }
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }

        fetchData();
    }, [count, page, token, username]);

    return (
        <>
            <div className={styles.container}>

                {recipes.map((recipe, index) => {
                    if (isLoading) {
                        if (index < page * count - count) return <RecipeCardComponent recipe={recipe}/>
                    } else {
                        return <RecipeCardComponent recipe={recipe}/>
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
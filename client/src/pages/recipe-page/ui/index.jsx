import styles from './styles.module.scss';
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import UserInfoContext from "../../../contexts/UserInfoContext";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import AuthContext from "../../../contexts/AuthContext";
import LoaderComponent from "../../../components/LoaderComponent";
import RecipePageComponent from "../../../components/recipePageComponent";
import {useParams} from "react-router-dom";
import GetRecipeRequestResponse from "../../../apiServices/Recipe/GetRecipeRequestResponse";
import GetMyInfoAboutRecipeRequestApi from "../../../apiServices/Recipe/GetMyInfoAboutRecipeRequestApi";
import {Helmet} from "react-helmet";
import MoreRecipesFromAuthorComponent from "../../../components/moreRecipesFromAuthorComponent";
import CommentsControllerComponent from "../../../components/commentsControllerComponent";

const RecipePage = () => {
    const {recipeNameUrl} = useParams();
    const [myInfo, setMyInfo] = useState(null);
    const [recipeInfo, setRecipeInfo] = useState(null);
    const [myRecipeAccess, setMyRecipeAccess] = useState(null);
    const [auth, setAuth] = useState({logged: false, canChange: false});
    const [isLoaded, setIsLoaded] = useState(false);
    const token = localStorage.getItem('token')

    const getMyInfo = async () => {
        const response = GetMyInfoRequestApi(token);

        response
            .then(async (response) => {
                if (response.ok) {
                    const myUserInfo = new UserInfo(await response.json());
                    setMyInfo(myUserInfo);
                    setAuth({logged: true, canChange: false}); //canChange не используется, проверка происходит в компоненте рецепта
                }
            })
            .catch(() => toast.error('Ошибка загрузки данных о пользователе'))
    }

    const getRecipeInfo = async () => {
        const response = GetRecipeRequestResponse(recipeNameUrl);

        response
            .then(async (response) => {
                if (response.ok) {
                    const recipeInfo = await response.json();
                    setRecipeInfo(recipeInfo);
                }
            })
            .catch(() => toast.error('Ошибка загрузки данных о рецепте'))
    }

    const getRecipeAccess = async () => {
        const response = GetMyInfoAboutRecipeRequestApi(token, recipeNameUrl);

        response
            .then(async (response) => {
                if (response.ok) {
                    const myRecipeAccess = await response.json();
                    setMyRecipeAccess(myRecipeAccess);
                }
            })
            .catch(() => toast.error('Ошибка при загрузке доступа к рецепту'))
    }

    useEffect(() => {
        const fetchData = async () => {
            return Promise.all([getMyInfo(), getRecipeInfo(), getRecipeAccess()]);
        }

        fetchData()
            .then(() => setTimeout(() => setIsLoaded(true), 400))
            .catch(() => toast.error('Ошибка загрузки данных'));
    }, []);

    if (!isLoaded || !recipeInfo) {
        return (
            <>
                <Helmet>
                    <title>Загрузка...</title>
                </Helmet>
                <LoaderComponent/>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Рецепт: {recipeInfo ? recipeInfo.name : 'Загрузка...'}</title>
            </Helmet>

            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.container}>
                        <MainHeaderComponent/>
                        <RecipePageComponent recipe={recipeInfo}/>
                        <MoreRecipesFromAuthorComponent
                            isAuthorized={auth.logged}
                            userLogin={recipeInfo.authorLogin}
                            filterNameUrl={recipeInfo.recipeUrl}
                            recipeCount={recipeInfo.countAuthorRecipes}
                        />
                        <CommentsControllerComponent
                            recipeUrl={recipeInfo.recipeUrl}
                            isAuthorized={auth.logged}
                        />
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default RecipePage;
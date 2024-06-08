import styles from './styles.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import RecipeModel from "../../../models/RecipeModel";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import {toast} from "react-toastify";
import GetRecipeRequestResponse from "../../../apiServices/Recipe/GetRecipeRequestResponse";
import GetMyInfoAboutRecipeRequestApi from "../../../apiServices/Recipe/GetMyInfoAboutRecipeRequestApi";
import LoaderComponent from "../../../components/LoaderComponent";
import {Helmet} from "react-helmet";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import EditRecipeComponent from "../../../components/EditRecipeComponent";

const EditRecipePage = () => {
    const {recipeNameUrl} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [recipe, setRecipe] = useState(new RecipeModel());
    const [myInfo, setMyInfo] = useState(null);
    const [auth, setAuth] = useState({logged: false, canChange: false});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const getMyInfo = async () => {
            const response = await GetMyInfoRequestApi(token);
            if (response.ok) {
                setMyInfo(new UserInfo(await response.json()));
                setAuth({logged: true, canChange: false});
            } else {
                navigate('/login');
            }
        }

        const getRecipe = async () => {
            const response = await GetRecipeRequestResponse(recipeNameUrl);
            if (response.ok) {
                const recipe = new RecipeModel(await response.json())
                setRecipe(recipe);
            } else {
                navigate('/search')
            }
        }

        const getMyRecipeRequirements = async () => {
            const response = await GetMyInfoAboutRecipeRequestApi(token, recipeNameUrl);
            if (response.ok) {
                const data = await response.json();
                if (!data.isMyRecipe) navigate('/me');
            } else {
                navigate('/login');
            }
        }

        const promise = Promise.all([getMyRecipeRequirements(), getRecipe(), getMyInfo()])
        promise
            .then(() => setTimeout(() => setIsLoading(false), 400))
            .catch(() => toast.error('Ошибка загрузки данных'))

    }, [navigate, recipeNameUrl, token]);

    if (isLoading) {
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
                <title>Редактирование: {recipe.name}</title>
            </Helmet>

            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.container}>
                        <MainHeaderComponent/>
                        <EditRecipeComponent
                            recipe={recipe}
                            setRecipe={setRecipe}
                            recipeUrl={recipeNameUrl}
                        />
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default EditRecipePage;
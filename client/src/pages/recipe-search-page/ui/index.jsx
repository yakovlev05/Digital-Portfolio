import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import LoaderComponent from "../../../components/LoaderComponent";
import {Helmet} from "react-helmet";
import AuthContext from "../../../contexts/AuthContext";
import UserInfoContext from "../../../contexts/UserInfoContext";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import SearchRecipeComponent from "../../../components/SearchRecipeComponent";

const RecipeSearchPage = () => {
    const token = localStorage.getItem('token');
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
            }
        }

        const promise = Promise.all([getMyInfo()]);
        promise
            .then(() => setTimeout(() => setIsLoading(false), 400))
            .catch(() => console.log('Ошибка загрузки данных'))
    }, [token]);

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
                <title>Поиск</title>
            </Helmet>

            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.container}>
                        <MainHeaderComponent/>
                        <SearchRecipeComponent/>
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default RecipeSearchPage;
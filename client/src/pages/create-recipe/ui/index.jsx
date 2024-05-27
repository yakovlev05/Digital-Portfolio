import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import {Helmet} from "react-helmet";
import LoaderComponent from "../../../components/LoaderComponent";
import {toast} from "react-toastify";
import AuthContext from "../../../contexts/AuthContext";
import UserInfoContext from "../../../contexts/UserInfoContext";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import CreateRecipeComponent from "../../../components/CreateRecipeComponent";

const CreateRecipePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [myInfo, setMyInfo] = useState(null);
    const [auth, setAuth] = useState({logged: false, canChange: false});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        const getMyInfo = async () => {
            const response = GetMyInfoRequestApi(token);

            response
                .then(async (response) => {
                    if (response.ok) {
                        setMyInfo(new UserInfo(await response.json()));
                        setAuth({logged: true, canChange: false});
                    } else {
                        navigate('/login');
                    }
                })
                .catch(() => toast.error('Ошибка загрузки данных о пользователе'));
        }

        const promise = Promise.all([getMyInfo()]);

        promise
            .then(() => setTimeout(() => setIsLoading(false), 400))
            .catch(() => toast.error('Непредвиденные ошибки'));
    }, [navigate, token]);

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
                <title>Новый рецепт</title>
            </Helmet>

            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.container}>
                        <MainHeaderComponent/>
                        <CreateRecipeComponent/>
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default CreateRecipePage;
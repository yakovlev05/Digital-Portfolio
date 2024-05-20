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

const RecipePage = () => {
    const [myInfo, setMyInfo] = useState(null);
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
                    setTimeout(() => setIsLoaded(true), 400);
                }
            })
            .catch(() => toast.error('Ошибка загрузки данных о пользователе'))
    }

    useEffect(() => {
        getMyInfo()
            .catch(() => toast.error('Ошибка загрузки данных о пользователе'));
    }, []);

    if (!isLoaded) {
        return <LoaderComponent/>;
    }

    return (
        <>
            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <MainHeaderComponent/>
                    <FooterComponent/>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default RecipePage;
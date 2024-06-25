import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";
import LoaderComponent from "../../../components/LoaderComponent";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import MainPageComponent from "../../../components/MainPageComponent";

const MainPage = () => {
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
            .catch(() => toast.error('Ошибка загрузки данных'))
    }, [token]);

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Chef's Gallery</title>
                </Helmet>
                <LoaderComponent/>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Chef's Gallery</title>
            </Helmet>

            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.container}>
                        <MainHeaderComponent/>
                        <MainPageComponent
                            isLogged={auth.logged}
                            userLogin={myInfo?.login}
                        />
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default MainPage;
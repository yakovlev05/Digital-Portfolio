import styles from './styles.module.scss';
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileEditComponent from "../../../components/profileEditComponent";
import {Helmet} from "react-helmet";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import {useEffect, useState} from "react";
import LoaderComponent from "../../../components/LoaderComponent";

const ProfileEditPage = () => {
    const [myInfo, setMyInfo] = useState(null);
    const [auth, setAuth] = useState({logged: false, canChange: false});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')

        const getInfo = async () => {
            const response = await GetMyInfoRequestApi(token);
            if (!response.ok) window.location.href = '/login';

            const myUserInfo = new UserInfo(await response.json());
            setMyInfo(myUserInfo);
            setAuth({logged: true, canChange: true});
            setTimeout(() => setIsLoaded(true), 400);
        }
        getInfo()
    }, []);

    if (!isLoaded) {
        return <LoaderComponent/>;
    }

    return (
        <>
            <Helmet>
                <title>Редактирование профиля</title>
            </Helmet>

            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.divContainer}>
                        <MainHeaderComponent/>
                        <ProfileEditComponent/>
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default ProfileEditPage;
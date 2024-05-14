import styles from './styles.module.scss';
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileComponent from "../../../components/profileComponent";
import {useEffect, useState} from "react";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import GetUserInfoRequestApi from "../../../apiServices/User/GetUserInfoRequestApi";
import {useParams} from "react-router-dom";
import UserInfo from "../../../models/UserInfo";
import LoaderComponent from "../../../components/LoaderComponent";

const ProfilePage = () => {
    const {username} = useParams();
    const [auth, setAuth] = useState({logged: false, canChange: false});
    const [userInfo, setUserInfo] = useState(null); // Информация просто о пользователе, которого посетили
    const [myUserInfo, setMyUserInfo] = useState(null); // Информация обо мне
    const [isLoaded, setIsLoaded] = useState(false);


    const token = localStorage.getItem('token');
    const getMyInfo = async () => {
        const response = await GetMyInfoRequestApi(token);
        if (!response.ok) window.location.href = '/login';
        return await response.json();
    }

    const getUserInfo = async () => {
        const response = await GetUserInfoRequestApi(username);
        if (!response.ok) window.location.href = '/me';
        return await response.json();
    }

    useEffect(() => {
        const loadData = async () => {
            if (username) {
                setMyUserInfo(new UserInfo(await getMyInfo()));
                setUserInfo(new UserInfo(await getUserInfo()));
                setAuth({logged: true, canChange: false})
                setIsLoaded(true);
            } else {
                const info = await getMyInfo();
                setMyUserInfo(new UserInfo(info));
                setUserInfo(new UserInfo(info));
                setAuth({logged: true, canChange: true});
                setIsLoaded(true);
            }
        }

        loadData();
    }, [])

    if (!isLoaded) {
        return null;// или отрисовать загрузочный индикатор
    }

    return (
        <>
            <AuthContext.Provider value={auth}>
                <UserInfoContext.Provider value={myUserInfo}>
                    <div className={styles.divContainer}>
                        <MainHeaderComponent/>
                        <UserInfoContext.Provider value={userInfo}>
                            <ProfileComponent/>
                        </UserInfoContext.Provider>
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default ProfilePage;
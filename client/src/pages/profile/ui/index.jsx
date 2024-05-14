import styles from './styles.module.scss';
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileComponent from "../../../components/profileComponent";
import {useEffect, useState} from "react";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";

const MePage = () => {
    const [isLogged, setIsLogged] = useState(false); // [1
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const getMyInfo = async () => {
            const response = await GetMyInfoRequestApi(token);
            if (!response.ok) window.location.href = '/login';
            setMyInfo(new UserInfo(await response.json()))
            setIsLogged(true)
        }
        getMyInfo();
    }, [])

    if (!myInfo) {
        return null; // или отрисовать загрузочный индикатор
    }

    return (
        <>
            <AuthContext.Provider value={isLogged}>
                <UserInfoContext.Provider value={myInfo}>
                    <div className={styles.divContainer}>
                        <MainHeaderComponent imageName={myInfo.profilePhoto}/>
                        <ProfileComponent/>
                        <FooterComponent/>
                    </div>
                </UserInfoContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default MePage;
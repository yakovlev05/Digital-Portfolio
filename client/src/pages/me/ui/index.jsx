import styles from './styles.module.scss';
import UserInfoContext from "../../../contexts/UserInfoContext";
import AuthContext from "../../../contexts/AuthContext";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileComponent from "../../../components/profileComponent";
import {useEffect, useState} from "react";
import GetMyInfo from "../../../apiServices/User/GetMyInfo";
import MyUserInfo from "../../../models/MyUserInfo";

const MePage = () => {
    const [isLogged, setIsLogged] = useState(false); // [1
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const getInfo = async () => {
            const response = await GetMyInfo(token);
            if (!response.ok) window.location.href = '/login';
            setMyInfo(new MyUserInfo(await response.json()))
            setIsLogged(true)
        }
        getInfo();
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
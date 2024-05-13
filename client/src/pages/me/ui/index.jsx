import styles from './styles.module.scss';
import UserInfoContext from "../../../contexts/UserInfoContext";
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileComponent from "../../../components/profileComponent";
import {useEffect, useState} from "react";
import ValidateToken from "../../../apiServices/Auth/ValidateToken";
import GetMyInfo from "../../../apiServices/User/GetMyInfo";

const MePage = () => {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const checkAuth = async () => {
            const response = await ValidateToken(token);
            if (!response.ok) window.location.href = '/login';
        }
        checkAuth();

        const getInfo = async () => {
            const response = await GetMyInfo(token);
            setMyInfo(await response.json())
        }
        getInfo();
    }, [])

    if (!myInfo) {
        return null; // или отрисовать загрузочный индикатор
    }

    return (
        <>
            <UserInfoContext.Provider value={myInfo}>
                <div className={styles.divContainer}>
                    <MainHeaderComponent imageName={myInfo.profilePhoto}/>
                    <ProfileComponent/>
                    <FooterComponent/>
                </div>
            </UserInfoContext.Provider>
        </>
    )
}

export default MePage;
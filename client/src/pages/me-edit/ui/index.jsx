import styles from './styles.module.scss';
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileEditComponent from "../../../components/profileEditComponent";
import {Helmet} from "react-helmet";
import GetMyInfoRequestApi from "../../../apiServices/User/GetMyInfoRequestApi";
import UserInfo from "../../../models/UserInfo";
import UserInfoContext from "../../../contexts/UserInfoContext";
import {useEffect, useState} from "react";

const MeEditPage = () => {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')

        const getInfo = async () => {
            const response = await GetMyInfoRequestApi(token);
            if (!response.ok) window.location.href = '/login';
            setMyInfo(new UserInfo(await response.json()));
        }
        getInfo()
    }, []);

    if (!myInfo) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>Редактирование профиля</title>
            </Helmet>

            <UserInfoContext.Provider value={myInfo}>
                <div className={styles.divContainer}>
                    <MainHeaderComponent/>
                    <ProfileEditComponent/>
                    <FooterComponent/>
                </div>
            </UserInfoContext.Provider>
        </>
    )
}

export default MeEditPage;
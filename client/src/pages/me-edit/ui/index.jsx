import styles from './styles.module.scss';
import MainHeaderComponent from "../../../components/mainHeader";
import FooterComponent from "../../../components/footer";
import ProfileEditComponent from "../../../components/profileEditComponent";

const MeEditPage = () => {
    return (
        <>
            <div className={styles.divContainer}>
                <MainHeaderComponent/>
                <ProfileEditComponent/>
                <FooterComponent/>
            </div>
        </>
    )
}

export default MeEditPage;
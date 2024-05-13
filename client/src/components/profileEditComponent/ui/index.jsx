import styles from './styles.module.scss';


const ProfileEditComponent = () => {
    return (
        <div className={styles.body}>
            <div className={styles.formsContainer}>
                <div className={styles.photoCont}>
                    <div>
                        <p className={styles.label}>Фотография</p>
                        <img className={styles.avatar}
                             src={"/api/v1/content/image/90b4a891-f05a-4134-8a63-d2c314d7fc2a.jpg"} width='100'
                             height='100'
                             alt='logo'/>
                    </div>
                    <button className={styles.updatePhotoButton}>Обновить фото</button>
                </div>
                <div className={styles.backCont}>
                    <a className={styles.url} href='/me'>Вернуться к профилю</a>
                </div>
                <div className={styles.nameCont}>
                    <p className={styles.label}>Имя</p>
                    <input className={styles.inputField} placeholder={'Имя'}/>
                </div>
                <div className={styles.secondNameCont}>
                    <p className={styles.label}>Фамилия</p>
                    <input className={styles.inputField} placeholder={'Фамилия'}/>
                </div>
                <div className={styles.thirdNameCont}>
                    <p className={styles.label}>Отчество</p>
                    <input className={styles.inputField} placeholder={'Отчество'}/>
                </div>
                <div className={styles.emailCont}>
                    <p className={styles.label}>Почта</p>
                    <input className={styles.inputField} placeholder={'Почта'}/>
                </div>
                <div className={styles.loginCont}>
                    <p className={styles.label}>Логин</p>
                    <input className={styles.inputField} placeholder={'Логин'}/>
                </div>
                <div className={styles.aboutCont}>
                    <p className={styles.label}>Обо мне</p>
                    <textarea className={styles.aboutTextArea} name={'about'} placeholder={'Обо мне'}></textarea>
                </div>
                <a className={`${styles.changePassword} ${styles.url}`}>Сменить пароль</a>
                <a className={`${styles.exit} ${styles.url}`}>Выйти из аккаунта</a>
                <button className={styles.save}>Сохранить изменения</button>
                <button className={styles.delete}>Удалить аккаунт</button>
            </div>
        </div>
    )
}

export default ProfileEditComponent;
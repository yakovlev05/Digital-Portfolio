import ConfirmEmailSuccessPage from "./success";
import ConfirmEmailErrorPage from "./error";
import ConfirmEmailRequestApi from "../../../apiServices/Auth/confirm-email";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";


const ConfirmEmailPage = () => {
    const [isSuccess, setIsSuccess] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        setId(toast.loading('Подтверждение почты...'));
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const response = await ConfirmEmailRequestApi(token);

            if (response.ok) setIsSuccess(true);
            else setIsSuccess(false);
        }
        fetchData();
    }, [])

    return (
        <>
            <Helmet>
                <title>Подтверждение почты</title>
            </Helmet>

            {isSuccess === null ? null :
                isSuccess ? <ConfirmEmailSuccessPage id={id}/> :
                    <ConfirmEmailErrorPage id={id}/>}
        </>
    )
}

export default ConfirmEmailPage;
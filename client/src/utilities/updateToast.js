import {toast} from "react-toastify";

const updateToast = (type, message, id, autoClose = 5000) => {
    toast.update(id, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: autoClose
    });
}

export default updateToast;
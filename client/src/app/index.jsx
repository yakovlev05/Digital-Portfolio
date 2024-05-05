import AppRouter from "../pages";
import {ToastContainer} from "react-toastify";
import React from "react";

const App = () => {
    return (
        <>
            <ToastContainer position={"bottom-right"} theme={"colored"}/> {/*Настрока уведомлений*/}
            <AppRouter/>
        </>
    )
}

export default App;
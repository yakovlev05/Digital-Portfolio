import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "../App";
import IndexPage from './index/ui'
import LoginPage from "./login";
import RegistrationPage from "./registration";
import ResetPasswordPage from "./reset-password";
import SetPasswordPage from "./set-password";
import ConfirmEmailPage from "./confirm-email";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/index' element={<IndexPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                    <Route path='/set-password' element={<SetPasswordPage/>}/>
                    <Route path='/confirm-email' element={<ConfirmEmailPage/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;
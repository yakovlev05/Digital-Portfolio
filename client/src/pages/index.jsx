import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "../App";
import IndexPage from './index/ui'
import LoginPage from "./login";
import RegistrationPage from "./registration";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/index' element={<IndexPage/>}/>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='registration' element={<RegistrationPage/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;
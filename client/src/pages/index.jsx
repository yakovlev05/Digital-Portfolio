import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "../App";
import IndexPage from "./index"

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/index' element={<IndexPage/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;
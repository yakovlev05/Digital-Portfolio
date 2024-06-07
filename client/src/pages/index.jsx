import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from "./login";
import RegistrationPage from "./registration";
import ResetPasswordPage from "./reset-password";
import SetPasswordPage from "./set-password";
import ConfirmEmailPage from "./confirm-email";
import ProfilePage from "./profile";
import ProfileEditPage from "./profile-edit";
import RecipePage from "./recipe-page";
import CreateRecipePage from "./create-recipe";
import EditRecipePage from "./edit-recipe";
import MainPage from "./main-page";
import RecipeSearchPage from "./recipe-search-page";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/*<Route path='/' element={<App/>}/>*/}
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                    <Route path='/set-password' element={<SetPasswordPage/>}/>
                    <Route path='/confirm-email' element={<ConfirmEmailPage/>}/>
                    <Route path='/search' element={<RecipeSearchPage/>}/>
                    <Route path='/me' element={<ProfilePage/>}/>
                    <Route path='/me/edit' element={<ProfileEditPage/>}/>
                    <Route exact path='/:username' element={<ProfilePage/>}/>
                    <Route exact path='/recipe/new' element={<CreateRecipePage/>}/>
                    <Route excat path='/recipe/:recipeNameUrl' element={<RecipePage/>}/>
                    <Route excat path='/recipe/:recipeNameUrl/edit' element={<EditRecipePage/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;
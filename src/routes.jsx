import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.jsx";
import {Home} from "./components/home/Home.jsx";
import {Me} from "./components/me/Me.jsx";


export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<Home/>} path={"/"}></Route>
                <Route element={<Profile/>} path={"/profile"}></Route>
                <Route element={<Me/>} path={"/me"}></Route>
                {/*<Route element={<Login/>} path={"/login"}></Route>*/}
                {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>
        </>
    )
}
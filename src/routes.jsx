import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.jsx";
import {Home} from "./components/home/Home.jsx";


export const AppRoutes = ({mode}) => {
    return (
        <>
            <Routes>
                <Route element={<Home mode={mode}/>} path={"/"}></Route>
                <Route element={<Profile mode={mode}/>} path={"/profile"}></Route>
                {/*<Route element={<Login/>} path={"/login"}></Route>*/}
                {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>
        </>
    )
}
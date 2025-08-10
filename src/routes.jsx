import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile.jsx";
import {Home} from "./components/home/Home.jsx";
import {Me} from "./components/me/Me.jsx";
import {NoteEditor} from "./components/noteeditor/NoteEditor.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ReplaceRoute from "./ReplaceRoute.jsx";


export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={
                    <ReplaceRoute>
                        <Home/>
                    </ReplaceRoute>
                } path={"/"}></Route>
                <Route element={<Profile/>} path={"/profile"}></Route>
                <Route element={
                    <ProtectedRoute>
                        <Me/>
                    </ProtectedRoute>
                } path={"/me"}></Route>
                <Route element={
                    <ProtectedRoute>
                        <NoteEditor/>
                    </ProtectedRoute>
                } path={"/new-note"}></Route>
                <Route element={
                    <ProtectedRoute>
                        <NoteEditor/>
                    </ProtectedRoute>
                } path={"/new-note/:id"}></Route>
                {/*<Route element={<Login/>} path={"/login"}></Route>*/}
                {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>
        </>
    )
}
import "./profile.css"
import {UserInfoSection} from "../userinfosection/UserInfoSection.jsx";
import {NotesSection} from "../notessection/NotesSection.jsx";
import {Header} from "../header/Header.jsx";
import {useTheme} from "../../ThemeProvider.jsx";
import {useLocation, useParams} from "react-router";
import {useEffect, useState} from "react";
import {getCurrentUsername} from "../../utils/currentUser.js";


export const Profile = () => {
    const location = useLocation();
    const [showDialogConfig, setShowDialogConfig] = useState(false);

    const [logged, setLogged] = useState(false);
    const param = useParams();


    useEffect(() => {
        const fetchData = async () => {
            const username = await getCurrentUsername();
            if(username === param.username) setLogged(true);
        }
        fetchData();
    }, [param.username]);

    const { isLightMode } = useTheme();

    return (
        <div className={`app-header ${isLightMode ? 'light-mode' : 'dark-mode'}`} key={location.key}>
            {/* Cabeçalho */}
            <Header/>

            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Seção de Informações do Usuário */}
                <UserInfoSection id={param.username} me={logged} showDialogConfig={showDialogConfig} setShowDialogConfig={setShowDialogConfig}/>

                {/* Seção de Notas com Abas */}
                {!showDialogConfig && (<NotesSection id={param.username} me={logged} noteId={param.note_id}/>)}
            </main>
        </div>
    );
}
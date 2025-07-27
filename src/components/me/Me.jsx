import "./me.css"
import {UserInfoSection} from "../userinfosection/UserInfoSection.jsx";
import {NotesSection} from "../notessection/NotesSection.jsx";
import {Header} from "../header/Header.jsx";
import {useTheme} from "../../ThemeProvider.jsx";

export const Me = () => {

    const { isLightMode } = useTheme();

    return (
        <div className={`app-header ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
            {/* Cabeçalho */}
            <Header/>

            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Seção de Informações do Usuário */}
                <UserInfoSection/>

                {/* Seção de Notas com Abas */}
                <NotesSection me={true}/>
            </main>
        </div>
    );
}
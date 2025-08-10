import "./me.css"
import {UserInfoSection} from "../userinfosection/UserInfoSection.jsx";
import {NotesSection} from "../notessection/NotesSection.jsx";
import {Header} from "../header/Header.jsx";
import {useTheme} from "../../ThemeProvider.jsx";
import {useState} from "react";

export const Me = () => {

    const { isLightMode } = useTheme();
    const [showDialogConfig, setShowDialogConfig] = useState(false);

    return (
        <div className={`app-header ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
            <Header/>

            <main className="main-content">
                <UserInfoSection me={true} setShowDialogConfig={setShowDialogConfig} showDialogConfig={showDialogConfig}/>

                {!showDialogConfig && (<NotesSection me={true}/>)}
            </main>
        </div>
    );
}
import './SettingsDialog.css';
import authService from "../../services/auth.service.js";
import {useNavigate} from "react-router";
import userService from "../../services/user.service.js";
import {getCurrentUserId} from "../../utils/currentUser.js";
import {useState} from "react";

export const SettingsDialog = ({ onCancel, userData, userDataUpdated, setUserDataUpdated}) => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [bio, setBio] = useState(userData.bio);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [loadingPicture, setLoadingPicture] = useState(false);
    const [errorPicture, setErrorPicture] = useState(null);
    const [successPicture, setSuccessPicture] = useState(false);

    const handleLogout = () => {
        authService.signOut().then(() => navigate("/"));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
        }
    };


    async function handleUpdatePicture() {
        if(!selectedFile) return;

        setLoadingPicture(true);
        setErrorPicture(null);
        const userId = await getCurrentUserId();
        try {
            await userService.updateUserPicture(userId, selectedFile);
            setSuccess(true);
            setLoadingPicture(false);
            setUserDataUpdated(!userDataUpdated);
        }catch (e) {
            setError(e);
        }
    }

    async function handleUpdateBio() {
        setLoading(true);
        setError(null);
        const userId = await getCurrentUserId();
        const {error} = await userService.updateUserBio(userId, bio);
        if(error) setError(error);
        else setLoading(false);
        setUserDataUpdated(!userDataUpdated);
    }

    return (
        <>
            <div className="settings-overlay">
                <div className="settings-container">
                    <div className={'settings-form'}>
                        <div className={'row-picture'}>
                            <div className={'column-picture'}>
                                <label htmlFor="file">Update profile picture:</label>

                                <input onChange={handleFileChange} accept=".jpg, .jpeg, .png, .gif" className="inpdddut" name="arquivo" id="file"
                                       type="file"/>
                            </div>
                            <button onClick={() => handleUpdatePicture()} className={'update-button'}>{loadingPicture ? 'Updating...' : 'Update'}</button>
                        </div>
                        <div className={'row-description-wrapper'}>
                            {error && <p className="error">{error}</p>}
                            <div style={{
                                'display' : 'flex',
                                'justifyContent' : 'space-between',
                                'marginBottom' : '10px'
                            }}>
                                <label htmlFor="description">Update description:</label>
                                <button onClick={() => handleUpdateBio()} className={'update-button'}>{loading ? 'Updating...' : 'Update'}</button>
                            </div>
                            <div className={'row-description'}>
                                <textarea value={bio} name="description" className="description-textarea"
                                          cols="30" rows="3"
                                          onChange={(e) => setBio(e.target.value)}
                                          maxLength={150}></textarea>
                            </div>
                        </div>

                        <div className="settings-actions">
                            <button onClick={() => handleLogout()} className="editor-button save-button">Log out
                            </button>
                            <button onClick={onCancel} className="editor-button cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
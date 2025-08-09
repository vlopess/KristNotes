import './SettingsDialog.css';

export const SettingsDialog = ({ onCancel}) => {
    return (
        <>
            <div className="settings-overlay">
                <div className="settings-container">
                    <div className={'settings-form'}>
                        <div className={'row-picture'}>
                            <div>
                                <label htmlFor="arquivo">Update profile picture:</label>
                                <input accept=".jpg, .jpeg, .png, .gif" className="inpdddut" name="arquivo" id="arquivo"
                                       type="file"/>
                            </div>
                            <button className={'update-button'}>Send</button>
                        </div>
                        <div className={'row-description-wrapper'}>
                            <label htmlFor="description">Update description:</label>
                            <div className={'row-description'}>
                                <textarea name="description" className="description-textarea" cols="30" rows="3"
                                          maxLength={150}></textarea>
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="editor-button save-button">Log out</button>
                            <button onClick={onCancel} className="editor-button cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
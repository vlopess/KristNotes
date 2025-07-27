import {useState} from "react";
import MarkdownViewer from "../markdown/MarkdownViewer.jsx";
import {useTheme} from "../../ThemeProvider.jsx";

export const NoteEditor = ({ onSave, onCancel }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [activeEditorTab, setActiveEditorTab] = useState('edit');
    const {isLightMode} = useTheme();

    const handleSave = () => {
        if (noteTitle.trim() === '' || noteContent.trim() === '') {
            setValidationMessage('Por favor, preencha o título e o conteúdo da nota.');
            return;
        }
        onSave({ title: noteTitle, content: noteContent });
        setNoteTitle('');
        setNoteContent('');
        setValidationMessage(''); // Limpar mensagem em caso de sucesso
        setActiveEditorTab('edit'); // Volta para a aba de edição ao salvar
    };

    return (
        <div className="note-editor-overlay">
            <div className="note-editor-card">
                <h3>Create new note</h3>
                {validationMessage && <div className="validation-message">{validationMessage}</div>}

                <input
                    type="text"
                    placeholder="Note Title"
                    value={noteTitle}
                    maxLength={25}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="note-input"
                />

                {/* Abas para Editor e Visualização */}
                <div className="editor-tabs-container">
                    <div className="editor-tabs">
                        <button
                            className={`editor-tab-button ${activeEditorTab === 'edit' ? 'active' : ''}`}
                            onClick={() => setActiveEditorTab('edit')}
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                                        stroke={isLightMode ? "#7B4E29" : "#ffffff"} stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M21 21H12" stroke={isLightMode ? "#7B4E29" : "#ffffff"} stroke-width="2.5" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </g>
                            </svg>
                            Edit
                        </button>
                        <button
                            className={`editor-tab-button ${activeEditorTab === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveEditorTab('preview')}
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <circle cx="12" cy="12" r="3" stroke={isLightMode ? "#7B4E29" : "#ffffff"} stroke-width="2"></circle>
                                    <path
                                        d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
                                        stroke={isLightMode ? "#7B4E29" : "#ffffff"} stroke-width="2"></path>
                                </g>
                            </svg>
                            Preview
                        </button>
                    </div>

                    {/* Conteúdo do Editor ou Visualização */}
                    <div className="editor-content-area">
                        {activeEditorTab === 'edit' && (
                            <textarea
                                placeholder="Note Content (Markdown)"
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                className="note-textarea"
                            ></textarea>
                        )}
                        {activeEditorTab === 'preview' && (
                            <div className="note-preview editor-preview-pane">
                            <MarkdownViewer markdown={noteContent}/> {/* Usando MarkdownViewer aqui */}
                            </div>
                        )}
                    </div>
                </div>

                <div className="note-editor-actions">
                    <button onClick={handleSave} className="editor-button save-button">Save note</button>
                    <button onClick={onCancel} className="editor-button cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

import {useState} from 'react'
import logo from '../../assets/kristina.png'
import notes from '../../assets/notes.svg';
import MarkdownViewer from "../../components/markdown/MarkdownViewer.jsx";
import { Link } from "react-router";
import "./profile.css"
import {Swicth} from "../switch/Swicth.jsx";

export const Profile = ({mode}) => {

    const [activeTab, setActiveTab] = useState('myNotes');
    const [showNoteEditor, setShowNoteEditor] = useState(false);
    const [myUserNotes, setMyUserNotes] = useState([]);

    const handleSaveNote = ({ title, content }) => {
        const newNote = {
            id: Date.now(), // ID único para a nota
            title: title,
            content: content,
            type: 'user-note' // Para diferenciar de roadmapItems
        };
        setMyUserNotes([...myUserNotes, newNote]);
        setShowNoteEditor(false); // Fechar o editor após salvar
    };

    const roadmapItems = [
        { name: 'RoadMap Flutter', new: false, type: 'roadmap' },
        { name: 'JUnit 5 annotations', new: false, type: 'roadmap' },
        { name: 'DevOps', new: false, type: 'roadmap' },
        { name: 'Full Stack', new: false, type: 'roadmap' },
        { name: 'Android', new: false, type: 'roadmap' },
        { name: 'Blockchain', new: false, type: 'roadmap' },
        { name: 'QA', new: false, type: 'roadmap' }
    ];

    const LinkIcon = () => (
        <svg
            className="link-icon" // Classe para estilização
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
    );

    const SocialIcon = ({ type }) => {
        let pathD = "";
        let viewBox = "0 0 24 24"; // Default viewBox, adjust for specific icons if needed
        let fill = "currentColor"; // Default fill color

        switch (type) {
            case 'github':
                pathD = "M16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z";
                viewBox = "0 0 32 32"; // Specific viewBox for this GitHub SVG
                break;
            case 'medium':
                pathD = "M52,8H12c-2.209,0-4,1.791-4,4v40c0,2.209,1.791,4,4,4h40c2.209,0,4-1.791,4-4V12C56,9.791,54.209,8,52,8z M47,19.5l-1.821,2.197C45.064,21.811,45,21.965,45,22.125V41.75c0,0.16,0.064,0.314,0.179,0.428L47,44.546V45H37v-0.454l2.821-2.368C39.936,42.064,40,41.91,40,41.75V23.879L31.848,45h-0.001h-1.543L22,24.375v16.108c0,0.22,0.076,0.433,0.215,0.605L25,44.546V45h-8v-0.454l2.783-3.438C19.923,40.936,20,40.721,20,40.5V22.388c0-0.142-0.05-0.279-0.142-0.388L18,19.5V19h7.097l7.624,19.183L40.002,19H47V19.5z";
                viewBox = "0 0 64 64"; // Specific viewBox for Medium SVG
                break;
            default:
                pathD = "M203.456,139.065c3.768-10.786,5.824-22.369,5.824-34.425s-2.056-23.639-5.824-34.425c-0.092-0.324-0.201-0.64-0.333-0.944C188.589,28.926,149.932,0,104.641,0S20.692,28.926,6.159,69.271c-0.132,0.305-0.242,0.62-0.333,0.944c-3.768,10.786-5.824,22.369-5.824,34.425s2.056,23.639,5.824,34.425c0.092,0.324,0.201,0.64,0.333,0.944c14.534,40.346,53.191,69.271,98.482,69.271s83.948-28.926,98.482-69.271C203.255,139.705,203.364,139.39,203.456,139.065z M104.641,194.281c-3.985,0-10.41-7.212-15.78-23.324c-2.592-7.775-4.667-16.713-6.179-26.436H126.6c-1.512,9.723-3.587,18.66-6.178,26.436C115.051,187.069,108.626,194.281,104.641,194.281z M80.862,129.521c-0.721-7.998-1.102-16.342-1.102-24.881s0.381-16.883,1.102-24.881h47.557c0.721,7.998,1.102,16.342,1.102,24.881s-0.381,16.883-1.102,24.881H80.862z M15.001,104.641c0-8.63,1.229-16.978,3.516-24.881h47.3c-0.701,8.163-1.057,16.529-1.057,24.881s0.355,16.718,1.057,24.881h-47.3C16.23,121.618,15.001,113.271,15.001,104.641z M104.641,15c3.985,0,10.411,7.212,15.781,23.324c2.591,7.775,4.667,16.713,6.178,26.435H82.681c1.512-9.723,3.587-18.66,6.179-26.435C94.231,22.212,100.656,15,104.641,15z M143.464,79.76h47.3c2.287,7.903,3.516,16.251,3.516,24.881s-1.229,16.978-3.516,24.881h-47.3c0.701-8.163,1.057-16.529,1.057-24.881S144.165,87.923,143.464,79.76z M184.903,64.76h-43.16c-2.668-18.397-7.245-34.902-13.666-46.644C152.972,24.865,173.597,42.096,184.903,64.76z M81.204,18.115C74.783,29.857,70.206,46.362,67.538,64.76h-43.16C35.685,42.096,56.309,24.865,81.204,18.115z M24.378,144.521h43.16c2.668,18.397,7.245,34.902,13.666,46.645C56.309,184.416,35.685,167.186,24.378,144.521z M128.077,191.166c6.421-11.742,10.998-28.247,13.666-46.645h43.16C173.597,167.186,152.972,184.416,128.077,191.166z\n"

        }

        return (
            <svg className="social-icon" fill={fill} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                <path d={pathD} />
            </svg>
        );
    };

    const NoteEditor = ({ onSave, onCancel }) => {
        const [noteTitle, setNoteTitle] = useState('');
        const [noteContent, setNoteContent] = useState('');
        const [validationMessage, setValidationMessage] = useState('');
        // Novo estado para controlar a aba ativa dentro do editor (edit ou preview)
        const [activeEditorTab, setActiveEditorTab] = useState('edit');

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
                    <h3>Criar Nova Nota</h3>
                    {validationMessage && <div className="validation-message">{validationMessage}</div>}

                    <input
                        type="text"
                        placeholder="Título da Nota"
                        value={noteTitle}
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
                                <svg className="editor-tab-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V17h6.828l7.586-7.586a2 2 0 000-2.828l-4-4zm-4.242 12.071L9.172 17H7v-2.172l4-4 4.242 4.243zM21 16v4a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h4v2H4v14h15v-4h2z"></path>
                                </svg>
                                Editar
                            </button>
                            <button
                                className={`editor-tab-button ${activeEditorTab === 'preview' ? 'active' : ''}`}
                                onClick={() => setActiveEditorTab('preview')}
                            >
                                <svg className="editor-tab-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4.5c5.05 0 9.27 3.51 10.74 8-.92 2.76-3.26 5.09-6 6.01L12 18.5c-5.05 0-9.27-3.51-10.74-8 .92-2.76 3.26-5.09 6-6.01L12 4.5zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM12 9a3 3 0 110 6 3 3 0 010-6z"></path>
                                </svg>
                                Visualizar
                            </button>
                        </div>

                        {/* Conteúdo do Editor ou Visualização */}
                        <div className="editor-content-area">
                            {activeEditorTab === 'edit' && (
                                <textarea
                                    placeholder="Conteúdo da Nota (Markdown)"
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
                        <button onClick={handleSave} className="editor-button save-button">Salvar Nota</button>
                        <button onClick={onCancel} className="editor-button cancel-button">Cancelar</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`app-header ${mode.isLightMode ? 'light-mode' : 'dark-mode'}`}>
            {/* Cabeçalho */}
            <header className="header">
                <div className="logo-container">
                    <Link to={"/"} style={{"display": "flex", "alignItems" : "center", "textDecoration" : "none"}}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="app-logo"
                        />
                        <div className="app-name">
                            K<span>ristNotes</span>
                        </div>
                    </Link>
                </div>

                {/* Novo Toggle do modo Claro/Escuro */}
                <Swicth mode={mode}/>
            </header>

            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Seção de Informações do Usuário */}
                <section className="user-info-section">
                    <div className="user-photo-container">
                        <img
                            src="https://placehold.co/180x180/F9D5B4/3E2B1E?text=User+Photo"
                            alt="User Photo"
                            className="user-photo"
                        />
                    </div>

                    {/* Card com nome e redes sociais */}
                    <div className="user-card">
                        <p className="user-name">
                            @Vlopes
                        </p>
                        <div className="social-icons">
                            {/* Ícones de redes sociais - GitHub, Medium, LinkedIn, Dev.to */}
                            <a href="https://github.com/vlopes" target="_blank" rel="noopener noreferrer" className="social-link">
                                <SocialIcon type="github" />
                            </a>
                            <a href="https://medium.com/@vlopes" target="_blank" rel="noopener noreferrer" className="social-link">
                                <SocialIcon type="medium" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Seção de Notas com Abas */}
                <section className="notes-section">
                    <div className="notes-tabs">
                        <button
                            className={`tab-button ${activeTab === 'myNotes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('myNotes')}
                        >
                            My Notes
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'savedNotes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('savedNotes')}
                        >
                            Saved Notes
                        </button>
                    </div>

                    {/* Conteúdo da aba ativa */}
                    {activeTab === 'myNotes' && (
                        <div className="tab-content">
                            <div className="grid-container">
                                {roadmapItems.map((item) => (
                                    <div key={item.name} className="roadmap-item">
                                        <img src={notes}/>
                                        <span className="roadmap-item-text">
                                          {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'savedNotes' && (
                        <div className="tab-content">
                            <div className="grid-container">
                                {roadmapItems.map((item) => (
                                    <div key={item.name} className="roadmap-item">
                                        <img src={notes}/>
                                        <span className="roadmap-item-text">
                                          {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/*<p>Aqui você verá as notas salvas de outras pessoas.</p>*/}
                            {/* Você pode adicionar aqui uma lógica para carregar e exibir as notas salvas */}
                        </div>
                    )}
                </section>

                {/* Botão para Adicionar Nova Nota */}
                {activeTab === 'myNotes' && (
                    <div className="add-note-button-wrapper">
                        <button className="add-note-button" onClick={() => setShowNoteEditor(true)}>
                            + Adicionar Nota
                        </button>
                    </div>
                )}

                {/* Editor de Notas (exibido condicionalmente) */}
                {showNoteEditor && (
                    <NoteEditor
                        onSave={handleSaveNote}
                        onCancel={() => setShowNoteEditor(false)}
                    />
                )}
            </main>
        </div>
    );
}
import {useEffect, useState} from 'react'
import logo from './assets/kristina.png'
import './App.css'

function App() {
    // Estado para controlar o modo (false = escuro, true = claro)
    const [isLightMode, setIsLightMode] = useState(false);
    // Estado para controlar a aba ativa (padrão: 'myNotes')
    const [activeTab, setActiveTab] = useState('myNotes');
    // Estado para controlar a visibilidade do editor de notas
    const [showNoteEditor, setShowNoteEditor] = useState(false);
    // Estado para armazenar as notas criadas pelo usuário
    const [myUserNotes, setMyUserNotes] = useState([]);

    // Efeito para aplicar/remover a classe 'light-mode' no body
    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }
    }, [isLightMode]);

    // Função para alternar o modo
    const toggleLightMode = () => {
        setIsLightMode(!isLightMode);
    };

    // Função para salvar uma nova nota
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

    // Define os itens da lista de "roadmaps" (agora mais como categorias/modelos)
    const roadmapItems = [
        { name: 'RoadMap Flutter', new: false, type: 'roadmap' },
        { name: 'JUnit 5 annotations', new: false, type: 'roadmap' },
        { name: 'DevOps', new: false, type: 'roadmap' },
        { name: 'Full Stack', new: false, type: 'roadmap' },
        { name: 'Data Analyst', new: false, type: 'roadmap' },
        { name: 'Android', new: false, type: 'roadmap' },
        { name: 'iOS', new: false, type: 'roadmap' },
        { name: 'PostgreSQL', new: false, type: 'roadmap' },
        { name: 'Blockchain', new: false, type: 'roadmap' },
        { name: 'QA', new: false, type: 'roadmap' },
        { name: 'Software Architect', new: false, type: 'roadmap' }
    ];

    // Componente SVG para o ícone de link/box com seta
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

    // Componente SVG para ícones de redes sociais específicos (GitHub, Medium, LinkedIn, Dev.to)
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
            case 'linkedin':
                pathD = "M20.447 20.452h-3.554v-5.568c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.666H9.153V9.298h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 6.879v6.331zM5.594 7.915c-1.161 0-2.102-.94-2.102-2.101 0-1.162.941-2.102 2.102-2.102 1.162 0 2.102.94 2.102 2.102 0 1.161-.94 2.101-2.102 2.101zm1.758 12.537H3.836V9.298h3.516v11.154zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.207 0 22.225 0z";
                break;
            case 'devto':
                pathD = "M42,37c0,2.762-2.238,5-5,5H11c-2.762,0-5-2.238-5-5V11c0-2.762,2.238-5,5-5h26c2.762,0,5,2.238,5,5V37zM14.986,30.467H10.88V17.342h4.105c1.878,0,3.4,1.522,3.4,3.4v6.325C18.386,28.945,16.864,30.467,14.986,30.467zM14.883,28.022c0.663,0,1.2-0.537,1.2-1.2v-5.833c0-0.663-0.537-1.2-1.2-1.2H13.38v8.233H14.883zM26.391,19.617v-2.3h-5.046c-0.828,0-1.5,0.672-1.5,1.5v10.134c0,0.828,0.672,1.5,1.5,1.5h5.046v-2.3h-4.247V25.03h2.615v-2.3h-2.615v-3.113H26.391zM37.73,17.32l-2.94,11.67c-0.51,2.02-3.37,2.02-3.88,0l-2.95-11.67h2.58l2.31,9.14l2.3-9.14H37.73z";
                viewBox = "0 0 48 48"; // Specific viewBox for Dev.to SVG
                fill = "#eceff1"; // Dev.to icon has specific fill color
                break;
            default:
                pathD = "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.273l-1.42 1.42-3.565 3.565 1.42 1.42c.389.389.389 1.024 0 1.413l-1.414 1.414c-.389.389-1.024.389-1.413 0l-1.42-1.42-3.565-3.565-1.42 1.42c-.389.389-1.024.389-1.413 0l-1.414-1.414c-.389-.389-.389-1.024 0-1.413l3.565-3.565-1.42-1.42c-.389-.389-.389-1.024 0-1.413l1.414-1.414c.389-.389 1024-.389 1.413 0l1.42 1.42 3.565 3.565 1.42-1.42c.389-.389 1.024-.389 1.413 0l1.414 1.414c.389.389.389 1.024 0 1.413z";
        }

        return (
            <svg className="social-icon" fill={fill} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                <path d={pathD} />
            </svg>
        );
    };

    // Componente para renderizar blocos de código Mermaid
    const MermaidComponent = ({ chartDefinition }) => {
        const chartRef = useRef(null);
        // Gerar um ID único para cada gráfico Mermaid
        const chartId = useRef(`mermaid-chart-${Math.random().toString(36).substring(2, 9)}`);

        useEffect(() => {
            // Verifica se o elemento de referência existe antes de renderizar
            if (chartRef.current) {
                // Limpa o conteúdo anterior para evitar duplicatas ou artefatos
                chartRef.current.innerHTML = '';

                // Renderiza o gráfico Mermaid na div com o ID único
                mermaid.render(chartId.current, chartDefinition)
                    .then(({ svg }) => {
                        // Se o elemento ainda existe (componente não foi desmontado), insere o SVG
                        if (chartRef.current) {
                            chartRef.current.innerHTML = svg;
                        }
                    })
                    .catch(error => {
                        // Em caso de erro na renderização do Mermaid, exibe o código bruto e uma mensagem de erro
                        console.error("Erro ao renderizar gráfico Mermaid:", error);
                        if (chartRef.current) {
                            chartRef.current.innerHTML = `<pre>${chartDefinition}</pre><p style="color:red;">Erro ao renderizar gráfico Mermaid.</p>`;
                        }
                    });
            }
        }, [chartDefinition]); // Dependência: re-renderiza se a definição do gráfico mudar

        return <div ref={chartRef} id={chartId.current} className="mermaid-chart-container"></div>;
    };

    // Componente Editor de Notas Markdown
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
                                    {noteContent}
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
        <div className={`app-container ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
            {/* Cabeçalho */}
            <header className="header">
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo"
                        className="app-logo"
                    />
                    <div className="app-name">
                        K<span>ristNotes</span>
                    </div>
                </div>

                {/* Novo Toggle do modo Claro/Escuro */}
                <label className="switch">
                    <input
                        id="checkbox"
                        type="checkbox"
                        checked={isLightMode} // Controla o estado do checkbox
                        onChange={toggleLightMode} // Alterna o modo ao mudar o checkbox
                    />
                    <span className="slider">
            <div className="star star_1"></div>
            <div className="star star_2"></div>
            <div className="star star_3"></div>
            <svg viewBox="0 0 16 16" className="cloud_1 cloud">
              <path
                  transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                  fill="#fff"
                  d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
              ></path>
            </svg>
          </span>
                </label>
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
                            vlopes
                        </p>
                        <div className="social-icons">
                            {/* Ícones de redes sociais - GitHub, Medium, LinkedIn, Dev.to */}
                            <a href="https://github.com/vlopes" target="_blank" rel="noopener noreferrer" className="social-link">
                                <SocialIcon type="github" />
                            </a>
                            <a href="https://medium.com/@vlopes" target="_blank" rel="noopener noreferrer" className="social-link">
                                <SocialIcon type="medium" />
                            </a>
                            <a href="https://linkedin.com/in/vlopes" target="_blank" rel="noopener noreferrer" className="social-link">
                                <SocialIcon type="linkedin" />
                            </a>
                            <a href="https://dev.to/vlopes" target="_blank" rel="noopener noreferrer" className="social-link">
                                <SocialIcon type="devto" />
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
                                {/* Exibindo os itens de roadmap (categorias) */}
                                {roadmapItems.map((item) => (
                                    <div key={item.name} className="roadmap-item">
                    <span className="roadmap-item-text">
                      {item.name}
                        {item.new && (
                            <span className="new-tag">New</span>
                        )}
                    </span>
                                        <LinkIcon />
                                    </div>
                                ))}
                                {/* Exibindo as notas criadas pelo usuário */}
                                {myUserNotes.map((note) => (
                                    <div key={note.id} className="roadmap-item note-item"> {/* Reutiliza o estilo do roadmap-item */}
                                        <h4>{note.title}</h4>
                                        {note.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'savedNotes' && (
                        <div className="tab-content">
                            <p>Aqui você verá as notas salvas de outras pessoas.</p>
                            {/* Você pode adicionar aqui uma lógica para carregar e exibir as notas salvas */}
                        </div>
                    )}
                </section>

                {/* Botão para Adicionar Nova Nota */}
                <div className="add-note-button-wrapper">
                    <button className="add-note-button" onClick={() => setShowNoteEditor(true)}>
                        + Adicionar Nota
                    </button>
                </div>

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

export default App;

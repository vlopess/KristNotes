import React, { useState } from 'react';
import MarkdownViewer from "../markdown/MarkdownViewer.jsx";
import { useTheme } from "../../ThemeProvider.jsx";
import { useNavigate } from "react-router";
import { Header } from "../header/Header.jsx";
import './noteeditor.css';

export const NoteEditor = () => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [activeEditorTab, setActiveEditorTab] = useState('edit');
    const { isLightMode } = useTheme();
    const navigate = useNavigate();

    const handleSave = () => {
        if (noteTitle.trim() === '' || noteContent.trim() === '') {
            setValidationMessage('Por favor, preencha o título e o conteúdo da nota.');
            return;
        }

        handleSaveNote({ title: noteTitle, content: noteContent });
        setNoteTitle('');
        setNoteContent('');
        setValidationMessage('');
        setActiveEditorTab('edit');
    };

    const handleSaveNote = ({ title, content }) => {
        const newNote = {
            id: Date.now(),
            title,
            content
        };
        // Aqui você pode enviar para um store / API. Por enquanto só log:
        console.log('Salvou nota:', newNote);
    };

    return (
        <div className={`note-editor-responsive ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
            <Header />

            <main className="main-content">
                <div className="note-editor-card">
                    <h3 className="card-title">Create new note</h3>

                    {validationMessage && <div className="validation-message">{validationMessage}</div>}

                    <input
                        type="text"
                        placeholder="Note Title"
                        value={noteTitle}
                        maxLength={25}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        className="note-input"
                        aria-label="Note title"
                    />

                    {/* Abas (visíveis em telas pequenas) */}
                    <div className="editor-tabs">
                        <button
                            aria-pressed={activeEditorTab === 'edit'}
                            className={`editor-tab-button ${activeEditorTab === 'edit' ? 'active' : ''}`}
                            onClick={() => setActiveEditorTab('edit')}
                        >
                            Edit
                        </button>

                        <button
                            aria-pressed={activeEditorTab === 'preview'}
                            className={`editor-tab-button ${activeEditorTab === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveEditorTab('preview')}
                        >
                            Preview
                        </button>
                    </div>

                    {/* Conteúdo: no mobile mostra apenas a aba ativa; no desktop mostra lado a lado */}
                    <div className="editor-content-wrapper">
                        <div className={`editor-pane ${activeEditorTab === 'edit' ? 'active' : ''}`}>
              <textarea
                  placeholder="Note Content (Markdown)"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="note-textarea"
                  aria-label="Note content"
              />
                        </div>

                        <div className={`preview-pane ${activeEditorTab === 'preview' ? 'active' : ''}`}>
                            <div className="note-preview editor-preview-pane">
                                <MarkdownViewer rawMarkdown={noteContent} />
                            </div>
                        </div>
                    </div>

                    <div className="note-editor-actions">
                        <button onClick={handleSave} className="editor-button save-button">Save note</button>
                        <button onClick={() => navigate(-1)} className="editor-button cancel-button">Cancel</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
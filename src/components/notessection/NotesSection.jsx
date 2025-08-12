import React, {useEffect, useState} from "react";
import {useTheme} from "../../ThemeProvider.jsx";
import {useNavigate} from "react-router";
import MarkdownViewer from "../markdown/MarkdownViewer.jsx";
import UserNotesService from "../../services/user-notes.service.js";
import {formatDate} from "../../utils/formatter.js";
import {NotesSkeleton} from "../shimmer/NotesSkeleton.jsx";
import {WithoutSavedNotes} from "../WithoutNotes/WithoutSavedNotes.jsx";
import {WithoutNotes} from "../WithoutNotes/WithoutNotes.jsx";
import SavedNoteCard from "../savednotes/SavedNoteCard.jsx";
import {Badge} from "../badge/Badge.jsx";
import {SaveNoteButton} from "../savenotebutton/SaveNoteButton.jsx";
import UserSavedNotesService from "../../services/user-saved-notes.service.js";
import LoginDialog from "../LoginDialog/LoginDialog.jsx";

export const NotesSection = ({me = false, id, noteId}) => {
    const {isLightMode} = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('myNotes');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userNotes, setUserNotes] = useState(null);
    const [userSavedNotes, setUserSavedNotes] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { data, error } = me ? await UserNotesService.getNotesCurrentUser() : await UserNotesService.getNotesByUsername(id);
            if (error) {
                console.log(error);
            } else {
                if(data){
                    setUserNotes(
                        data.map(note => ({
                            id: note.id,
                            title: note.title,
                            content: note.content,
                            created_at: note.created_at
                        }))
                    );
                }
                setIsLoading(false);
            }
            if(noteId){
                setSelectedItem(
                    data.find(e => e.id === atob(noteId))
                );
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if(activeTab === 'savedNotes'){
                setIsLoading(true);
                const { data, error } =  me ? await UserSavedNotesService.getSavedNotesCurrentUser() : await UserSavedNotesService.getSavedNotesByUsername(id);
                if (error) {
                    console.log(error);
                } else {
                    if(data){
                        setUserSavedNotes(
                            data.map(note => ({
                                id: note.note_id,
                                title: note.users_notes.title,
                                user_id: note.users_notes.user_id,
                            }))
                        );
                    }
                    setIsLoading(false);
                }
            }
        }
        fetchData();
    }, [activeTab]);


    return (
        <>
            <section className="notes-section">
                {selectedItem ? (
                    <div className="expanded-item-view">
                        <div className="expanded-item-title-wrapper">
                            <div className={'row-options'}>
                                <svg
                                    className="back-icon"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    width={"24"}
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{"cursor": "pointer"}}
                                    onClick={() => {
                                        setSelectedItem(null);
                                        navigate(`/${id}`);
                                    }}
                                >
                                    <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19z"/>
                                </svg>

                                {me &&(<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor"
                                      onClick={() => navigate(`/new-note/${btoa(selectedItem.id)}`)}
                                      style={{"cursor": "pointer"}}
                                      xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                                            stroke="currentColor" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path d="M21 21H12" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"></path>
                                    </g>
                                </svg>)}
                                {!me &&(<SaveNoteButton noteId={noteId ? atob(noteId) : selectedItem.id} setDialogOpen={setDialogOpen}/>)}
                            </div>
                            <div className={'row-options title-time'}>
                                <h2>
                                    {selectedItem.title}
                                </h2>
                                <Badge text={formatDate(selectedItem.created_at)}/>
                            </div>
                        </div>
                        <div className={'container-viewer'}>
                            <MarkdownViewer rawMarkdown={selectedItem.content}/>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="notes-tabs">
                            <button
                                className={`tab-button ${activeTab === "myNotes" ? "active" : ""}`}
                                onClick={() => {
                                    setActiveTab('myNotes');
                                    setSelectedItem(null);
                                }}
                            >
                                Notes
                            </button>
                            <button
                                className={`tab-button ${activeTab === "savedNotes" ? "active" : ""}`}
                                onClick={() => {
                                    setActiveTab('savedNotes');
                                    setSelectedItem(null);
                                }}
                            >
                                Saved Notes
                            </button>
                        </div>

                        {/* Conteúdo da aba ativa */}
                        {activeTab === "myNotes" && (
                            <>
                                {!isLoading && (!userNotes || userNotes.length === 0) && (
                                    <WithoutNotes me={me}/>
                                )}

                                <div className="tab-content">
                                    <div className="grid-container">
                                        {isLoading && <NotesSkeleton/>}
                                        {
                                            userNotes?.map((item) => (
                                                <div
                                                    key={item.title}
                                                    className="roadmap-item"
                                                    onClick={() => setSelectedItem(item)}
                                                >
                                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg" stroke="#000000"
                                                         transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                           stroke-linejoin="round"
                                                           stroke="#CCCCCC" stroke-width="4.8">
                                                            <path
                                                                d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z"
                                                                stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                stroke-width="1.5"></path>
                                                            <path opacity="0.5"
                                                                  d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531"
                                                                  stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                  stroke-width="1.5"></path>
                                                            <path d="M11.7769 10L16.6065 11.2941"
                                                                  stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                  stroke-width="1.5"
                                                                  stroke-linecap="round"></path>
                                                            <path opacity="0.5" d="M11 12.8975L13.8978 13.6739"
                                                                  stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                  stroke-width="1.5" stroke-linecap="round"></path>
                                                        </g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <path
                                                                d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z"
                                                                stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                stroke-width="0.00024000000000000003"></path>
                                                            <path opacity="0.5"
                                                                  d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531"
                                                                  stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                  stroke-width="0.00024000000000000003"></path>
                                                            <path d="M11.7769 10L16.6065 11.2941"
                                                                  stroke={isLightMode ? "#7B4E29" : "#ffffff"}
                                                                  stroke-width="0.00024000000000000003"
                                                                  stroke-linecap="round"></path>
                                                            <path opacity="0.5" d="M11 12.8975L13.8978 13.6739"
                                                                  stroke="#ffffff"
                                                                  stroke-width="0.00024000000000000003"
                                                                  stroke-linecap="round"></path>
                                                        </g>
                                                    </svg>
                                                    <span className="roadmap-item-text">{item.title}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "savedNotes" && (
                            <>
                                {(!userSavedNotes || userSavedNotes.length < 1) && !isLoading && (
                                    <WithoutSavedNotes me={me}/>
                                )}
                                <div className="tab-content">
                                    <div className="grid-container">
                                        {isLoading && <NotesSkeleton/>}
                                        {userSavedNotes?.map((item) => (
                                            <SavedNoteCard note={item}/>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
            <div style={{
                height: "30px"
            }}></div>
            {/* Botão para Adicionar Nova Nota */}
            {me && activeTab === 'myNotes' && !selectedItem && (
                <div className="add-note-button-wrapper">
                    <button
                        className="add-note-button"
                        onClick={() => navigate('/new-note')}
                    >
                        + Add note
                    </button>
                </div>
            )}
            <LoginDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onLogin={() => {
                    setDialogOpen(false);
                    window.location.href = "/";
                }}
            />
        </>
    );

}
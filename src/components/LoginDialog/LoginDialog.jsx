import React from "react";
import "./LoginDialog.css";

export default function LoginDialog({ open, onClose, onLogin }) {
    if (!open) return null;

    return (
        <div className="dialog-backdrop">
            <div className="dialog">
                <h2>Login Required</h2>
                <p>You need to log in to save this note.</p>
                <div className="dialog-actions">
                    <button onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                    <button onClick={onLogin} className="login-btn">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

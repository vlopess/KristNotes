import {Link} from "react-router";
import logo from "../../assets/kristina.png";
import {Swicth} from "../switch/Swicth.jsx";

export const Header = () => {
    return <header className="header">
        <div className="logo-container">
            <Link to={"/"} style={{"display": "flex", "alignItems": "center", "textDecoration": "none"}}>
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
        <Swicth/>
    </header>;
}
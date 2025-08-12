import { useEffect, useState } from "react";
import "./Home.css";
import logo from "../../assets/kristina.png";
import { Button } from "../button/Button.jsx";
import {Link, useNavigate} from "react-router";
import RightCardCarousel from "../carousel/Carousel.jsx";
import { Header } from "../header/Header.jsx";
import authService from "../../services/auth.service.js";
import AlnumInput from "../AlnumInput/AlnumInput.jsx";

export const Home = () => {
    const [showLoginScreen, setShowLoginScreen] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    // Login states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrors, setLoginErrors] = useState({});
    const [loginServerError, setLoginServerError] = useState(null);

    // Register states
    const [regUsername, setRegUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [registerErrors, setRegisterErrors] = useState({});
    const [registerServerError, setRegisterServerError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add("hide-scroll");

        return () => {
            document.body.classList.remove("hide-scroll");
        };
    }, []);

    useEffect(() => {
        function createStars(numStars) {
            const body = document.getElementById("home-body");
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement("div");
                star.classList.add("star");
                const size = Math.random();
                if (size < 0.3) star.classList.add("star-small");
                else if (size < 0.7) star.classList.add("star-medium");
                else star.classList.add("star-large");
                star.style.left = `${Math.random() * 100}vw`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.animationDelay = `${Math.random() * 4}s`;
                body.appendChild(star);
            }
        }
        createStars(150);
    }, []);

    const handleGetStartedClick = () => {
        setShowLoginScreen(true);
    };

    const handleCloseLoginScreen = () => {
        setShowLoginScreen(false);
        clearLoginErrors();
        clearRegisterErrors();
    };

    const clearLoginErrors = () => {
        setLoginErrors({});
        setLoginServerError(null);
    };

    const clearRegisterErrors = () => {
        setRegisterErrors({});
        setRegisterServerError(null);
    };

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateLogin = () => {
        const errors = {};
        if (!username.trim()) errors.username = "Username is required.";
        else if (username.trim().length < 3)
            errors.username = "Username must be at least 3 characters.";

        if (!password) errors.password = "Password is required.";
        else if (password.length < 6)
            errors.password = "Password must be at least 6 characters.";

        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateRegister = () => {
        const errors = {};
        if (!regUsername.trim()) errors.username = "Username is required.";
        else if (regUsername.trim().length < 3)
            errors.username = "Username must be at least 3 characters.";

        if (!regEmail.trim()) errors.email = "Email is required.";
        else if (!isValidEmail(regEmail.trim()))
            errors.email = "Invalid email address.";

        if (!regPassword) errors.password = "Password is required.";
        else if (regPassword.length < 6)
            errors.password = "Password must be at least 6 characters.";

        setRegisterErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        clearLoginErrors();

        if (!validateLogin()) return;

        const email = username.includes("@") ? username : `${username}@example.com`;

        const { data, error } = await authService.signInWithEmail(email, password);

        if (error) {
            setLoginServerError(error.message);
        } else {
            navigate(0);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        clearRegisterErrors();

        if (!validateRegister()) return;

        const { data, error } = await authService.signUpWithEmail(
            regEmail.trim(),
            regPassword,
            { username: regUsername }
        );

        if (error) {
            setRegisterServerError(error.message);
        } else {
            navigate(`/${regUsername}`);
        }
    };

    return (
        <>
            <Header />
            <div id={"home-body"}>
                <div className={`landing-content ${showLoginScreen ? "hidden" : ""} `}>
                    <div className="app-container">
                        <div className="main-content-container">
                            <img
                                src={logo}
                                alt=""
                                className="main-image"
                            />

                            {/* Elementos de conhecimento ao redor da mulher com animação de pulo */}
                            {/* Livro 1 */}
                            <div className="book" style={{top: '10%', left: '15%'}}></div>
                            {/* Livro 2 */}
                            <div className="book" style={{bottom: '15%', right: '10%'}}></div>
                            {/* Livro 3 */}
                            <div className="book" style={{top: '30%', right: '5%'}}></div>
                            {/* Livro 4 */}
                            <div className="book" style={{bottom: '5%', left: '5%'}}></div>

                            {/* SVG de chapéu de formatura para conhecimento */}
                            <svg className="svg-cap" style={{top: '5%', right: '30%'}} fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12 3L1 9l11 6 11-6-11-6zm0 14.2L1 11.8l11 6 11-6-11-6zM12 19L1 13.6l11 6 11-6-11-6z"/>
                            </svg>

                        </div>

                        {/* Nova frase abaixo do contêiner da imagem */}
                        <p className="image-caption">
                            A community for sharing notes and practical advice on how to learn, grow, and build.
                        </p>

                        <div style={{"display": "flex"}}>
                            <Button text={"Get Started"} arrow={true} onClick={handleGetStartedClick}/>
                        </div>
                    </div>
                </div>

                {/* Login Screen */}
                <div className={`login-screen-full ${showLoginScreen ? "show" : "hidden"}`}>
                    <div className="login-card-simplified">
                        <button className="login-close-button" onClick={handleCloseLoginScreen}>
                            &times;
                        </button>

                        <div className="login-left-panel-simplified">
                            {showLoginForm && (
                                <>
                                    <div className="login-header-simplified">
                                        <h2>Log in</h2>
                                        <p>Please enter your details.</p>
                                    </div>

                                    <form className="login-form-simplified" onSubmit={handleLogin} noValidate>
                                        <div className="input-group-simplified">
                                            <input
                                                type="text"
                                                name="username"
                                                className="input-login"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                            {loginErrors.username && (
                                                <div style={{ color: "red", fontSize: "0.85rem" }}>
                                                    {loginErrors.username}
                                                </div>
                                            )}
                                        </div>

                                        <div className="input-group-simplified">
                                            <input
                                                type="password"
                                                name="password"
                                                className="input-login"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            {loginErrors.password && (
                                                <div style={{ color: "red", fontSize: "0.85rem" }}>
                                                    {loginErrors.password}
                                                </div>
                                            )}
                                        </div>

                                        {loginServerError && (
                                            <div
                                                style={{
                                                    color: "red",
                                                    marginBottom: "10px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {loginServerError}
                                            </div>
                                        )}

                                        <button type="submit" className="login-button-simplified">
                                            Login
                                        </button>
                                    </form>

                                    <div>
                                        <p>
                                            Not a user?{" "}
                                            <Link
                                                onClick={() => {
                                                    setShowRegisterForm(true);
                                                    setShowLoginForm(false);
                                                    clearLoginErrors();
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Get started!
                                            </Link>
                                        </p>
                                    </div>
                                </>
                            )}

                            {showRegisterForm && (
                                <>
                                    <div className="login-header-simplified">
                                        <h2>Register</h2>
                                        <p>Please enter your details.</p>
                                    </div>

                                    <form
                                        className="login-form-simplified"
                                        onSubmit={handleRegister}
                                        noValidate
                                    >
                                        <div className="input-group-simplified">
                                            <AlnumInput value={regUsername} onChange={setRegUsername}/>

                                            {registerErrors.username && (
                                                <div style={{ color: "red", fontSize: "0.85rem" }}>
                                                    {registerErrors.username}
                                                </div>
                                            )}
                                        </div>

                                        <div className="input-group-simplified">
                                            <input
                                                type="email"
                                                name="email"
                                                className="input-login"
                                                placeholder="E-mail"
                                                value={regEmail}
                                                onChange={(e) => setRegEmail(e.target.value)}
                                                required
                                            />
                                            {registerErrors.email && (
                                                <div style={{ color: "red", fontSize: "0.85rem" }}>
                                                    {registerErrors.email}
                                                </div>
                                            )}
                                        </div>

                                        <div className="input-group-simplified">
                                            <input
                                                type="password"
                                                name="password"
                                                className="input-login"
                                                placeholder="Password"
                                                value={regPassword}
                                                onChange={(e) => setRegPassword(e.target.value)}
                                                required
                                            />
                                            {registerErrors.password && (
                                                <div style={{ color: "red", fontSize: "0.85rem" }}>
                                                    {registerErrors.password}
                                                </div>
                                            )}
                                        </div>

                                        {registerServerError && (
                                            <div
                                                style={{
                                                    color: "red",
                                                    marginBottom: "10px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {registerServerError}
                                            </div>
                                        )}

                                        <button type="submit" className="login-button-simplified">
                                            Register
                                        </button>
                                    </form>

                                    <div>
                                        <p>
                                            Already have an account?{" "}
                                            <Link
                                                onClick={() => {
                                                    setShowLoginForm(true);
                                                    setShowRegisterForm(false);
                                                    clearRegisterErrors();
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Login now!
                                            </Link>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="login-right-panel-simplified">
                            <RightCardCarousel />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

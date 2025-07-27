import {useEffect, useState} from "react";
import "./Home.css";
import logo from "../../assets/kristina.png";
import {Button} from "../button/Button.jsx";
import {Link} from "react-router";
import RightCardCarousel from "../carousel/Carousel.jsx";
import {Header} from "../header/Header.jsx";

export const Home = () => {

    const [showLoginScreen, setShowLoginScreen] = useState(false); // Controla a exibição da tela de login

    useEffect(() => {
        function createStars(numStars) {
            const body = document.getElementById("home-body");
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                const size = Math.random();
                if (size < 0.3) {
                    star.classList.add('star-small');
                } else if (size < 0.7) {
                    star.classList.add('star-medium');
                } else {
                    star.classList.add('star-large');
                }
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
    };

    return (
        <>
            <Header/>
            <div id={"home-body"}>
                <div className={`landing-content ${showLoginScreen ? 'hidden' : ''} `}>
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
                            <Button text={"Get Started"} arrow={true} onClick={handleGetStartedClick} />
                        </div>
                    </div>
                </div>
                {/* Tela de Login (Ocupa a tela inteira e aparece com animação) */}
                <div className={`login-screen-full ${showLoginScreen ? 'show' : 'hidden'}`}>
                    <div className="login-card-simplified">
                        {/* Botão de fechar */}
                        <button className="login-close-button" onClick={handleCloseLoginScreen}>&times;</button>

                        <div className="login-left-panel-simplified">
                            <div className="login-header-simplified">
                                <h2>Log in</h2>
                                <p>Please enter your details.</p>
                            </div>

                            <form className="login-form-simplified">
                                <div className="input-group-simplified">
                                    <input type="email" name="text" className="input-login" placeholder="E-mail"/>
                                </div>
                                <div className="input-group-simplified">
                                    <input type="password" name="text" className="input-login" placeholder="Password"/>
                                </div>

                                <Link to={'/profile'}>
                                    <button className="login-button-simplified">Login</button>
                                </Link>
                            </form>
                        </div>

                        <div className="login-right-panel-simplified">
                            <RightCardCarousel />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
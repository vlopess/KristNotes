import ReactMarkdown from "react-markdown";
import {useEffect} from "react";
import mermaid from "mermaid";
import {isLight} from "../../App.jsx";
import {MermaidComponent} from "./MermaidComponent.jsx";

const MarkdownViewer = ({ markdown }) => {
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: isLight ? 'default' : 'dark', // 'default' é o tema claro do Mermaid
        });
    }, []); // Re-inicializa o Mermaid se o modo mudar

    // Define como os elementos Markdown específicos (como blocos de código) serão renderizados
    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            // Verifica se é um bloco de código Mermaid
            if (!inline && match && match[1] === 'mermaid') {
                // Se for Mermaid, renderiza o componente MermaidComponent
                return <MermaidComponent chartDefinition={String(children).trim()} />;
            }
            // Para outros blocos de código, renderiza a tag <pre><code> normal
            return !inline ? (
                <pre className={className} {...props}>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        <ReactMarkdown
            components={components}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownViewer;
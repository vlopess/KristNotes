import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // Permite HTML bruto no markdown
import mermaid from "mermaid";
import remarkBreaks from 'remark-breaks';
import { MermaidComponent } from "./MermaidComponent.jsx";
import {useTheme} from "../../ThemeProvider.jsx";
import {MDCheckbox} from "../MDCheckbox/MDCheckbox.jsx";

const MarkdownViewer = ({ rawMarkdown }) => {
    const { isLightMode } = useTheme();
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: !isLightMode ? 'dark' : 'light',
        });
    }, [isLightMode]);

    function mdReplaceCheckboxes(markdown) {
        if(rawMarkdown === undefined) return;

        // Primeiro trata [x] (checked), tanto minúsculo quanto maiúsculo
        let out = rawMarkdown.replace(/\[([xX])\]/g, '<input type="checkbox" data-md-checkbox checked />');

        // Depois trata [] ou [ ]
        // captura [] ou [ ] (com espaço opcional)
        out = out.replace(/\[\s?\]/g, '<input type="checkbox" data-md-checkbox />');

        return out;
    }

    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match && match[1] === "mermaid") {
                return (
                    <MermaidComponent chartDefinition={String(children).trim()} />
                );
            }
            return !inline ? (
                <pre className={className} {...props}>
          <code className={className} {...props}>{children}</code>
        </pre>
            ) : (
                <code className={className} {...props}>{children}</code>
            );
        },

        // Imagens com largura máxima
        img({ node, ...props }) {
            return <img style={{ maxWidth: "100%" }} alt="" {...props} />;
        },

        input({node, ...props}) {
            const isMD = node.properties && node.properties['data-md-checkbox'] !== undefined;
            if (!isMD) {
                // se for outro input (por acaso), renderiza normal
                return <input {...props} />;
            }
            // se existir atributo checked no HTML, props.checked pode vir como "" ou true dependendo do parser.
            const initialChecked = props.checked === true || props.checked === "checked" || props.checked === "";
            return <MDCheckbox initialChecked={initialChecked} />;
        }
    };

    const markdown = mdReplaceCheckboxes(rawMarkdown);

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
            components={components}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownViewer;

// MermaidComponent.jsx
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export const MermaidComponent = ({ chartDefinition }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        mermaid
            .render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chartDefinition)
            .then(({ svg }) => {
                if (isMounted && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            })
            .catch((err) => {
                console.error("Erro ao renderizar Mermaid:", err);
            });

        return () => {
            isMounted = false;
        };
    }, [chartDefinition]);

    return <div ref={containerRef} />;
};

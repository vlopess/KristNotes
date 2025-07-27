import {useEffect, useRef} from "react";
import mermaid from "mermaid";

export const  MermaidComponent = ({ chartDefinition }) => {
    const chartRef =useRef(null);
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
import "./button.css"

export const Button = ({text, arrow = false, onClick}) => {
    return (
        <>
            <button className="button" onClick={onClick}>
                {text}
                {arrow && (<div className="arrow">›</div>)}
            </button>

        </>
    );
}
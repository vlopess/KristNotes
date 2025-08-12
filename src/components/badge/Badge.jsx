import './Badge.css';

export const Badge = ({text}) => {
    return (
        <>
            <div className="badge">
                <button>{text}</button>
            </div>
        </>
    );
}
import {useState} from "react";

export const MDCheckbox = ({ initialChecked = false }) => {
    const [checked, setChecked] = useState(Boolean(initialChecked));
    return (
        <>
            <label className="checkbox-btn">
                <label htmlFor="checkbox"></label>
                <input id="checkbox" type="checkbox" checked={checked} onChange={() => setChecked((c) => !c)} />
                <span className="checkmark"></span>
            </label>
        </>
    );
}
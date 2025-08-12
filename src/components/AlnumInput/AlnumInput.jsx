import React, { useState } from 'react';
import UserService from "../../services/user.service.js";

export default function AlnumInput({ value: initial = '', onChange }) {
    const [value, setValue] = useState(initial);
    const [status, setStatus] = useState(null);
    // regex ASCII alnum
    const re = /[^A-Za-z0-9]/g;

    function handleChange(e) {
        const inputValue = e.target.value;
        if (e.nativeEvent.isComposing) {
            setValue(inputValue);
            if (onChange) onChange(inputValue);
            return;
        }
        console.log(inputValue);
        const clean = inputValue.replace(re, '');
        setValue(clean);
        if (onChange) onChange(clean);

    }

    async function checkUsername() {
        if (!value) return;
        setStatus("loading");

        try {
            const { data, error } = await  UserService.getByUsername(value);

            if (error && error.code !== "PGRST116") {
                console.error(error);
                setStatus(null);
                return;
            }

            if (data) {
                setStatus("exists");
            } else {
                setStatus("available");
            }
        } catch (err) {
            console.error(err);
            setStatus(null);
        }
    }

    return (
        <div>
            <input
                className="input-login"
                value={value}
                onBlur={checkUsername}
                onChange={handleChange}
                placeholder="Username"
            />
            {status === "loading" && <p style={{ color: "gray" }}>Checking...</p>}
            {status === "exists" && (
                <p style={{ color: "red" }}>❌ This username is already in use.</p>
            )}
            {status === "available" && (
                <p style={{ color: "green" }}>✅ This username is available!</p>
            )}
        </div>
    );
}

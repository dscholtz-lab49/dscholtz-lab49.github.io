import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
        setLoginError(false);
    };

    const login = (event) => {
        event.preventDefault();

        if (username === "admin" && password === "password") {
            const { from } = props;
            setRedirectToReferrer(true);
        } else {
            setLoginError(true);
        }
    };

    if (redirectToReferrer) {
        return <Navigate to="/blotter" />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={login}>
                {loginError && (
                    <p style={{ color: "red" }}>Invalid username or password.</p>
                )}
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

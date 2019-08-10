import * as React from "react";
import "./login.css";

export interface ILoginPanelProps {
    submitLogin: (username: string, password: string) => void;
}

interface ILoginPanelState {
    userName: string;
    password: string;
}

export class LoginPanel extends React.Component<ILoginPanelProps, ILoginPanelState> {

    render() {
        return <div className="login-panel card">
            <h1 className="login-text">HackCraft</h1>
            <div className="login-form">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" id="username-input" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="password-input" />
                </div>

                <button type="button" className="btn btn-dark loginButton">Login</button>
            </div>
        </div>;
    }
}
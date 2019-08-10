import * as React from "react";
import "./login.css";

export interface ILoginPanelProps {
    submitLogin: (username: string, password: string) => void;
}

interface ILoginPanelState {
    username: string;
    password: string;
}

export class LoginPanel extends React.Component<ILoginPanelProps, ILoginPanelState> {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    changeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    login = () => {
        this.props.submitLogin(this.state.username, this.state.password);
    }

    render() {
        return <div className="login-panel card">
            <h1 className="login-text">HackCraft</h1>
            <div className="login-form">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" id="username-input"
                        onChange={this.changeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="password-input"
                        onChange={this.changePassword}
                    />
                </div>

                <div className="login-button">
                    <button type="button" className="btn btn-dark login-button-inner"
                        onClick={this.login}
                    >Login</button>
                </div>
            </div>
        </div>;
    }
}
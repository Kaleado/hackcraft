import * as React from "react";
import * as Globals from "../../../shared/index";
import "../style.css";
import { LoginPanel } from "./login/LoginPanel";
import { Dashboard } from "./dashboard/Dashboard";

export interface IAppRootProps { }

interface IAppRootState {
  loggedIn: boolean;
  userId?: number;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class AppRoot extends React.Component<IAppRootProps, IAppRootState> {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  performLogin = (un: string, pw: string) => {
    let l: Globals.LoginRequest = {
        username: un,
        password: pw
    };

    fetch(Globals.LoginURL, {
      method: "POST",
      body: JSON.stringify(l),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(dat => dat.json())
      .then((data: Globals.LoginResponse) => {
        this.setState({
          loggedIn: true,
          userId: data.userId
        });
        console.log(`User id: ${data.userId}`);

      }).catch(e => {
        console.error(e);
      });
  }

  render() {
    if (!this.state.loggedIn) {
      return <div className="login-panel-position">
        <LoginPanel submitLogin={this.performLogin}></LoginPanel>
      </div>;
    }

    return <Dashboard
      logout={() => this.setState({loggedIn: false})}
      userId={this.state.userId}></Dashboard>;
  }
}
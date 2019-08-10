import * as React from "react";
import * as globals from "../../../shared/globals";
import "../style.css";
import { LoginPanel } from "./login/LoginPanel";

export interface IAppRootProps { }

interface IAppRootState {
  loggedIn: boolean;
  userName?: string;
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

  performLogin(un: string, pw: string) {
    fetch()
  }

  render() {
    if (!this.state.loggedIn) {
      return <div className="login-panel-position">
        <LoginPanel></LoginPanel>
      </div>;
    }

    return <div></div>
  }
}
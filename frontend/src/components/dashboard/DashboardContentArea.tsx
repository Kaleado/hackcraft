import * as React from "react";

interface IDashboardContentAreaProps {
    gameStart: () => void;
}

interface IDashboardContentAreaState{
}

export class DashboardContentArea extends React.Component<IDashboardContentAreaProps, IDashboardContentAreaState> {
    constructor(props) {
        super(props);
    }

    render(){
        return <div className="dashboard-content">
            <div className="dashboard-content-wrapper">
                <div className="stats-panel">

                </div>
                <button className="find-match-button btn btn-light" onClick={this.props.gameStart}>Find match</button>
            </div>
        </div>;
    }
}
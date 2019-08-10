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
            <button onClick={this.props.gameStart}>Find match</button>
        </div>;
    }
}
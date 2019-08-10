import * as React from "react";

interface IDashboardContentAreaProps {
    gameStart: (matchId: number) => void;
}

interface IDashboardContentAreaState{
}

export class DashboardContentArea extends React.Component<IDashboardContentAreaProps, IDashboardContentAreaState> {
    constructor(props) {
        super(props);
    }

    startGame = () => {
        this.props.gameStart(1);
    }

    render(){
        return <div className="dashboard-content">
            <button onClick={this.startGame}>Find match</button>
        </div>;
    }
}
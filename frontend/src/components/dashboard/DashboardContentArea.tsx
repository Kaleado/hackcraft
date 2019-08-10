import * as React from "react";

interface IDashboardContentAreaProps {
    gameStart: () => void;
}

interface IDashboardContentAreaState{
    isLoading: boolean;
}

export class DashboardContentArea extends React.Component<IDashboardContentAreaProps, IDashboardContentAreaState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    gameStart = () => {
        this.setState({isLoading: true});
        this.props.gameStart();
    };

    render(){
        return <div className="dashboard-content">
            <div className="dashboard-content-wrapper">
                <div className="stats-panel card">
                    <h1 className="history-text">Match History</h1>
                    <h4>Wins: 10</h4>
                    <h4>Losses: 55</h4>
                    <h4>Division: Bronze</h4>
                    <h4>Average Time: 12 minutes</h4>
                </div>
                <div className="find-match-wrapper">
                    <button className="find-match-button btn btn-light" onClick={this.gameStart}>
                        {this.state.isLoading && 
                            <span className="spinner-grow spinner-grow-sm" 
                                  style={{marginRight: "1em", marginLeft: "-1.5em"}}
                            ></span>
                        }
                        Find match
                    </button>
                </div>
            </div>
        </div>;
    }
}
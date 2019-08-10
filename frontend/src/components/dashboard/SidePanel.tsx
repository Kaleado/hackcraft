import * as React from "react";
import "./dashboard.css";

interface ISidePanelProps {
}

interface ISidePanelState{
    isRanked: boolean;
}

export class SidePanel extends React.Component<ISidePanelProps, ISidePanelState> {
    constructor(props) {
        super(props);
        this.state = {
            isRanked: true,
        };
    }

    rankedButton() {
        let c = "sidepanel-selector";
        if (this.state.isRanked) {
            c += " sidepanel-selector-selected";  
        }

        return <button type="button" className={c}
            onClick={() => this.setState({ isRanked: true })}
        >Ranked</button>
    }

    unrankedButton() {
        let c = "sidepanel-selector";
        if (!this.state.isRanked) {
            c += " sidepanel-selector-selected";  
        }

        return <button type="button" className={c}
            onClick={() => this.setState({ isRanked: false })}
        >Unranked</button>
    }

    render(){
        return <div id="sidepanel">
            <h1>HackCraft</h1>
            <div className="sidebar-wrapper">
                <div className="rank-button-group">
                    {this.rankedButton()}
                    {this.unrankedButton()}
                </div>
                <button className="sidepanel-selector logout-button">Logout</button>
            </div>
        </div>;
    }
}
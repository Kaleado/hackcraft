import * as React from "react";

interface ISidebarContentProps {
    logout: () => void;
    changeRankedStatus: (b: boolean) => void;
};

interface ISidebarContentState {
    isRanked: boolean;
};

export class SidebarContent extends React.Component<ISidebarContentProps, ISidebarContentState> {
    constructor(props) {
        super(props);

        this.state = {
            isRanked: true
        }
    }

    rankedButton() {
        let c = "sidepanel-selector";
        if (this.state.isRanked) {
            c += " sidepanel-selector-selected";
        }

        return <button type="button" className={c}
            onClick={() => {
                this.props.changeRankedStatus(true);
                this.setState({ isRanked: true });
            }}
        >Ranked</button>
    }

    unrankedButton() {
        let c = "sidepanel-selector";
        if (!this.state.isRanked) {
            c += " sidepanel-selector-selected";
        }

        return <button type="button" className={c}
            onClick={() => {
                this.props.changeRankedStatus(false);
                this.setState({ isRanked: false });
            }}
        >Unranked</button>
    }

    render() {
        return <div id="sidepanel">
            <h1>HackCraft</h1>
            <div className="sidebar-wrapper">
                <div className="rank-button-group squashed-buttons">
                    {this.rankedButton()}
                    {this.unrankedButton()}
                </div>
                <button className="sidepanel-selector logout-button" onClick={this.props.logout}>Logout</button>
            </div>
        </div>;
    }
}
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
                <div className="rank-button-group">
                    <h4>Mode</h4>
                    <div className="squashed-buttons">
                        {this.rankedButton()}
                        {this.unrankedButton()}
                    </div>
                    <h4>Programming Paradigm</h4>
                    <div className="squashed-buttons">
                        <button className="sidepanel-selector sidepanel-selector-selected">Multi-Paradigm</button>
                        <button className="disabled-selector" disabled>Functional</button>
                        <button className="disabled-selector" disabled>Procedural</button>
                        <button className="disabled-selector" disabled>Scripting</button>
                    </div>
                    <h4>Match Size</h4>
                    <div className="squashed-buttons">
                        <button className="sidepanel-selector">Solo</button>
                        <button className="sidepanel-selector sidepanel-selector-selected">1v1</button>
                        <button className="disabled-selector" disabled>2v2</button>
                        <button className="disabled-selector" disabled>3v3</button>
                    </div>
                </div>
                <button className="sidepanel-selector logout-button" onClick={this.props.logout}>Logout</button>
            </div>
        </div>;
    }
}
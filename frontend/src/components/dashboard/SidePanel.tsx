import * as React from "react";
import "./dashboard.css";

interface ISidePanelProps {
    content: any;
}

interface ISidePanelState{
    isRanked: boolean;
}

export interface ISidePanelChildProps {
    isRanked: boolean;
    content: any;
    sendMessage: (msg: string) => void;
}

export class SidePanel extends React.Component<ISidePanelProps, ISidePanelState> {
    constructor(props) {
        super(props);
        this.state = {
            isRanked: true,
        };
    }

    render(){
        let Content = this.props.content;
        return <div id="sidepanel">
            <h1>HackCraft</h1>
            <Content isRanked={this.state.isRanked} content={this.props.content}></Content>
        </div>;
    }
}
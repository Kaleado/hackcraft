import * as React from "react";
import { DashboardContentArea } from "./DashboardContentArea";
import { SidebarContent } from "./SidebarContent";
import { Game } from "../editor/Game";

interface IDashboardProps {
    userId: number;
}

interface IDashboardState{
    inGame: boolean;
    matchId: number;
}

export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    constructor(props) {
        super(props);

        this.state = {
            inGame: false,
            matchId: -1
        };
    }

    startGame = (matchId: number) => {
        this.setState({
            inGame: true,
            matchId
        });
    };

    render(){
        if (!this.state.inGame) {
            return <div className="dashboard-wrapper">
                <SidebarContent></SidebarContent>
                <DashboardContentArea gameStart={this.startGame}></DashboardContentArea>
            </div>;
        }


        return <div className="dashboard-wrapper">
            <Game matchId={this.state.matchId}></Game>
        </div>;


    }
}
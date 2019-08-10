import * as React from "react";
import { DashboardContentArea } from "./DashboardContentArea";
import { SidebarContent } from "./SidebarContent";
import { Game } from "../editor/Game";
import * as Globals from "../../../../shared/index";

interface IDashboardProps {
    userId: number;
    logout: () => void;
}

interface IDashboardState{
    inGame: boolean;
    isRanked: boolean;
    matchId: number;
}

const POLL_INTERVAL = 1000;

export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    constructor(props) {
        super(props);

        this.state = {
            inGame: false,
            matchId: 1,
            isRanked: true,
        };
    }

    pollForStatusChanges = () => {
        fetch(`${Globals.serverUrl}:${Globals.serverPort}${Globals.PATH_MATCH_STATUS}`, {
            method: "POST",
            body: JSON.stringify({matchId: this.state.matchId}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(d1 => d1.json())
        .then((status: Globals.MatchStatusResponse) => {
            if(status.matchStatus == "SEARCHING") setTimeout(this.pollForStatusChanges, POLL_INTERVAL);
            if(status.matchStatus == "STARTED") this.setState({
                inGame: true
            });
        });
    };

    startGame = () => {
        let body: Globals.StartMatchmakingRequest = {
            userId: this.props.userId,
            isRanked: this.state.isRanked,
            maxPlayers: 2,
            matchCategory: "FREE",
        };

        fetch(Globals.FindMatchURL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(d => d.json())
        .then((data: Globals.StartMatchmakingResponse) => {
            console.log(data);
            this.setState({
                matchId: data.matchId
            }, () => {
                setTimeout(this.pollForStatusChanges, POLL_INTERVAL);
            });
        });

    };

    exitMatch = () => {
        this.setState({inGame: false});
    };

    render(){
        if (!this.state.inGame) {
            return <div className="dashboard-wrapper">
                <SidebarContent changeRankedStatus={r => this.setState({isRanked: r})} logout={this.props.logout}></SidebarContent>
                <DashboardContentArea gameStart={this.startGame}></DashboardContentArea>
            </div>;
        }


        return <div className="dashboard-wrapper">
            <Game
                matchId={this.state.matchId}
                exitMatch={this.exitMatch}
                userId={this.props.userId}>
            </Game>
        </div>;


    }
}
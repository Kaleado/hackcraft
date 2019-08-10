import * as React from "react";
import { SidePanel } from "./SidePanel";
import { DashboardContentArea } from "./DashboardContentArea";

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
    }

    render(){
        return <div className="dashboard-wrapper">
            <SidePanel></SidePanel>
            <DashboardContentArea></DashboardContentArea>
        </div>;
    }
}
import * as React from "react";
import { SidePanel } from "./SidePanel";
import { DashboardContentArea } from "./DashboardContentArea";

interface IDashboardProps {
}

interface IDashboardState{
}

export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    constructor(props) {
        super(props);
    }

    render(){
        return <div>
            <SidePanel></SidePanel>
            <DashboardContentArea></DashboardContentArea>
        </div>;
    }
}
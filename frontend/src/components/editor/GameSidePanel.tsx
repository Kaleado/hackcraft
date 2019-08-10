import * as React from "react";
import * as marked from 'marked';
import "../dashboard/dashboard.css";
import * as Globals from "../../../../shared/index";

interface IGameSidePanelProps {
    runTests: () => string;
    matchId: number;
};

interface IGameSidePanelState {
    awaitingTestResults: boolean;
    isOnTestPanel: boolean;
    challenge: Globals.Challenge | null;
};

export class GameSidePanel extends React.Component<IGameSidePanelProps, IGameSidePanelState> {
    constructor(props) {
        super(props);

        this.state = {
            awaitingTestResults: false,
            isOnTestPanel: false,
            challenge: null
        };

        this.getChallengeMd();
    }

    testButton() {
        let c = "sidepanel-selector";

        return <button type="button" className={c}
            onClick={() => {
                this.setState({
                    awaitingTestResults: true
                });

                let testResults = this.props.runTests();
                console.log(testResults);
            }}
        >Run Tests</button>
    }

    getChallengeMd = () => {
        let body: Globals.GetChallengeRequest = {
            matchId: this.props.matchId
        };

        fetch(Globals.ChallengeUrl, {
            // method: "POST",
            // body: JSON.stringify(body)
        }).then(d => d.json())
          .then((data: Globals.Challenge) => {
              this.setState({ challenge: data });
        }).catch(e => console.log(e));
    };

    render() {
        return <div id="sidepanel">
            <h1>HackCraft</h1>
            <div className="sidebar-wrapper">
                <div className="rank-button-group">
                    <div className="squashed-buttons">
                        <button className="sidepanel-selector"
                            onClick={() => this.setState({ isOnTestPanel: true })}
                        >Tests</button>
                        <button className="sidepanel-selector"
                            onClick={() => this.setState({ isOnTestPanel: false })}
                        >Problem</button>
                    </div>
                    {this.state.isOnTestPanel && this.testButton()}
                    {(!this.state.isOnTestPanel) && 
                        <div>
                            <h1>{this.state.challenge && this.state.challenge.name}</h1>
                            <div dangerouslySetInnerHTML={{
                                __html: this.state.challenge && marked(this.state.challenge.description, {sanatize: true})
                            }}></div>
                        </div>
                    }
                </div>
                <button className="sidepanel-selector surrender-button">Surrender</button>
            </div>
        </div>;
    }
}
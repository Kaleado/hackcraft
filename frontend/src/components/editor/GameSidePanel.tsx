import * as React from "react";
import * as marked from 'marked';
import "../dashboard/dashboard.css";
import * as Globals from "../../../../shared/index";
import { ProgressBar } from 'react-bootstrap';


interface IGameSidePanelProps {
    runTests: () => string;
    matchId: number;
    exitMatch: () => void;
    starterCode: (code: string) => void;
};

interface IGameSidePanelState {
    awaitingTestResults: boolean;
    isOnTestPanel: boolean;
    challenge: Globals.Challenge | null;
    currentNumberTestsPassed: number;
    totalNumberTests: number;
};

export class GameSidePanel extends React.Component<IGameSidePanelProps, IGameSidePanelState> {
    constructor(props) {
        super(props);

        this.state = {
            awaitingTestResults: false,
            isOnTestPanel: false,
            challenge: null,
            currentNumberTestsPassed: 0,
            totalNumberTests: 1, // To be updated by API call
        };

        this.getChallengeMd();
    }

    testButton() {
        let c = "sidepanel-selector";

        const bumper = {
            marginBottom: "1em"
        }; 

        return <button style={bumper} type="button" className={c}
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
            matchId: this.props.matchId,
            language: "python3"
        };

        fetch(Globals.ChallengeUrl, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(d => d.json())
          .then((data: Globals.Challenge) => {
              this.setState({ challenge: data });
              this.props.starterCode(data.starterCode["python3"]);
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
                    {this.state.isOnTestPanel && 
                        <div className="test-section">
                            {this.testButton()}
                            <h3>Tests passed:</h3>
                            <div className="test-progress-bar">
                                <ProgressBar variant="success" 
                                    now={this.state.currentNumberTestsPassed/this.state.totalNumberTests}
                                    label={`${this.state.currentNumberTestsPassed/this.state.totalNumberTests}%`} 
                                />
                            </div>
                            <h3 style={{ color: "green" }}>Last Test Stdout:</h3>
                            <div className="card stdout-output"></div>
                            <h3 style={{ color: "red" }}>Last Test Stderr:</h3>
                            <div className="card stderr-output">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                        </div>
                    }
                    {(!this.state.isOnTestPanel) && 
                        <div>
                            <div dangerouslySetInnerHTML={{
                                __html: this.state.challenge && marked(this.state.challenge.description, {sanatize: true})
                            }}></div>
                        </div>
                    }
                </div>
                <button className="sidepanel-selector surrender-button" onClick={this.props.exitMatch}>Surrender</button>
            </div>
        </div>;
    }
}
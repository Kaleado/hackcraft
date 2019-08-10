import * as React from "react";
import { GameSidePanel } from "./GameSidePanel";
import MonacoEditor from "react-monaco-editor";
import * as Globals from "../../../../shared/index";
import { Modal, Button } from "react-bootstrap";
import { MatchStatus } from "../../../../shared";

interface IGameProps {
    matchId: number;
    userId: number;
    exitMatch: () => void;
};

interface IGameState {
    code: string;
    hasWon: boolean;
    matchStatus: MatchStatus;
};

const POLL_INTERVAL = 1000;

export class Game extends React.Component<IGameProps, IGameState> {

    constructor(props) {
        super(props);

        this.state = {
            code: "# Loading...",
            hasWon: false,
            matchStatus: "STARTED"
        };
    }

    onChange = (newValue, e) => {
        this.setState({
            code: newValue
        });
    }

    editorDidMount(editor, monaco) {
        editor.focus();
    }

    runTests = (callback) => {
        const body: Globals.MakeSubmissionRequest = {
            userId: this.props.userId,
            matchId: this.props.matchId,
            submittedCode: this.state.code,
            submittedLanguage: "python3"
        };

        fetch(Globals.MakeSubmissionURL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(d => d.json())
            .then((data: Globals.MakeSubmissionResponse) => {
                if (data.testsFailed === 0) {
                    this.setState({ hasWon: true });
                }
                callback(data);
            })

    };

    starterCode = newCode => {
        this.setState({ code: newCode })
    };

    pollForStatusChanges = () => {
        fetch(`${Globals.serverUrl}:${Globals.serverPort}${Globals.PATH_MATCH_STATUS}`, {
            method: "POST",
            body: JSON.stringify({matchId: this.props.matchId}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(d1 => d1.json())
        .then((status: Globals.MatchStatusResponse) => {
            if(status.matchStatus == "ENDED") this.setState({
                matchStatus: "ENDED"
            });
            else setTimeout(this.pollForStatusChanges, POLL_INTERVAL);
        });
    };

    render() {
        const options = {
            selectOnLineNumbers: true
        };

        const remainingWidth = window.innerWidth - 600;

        return <div className="dashboard-wrapper">
            <GameSidePanel
                starterCode={this.starterCode}
                exitMatch={this.props.exitMatch}
                matchId={this.props.matchId}
                runTests={this.runTests}>
            </GameSidePanel>
            <MonacoEditor
                width={remainingWidth.toString()}
                height={window.innerHeight.toString()}
                language="python"
                theme="vs-dark"
                value={this.state.code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
            />
            {this.state.hasWon &&
                <Modal.Dialog>
                    <Modal.Body>
                        <h1>You win!</h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.exitMatch}>Leave Game</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            }

        </div>;
    }

}
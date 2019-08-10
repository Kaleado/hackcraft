import * as React from "react";
import { GameSidePanel } from "./GameSidePanel";
import MonacoEditor from "react-monaco-editor";

interface IGameProps {
    matchId: number;
    exitMatch: () => void;
};

interface IGameState {
    code: string;
};

export class Game extends React.Component<IGameProps, IGameState> {

    constructor(props) {
        super(props);

        this.state = {
            code: "# Enter your code here..."
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

    runTests = () => {
        return "We did it reddit!";
    };


    render() {
        const options = {
            selectOnLineNumbers: true
        };

        const remainingWidth = window.innerWidth - 600;

        return <div className="dashboard-wrapper">
            <GameSidePanel exitMatch={this.props.exitMatch} matchId={this.props.matchId} runTests={this.runTests}></GameSidePanel>
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

        </div>;
    }

}
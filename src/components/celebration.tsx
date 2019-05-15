import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "src/models/wwState";
import "./styles/celebration.css";

interface CelebrationProps {
	shouldShow: boolean;
	foundWord: string;
}

interface CelebrationState {
	_unused: any;
}

class CelebrationImpl extends React.Component<CelebrationProps, CelebrationState> {
	public render(): JSX.Element | null {
		if (this.props.shouldShow) {
			return (
				// key ensures that a new one pops up each time
				<span className="celebration" key={this.props.foundWord}>
					Found {this.props.foundWord}!
				</span>
			);
		}
		return null;
	}
}

let Celebration = connect(
	(state: AppState) => ({
		foundWord: state.lastWordWasSuccessful ? state.foundWords[state.foundWords.length - 1] : "",
		shouldShow: state.lastWordWasSuccessful,
	}),
	{
		// Map dispatch to props
	}
)(CelebrationImpl);

export { Celebration };

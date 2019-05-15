import * as React from "react";
import { connect } from "react-redux";
import { raiseLetterSelect } from "src/actions/letters";
import { AppState } from "src/models/wwState";
import "./styles/letters.css";

const AvailableLettersClass = "availableLetters";

interface LettersProps {
	selectedCharacters: string[];
	unusedCharacters: string[];
	onLetterClicked: LetterClickedDelegate;
}

interface LettersState {
	_unused?: any;
}

class LettersImpl extends React.Component<LettersProps, LettersState> {
	public constructor(props: LettersProps) {
		super(props);
		this._onAvailableLetterClick = this._onAvailableLetterClick.bind(this);
	}

	public render(): JSX.Element {
		let numChars = this.props.selectedCharacters.length + this.props.unusedCharacters.length;
		let className = "letterSelection";
		if (numChars > 11) {
			className += " shouldBeSmall";
		} else if (numChars > 6) {
			className += " shouldBeMedium";
		}
		return (
			<div className={className}>
				<AvailableLetters
					availableLetters={this.props.unusedCharacters}
					onLetterClicked={this._onAvailableLetterClick}
				/>
				<br />
				<SelectedLetters numAvailable={numChars} selectedCharacters={this.props.selectedCharacters} />
			</div>
		);
	}

	private _onAvailableLetterClick(event: React.MouseEvent) {
		let target = event.target as Element;
		let parent = target.parentElement;
		while (parent && parent.className.indexOf(AvailableLettersClass) < 0) {
			target = parent;
			parent = parent.parentElement;
		}
		if (!parent) {
			return;
		}
		let pos = Array.prototype.indexOf.call(parent.children, target);

		this.props.onLetterClicked(pos);
	}
}

let Letters = connect(
	(state: AppState) => ({
		selectedCharacters: state.selectedCharacters,
		unusedCharacters: state.unusedCharacters,
	}),
	{
		onLetterClicked: (pos: number) => raiseLetterSelect(pos),
	}
)(LettersImpl);

export { Letters };

interface LetterClickedDelegate {
	(pos: number): void;
}

interface ISelectedLettersProps {
	selectedCharacters: string[];
	numAvailable: number;
}

const SelectedLetters: React.FunctionComponent<ISelectedLettersProps> = props => {
	let letterDisp: JSX.Element[] = [];
	for (let i = 0; i < props.numAvailable; i++) {
		if (i < props.selectedCharacters.length) {
			letterDisp.push(
				<li key={i}>
					<span className="letter">{props.selectedCharacters[i]}</span>
				</li>
			);
		} else {
			letterDisp.push(<li className="empty" key={i} />);
		}
	}

	return <ul className="selectedLetters">{letterDisp}</ul>;
};

interface IAvailableLettersProps {
	availableLetters: string[];
	onLetterClicked?: ElementClickedDelegate;
}

const AvailableLetters: React.FunctionComponent<IAvailableLettersProps> = props => {
	let letterDisp: JSX.Element[] = [];
	for (let i = 0; i < props.availableLetters.length; i++) {
		let letter = props.availableLetters[i];
		letterDisp.push(
			<li className="oneLetter" key={i}>
				<span className="letter" onClick={props.onLetterClicked}>
					{letter}
				</span>
			</li>
		);
	}

	return <ul className={AvailableLettersClass}>{letterDisp}</ul>;
};

interface ElementClickedDelegate {
	(event: React.MouseEvent): void;
}

import * as React from "react";
import { connect } from "react-redux";
import { changeWordLength, nextRound, resume } from "src/actions/menu";
import { AppState, ScreenStateEnum } from "src/models/wwState";
import "./styles/menu.css";

interface MenuProps {
	screenState: ScreenStateEnum;
	numLetters: number;
	minWordLength: number;
	maxWordLength: number;
	onLengthChanged: LengthChangedDelegate;
	onResume: NoArgDelegate;
	onNextRound: NoArgDelegate;
}

interface MenuState {
	_unused: any;
}

class MenuImpl extends React.Component<MenuProps, MenuState> {
	private lengthTextbox: React.RefObject<HTMLInputElement>;

	public constructor(props: MenuProps) {
		super(props);
		this._onLengthChangeClicked = this._onLengthChangeClicked.bind(this);
		this._onNextRoundClicked = this._onNextRoundClicked.bind(this);
		this._onResumeClicked = this._onResumeClicked.bind(this);
		this.lengthTextbox = React.createRef();
	}

	public render(): JSX.Element | null {
		if (this.props.screenState === ScreenStateEnum.InRound) {
			return null;
		}

		let title = "WORD WARP";
		switch (this.props.screenState) {
			case ScreenStateEnum.BeforeGame:
				title = "WORD WARP";
				break;
			case ScreenStateEnum.BetweenRounds:
				title = "ALL WORDS FOUND!";
				break;
			case ScreenStateEnum.Paused:
				title = "PAUSED";
				break;
		}

		let nextLabel = "START";
		switch (this.props.screenState) {
			case ScreenStateEnum.BeforeGame:
				nextLabel = "START";
				break;
			case ScreenStateEnum.BetweenRounds:
				nextLabel = "NEXT ROUND";
				break;
			case ScreenStateEnum.Paused:
				nextLabel = "SKIP ROUND";
				break;
		}

		return (
			<div className="menu">
				<h1>{title}</h1>
				<ul className="menuOptions">
					{this.props.screenState === ScreenStateEnum.Paused && (
						<li className="selectable" onClick={this._onResumeClicked}>
							RESUME
						</li>
					)}
					<li className="selectable" onClick={this._onNextRoundClicked}>
						{nextLabel}
					</li>
					<li>
						WORD LENGTH:{" "}
						<input
							type="number"
							ref={this.lengthTextbox}
							defaultValue={this.props.numLetters.toString()}
							min={this.props.minWordLength}
							max={this.props.maxWordLength}
						/>{" "}
						<button onClick={this._onLengthChangeClicked}>CHANGE</button>
					</li>
				</ul>
			</div>
		);
	}

	private _onResumeClicked(): void {
		this.props.onResume();
	}

	private _onNextRoundClicked(): void {
		this.props.onNextRound();
	}

	private _onLengthChangeClicked(): void {
		let textbox = this.lengthTextbox.current;
		if (!textbox) {
			return;
		}
		this.props.onLengthChanged(textbox.valueAsNumber);
	}
}

let Menu = connect(
	(state: AppState) => ({
		// Map state to props
		maxWordLength: state.allWords.maxWordLength(),
		minWordLength: state.allWords.minWordLength(),
		numLetters: state.wordLength,
		screenState: state.screenState,
	}),
	{
		// Map dispatch to props
		onLengthChanged: (newLen: number) => changeWordLength(newLen),
		onNextRound: () => nextRound(),
		onResume: () => resume(),
	}
)(MenuImpl);

export { Menu };

interface LengthChangedDelegate {
	(len: number): void;
}

interface NoArgDelegate {
	(): void;
}

import * as React from "react";
import { connect } from "react-redux";
import { clear, enterPressed, giveUp, shuffle } from "src/actions/letters";
import { nextRound, pause } from "src/actions/menu";
import { AppState, ScreenStateEnum } from "src/models/wwState";
import { Celebration } from "./celebration";
import { FindableWords } from "./findableWords";
import { KeyboardListener } from "./keyboardListener";
import { Letters } from "./letters";
import "./styles/mainGame.css";

interface MainGameProps {
	screenState: ScreenStateEnum;
	showNextRoundButton: boolean;
	showGoButton: boolean;

	onGo: NoArgDelegate;

	onClear: NoArgDelegate;
	onShuffle: NoArgDelegate;
	onPause: NoArgDelegate;
	onGiveUp: NoArgDelegate;
	onNextRound: NoArgDelegate;
}

interface MainGameState {
	_unused?: any;
}

class MainGameImpl extends React.Component<MainGameProps, MainGameState> {
	public constructor(props: MainGameProps) {
		super(props);

		this.onGo = this.onGo.bind(this);
		this.onClear = this.onClear.bind(this);
		this.onShuffle = this.onShuffle.bind(this);
		this.onPause = this.onPause.bind(this);
		this.onNextRound = this.onNextRound.bind(this);
		this.onGiveUp = this.onGiveUp.bind(this);
	}

	public onGo(e: React.MouseEvent) {
		(e.target as HTMLElement).blur();
		this.props.onGo();
	}

	public onClear(e: React.MouseEvent) {
		(e.target as HTMLElement).blur();
		this.props.onClear();
	}

	public onShuffle(e: React.MouseEvent) {
		(e.target as HTMLElement).blur();
		this.props.onShuffle();
	}

	public onPause(e: React.MouseEvent) {
		(e.target as HTMLElement).blur();
		this.props.onPause();
	}

	public onNextRound(e: React.MouseEvent) {
		(e.target as HTMLElement).blur();
		this.props.onNextRound();
	}

	public onGiveUp(e: React.MouseEvent) {
		(e.target as HTMLElement).blur();
		this.props.onGiveUp();
	}

	public render(): JSX.Element | null {
		if (this.props.screenState !== ScreenStateEnum.InRound) {
			return null;
		}

		let goClass = this.props.showGoButton ? "goButton" : "goButton hide";

		return (
			<div className="mainGame">
				<Letters />
				<Celebration />
				<button className={goClass} onClick={this.onGo}>
					GO!
				</button>
				<div className="inGameMenu">
					<button onClick={this.onClear}>Clear</button>
					<button onClick={this.onShuffle}>Shuffle</button>
					<button onClick={this.onPause}>Pause</button>

					{(this.props.showNextRoundButton && <button onClick={this.onNextRound}>Next Round</button>) || (
						<button onClick={this.onGiveUp}>Give Up</button>
					)}
				</div>
				<FindableWords />
				<br />
				<KeyboardListener />
			</div>
		);
	}
}

let MainGame = connect(
	(state: AppState) => ({
		screenState: state.screenState,
		showGoButton: state.selectedCharacters.length >= state.allWords.minWordLength(),
		showNextRoundButton: state.foundWords.length === state.allSubWordsThisRound.length,
	}),
	{
		// Map dispatch to props
		onClear: () => clear(),
		onGiveUp: () => giveUp(),
		onGo: () => enterPressed(),
		onNextRound: () => nextRound(),
		onPause: () => pause(),
		onShuffle: () => shuffle(),
	}
)(MainGameImpl);

export { MainGame };

interface NoArgDelegate {
	(): void;
}

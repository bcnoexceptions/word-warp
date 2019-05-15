import * as React from "react";
import { connect } from "react-redux";
import { pause } from "src/actions/menu";
import { backspacePressed, enterPressed, raiseKeyPressed, recallLast } from "../actions/letters";
import { AppState } from "../models/wwState";

interface KeyboardListenerProps {
	selectedCharacters: string[];
	onCharSelected: CharSelectedDelegate;
	onBackspace: NoArgDelegate;
	onEnter: NoArgDelegate;
	onEscape: NoArgDelegate;
	onUpArrow: NoArgDelegate;
}

class KeyboardListenerImpl extends React.Component<KeyboardListenerProps, object> {
	public constructor(props: KeyboardListenerProps) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	public componentDidMount() {
		document.addEventListener("keydown", this.onKeyDown);
	}

	public componentWillUnmount() {
		document.removeEventListener("keydown", this.onKeyDown);
	}

	public onKeyDown(e: KeyboardEvent) {
		if (e.which === 8) {
			this.props.onBackspace();
		} else if (e.which === 13) {
			this.props.onEnter();
		} else if (e.which === 27) {
			this.props.onEscape();
		} else if (e.which === 38) {
			this.props.onUpArrow();
		}

		if (e.which < 65 || e.which > 90) {
			return;
		}
		let letter = String.fromCharCode(e.which).toLowerCase();
		this.props.onCharSelected(letter);
	}

	public render(): JSX.Element | null {
		return null;
	}
}

let KeyboardListener = connect(
	(state: AppState) => ({
		selectedCharacters: state.selectedCharacters,
	}),
	{
		onBackspace: () => backspacePressed(),
		onCharSelected: (char: string) => raiseKeyPressed(char),
		onEnter: () => enterPressed(),
		onEscape: () => pause(),
		onUpArrow: () => recallLast(),
	}
)(KeyboardListenerImpl);

export { KeyboardListener };

interface CharSelectedDelegate {
	(key: string): void;
}

interface NoArgDelegate {
	(): void;
}

import { ChangeWordLengthAction } from "src/actions/menu";
import { ActionTypeEnum, WWAction } from "../actions/main";
import { AppState, ScreenStateEnum } from "../models/wwState";

export default function menuReducer(state: AppState = new AppState(), action: WWAction) {
	let newState: AppState;

	switch (action.type) {
		case ActionTypeEnum.Pause:
			newState = new AppState(state);
			newState.screenState = ScreenStateEnum.Paused;
			return newState;

		case ActionTypeEnum.Resume:
			newState = new AppState(state);
			newState.screenState = ScreenStateEnum.InRound;
			if (newState.currentWord.length !== newState.wordLength) {
				newState.switchToNewWord();
			}
			return newState;

		case ActionTypeEnum.ChangeWordLength:
			let cwlAction = action as ChangeWordLengthAction;
			if (!cwlAction) {
				return state;
			}
			if (!state.allWords.isValidWordLength(cwlAction.length)) {
				return state;
			}

			newState = new AppState(state);
			newState.wordLength = cwlAction.length;
			return newState;

		case ActionTypeEnum.NextRound:
			newState = new AppState(state);
			newState.screenState = ScreenStateEnum.InRound;
			newState.switchToNewWord();
			return newState;

		default:
			return state;
	}
}

import * as _ from "lodash";
import { KeyAction, LetterSelectAction } from "src/actions/letters";
import { ActionTypeEnum, WWAction } from "src/actions/main";
import { AppState, ScreenStateEnum } from "src/models/wwState";

export default function lettersReducer(state: AppState, action: WWAction) {
	let newState: AppState;
	let pos: number;

	switch (action.type) {
		case ActionTypeEnum.KeyPressed:
			newState = new AppState(state);
			let key = (action as KeyAction).key;
			pos = newState.unusedCharacters.indexOf(key);
			if (pos < 0) {
				// not available to be selected
				return newState;
			}

			newState.selectedCharacters = newState.selectedCharacters.concat(key);
			newState.unusedCharacters = newState.unusedCharacters.slice();
			newState.unusedCharacters.splice(pos, 1);
			return newState;

		case ActionTypeEnum.LetterSelected:
			newState = new AppState(state);
			pos = (action as LetterSelectAction).position;
			if (pos < 0 || pos >= newState.unusedCharacters.length) {
				return newState;
			}

			newState.selectedCharacters = newState.selectedCharacters.concat(newState.unusedCharacters[pos]);
			newState.unusedCharacters = newState.unusedCharacters.slice();
			newState.unusedCharacters.splice(pos, 1);
			return newState;

		case ActionTypeEnum.BackspacePressed:
			newState = new AppState(state);
			let selected = newState.selectedCharacters;
			if (selected.length > 0) {
				let last = selected[selected.length - 1];
				newState.selectedCharacters = selected.slice(0, selected.length - 1);

				newState.unusedCharacters = newState.unusedCharacters.slice();
				newState.unusedCharacters.push(last);
			}
			return newState;

		case ActionTypeEnum.Clear:
			newState = new AppState(state);
			newState.unusedCharacters = newState.unusedCharacters.slice().concat(newState.selectedCharacters);
			newState.selectedCharacters = [];
			return newState;

		case ActionTypeEnum.RepeatLastWord:
			newState = new AppState(state);
			if (newState.foundWords.length === 0) {
				return newState;
			}
			newState.selectedCharacters = newState.foundWords[newState.foundWords.length - 1].split("");
			newState.unusedCharacters = newState.availableCharacters.slice();
			for (let char of newState.selectedCharacters) {
				pos = newState.unusedCharacters.indexOf(char);
				newState.unusedCharacters.splice(pos, 1);
			}
			return newState;

		case ActionTypeEnum.Shuffle:
			newState = new AppState(state);
			newState.unusedCharacters = _.shuffle(newState.unusedCharacters.slice());
			return newState;

		case ActionTypeEnum.GiveUp:
			newState = new AppState(state);
			newState.foundWords = newState.allSubWordsThisRound;
			return newState;

		case ActionTypeEnum.EnterPressed:
			newState = new AppState(state);
			let guess = state.selectedCharacters.join("");

			newState.lastWordWasSuccessful = false;
			if (newState.allSubWordsThisRound.indexOf(guess) >= 0) {
				if (newState.foundWords.indexOf(guess) < 0) {
					// don't find the same word multiple times
					newState.foundWords = state.foundWords.slice();
					newState.foundWords.push(guess);
					newState.lastWordWasSuccessful = true;
				}
			}

			if (newState.allSubWordsThisRound.length === newState.foundWords.length) {
				// found them all!
				newState.screenState = ScreenStateEnum.BetweenRounds;
				return newState;
			}

			newState.unusedCharacters = newState.unusedCharacters.slice().concat(newState.selectedCharacters);
			newState.selectedCharacters = [];
			return newState;

		default:
			return state;
	}
}

import { ActionTypeEnum, WWAction } from "./main";

export interface KeyAction extends WWAction {
	type: ActionTypeEnum;
	key: string;
}

export interface LetterSelectAction extends WWAction {
	type: ActionTypeEnum;
	position: number;
}

export function raiseKeyPressed(key: string): KeyAction {
	return { type: ActionTypeEnum.KeyPressed, key };
}

export function raiseLetterSelect(position: number): LetterSelectAction {
	return { type: ActionTypeEnum.LetterSelected, position };
}

export function backspacePressed(): WWAction {
	return { type: ActionTypeEnum.BackspacePressed };
}

export function enterPressed(): WWAction {
	return { type: ActionTypeEnum.EnterPressed };
}

export function shuffle(): WWAction {
	return { type: ActionTypeEnum.Shuffle };
}

export function clear(): WWAction {
	return { type: ActionTypeEnum.Clear };
}

export function recallLast(): WWAction {
	return { type: ActionTypeEnum.RepeatLastWord };
}

export function giveUp(): WWAction {
	return { type: ActionTypeEnum.GiveUp };
}

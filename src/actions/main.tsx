export interface WWAction {
	type: ActionTypeEnum;
}

export enum ActionTypeEnum {
	KeyPressed = "KeyPressed",
	LetterSelected = "LetterSelected",
	BackspacePressed = "BackspacePressed",

	EnterPressed = "EnterPressed",
	RepeatLastWord = "RepeatLastWord",
	Clear = "Clear",
	Shuffle = "Shuffle",
	GiveUp = "GiveUp",

	ChangeWordLength = "ChangeWordLength",
	Pause = "Pause",
	Resume = "Resume",
	NextRound = "NextRound",
}

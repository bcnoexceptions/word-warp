import * as _ from "lodash";
import { GlobalWordList } from "../data/wordList";
import { Dictionary } from "./dictionary";

export enum ScreenStateEnum {
	BeforeGame,
	Paused,
	InRound,
	BetweenRounds,
}

export class AppState {
	public allWords: Dictionary;
	public wordLength: number;

	public screenState: ScreenStateEnum;
	public currentWord: string;

	public availableCharacters: string[];
	public selectedCharacters: string[];
	public unusedCharacters: string[];

	public allSubWordsThisRound: string[];
	public foundWords: string[];
	public lastWordWasSuccessful: boolean;

	public constructor(other?: AppState) {
		if (other) {
			this.allWords = other.allWords;
			this.wordLength = other.wordLength;
			this.screenState = other.screenState;
			this.currentWord = other.currentWord;
			this.availableCharacters = other.availableCharacters;
			this.selectedCharacters = other.selectedCharacters;
			this.unusedCharacters = other.unusedCharacters;
			this.allSubWordsThisRound = other.allSubWordsThisRound;
			this.foundWords = other.foundWords;
			this.lastWordWasSuccessful = other.lastWordWasSuccessful;
			return;
		}

		this.allWords = new Dictionary(GlobalWordList);
		this.wordLength = 6;
		this.screenState = ScreenStateEnum.BeforeGame;
		this.switchToNewWord();
	}

	public switchToNewWord() {
		this.currentWord = this.allWords.randomWord(this.wordLength);
		this.availableCharacters = _.shuffle(this.currentWord.split(""));
		this.unusedCharacters = this.availableCharacters;
		this.selectedCharacters = [];

		let cmp = (w1: string, w2: string) => {
			if (w1.length !== w2.length) {
				return w1.length - w2.length;
			}
			return w1.localeCompare(w2);
		};
		this.allSubWordsThisRound = this.allWords.findWordsFrom(this.currentWord).sort(cmp);
		this.foundWords = [];
		this.lastWordWasSuccessful = false;
	}
}

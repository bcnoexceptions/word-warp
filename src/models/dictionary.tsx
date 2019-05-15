import { getAllSubsets, randomElement } from "../utils/utils";
import { WordAnagramSet } from "./wordAnagram";

const MIN_LENGTH = 3;

export class Dictionary {
	public wordsByLength: WordAnagramSet[];

	constructor(wordList?: string[]) {
		this.wordsByLength = [];
		if (wordList) {
			this.initializeFrom(wordList);
		}
	}

	public initializeFrom(wordList: string[]) {
		for (const word of wordList) {
			while (word.length >= this.wordsByLength.length) {
				this.wordsByLength.push(new WordAnagramSet());
			}

			this.wordsByLength[word.length].addWord(word);
		}
	}

	public randomWord(length: number): string {
		let allWords = this.wordsByLength[length].allWords();
		return randomElement(allWords);
	}

	public findWordsFrom(parentWord: string): string[] {
		let results: Set<string> = new Set<string>();

		const subsets = getAllSubsets(parentWord);

		for (let someChars of subsets) {
			if (someChars.length < MIN_LENGTH || someChars.length > this.wordsByLength.length) {
				continue;
			}
			let onePermWords = this.wordsByLength[someChars.length].getMatches(someChars);
			for (let permWord of onePermWords) {
				results.add(permWord);
			}
		}

		return Array.from(results);
	}

	public isValidWordLength(requested: number): boolean {
		if (requested < MIN_LENGTH) {
			return false;
		}
		if (requested >= this.wordsByLength.length) {
			return false;
		}
		return true;
	}

	public minWordLength(): number {
		return MIN_LENGTH;
	}

	public maxWordLength(): number {
		return this.wordsByLength.length - 1;
	}
}

import { WordAnagramSet } from "./wordAnagram";

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

            this.wordsByLength[word.length].processWord(word);
        }
    }
}

export class WordAnagramSet {
    private anagramMap: Map<string, string[]>;
    constructor() {
        this.anagramMap = new Map<string, string[]>();
    }

    public addWord(word: string) {
        const splitWord = word.split("");
        splitWord.sort();

        const sortedWord = splitWord.join("");
        if (this.anagramMap[sortedWord]) {
            this.anagramMap[sortedWord].push(word);
        } else {
            this.anagramMap[sortedWord] = [word];
        }
    }

    public getMatches(pattern: string): string[] {
        const splitWord = pattern.split("");
        splitWord.sort();
        const sortedWord = splitWord.join("");

        if (this.anagramMap[sortedWord]) {
            return this.anagramMap[sortedWord];
        }
        return [];
    }
}

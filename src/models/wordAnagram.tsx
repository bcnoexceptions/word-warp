export class WordAnagramSet {
    private anagramMap: Map<string, string[]>;
    constructor() {
        this.anagramMap = new Map<string, string[]>();
    }

    public addWord(word: string) {
        const splitWord = word.split("");
        splitWord.sort();

        const sortedWord = splitWord.join("");
        let current = this.anagramMap.get(sortedWord);
        if (current) {
            current.push(word);
        } else {
            this.anagramMap.set(sortedWord, [word]);
        }
    }

    public allWords(): string[] {
        let result: Set<string> = new Set<string>();
        this.anagramMap.forEach((someWords, key) => {
            key = key; // unused
            for (let word of someWords) {
                result.add(word);
            }
        });

        return Array.from(result);
    }

    public getMatches(pattern: string): string[] {
        const splitWord = pattern.split("");
        splitWord.sort();
        const sortedWord = splitWord.join("");

        return this.anagramMap.get(sortedWord) || [];
    }
}

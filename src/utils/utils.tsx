export function getPermutations(input: string, minLength: number): string[] {
	const foundWords: Set<string> = new Set<string>();
	_getPermutationsHelper(input.split(""), minLength, foundWords);
	return Array.from(foundWords);
}

function _getPermutationsHelper(input: string[], minLength: number, foundWords: Set<string>): void {
	if (input.length === minLength) {
		foundWords.add(input.join(""));
		return;
	}

	for (let i = 0; i < input.length; i++) {
		const subArray = input.slice(0, i).concat(input.slice(i + 1));
		_getPermutationsHelper(subArray, minLength, foundWords);
	}
}

export function getAllSubsets(input: string): string[] {
	const foundWords: Set<string> = new Set<string>();
	foundWords.add("");
	_getAllSubsetsHelper(input.split(""), foundWords);
	return Array.from(foundWords);
}

function _getAllSubsetsHelper(remainingChars: string[], foundWords: Set<string>): void {
	if (remainingChars.length === 0) {
		return;
	}

	let nextWave: string[] = [];
	let nextChar = remainingChars.shift();

	foundWords.forEach((word: string) => {
		nextWave.push(word + nextChar);
	});

	for (let newWord of nextWave) {
		foundWords.add(newWord);
	}

	_getAllSubsetsHelper(remainingChars, foundWords);
}

export function randomElement<T>(arr: T[]) {
	let n = Math.floor(Math.random() * arr.length);
	return arr[n];
}

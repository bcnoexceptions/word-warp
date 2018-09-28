export function getPermutations(input: string, minLength: number) {
    const foundWords: Set<string> = new Set<string>();
    _getPermutationsHelper(input.split(""), minLength, foundWords);
    return Array.from(foundWords);
}

function _getPermutationsHelper(
    input: string[],
    minLength: number,
    foundWords: Set<string>
) {
    if (input.length === minLength) {
        foundWords.add(input.join(""));
        return;
    }

    for (let i = 0; i < input.length; i++) {
        const subArray = input.slice(0, i).concat(input.slice(i + 1));
        _getPermutationsHelper(subArray, minLength, foundWords);
    }
}

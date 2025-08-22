const inputFile = 'input.txt'

const puzzleGrid = (await Deno.readTextFile(inputFile))
	.split('\n')
	.filter(line => line.length > 0)
	.map(line => line.split(''))

const matchAt = (
	at: { x: number; y: number },
): 0 | 1 => {
	if (puzzleGrid[at.y][at.x] !== 'A') {
		return 0
	}

	const cornerValues = [
		puzzleGrid[at.y - 1][at.x + 1],
		puzzleGrid[at.y + 1][at.x + 1],
		puzzleGrid[at.y + 1][at.x - 1],
		puzzleGrid[at.y - 1][at.x - 1],
	]

	const numM = cornerValues.filter(char => char === 'M').length
	const numS = cornerValues.filter(char => char === 'S').length
	if (numM !== 2 || numS !== 2 || cornerValues[0] === cornerValues[2]) {
		return 0
	}

	return 1
}

let numAnswers = 0
for (let rowIndex = 1; rowIndex < puzzleGrid.length -1; ++rowIndex) {
	for (let columnIndex = 1; columnIndex < puzzleGrid[rowIndex].length -1; ++columnIndex) {
		numAnswers += matchAt({ x: columnIndex, y: rowIndex })
	}
}

console.log(`numAnswers = ${numAnswers}`)

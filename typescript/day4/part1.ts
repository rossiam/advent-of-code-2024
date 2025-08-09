const inputFile = 'input.txt'

const puzzleGrid = (await Deno.readTextFile(inputFile))
	.split('\n')
	.filter(line => line.length > 0)
	.map(line => line.split(''))

const numRows = puzzleGrid.length
const numColumns = puzzleGrid[0].length

const matchAt = (
	value: string,
	at: { x: number; y: number },
	going: { x: -1 | 0 | 1; y: -1 | 0 | 1 },
): 0 | 1 => {
	console.log(`checking for ${value} at ${JSON.stringify(at)} going ${JSON.stringify(going)}`)
	if (at.x < 0 || at.x >= numColumns || at.y < 0 || at.y >= numRows ||
			value.charAt(0) !== puzzleGrid[at.y][at.x]) {
		return 0
	}
	if (value.length === 1 && value.charAt(0) ===  puzzleGrid[at.y][at.x]) {
		return 1
	}
	return matchAt(value.substring(1), { x: at.x + going.x, y: at.y + going.y }, going)
}

const numAnswersAt = (at: { x: number; y: number }): number =>
	+ matchAt("XMAS", at, { x: 0, y: -1 })
	+ matchAt("XMAS", at, { x: 1, y: -1 })
	+ matchAt("XMAS", at, { x: 1, y: 0 })
	+ matchAt("XMAS", at, { x: 1, y: 1 })
	+ matchAt("XMAS", at, { x: 0, y: 1 })
	+ matchAt("XMAS", at, { x: -1, y: 1 })
	+ matchAt("XMAS", at, { x: -1, y: 0 })
	+ matchAt("XMAS", at, { x: -1, y: -1 })


let numAnswers = 0
for (let rowIndex = 0; rowIndex < puzzleGrid.length; ++rowIndex) {
	for (let columnIndex = 0; columnIndex < puzzleGrid[rowIndex].length; ++columnIndex) {
		numAnswers += numAnswersAt({ x: columnIndex, y: rowIndex })
	}
}

console.log(`numAnswers = ${numAnswers}`)

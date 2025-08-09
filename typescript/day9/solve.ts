const inputFile = 'input.txt'
// const inputFile = 'input-test.txt'

let isSpace = false
let fileNumber = 0
const input: string = (await Deno.readTextFile(inputFile)).trim()
const numFiles = Math.ceil(input.length / 2)
console.log(`numFiles = ${numFiles}`)

const filesystem1: ('.' | number)[] = input
	.split('')
	.flatMap(numBlocks => {
		const retVal = Array<'.' | number>(parseInt(numBlocks)).fill(isSpace ? '.' : fileNumber++)
		isSpace = !isSpace
		return retVal
	})

const filesystem2 = [...filesystem1]

let firstGap = filesystem1.indexOf('.')
let lastUsed = filesystem1.findLastIndex(block => block !== '.')
while (firstGap < lastUsed) {
	filesystem1[firstGap] = filesystem1[lastUsed]
	filesystem1[lastUsed] = '.'
	firstGap = filesystem1.indexOf('.')
	lastUsed = filesystem1.findLastIndex(block => block !== '.')
}

const calcChecksum = (filesystem: ('.' | number)[]) =>
	filesystem.reduce<number>((acc, curr, index) => acc + (typeof curr !== 'number' ? 0 : curr * index), 0)

const fileStartLocs: number[] = []
for (fileNumber = 0; fileNumber < numFiles; ++fileNumber) {
	fileStartLocs[fileNumber] = filesystem2.indexOf(fileNumber)
}
console.log(`fileStartLocs = ${JSON.stringify(fileStartLocs)}`)

const bigEnough = (filesystem: ('.' | number)[], gapIndex: number, lenRequired: number): boolean => {
	const nextUsed = filesystem.findIndex((value, index) => index > gapIndex && value !== '.')
	return nextUsed >= gapIndex + lenRequired
}
console.log(`filesystem2 = "${filesystem2.join('')}"`)

for (fileNumber = numFiles - 1; fileNumber > 0; --fileNumber) {
	// console.log(`processing file number ${fileNumber}`)
	const currStart = filesystem2.indexOf(fileNumber)
	const lastAt = filesystem2.lastIndexOf(fileNumber)
	const len = lastAt - currStart + 1
	let potentialGap = filesystem2.indexOf('.')
	// console.log(`potentialGap = ${potentialGap}`)
	while (potentialGap >= 0 && !bigEnough(filesystem2, potentialGap, len)) {
		potentialGap = filesystem2.indexOf('.', potentialGap + 1)
		// console.log(`potentialGap = ${potentialGap}; len = ${len}`)
	}
	// console.log(`potentialGap = ${potentialGap}`)
	if (potentialGap >= 0 && potentialGap < currStart) {
		const newLoc = potentialGap
		for (let count = 0; count < len; ++count) {
			filesystem2[newLoc + count] = filesystem2[currStart + count]
			filesystem2[currStart + count] = '.'
		}
	}
	// console.log(`filesystem2 = "${filesystem2.join('')}"`)
}

const fs1Checksum = calcChecksum(filesystem1)
const fs2Checksum = calcChecksum(filesystem2)

// console.log(`filesystem2 = "${filesystem2.join('')}"`)
console.log(`part1 checksum = ${fs1Checksum}`)
console.log(`part2 checksum = ${fs2Checksum}`)

const inputFile = 'input.txt'
// const inputFile = 'input-test.txt'
// const inputFile = 'input-sample.txt'

const locations = (await Deno.readTextFile(inputFile))
	.trim()
	.split('\n')
	.map(line => line.split('').map(loc => parseInt(loc)))

const numRows = locations.length
const numColumns = locations[0].length

const pathsFrom = (x: number, y: number): number => {
	const thisLoc = locations[y][x]
	if (thisLoc === 9) {
		return 1
	}
	const nextStep = thisLoc + 1
	const retVal = (x > 0 && locations[y][x - 1] === nextStep ? pathsFrom(x - 1, y) : 0) +
		(y > 0 && locations[y - 1][x] === nextStep ? pathsFrom(x, y - 1) : 0) +
		(x < numColumns - 1 && locations[y][x + 1] === nextStep ? pathsFrom(x + 1, y) : 0) +
		(y < numRows - 1 && locations[y + 1][x] === nextStep ? pathsFrom(x, y + 1) : 0)
	// console.log(`${'  '.repeat(thisLoc)}${retVal} paths from ${thisLoc} at (${x}, ${y})`)
	return retVal
}

const reachablePeaksFrom = (x: number, y: number): Set<string> => {
	const thisLoc = locations[y][x]
	if (thisLoc === 9) {
		return new Set([`${x},${y}`])
	}

	let retVal = new Set<string>()
	const nextStep = thisLoc + 1
	if (x > 0 && locations[y][x - 1] === nextStep) {
		retVal = retVal.union(reachablePeaksFrom(x - 1, y))
	}
	if (y > 0 && locations[y - 1][x] === nextStep) {
		retVal = retVal.union(reachablePeaksFrom(x, y - 1))
	}
	if (x < numColumns - 1 && locations[y][x + 1] === nextStep) {
		retVal = retVal.union(reachablePeaksFrom(x + 1, y))
	}
	if (y < numRows - 1 && locations[y + 1][x] === nextStep) {
		retVal = retVal.union(reachablePeaksFrom(x, y + 1))
	}
	return retVal
}

let part1Sum = 0
let part2Sum = 0
for (let yIndex = 0; yIndex < locations.length; ++yIndex) {
	const row = locations[yIndex]
	for (let xIndex = 0; xIndex < row.length; ++xIndex) {
		if (row[xIndex] === 0) {
			const fromHere = pathsFrom(xIndex, yIndex)
			part2Sum += fromHere
			const reachablePeaks = reachablePeaksFrom(xIndex, yIndex)
			part1Sum += reachablePeaks.size
		}
	}
}

console.log(`part1 answer = ${part1Sum}`)
console.log(`part1 answer = ${part2Sum}`)

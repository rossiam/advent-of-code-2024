import { processMap } from './map.ts'


const inputData = await Deno.readTextFile('input-test.txt')

const startingMap = inputData.split('\n').filter(line => line.length > 0).map(line => [...line])

const copyMap = (map: string[][]): string[][] => map.map(line =>  [...line])

let numCausingLoops = 0

for (let rowIndex = 0; rowIndex < startingMap.length; ++rowIndex) {
	const row = startingMap[rowIndex]
	for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
		const column = row[columnIndex]
		if (column[columnIndex] === '.') {
			const mapWithNewObstruction = copyMap(startingMap)
			mapWithNewObstruction[rowIndex][columnIndex] = '#'
			const result = processMap(mapWithNewObstruction)
			if (result.guardOutcome === 'looped') {
				++numCausingLoops
			}
		}
	}
}

console.log(`numCausingLoops = ${numCausingLoops}`)

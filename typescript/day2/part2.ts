import { isSafe } from './part1.ts'

const inputFile = 'input.txt'
const inputData = await Deno.readTextFile(inputFile)

const reports = inputData
	.split('\n')
	.filter(line => line.length > 0)
	.map(line => line.split(/\s+/).map(level => parseInt(level)))


const isSafeWithALevelRemoved = (report: number[]): boolean => {
	if (isSafe(report)) {
		return true
	}

	for (let index = 0; index < report.length; ++index) {
		if (isSafe(report.toSpliced(index, 1))) {
			return true
		}
	}

	return false
}

const numSafe = reports.filter(report => isSafeWithALevelRemoved(report)).length
console.log(`input file ${inputFile} has ${numSafe} safe reports`)

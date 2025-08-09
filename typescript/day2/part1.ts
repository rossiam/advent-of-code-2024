const inputFile = 'input.txt'
const inputData = await Deno.readTextFile(inputFile)

const reports = inputData
	.split('\n')
	.filter(line => line.length > 0)
	.map(line => line.split(/\s+/).map(level => parseInt(level)))

export const isSafe = (report: number[]): boolean => {
	const diffs = []
	for (let index = 1; index < report.length; ++index) {
		diffs.push(report[index] - report[index - 1])
	}
	if (diffs.find(diff => diff === 0) !== undefined) {
		return false
	}
	const numPositive = diffs.filter(diff => diff > 0).length
	if (numPositive !== 0 && numPositive !== diffs.length) {
		return false
	}
	const absDiff = diffs.map(diff => Math.abs(diff))
	if (absDiff.find(diff => diff > 3)) {
		return false
	}
	console.log(`report ${JSON.stringify(report)} is safe`)
	return true
}

const numSafe = reports.filter(report => isSafe(report)).length
console.log(`input file ${inputFile} has ${numSafe} safe reports`)

const inputFile = 'input.txt'

const incompleteEquations = (await Deno.readTextFile(inputFile))
	.split('\n')
	.filter(line => line.length)
	.map(line => {
		const [resultStr, operandsStr] = [...line.split(/:\s+/)]
		return {
			result: parseInt(resultStr),
			operands: operandsStr.split(/\s/).map(str => parseInt(str)),
		}
	})

const canSolve = (result: number, operands: number[]): boolean => {
	if (operands.length === 2) {
		return operands[0] + operands[1] === result || operands[0] * operands[1] === result
	}

	const lastOperand = operands[operands.length - 1]
	const remaining = operands.slice(0, operands.length - 1)
	return canSolve(result / lastOperand, remaining) || canSolve(result - lastOperand, remaining)
}

const solvable = incompleteEquations
	.filter(incompleteEquation => canSolve(incompleteEquation.result, incompleteEquation.operands))

const answer = solvable.reduce((prev, curr) => prev + curr.result, 0)
console.log(`answer = ${answer}`)

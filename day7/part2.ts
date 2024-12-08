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

const concatNumbers = (a: number, b: number): number => parseInt(`${a}${b}`)
const canUnconcatNumbers = (a: number, b: number): boolean =>
	a > 0 && b > 0 && (a.toString().endsWith(b.toString()))
const unconcatNumbers = (a: number, b: number): number =>
	parseInt(a.toString().substring(0, a.toString().length - b.toString().length))

const canSolve = (result: number, operands: number[]): false | string => {
	if (operands.length === 2) {
		if (operands[0] + operands[1] === result) {
			return `${operands[0]} + ${operands[1]}`
		}
		if (operands[0] * operands[1] === result) {
			return `${operands[0]} * ${operands[1]}`
		}
		if (concatNumbers(operands[0], operands[1]) === result) {
			return `${operands[0]} || ${operands[1]}`
		}
		return  false
	}

	const lastOperand = operands[operands.length - 1]
	const remaining = operands.slice(0, operands.length - 1)
	const addRemaining = canSolve(result - lastOperand, remaining)
	if (addRemaining) {
		return `${addRemaining} + ${lastOperand}`
	}
	const multiplyRemaining = result % lastOperand === 0 && canSolve(result / lastOperand, remaining)
	if (multiplyRemaining) {
		return `${multiplyRemaining} * ${lastOperand}`
	}
	if (canUnconcatNumbers(result, lastOperand)) {
		const concatRemaining = canSolve(unconcatNumbers(result, lastOperand), remaining)
		if (concatRemaining) {
			return `${concatRemaining} || ${lastOperand}`
		}
	}
	return false
}

const solvable = incompleteEquations
	.filter(incompleteEquation => canSolve(incompleteEquation.result, incompleteEquation.operands))

const answer = solvable.reduce((prev, curr) => prev + curr.result, 0)
console.log(`answer = ${answer}`)

const inputFile = 'input.txt'

const incompleteEquations = (await Deno.readTextFile(inputFile))
	.split('\n')
	.filter(line => line.length)
	.map(line => {
		const [resultStr, operandsStr] = [...line.split(/:\s+/)]
		return {
			result: BigInt(resultStr),
			operands: operandsStr.split(/\s/).map(str => BigInt(str)),
		}
	})

const concatNumbers = (a: bigint, b: bigint): bigint => BigInt(`${a}${b}`)
const canUnconcatNumbers = (a: bigint, b: bigint): boolean =>
	a > 0 && b > 0 && (a.toString().endsWith(b.toString()))
const unconcatNumbers = (a: bigint, b: bigint): bigint =>
	BigInt(a.toString().substring(0, a.toString().length - b.toString().length))

const canSolve = (result: bigint, operands: bigint[]): false | string => {
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
	const multiplyRemaining = result % lastOperand === BigInt(0) && canSolve(result / lastOperand, remaining)
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

const answer = solvable.reduce((prev, curr) => prev + curr.result, BigInt(0))
console.log(`answer = ${answer}`)

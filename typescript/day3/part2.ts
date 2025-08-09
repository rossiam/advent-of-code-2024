const inputFile = 'input.txt'
// const inputFile = 'input-test-pt2.txt'
const inputData = await Deno.readTextFile(inputFile)

const instructions = [...inputData.matchAll(/(?:mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\))/g)]
	.map(mul => mul.toString())

console.log(`instructions = ${JSON.stringify(instructions, null, 4)}`)
const answer =
	instructions.reduce((prev, next) => {
		console.log(`prev = ${JSON.stringify(prev)}; next = ${next}`)
		if (next === 'don\'t()') {
			return { sum: prev.sum, doing: false }
		}
		if (next === 'do()') {
			return { sum: prev.sum, doing: true }
		}
		if (prev.doing) {
			const [multiplicand, multiplier] =
				[...next.matchAll(/\d+/g)].map(factor => parseInt(factor.toString()))
			return { sum: prev.sum + multiplicand * multiplier, doing: true }
		}
		return prev
	}, { sum: 0, doing: true })

console.log(`answer = ${JSON.stringify(answer, null, 4)}`)

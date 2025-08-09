const inputFile = 'input.txt'
const inputData = await Deno.readTextFile(inputFile)

const sum = [...inputData.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)]
	.map(mul => {
		const [multiplicand, multiplier] =
			[...mul.toString().matchAll(/\d+/g)].map(factor => parseInt(factor.toString()))
		return multiplicand * multiplier
	})
	.reduce((prev, curr) => prev + curr, 0)

console.log(`sum = ${sum}`)

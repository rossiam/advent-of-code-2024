import { followsRules, middleNumber } from './shared.ts'

const inputFile = 'input.txt'

const [ruleStrings, updateStrings] = (await Deno.readTextFile(inputFile))
	.split('\n\n')
	.map(thing => thing.split('\n').filter(line => line.length > 0))

const rules = ruleStrings.map(str => str.split('|').map(pageNo => parseInt(pageNo)))
const updates = updateStrings.map(str => str.split(',').map(pageNo => parseInt(pageNo)))

const incorrectlyOrdered = updates.filter(update => !followsRules(update, rules))
const fixed = incorrectlyOrdered.map(update => update.toSorted((a, b) => {
	const rule = rules.find(rule => a === rule[0] && b === rule[1] || a === rule[1] && b === rule[0])
	if (!rule) {
		throw Error('Could not find rule for ${a} and ${b}.')
	}
	if (a === rule[0]) { return -1 }
	return 1
}))

const answer = fixed.reduce((prev, curr) => prev + middleNumber(curr), 0)

// console.log(`incorrectlyOrdered = ${JSON.stringify(incorrectlyOrdered)}`)
// console.log(`fixed = ${JSON.stringify(fixed)}`)

console.log(`answer = ${answer}`)

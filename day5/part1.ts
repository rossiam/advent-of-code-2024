import { followsRules, middleNumber } from './shared.ts'

const inputFile = 'input.txt'

const [ruleStrings, updateStrings] = (await Deno.readTextFile(inputFile))
	.split('\n\n')
	.map(thing => thing.split('\n').filter(line => line.length > 0))

const rules = ruleStrings.map(str => str.split('|').map(pageNo => parseInt(pageNo)))
const updates = updateStrings.map(str => str.split(',').map(pageNo => parseInt(pageNo)))

let sum = 0
for (const update of updates) {
	if (followsRules(update, rules)) {
		sum += middleNumber(update)
	}
}
console.log(`rules = ${JSON.stringify(rules)}`)
console.log(`updates = ${JSON.stringify(updates)}`)

console.log(`answer = ${sum}`)

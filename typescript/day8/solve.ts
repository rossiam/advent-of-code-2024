const inputFile = 'input.txt'
// const inputFile = 'input-test.txt'

type Coordinates = {
	x: number
	y: number
}

const minus = (a: Coordinates, b: Coordinates): Coordinates => ({ x: b.x - a.x, y: b.y - a.y })
const plus = (a: Coordinates, b: Coordinates): Coordinates => ({ x: b.x + a.x, y: b.y + a.y })

const nodeLocationsByFrequency: Map<string, Coordinates[]> = new Map()

const locations = (await Deno.readTextFile(inputFile))
	.trim()
	.split('\n')
	.map(line => line.split(''))

const numRows = locations.length
const numColumns = locations[0].length
console.log(`grid is ${numColumns} x ${numRows}`)


locations.forEach((row, y) => {
	row.forEach((frequency, x) => {
		if (frequency !== '.') {
			// console.log(`found location ${locationChar} at ${x}, ${y}`)
			const nodeLocations = nodeLocationsByFrequency.get(frequency) ?? []
			// console.log(`nodeLocations 1 - ${JSON.stringify(nodeLocations)}`)
			nodeLocations.push({ x, y })
			// console.log(`nodeLocations 2 - ${JSON.stringify(nodeLocations)}`)
			nodeLocationsByFrequency.set(frequency, nodeLocations)
		}
	})
})

// console.log(JSON.stringify(Object.fromEntries(nodeLocationsByFrequency), null, 4))

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)

const antinodes1 = new Set<string>()
const antinodes2 = new Set<string>()

nodeLocationsByFrequency.entries().forEach(([frequency, nodeLocations]) => {
	console.log(`processing frequency ${frequency} found at ${JSON.stringify(nodeLocations)}`)
	nodeLocations.forEach((coordsA, indexA) => {
		nodeLocations.forEach((coordsB, indexB) => {
			if (indexA !== indexB) {
				// console.log(`${indexA} -> ${indexB}`)
				const diff = minus(coordsB, coordsA)
				const theGCD = gcd(Math.abs(diff.x), Math.abs(diff.y))
				if (theGCD > 1) {
					// If this were ever > 1 we would want to divide the diff by it but it isn't.
					throw Error(`diff = ${JSON.stringify(diff)} gcd=${theGCD}`)
				}
				let antinode = plus(coordsA, diff)
				if (antinode.x >= 0 && antinode.y >= 0 && antinode.x < numColumns && antinode.y < numRows) {
					// console.log(`antinode = ${JSON.stringify(antinode)}`)
					antinodes1.add(`${antinode.x},${antinode.y}`)
				}
				antinode = coordsA
				while (antinode.x >= 0 && antinode.y >= 0 && antinode.x < numColumns && antinode.y < numRows) {
					// console.log(`antinode = ${JSON.stringify(antinode)}`)
					antinodes2.add(`${antinode.x},${antinode.y}`)
					antinode = plus(antinode, diff)
				}
			}
		})
	})
})

console.log(`found ${antinodes1.size} antinodes`)
console.log(`found ${antinodes2.size} antinodes`)

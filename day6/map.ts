
export type GuardOutcome = 'looped' | 'exited' | 'can-still-move'

export type Result = {
	updatedMap: string[][]
	guardOutcome: GuardOutcome
}

type Coordinates = {
	x: number
	y: number
}

type TraversalInfo = {
	'^': Coordinates[],
	'>': Coordinates[],
	'v': Coordinates[],
	'<': Coordinates[],
}

export const processMap = (map: string[][]): Result => {
	const traversalInfo: TraversalInfo = {
		'^': [],
		'>': [],
		'v': [],
		'<': [],
	}
	const numRows = map.length
	const numColumns = map[0].length

	const guard = { x: -1, y: -1 }
	guard.y = map.findIndex(row => {
		const x = row.findIndex(char => char.match(/[\^>v<]/))
		if (x === -1) {
			return false
		}
		guard.x = x
		return true
	})

	const findFacingChar = (facingX: number, facingY: number): string => {
		if (facingX < 0 || facingY < 0 || facingX >= numColumns || facingY >= numRows) {
			return 'O'
		}
		return map[facingY][facingX]
	}

	const turnRight = (guardChar: string) =>
		guardChar === '^' ? '>' : (
			guardChar === '>' ? 'v' : (
				guardChar === 'v' ? '<' : '^'
			)
		)

	const moveGuard = (): GuardOutcome => {
		const guardChar = map[guard.y][guard.x] as keyof TraversalInfo
		// console.log(`guard (${guardChar}) at = (${guard.x}, ${guard.y})`)
		const facingX = guardChar === '<'
			? guard.x - 1
			: (guardChar === '>' ? guard.x + 1 : guard.x)
		const facingY = guardChar === '^'
			? guard.y - 1
			: (guardChar === 'v' ? guard.y + 1 : guard.y)

		const facingChar = findFacingChar(facingX, facingY)
		// console.log(`facing: (${facingX}, ${facingY})`)
		if (facingChar == '#') {
			map[guard.y][guard.x] = turnRight(guardChar)
			return 'can-still-move'
		} else if (facingChar === 'X' || facingChar === '.') {
			map[facingY][facingX] = guardChar
			map[guard.y][guard.x] = 'X'
			// console.log(`checking ${JSON.stringify(guard)} in ${JSON.stringify(traversalInfo)}`)
			if (traversalInfo[guardChar].find(coords => coords.x === guard.x && coords.y === guard.y)) {
				return 'looped'
			}
			traversalInfo[guardChar].push({ ...guard })
			guard.x = facingX
			guard.y = facingY
			return 'can-still-move'
		} else if (facingChar === 'O') {
			map[guard.y][guard.x] = 'X'
			return 'exited'
		}
		throw Error(`unexpected character ${facingChar}`)
	}

	let guardOutcome: 'exited' | 'looped' | 'can-still-move'
	do {
		guardOutcome = moveGuard()
	} while (guardOutcome === 'can-still-move') ;

	// console.log(map.map(line => line.join('')).join('\n'))

	// console.log(guardOutcome)
	return {
		updatedMap: map,
		guardOutcome,
	}
}

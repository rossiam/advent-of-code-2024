
export type GuardOutcome = 'looped' | 'exited' | 'can-still-move'

export type Result = {
	updatedMap: string[][]
	guardOutcome: GuardOutcome
}

export const processMap = (map: string[][]): Result => {
	const numRows = map.length
	const numColumns = map[0].length

	let guardX = -1
	let guardY = map.findIndex(row => {
		const x = row.findIndex(char => char.match(/[\^>v<]/))
		if (x === -1) {
			return false
		}
		guardX = x
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
		const guardChar = map[guardY][guardX]
		console.log(`guard (${guardChar}) at = (${guardX}, ${guardY})`)
		const facingX = guardChar === '<'
			? guardX - 1
			: (guardChar === '>' ? guardX + 1 : guardX)
		const facingY = guardChar === '^'
			? guardY - 1
			: (guardChar === 'v' ? guardY + 1 : guardY)

		const facingChar = findFacingChar(facingX, facingY)
		console.log(`facing: (${facingX}, ${facingY})`)
		if (facingChar === 'X' || facingChar === '.') {
			map[facingY][facingX] = guardChar
			map[guardY][guardX] = 'X'
			guardX = facingX
			guardY = facingY
			return 'can-still-move'
		} else if (facingChar == '#') {
			map[guardY][guardX] = turnRight(guardChar)
			return 'can-still-move'
		} else if (facingChar === 'O') {
			map[guardY][guardX] = 'X'
			return 'exited'
		}
		throw Error(`unexpected character ${facingChar}`)
	}

	let guardOutcome: 'exited' | 'looped' | 'can-still-move'
	do {
		guardOutcome = moveGuard()
	} while (guardOutcome === 'can-still-move') ;

	console.log(map.map(line => line.join('')).join('\n'))

	console.log(guardOutcome)
	return {
		updatedMap: map,
		guardOutcome,
	}
}

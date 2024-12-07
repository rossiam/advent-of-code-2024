export const followsRules = (update: number[], rules: number[][]): boolean => {
	for (let index = 1; index < update.length; ++index) {
		for (const rule of rules.filter(rule => rule[0] === update[index])) {
			const secondPageIndex = update.findIndex(page => page === rule[1])
			if (secondPageIndex >= 0 && secondPageIndex < index) {
				return false
			}
		}
	}
	return true
}

export const middleNumber = (update: number[]): number => {
	if (update.length % 2 === 0) {
		throw Error('Can\'t determine the "middle" of an even number of something.')
	}
	return update[Math.floor(update.length / 2)]
}

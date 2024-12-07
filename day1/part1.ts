const inputData = await Deno.readTextFile('input.txt')

const bothTeams = inputData
	.split('\n')
	.filter(line => line.length)
	.map(line => line.split(/\s+/))

const team1LocationIds = bothTeams.map(locationIds => parseInt(locationIds[0])).sort()
const team2LocationIds = bothTeams.map(locationIds => parseInt(locationIds[1])).sort()

const answer = team1LocationIds.map((team1LocationId, index) =>
	Math.abs(team1LocationId - team2LocationIds[index])
).reduce((prev, curr) => prev + curr, 0)

console.log(answer)

const inputData = await Deno.readTextFile('input.txt')

const bothTeams = inputData
	.split('\n')
	.filter(line => line.length)
	.map(line => line.split(/\s+/))

const team1LocationIds = bothTeams.map(locationIds => parseInt(locationIds[0])).sort()
const team2LocationIds = bothTeams.map(locationIds => parseInt(locationIds[1])).sort()

const countInTeam2 = (team1LocationId: number) =>
	team2LocationIds.filter(locationId => locationId === team1LocationId).length

const answer = team1LocationIds.map((team1LocationId) =>
	team1LocationId * countInTeam2(team1LocationId)
).reduce((prev, curr) => prev + curr, 0)

console.log(answer)

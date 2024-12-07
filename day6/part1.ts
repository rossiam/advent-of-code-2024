import { processMap } from './map.ts'


const inputData = await Deno.readTextFile('input.txt')

const map = inputData.split('\n').filter(line => line.length > 0).map(line => [...line])

const result = processMap(map)
console.log(result.updatedMap.map(line => line.join('')).join('\n'))

const numVisited = result.updatedMap.flat().filter(char => char === 'X').length

console.log(`visited ${numVisited} locations`)

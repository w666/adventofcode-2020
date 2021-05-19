import * as fs from 'fs'

const arrayOfGroups: string[] = fs.readFileSync('input.txt', 'utf-8').split(/\n\n/)

// part 1
function getGroupUniqueAnswers(array: string[]): string[][] {
    let arrayOfUniqueAnswers: string[][] = []
    arrayOfGroups.forEach((value: string, index: number, arr: string[]) => {
        arrayOfUniqueAnswers.push([...value.replace(/\n/g, '')]
            .filter((element: string, index: number, array: string[]) =>
                array.indexOf(element) === index))
    })
    return arrayOfUniqueAnswers
}

function getAnyonesYes(array: string[]): number {
    let sum: number = 0
    getGroupUniqueAnswers(array).forEach(value => {
        sum += value.length
    })
    return sum
}

console.log('part1: ' + getAnyonesYes(arrayOfGroups))

// part 2
function getEveryonesYes(array: string[]): number {
    let sum: number = 0
    getGroupUniqueAnswers(array).forEach((answers: string[], index: number) => {
        for (const answer of answers) {
            let everyPersonAnsweredYes: boolean = true
            for (const person of array[index].split(/\n+/)) {
                if (!person.includes(answer) && person !== '') {
                    everyPersonAnsweredYes = false
                    break
                }
            }
            if (everyPersonAnsweredYes) {
                sum++
            }
        }
    })
    return sum
}
console.log('part2: ' + getEveryonesYes(arrayOfGroups))
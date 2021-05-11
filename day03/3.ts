import * as fs from 'fs'

const array: string[] = fs.readFileSync('input.txt', 'utf-8').split('\n')

function getTrees(array: string[], right: number, down: number, debug: boolean = false): number {
    let position: number = 0 // first element index is 0
    const lineLength: number = array[0].length
    let numberOfTrees: number = 0

    array.forEach((value: string, index: number) => {
        if (position >= lineLength) {
            position = position - lineLength
        }
        // debug output
        if (debug) {
            console.log(value)
        }
        if (index % down === 0) {
            if (debug) {
                let pointerArr = new Array(lineLength).fill(' ')
                pointerArr[position] = '^'
                console.log(pointerArr.join('') + ' trees: ' + numberOfTrees)
            }
            if (value[position] === '#') {
                numberOfTrees++
            }
            position += right
        }
    })
    return numberOfTrees
}

// part 1
console.log("(part1) number of trees: " + getTrees(array, 3, 1))

// part 2
const arrayOfSlopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]

let numberOfTrees: number = 0
arrayOfSlopes.forEach((slope: number[]) => {
    let newSlopeNumberOfTrees = getTrees(array, slope[0], slope[1], false)
    numberOfTrees = numberOfTrees === 0 ? newSlopeNumberOfTrees : numberOfTrees * newSlopeNumberOfTrees
})
console.log("(part2) number of trees: " + numberOfTrees)

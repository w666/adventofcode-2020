import * as fs from 'fs'

class BoardingPass {
    pass: string
    row: {
        min: number,
        max: number,
        character: string
    }
    column: {
        min: number,
        max: number,
        character: string
    }

    constructor(pass: string) {
        this.pass = pass
        this.row = {
            min: 0,
            max: 127,
            character: ''
        }
        this.column = {
            min: 0,
            max: 7,
            character: ''
        }
        this.calculateRowAndColumn()
    }

    getRow(): number {
        if (this.row.character === 'F') {
            return this.row.min
        } else if (this.row.character === 'B') {
            return this.row.max
        }
        throw new Error('ERROR: incorrect row in: ' + this.pass)
    }

    getColumn(): number {
        if (this.column.character === 'L') {
            return this.column.min
        } else if (this.column.character === 'R') {
            return this.column.max
        }
        throw new Error('ERROR: incorrect column in: ' + this.pass)
    }

    calculateRowAndColumn() {

        [...this.pass].forEach((character: string) => {
            switch (character) {
                case 'F': {
                    this.row.max -= Math.floor((this.row.max - this.row.min) / 2) + 1
                    this.row.character = character
                    break
                }
                case 'B': {
                    this.row.min += Math.floor((this.row.max - this.row.min) / 2) + 1
                    this.row.character = character
                    break
                }
                case 'R': {
                    this.column.min += Math.floor((this.column.max - this.column.min) / 2) + 1
                    this.column.character = character
                    break
                }
                case 'L': {
                    this.column.max -= Math.floor((this.column.max - this.column.min) / 2) + 1
                    this.column.character = character
                    break
                }
            }
        })
    }

    getPass(): string {
        return this.pass
    }

    getSeatID(): number {
        return this.getRow() * 8 + this.getColumn()
    }
}

const boardingPasses: BoardingPass[] = new Array()
fs.readFileSync('input.txt', 'utf-8').split('\n').forEach((pass) => {
    if (pass !== '')
        boardingPasses.push(new BoardingPass(pass))
})

function testSeatID(boardingPass: BoardingPass, expectedID: number) {
    if (boardingPass.getSeatID() !== expectedID) {
        throw new Error('Test failed for ' + boardingPass.getPass() + ': expected ' + expectedID + ', but got ' + boardingPass.getSeatID())
    }
}

testSeatID(new BoardingPass('FBFBBFFRLR'), 357)
testSeatID(new BoardingPass('BFFFBBFRRR'), 567)
testSeatID(new BoardingPass('FFFBBBFRRR'), 119)
testSeatID(new BoardingPass('BBFFBBFRLL'), 820)

// part 1
function getHighestSeat(boardingPasses: BoardingPass[]): number {
    let highestSeat: number = 0
    let highestPass: BoardingPass
    boardingPasses.forEach((pass: BoardingPass) => {
        if (pass.getSeatID() > highestSeat) {
            highestSeat = pass.getSeatID()
            highestPass = pass
        }
    })
    return highestSeat
}

console.log("part 1: " + getHighestSeat(boardingPasses))


// part 2

function getFirstRow(boardingPasses: BoardingPass[]): number {
    let firstRow: number = boardingPasses[0].getRow()
    boardingPasses.forEach((pass) => {
        if (pass.getRow() < firstRow) {
            firstRow = pass.getRow()
        }
    })
    return firstRow
}

function getLastRow(boardingPasses: BoardingPass[]): number {
    let lastRow: number = boardingPasses[0].getRow()
    boardingPasses.forEach((pass) => {
        if (pass.getRow() > lastRow) {
            lastRow = pass.getRow()
        }
    })
    return lastRow
}

function getMissingSeat(boardingPasses: BoardingPass[]): number {
    let seatIDs: number[] = new Array()
    const firstRow = getFirstRow(boardingPasses)
    const lastRow = getLastRow(boardingPasses)
    //console.log('first row: ' + firstRow + ', last row: ' + lastRow)
    boardingPasses.forEach((pass) => {
        if (pass.getRow() !== firstRow && pass.getRow() !== lastRow) {
            seatIDs.push(pass.getSeatID())
        } else {
            // debug: print skipped seatIDs
            //console.log('skipping row: ' + pass.getRow() + ', id: ' + pass.getSeatID())
        }
    })
    let mySeatID: number = 0
    seatIDs.sort((a, b) => a - b).forEach((id: number, index: number, array: number[]) => {
        if (index + 1 !== array.length) {
            if (array[index + 1] === id + 2) {
                mySeatID = id + 1
            }
        }
    })
    return mySeatID
}

console.log('part 2: ' + getMissingSeat(boardingPasses))
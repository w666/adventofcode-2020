import * as fs from 'fs'

type password = {
    min: string,
    max: string,
    letter: string,
    password: string
}

let array: string[]

function parsePasswordString(array: string[]): password[] {
    let passwdArray= [] as password[]
    const passwdLineRegexp = new RegExp(/(\d+)-(\d+)\s+([a-z]):\s+([a-z]+)/)
    array.forEach(value => {
        if (passwdLineRegexp.test(value)) {
            const match = value.match(passwdLineRegexp)
            passwdArray.push({
                min: assertValue(match[1]),
                max: assertValue(match[2]),
                letter: assertValue(match[3]),
                password: assertValue(match[4])})
            } else if (value === '') {
                // ignore empty strings
            } else {
                console.log('line does not match regexp: ' + value)
            }
    })
    return passwdArray
}

function assertValue(value: string | null): string {
    if (value === null) {
        throw 'value is null'
    } else {
        return value
    }
}

array = fs.readFileSync('input.txt', 'utf-8').split('\n')

// part 1

let correctPasswords: number = 0

parsePasswordString(array).forEach(password => {
    const regex = new RegExp('[^' + password.letter + ']', 'g')
    const length: number = password.password.replace(regex, '').length
    if (parseInt(password.min) <= length && length <=  parseInt(password.max)) {
        correctPasswords++
    }
})

console.log('part1 count: ' + correctPasswords)

// part 2

let correctPasswords2: number = 0

parsePasswordString(array).forEach(password => {
    let matches: number = 0
    if (password.password[parseInt(password.min)-1] === password.letter) {
        matches++
    }
    if (password.password[parseInt(password.max)-1] === password.letter) {
        matches++
    }
    if (matches === 1) {
        correctPasswords2++
    }
})

console.log('part2 count: ' + correctPasswords2)
import * as fs from 'fs'

let array: string[]

array = fs.readFileSync('1.input.txt', 'utf-8').split('\n')

array.filter(value => parseInt(value)<2020).forEach((value: string, index: number, arr: string[]) =>
    arr.slice(index).forEach((value2: string, index2: number, arr2: string[]) => {
            if(parseInt(value) + parseInt(value2) == 2020) {
                console.log('part 1: ' + parseInt(value) * parseInt(value2))
            }
            arr2.slice(index2).forEach((value3: string) => {
                if(parseInt(value) + parseInt(value2) + parseInt(value3) === 2020) {
                    console.log('part 2: ' + parseInt(value) * parseInt(value2) * parseInt(value3))
                }
            })
    }))


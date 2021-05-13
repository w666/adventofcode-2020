import * as fs from 'fs'

const array: string[] = fs.readFileSync('input.txt', 'utf-8').split('\n')

type Passport = {
    /**
     * Birth Year
     */
    byr: string,
    /**
     * Issue Year
     */
    iyr: string,
    /**
     * Expiration Year
     */
    eyr: string,
    /**
     * Height
     */
    hgt: string,
    /**
     * Hair Color
     */
    hcl: string,
    /**
     * Eye Color
     */
    ecl: string,
    /**
     * Passport ID
     */
    pid: string,
    /**
     * Country ID (optional)
     */
    cid?: string
}

const passportPropNames: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']

function getPropValue(propName: string, passportAsLine: string): string {
    if (passportPropNames.includes(propName)) {
        const arr = passportAsLine.split(/\s+/)
        for (const property of arr) {
            let p: string[] = property.split(':')
            if (p.length > 2) {
                throw 'ERROR: failed to parse property ' + p + ', unexpected length (' + p.length + ')'
            }
            if (propName === p[0]) {
                return p[1]
            }
        }
    } else {
        throw 'ERROR: unrecognised property ' + propName
    }
    return ''
}

function toPassport(str: string): Passport {
    return {
        byr: getPropValue('byr', str),
        iyr: getPropValue('iyr', str),
        eyr: getPropValue('eyr', str),
        hgt: getPropValue('hgt', str),
        hcl: getPropValue('hcl', str),
        ecl: getPropValue('ecl', str),
        pid: getPropValue('pid', str),
        cid: getPropValue('cid', str)
    }
}


function separatePassports(arr: string[]): Passport[] {
    let passportAsLine: string = ''
    let passports: Passport[] = new Array();
    arr.forEach((value: string) => {
        if (new RegExp(/^\s*$/).test(value)) {
            //console.log("passport: " + passportAsLine)
            passports.push(toPassport(passportAsLine))
            passportAsLine = ''
        } else {
            passportAsLine = value + ' ' + passportAsLine
        }
    })
    return passports
}

const passports: Passport[] = separatePassports(array)

// part 1
const part1RequiredProps: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

function validatePassports1(passports: Passport[]): Passport[] {
    let validPassports: Passport[] = new Array()
    passports.forEach((passport: Passport) => {
        let valid: boolean = true
        for (const [key, value] of Object.entries(passport)) {
            if (part1RequiredProps.includes(key) && value === '') {
                valid = false
            }
        }
        if (valid === true) validPassports.push(passport)
    })
    return validPassports
}

const validPassports1: Passport[] = validatePassports1(passports)
console.log('part 1: ' + validPassports1.length)

// part 2

/**
 * passport requirements
 */
const pReq = {
    byr: {
        min: 1920,
        max: 2002
    },
    iyr: {
        min: 2010,
        max: 2020
    },
    eyr: {
        min: 2020,
        max: 2030
    },
    hgt: {
        regex: /^(\d+)(in|cm)$/,
        in: {
            min: 59,
            max: 76
        },
        cm: {
            min: 150,
            max: 193
        }
    },
    hcl: /^#[\da-f]{6}$/,
    ecl: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
    pid: /^\d{9}$/,
}

let count2: number = 0

function validByr(passport: Passport): boolean {
    let byr = parseInt(passport.byr)
    if (pReq.byr.min <= byr && byr <= pReq.byr.max) {
        return true
    }
    return false
}

function validIyr(passport: Passport): boolean {
    let iyr = parseInt(passport.iyr)
    if (pReq.iyr.min <= iyr && iyr <= pReq.iyr.max) {
        return true
    }
    return false
}

function validEyr(passport: Passport): boolean {
    let eyr = parseInt(passport.eyr)
    if (pReq.eyr.min <= eyr && eyr <= pReq.eyr.max) {
        return true
    }
    return false
}

function validHgt(passport: Passport): boolean {
    const hgt = passport.hgt.match(pReq.hgt.regex)
    if (pReq.hgt.regex.test(passport.hgt)) {
        if (hgt[2] === "in") {
            if (pReq.hgt.in.min <= parseInt(hgt[1]) && parseInt(hgt[1]) <= pReq.hgt.in.max) {
                return true
            }
        } else if (hgt[2] === "cm") {
            if (pReq.hgt.cm.min <= parseInt(hgt[1]) && parseInt(hgt[1]) <= pReq.hgt.cm.max) {
                return true
            }
        }
    }
    return false
}

function validHcl(passport: Passport): boolean {
    if (pReq.hcl.test(passport.hcl)) {
        return true
    }
    return false
}

function validEcl(passport: Passport): boolean {
    if (pReq.ecl.includes(passport.ecl)) {
        return true
    }
    return false
}

function validPid(passport: Passport): boolean {
    if (pReq.pid.test(passport.pid)) {
        return true
    }
    return false
}

function validatePassports2(passports: Passport[]): Passport[] {
    let valid: boolean = false
    let validPassports: Passport[] = new Array()
    passports.forEach((p) => {
        if (validByr(p) && validIyr(p) && validEyr(p) && validHgt(p) && validHcl(p) && validEcl(p) && validPid(p)) {
            validPassports.push(p)
        }
    })
    return validPassports
}

console.log('part 2: ' + validatePassports2(validPassports1).length)
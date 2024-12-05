import * as fs from 'fs';

async function readInput() {
    const inputStr = fs.readFileSync('./day_3/input.txt', 'utf-8')
    return inputStr
}

async function main() {
    const input = await readInput()

    const regex = /(mul)\((\d{1,3}),(\d{1,3})\)/g
    const matches = input.match(regex)

    const result = matches.reduce((total, match) => {
        const digitRegex = /\d{1,3}/g
        const numbers = match.match(digitRegex)

        return total += numbers[0] * numbers[1]
    }, 0)

    console.log(result)
}

main()

import * as fs from 'fs';

async function readInput() {
    const inputStr = fs.readFileSync('./day_3/test_input.txt', 'utf-8')
    return inputStr
}

async function main() {
    const input = await readInput()

    const regex = /(mul)\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g
    const matches = input.match(regex)

    let enabled = true
    const result = matches.reduce((total, match) => {
        if (match === 'don\'t()') {
            enabled = false
            return total
        }

        if (match === 'do()') {
            enabled = true
            return total
        }

        if (!enabled)
            return total

        const digitRegex = /\d{1,3}/g
        const numbers = match.match(digitRegex)

        return total += numbers[0] * numbers[1]
    }, 0)

    console.log(result)
}

main()

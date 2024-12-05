import * as fs from 'fs'

async function readInput(file) {
    const inputStr = fs.readFileSync(file, 'utf-8')
    return inputStr.split('\n').map((report) => {
        return report.split(' ').map(val => Number(val))
    })
}

function isSafe(report) {
    let isDecreasing = false
    if (report.length >= 2) {
        isDecreasing = report[0] > report[1]
    }
    let safe = true
    for (let i = 1; i < report.length; i++) {
        if (isDecreasing) {
            if (report[i-1] <= report[i] || (report[i-1] - report[i]) > 3) {
                safe = false
                break
            }
        } else {
            if (report[i-1] >= report[i] || (report[i] - report[i-1]) > 3) {
                safe = false
                break
            }
        }
    }
    return safe
}

async function main() {
    const reports = await readInput('./day_2/input.txt')

    const count = reports.reduce((safeReportsCount, report) => {
        if (isSafe(report))
            return safeReportsCount + 1

        for (let i = 0; i < report.length; i++) {
            const subReport = report.slice()
            subReport.splice(i, 1)
            if (isSafe(subReport)) {
                return safeReportsCount + 1
            }
        }

        return safeReportsCount
    }, 0)

    console.log(count)
}

main()
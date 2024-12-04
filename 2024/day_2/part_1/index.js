import * as fs from 'fs';

async function readInput(file) {
    const inputStr = fs.readFileSync(file, 'utf-8')
    return inputStr.split('\n').map((report) => {
        return report.split(' ').map(val => Number(val))
    })
}

function isReportSafe(report) {
    let increasing = false
    let decreasing = false

    for (let i = 1; i < report.length; i++) {
        const difference = report[i] - report[i - 1]
        
        const delta = Math.abs(difference)
        if (delta < 1 || delta > 3)
            return false

        if (difference > 0) {
            if (decreasing)
                return false
            increasing = true
        } else {
            if (increasing)
                return false
            decreasing = true
        }
    }

    return true
}

async function main() {
    const reports = await readInput('../input.txt')

    const count = reports.reduce((safeReportsCount, report) => {
        if (isReportSafe(report)) {
            return safeReportsCount + 1
        } else {
            return safeReportsCount
        }
    }, 0)

    console.log(count)
}

main()
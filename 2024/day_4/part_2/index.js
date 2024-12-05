import * as fs from 'fs'

async function readInput() {
    const inputStr = fs.readFileSync('./day_4/input.txt', 'utf-8')
    return inputStr.split('\n').map(line => line.split(''))
}

function checkAdjacent(graph, row, col) {
    if (
        row - 1 < 0 || 
        col - 1 < 0 || 
        row + 1 >= graph.length ||
        col + 1 >= graph[0].length
    )
        return false

    let count = 0
    if (
            (
                (graph[row - 1][col - 1] === 'M' && graph[row + 1][col + 1] === 'S') || 
                (graph[row - 1][col - 1] === 'S' && graph[row + 1][col + 1] == 'M')
            ) &&
            (
                (graph[row - 1][col + 1] === 'M' && graph[row + 1][col - 1] === 'S') || 
                (graph[row - 1][col + 1] === 'S' && graph[row + 1][col - 1] == 'M')
            )
    ) {
        count++
    }

    return count
}

function search(graph) {
    let count = 0
    for (let row = 0; row < graph.length; row++) {
        for (let col = 0; col < graph[row].length; col++) {
            if (graph[row][col] === 'A') {
                count += checkAdjacent(graph, row, col)
            }
        }
    }
    return count
}

async function main() {
    const input = await readInput()

    const result = search(input)

    console.log(result)
}

main()
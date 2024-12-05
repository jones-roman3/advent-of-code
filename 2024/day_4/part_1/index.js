import * as fs from 'fs'

async function readInput() {
    const inputStr = fs.readFileSync('./day_4/input.txt', 'utf-8')
    return inputStr.split('\n').map(line => line.split(''))
}


function checkIndex(graph, row, col, searchKey, rowStep, colStep, depth) {
    if (
        row < 0 || 
        col < 0 || 
        row >= graph.length ||
        col >= graph[0].length
    )
        return false
        
    if (graph[row][col] !== searchKey[depth - 1])
        return false
    
    if (depth >= searchKey.length)
        return true

    return checkIndex(
        graph,
        row + rowStep, 
        col + colStep,
        searchKey,
        rowStep,
        colStep,
        depth + 1
    )
}

function checkAdjacent(graph, row, col, searchKey) {
    let total = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (checkIndex(graph, row + i, col + j, searchKey, i, j, 2))
                total++
        }
    }
    return total
}

function search(graph, key) {
    let count = 0
    for (let row = 0; row < graph.length; row++) {
        for (let col = 0; col < graph[row].length; col++) {
            if (graph[row][col] === key[0]) {
                count += checkAdjacent(graph, row, col, key)
            }
        }
    }
    return count
}

async function main() {
    const input = await readInput()

    const key = 'XMAS'
    const result = search(input, key)

    console.log(result)
}

main()
/**
 * This time, you'll need to figure out exactly how often each number from the left list appears in the right list. 
 * Calculate a total similarity score by adding up each number in the left list after multiplying
 * it by the number of times that number appears in the right list.
 * 
 * 3   3
 * 3   4
 * 4   3
 * 2   5
 * 1   3
 * 3   9
 * Total: 31
 */

import * as fs from 'fs';

async function readInput(input) {
    const inputStr = fs.readFileSync('./day_1/input.txt', 'utf-8');
    return inputStr.split('\n').reduce((lists, val) => {
        const vals = val.split('   ')
        lists.list_1.push(vals[0])
        lists.list_2.push(vals[1])
        return lists
    }, { list_1: [], list_2: [] })
}

function makeFrequencyMap(arr) {
    return arr.reduce((map, val) => {
        if (!map.get(val)) {
            map.set(val, 1)
        } else {
            map.set(val, map.get(val) + 1)
        }
        return map
    }, new Map())
}

async function main() {
    const { list_1, list_2 } = await readInput('input.txt')

    const freqMap = makeFrequencyMap(list_2)
    const similarityScore = list_1.reduce((score, val) => {
        if (!freqMap.get(val)) {
            return score
        }

        return score + val * freqMap.get(val)
    }, 0)
    console.log(similarityScore)
}


main()

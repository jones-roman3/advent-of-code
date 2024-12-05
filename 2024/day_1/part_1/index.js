/**
 * Give 2 lists of numbers
 * Find the smallest pair
 * Find the distance between each pair
 * Output the sum of distances
 * 
 * 3   3
 * 3   4
 * 4   3
 * 2   5
 * 1   3
 * 3   9
 * Total: 11
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

async function main() {
    const { list_1, list_2 } = await readInput('input.txt')

    const sort_list_1 = list_1.sort()
    const sort_list_2 = list_2.sort()
    
    let total = 0;
    sort_list_1.forEach((val_1, index) => {
        total += Math.abs(val_1 - sort_list_2[index])
    })
    console.log(total)
}


main()

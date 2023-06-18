const array: number[] = [0,1,2,3,4,5,6,7,8,9]

function numberToString(array: number[]):string[] {
    let data: string[] = [];
    for(let key of array) {
        data.push(key.toString());
    }    
    return data;
}


console.log('Number to string: ',numberToString(array))

let Array1:number[] = [1, 2, 3, 4]
let Array2 :number[] = [2, 3, 4, 5]

function higherOrder(func:Function, array1:number[], array2:number[]):number[] {
    if(array1.length === array2.length) {
        let data: number[] = [];
        for(let key of array1){
            data.push(func(key, array2[key - 1]));
        }
        return data
    }
}

function addCallback(number1:number, number2:number):number {
    return number1 + number2
}
function multiplyCallback(number1:number, number2:number):number {
    return number1 * number2
}

console.log('Higherorder Add: ',higherOrder(addCallback, Array1, Array2))
console.log('Higherorder Multiply: ',higherOrder(multiplyCallback, Array1, Array2))

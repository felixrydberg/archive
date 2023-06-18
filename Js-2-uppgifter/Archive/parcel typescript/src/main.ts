import { callbackify } from "util";
const add: Function = (x:number):number => {return x + x;}

const multiply: Function = (x:number):number => {return x * x;}

const higherOrder: Function = (array: number[], func: Function):number[] => {
    let data: number[] = [];
    for(let key of array){
        data.push(func(key));
    }
    return data;
}

let array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(higherOrder(array, multiply))
console.log(higherOrder(array, add))

type Book = {
    title: string,
    author: string,
    page: number,
    type: boolean,
    Ebook?: Function,
    getInfo?: Function
}

const Bok: Book = {
    title: 'test',
    author: 'test',
    page: 214,
    type: false,
    Ebook():boolean {
        return this.type;
    },
    logInfo():void {
        console.log(this.title, this.author, this.page, this.type);
    }
}


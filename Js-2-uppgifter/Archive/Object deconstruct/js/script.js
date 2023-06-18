const person1 = {
    first: 'Clara',
    last: 'Leivas',
    location: 'Malmö'
}
const person2 = {
    first: 'Elon',
    last: 'Musk',
    location: 'Los Angeles'
}



function nameMerger({first}, {last}) {
    return {
        firstName : first,
        lastName: last
    }
}

let newname = nameMerger(person1, person2)

console.log(newname)
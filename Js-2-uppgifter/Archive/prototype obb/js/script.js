function Person(traits, hairColor, name) {
    this.traits = traits;
    this.hairColor = hairColor;
    this.name = name;
}

Person.prototype.intro = function() {
    console.log(`${this.name}`);
}
Person.prototype.dating = function() {
    console.log(`Hello jag heter ${this.name}, Mina egenskaper är: ${this.traits} och min hårfärg är ${this.hairColor}`);
}

const Felix = new Person("Gamer", "Vettefan", "Felix Rydberg")
const Henrik = new Person("Pensionär", "Grå", "Henrik Pettersson")


Felix.intro()
Felix.dating()
export class Tamagochi {
  private readonly name: string;
  private readonly type: string;
  private happiness: number;
  private hunger: number;
  private poopcounter: number[];
  private interval: Function;

  constructor() {
    let names: string[] = [
      'Felix',
      'Tuva',
      'Ann',
      'Fredrik',
      'Maria',
      'David',
      'Tage',
      'Micho',
    ];
    let types: string[] = [
      'Hund',
      'Kanin',
      'Katt',
      'Hamster',
      'Fladdermus',
      'Råtta',
    ];

    this.name = names[Math.floor(Math.random() * names.length)];
    this.type = types[Math.floor(Math.random() * types.length)];
    this.happiness = 5;
    this.hunger = 5;
    this.poopcounter = [];
    this.interval = function () {
      return setInterval(this.removeHappiness.bind(this), 10000);
    };
  }
  feed(): void {
    if (this.hunger === 0) {
      this.removeHappiness;
    } else {
      this.hunger--;
      this.poop();
    }
    this.updateDisplay();
  }
  play(): void {
    if (this.happiness === 10) {
      this.hunger++;
      if (this.hunger === 10) {
        this.die('Hunger');
      }
    } else {
      this.happiness++;
    }
    this.updateDisplay();
  }
  poop(): void {
    if (Math.random() < 0.5) {
      this.poopcounter.push(this.interval(), 10000);
    }
  }
  removeHappiness(): void {
    this.happiness--;
    if (this.happiness === 0) {
      this.die('Happiness');
    }
    this.updateDisplay();
  }
  cleanthepopo(): void {
    clearInterval(this.poopcounter[0]);
    this.poopcounter.splice(0, 2);
    this.updateDisplay();
  }
  die(reason) {
    alert(
      `bro died, you didnt take care of it, Not enough attension to: ${reason}`
    );
    window.location.reload();
  }
  updateDisplay() {
    console.log(
      this.name,
      this.type,
      this.hunger,
      this.happiness,
      this.poopcounter
    );

    let nameDisplay = document.querySelector('.name');
    nameDisplay.innerHTML = `Name: ${this.name}`;

    let typeDisplay = document.querySelector('.type');
    typeDisplay.innerHTML = `Type: ${this.type}`;

    let hungerDisplay = document.querySelector('.hunger');
    hungerDisplay.innerHTML = `Hunger: ${this.hunger}`;

    let happinessDisplay = document.querySelector('.happiness');
    happinessDisplay.innerHTML = `Happiness: ${this.happiness}`;

    let cleanDisplay = document.querySelector('.clean');
    let clean;
    if (this.poopcounter[0]) clean = 'No';
    else clean = 'Yes';
    cleanDisplay.innerHTML = `Is the room clean? ${clean}`;
  }
}

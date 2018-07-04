class Pet {
    constructor(name, food = []) {
        this.name = name;
        this.food = food;
        this.hungerLevel = 10;
        this.awake = true;
        this.happinessLevel = 5;
        this.ageLevel = 0;
    };
    feed() {
        // When you feed it, it gets a little bit less hungry, but will eventually get tired and sad
        if (this.hungerLevel > 0) {
            this.hungerLevel--;
            this.getSad();
            return `I just ate a delicious piece of ${this.food[Math.floor(Math.random() * this.food.length)]}`;
        } else {
            return `I'm not hungry!`
        }
    };
    getSad() {
        if (this.happinessLevel > 0) {
            return this.happinessLevel--;
        }
    };
    sleep() {
        if (this.awake) {
            this.awake = false;
            return `${this.name} just wants to sleep!`;
        } else {
            return `${this.name} is already sleeping`;
        }
    };
    getOlder() {
        this.age++;
        this.getSad();
        return `${this.name} is now one year older`;
    }
}

let myPet = new Pet('Diana', ["pizza", 'pasta', 'caneloni', 'schrimp']);
console.log(myPet.feed());
console.log(myPet.sleep());
console.log(myPet.getSad());
console.log(myPet.getOlder());
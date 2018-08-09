"use strict";

function createPet(name, onUpdateCb) {
    var progressHunger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;
    var progressHapiness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 90;
    var progressRest = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;
    var awake = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var step = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 10;
    var age = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var idInterval = arguments[8];

    var pet = {
        name: name,
        hunger: {
            progress: progressHunger,
            step: step
        },
        hapiness: {
            progress: progressHapiness,
            step: step
        },
        awake: awake,
        rest: {
            progress: progressRest,
            step: step
        },
        age: age,
        isAlive: function isAlive() {
            if (pet.rest.progress <= 10 || pet.hunger.progress <= 20 || pet.hapiness.progress <= 20 || pet.age === 15) {
                clearInterval(pet.idInterval);
                return false;
            } else {
                return true;
            };
        },
        decreaseStateFood: function decreaseStateFood() {
            pet.hunger.progress -= pet.hunger.step;
        },
        decreaseStateJoy: function decreaseStateJoy() {
            pet.hapiness.progress -= pet.hapiness.step;
        },
        decreaseStateRest: function decreaseStateRest() {
            pet.rest.progress -= pet.rest.step;
        },

        idInterval: setInterval(function () {
            pet.decreaseStateFood();
            pet.decreaseStateJoy();
            pet.decreaseStateRest();
            onUpdateCb();
            pet.isAlive();
        }, 5000)
    };
    var publicAPI = {
        name: name,
        getName: function getName() {
            return pet.name;
        },
        serialize: function serialize() {
            return {
                name: name,
                hunger: pet.hunger.progress,
                happy: pet.hapiness.progress,
                sleep: pet.rest.progress
            };
        },

        // es6
        getFood: function getFood() {
            return pet.hunger.progress;
        },
        getHappiness: function getHappiness() {
            return pet.hapiness.progress;
        },
        getRest: function getRest() {
            return pet.rest.progress;
        },
        giveFood: function giveFood() {
            pet.hunger.progress += pet.hunger.step;
        },
        play: function play() {
            pet.hapiness.progress += pet.hapiness.step;
        },
        sleep: function sleep() {
            pet.rest.progress += pet.rest.step;
        }
    };
    return publicAPI;
};

var PetsModel = function () {
    var myPets = [];
    var myObservers = [];

    var petsData = JSON.parse(localStorage.getItem("pets") || "[]");
    petsData.forEach(function (petData) {
        var newPet = createPet(petData.name, notifySubscribers, petData.hunger, petData.happy, petData.sleep);
        myPets.push(newPet);
    });

    function updateLocalStorage() {
        var serializedPets = myPets.map(function (petData) {
            return petData.serialize();
        });
        localStorage.setItem("pets", JSON.stringify(serializedPets));
    }
    function notifySubscribers() {
        myObservers.forEach(function (observer) {
            if (typeof observer.notify === "function") {
                observer.notify(myPets);
            }
        });
        updateLocalStorage();
    }
    return {
        addPet: function addPet(name, hunger, happy, rest) {
            var newPet = createPet(name, notifySubscribers, hunger, happy, rest);
            myPets.push(newPet);
            notifySubscribers();
            return newPet;
        },
        removePet: function removePet() {
            myPets.forEach(function (el) {
                myPets.splice(el, 1);
            });
            notifySubscribers();
        },
        subscribe: function subscribe(observer) {
            myObservers.push(observer);
            notifySubscribers();
        },
        feed: function feed(petName) {
            var myPet = myPets.find(function (el) {
                if (el.name === petName) {
                    return true;
                }
                return false;
            });
            myPet.giveFood();
            notifySubscribers();
        },
        play: function play(petName) {
            var myPet = myPets.find(function (el) {
                if (el.name === petName) {
                    return true;
                }
                return false;
            });
            myPet.play();
            notifySubscribers();
        },
        sleep: function sleep(petName) {
            var myPet = myPets.find(function (el) {
                if (el.name === petName) {
                    return true;
                }
                return false;
            });
            myPet.sleep();
            notifySubscribers();
        }
    };
}();

//pet subiectul si PetsModel e observer-ul
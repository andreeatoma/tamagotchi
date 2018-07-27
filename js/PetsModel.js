function createPet(name, onUpdateCb, progressHunger = 80, progressHapiness = 90, progressRest = 100, awake = false, step = 10, age = 0, idInterval) {
    let pet = {
        name,
        hunger: {
            progress: progressHunger,
            step
        },
        hapiness: {
            progress: progressHapiness,
            step
        },
        awake,
        rest: {
            progress: progressRest,
            step
        },
        age,
        isAlive: function () {
            if ((pet.rest.progress === 10) || (pet.hunger.progress === 10) || (pet.hapiness.progress === 10) || pet.age === 15) {
                clearInterval(pet.idInterval);
                //displayMessages(`SORRY, YOUR PET IS DEAD!`, 'warning');
                //[...meterSection].forEach(section => section.appendChild(createRestartButton()));
                return false;
            } else {
                return true;
            };
        },
        decreaseStateFood() {
            pet.hunger.progress -= pet.hunger.step;
        },
        decreaseStateJoy() {
            pet.hapiness.progress -= pet.hapiness.step;
        },
        decreaseStateRest() {
            pet.rest.progress -= pet.rest.step;
        },
        idInterval: setInterval(function () {
            pet.decreaseStateFood();
            pet.decreaseStateJoy();
            pet.decreaseStateRest();
            pet.isAlive();
            onUpdateCb();
        }, 5000),
    }
    let publicAPI = {
        subscribe(observer) {
            myObservers.push(observer);
            notifySubscribers();
        },
        name: name,
        getName: function () {
            return pet.name;
        },
        serialize: function () {
            return {
                name: name,
                hunger: pet.hunger.progress,
                happy: pet.hapiness.progress,
                sleep: pet.rest.progress,
            }
        },
        // es6
        getFood() {
            return pet.hunger.progress;
        },
        getHappiness() {
            return pet.hapiness.progress;
        },
        getRest() {
            return pet.rest.progress;
        },
        giveFood() {
            pet.hunger.progress += pet.hunger.step;
        },
        play() {
            pet.hapiness.progress += pet.hapiness.step;
        },
        sleep() {
            pet.rest.progress += pet.rest.step;
        }
    }
    return publicAPI;
};

let PetsModel = (function () {
    let myPets = [];
    let myObservers = [];

    let petsData = JSON.parse(localStorage.getItem("pets") || "[]");
    petsData.forEach(petData => {
        let newPet = createPet(petData.name, notifySubscribers, petData.progressHunger, petData.progressHapiness, petData.progressRest);
        myPets.push(newPet);
    });

    function updateLocalStorage() {
        let serializedPets = myPets.map(petData => petData.serialize());
        localStorage.setItem("pets", JSON.stringify(serializedPets));
    }
    function notifySubscribers() {
        myObservers.forEach(observer => {
            if (typeof observer.notify === "function") {
                observer.notify(myPets);
            }
        })
    }
    return {
        addPet: function (name, progressHunger, progressHapiness, progressRest) {
            let newPet = createPet(name, notifySubscribers, progressHunger, progressHapiness, progressRest);
            myPets.push(newPet);
            updateLocalStorage();
            notifySubscribers();
            return newPet;
        },
        removePet: function () {
            myPets.forEach(function (el) {
                myPets.splice(el, 1)
            });
            updateLocalStorage()
            notifySubscribers();
        },
        subscribe(observer) {
            myObservers.push(observer);
            notifySubscribers();
        },
        feed: function (petName) {
            let myPet = myPets.find(el => {
                if (el.name === petName) {
                    return true;
                }
                return false;
            });
            myPet.giveFood();
            updateLocalStorage();
            notifySubscribers();
        },
        play: function (petName) {
            let myPet = myPets.find(el => {
                if (el.name === petName) {
                    return true;
                }
                return false;
            });
            myPet.play();
            updateLocalStorage();
            notifySubscribers();
        },
        sleep: function (petName) {
            let myPet = myPets.find(el => {
                if (el.name === petName) {
                    return true;
                }
                return false;
            });
            myPet.sleep();
            updateLocalStorage();
            notifySubscribers();
        }
    }
}());

//pet subiectul si PetsModel e observer-ul
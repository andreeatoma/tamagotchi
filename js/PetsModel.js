function createPet(name, progressHunger = 80, progressHapiness = 90, progressRest = 100, awake = false, step = 10, age = 0, idInterval) {
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
        // increaseState: function (progressBar, value, type) {
        //     pet.increaseLevel(value, type);
        //     pet.changeProgressUI(progressBar, pet[type].progress);
        // },
        // increaseLevel: function (value, type) {
        //     if (value > 20 && value < 35) {
        //         displayMessages(PET_MESSAGES[type].warning, 'warning');
        //     } else if ((value > 90) && (value <= 100)) {
        //         displayMessages(PET_MESSAGES[type].info, 'info')
        //     } else if (value > 100) {
        //         value = 100;
        //         displayMessages(PET_MESSAGES[type].info, 'info')
        //     }
        //     pet[type].progress += pet[type].step;
        //     if (pet[type].progress > 100) {
        //         pet[type].progress = 100;
        //     }
        // },
        // changeProgressUI: function (progressBar, value) {
        //     // for (let i = 0; i < progressBar.length; i++) {
        //     if (value < 40) {
        //         progressBar.className = "progress state--danger";
        //     }
        //     else if (value < 70) {
        //         progressBar.className = "progress state--warning";
        //     }
        //     else if (value < 100) {
        //         progressBar.className = "progress state--success";
        //     }
        //     else if (value >= 100) {
        //         value = 100;
        //         progressBar.className = "progress state--success";
        //     }
        //     progressBar.style.width = value + "%";
        // },
        // decreaseState: function (progressBar, value, type) {
        //     pet.decreaseLevel(type);
        //     pet.changeProgressUI(progressBar, pet[type].progress);
        // },
        // decreaseLevel: function (type) {
        //     pet[type].progress -= pet[type].step;
        //     if (pet[type].progress <= 10) {
        //         pet[type].progress = 10;
        //     }
        // },
        // decreaseStateFood: function () {
        //     return pet.decreaseState(meters[pet.name].foodMeter, pet.hunger.progress, 'hunger');
        // },
        // decreaseStateJoy: function () {
        //     return pet.decreaseState(meters[pet.name].playMeter, pet.hapiness.progress, 'hapiness');
        // },
        // decreaseStateRest: function () {
        //     return pet.decreaseState(meters[pet.name].sleepMeter, pet.rest.progress, 'rest');
        // },
        // idInterval: setInterval(function () {
        //     pet.decreaseStateFood();
        //     pet.decreaseStateJoy();
        //     pet.decreaseStateRest();
        //     pet.isAlive();
        // }, 5000),
        isAlive: function () {
            if ((pet.rest.progress === 10) || (pet.hunger.progress === 10) || (pet.hapiness.progress === 10) || pet.age === 15) {
                clearInterval(pet.idInterval);
                displayMessages(`SORRY, YOUR PET IS DEAD!`, 'warning');
                //[...meterSection].forEach(section => section.appendChild(createRestartButton()));
                return false;
            } else {
                return true;
            };
        },
    }
    let publicAPI = {
        name: name,
        getName: function () {
            return pet.name;
        },
        // changeProgressFood: function () {
        //     return pet.changeProgressUI(meters[pet.name].foodMeter, pet.hunger.progress);
        // },
        // changeProgressJoy: function () {
        //     return pet.changeProgressUI(meters[pet.name].playMeter, pet.hapiness.progress);
        // },
        // changeProgressRest: function () {
        //     return pet.changeProgressUI(meters[pet.name].sleepMeter, pet.rest.progress);
        // },
        // feed: function () {
        //     return pet.increaseState(meters[pet.name].foodMeter, pet.hunger.progress, 'hunger');
        // },
        // play: function () {
        //     return pet.increaseState(meters[pet.name].playMeter, pet.hapiness.progress, 'hapiness');
        // },
        // sleep: function () {
        //     return pet.increaseState(meters[pet.name].sleepMeter, pet.rest.progress, 'rest');
        // },
        serialize: function () {
            return {
                name: name,
                hunger: pet.hunger.progress,
                happy: pet.hapiness.progress,
                sleep: pet.rest.progress,
            }
        }
    }
    return publicAPI;
};

let PetsModel = (function () {
    let myPets = [];
    let myObservers = [];

    let petsData = JSON.parse(localStorage.getItem("pets") || "[]");
    petsData.forEach(petData => {
        let newPet = createPet(petData.name, petData.progressHunger, petData.progressHapiness, petData.progressRest);
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
            let newPet = createPet(name, progressHunger, progressHapiness, progressRest);
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
        feed: function (pet) {
            console.log('feed');
            updateLocalStorage();
            notifySubscribers();
        },
        play: function (pet) {
            console.log('play');
            updateLocalStorage();
            notifySubscribers();
        },
        sleep: function (pet) {
            console.log('rest');
            updateLocalStorage();
            notifySubscribers();
        }
    }
}());
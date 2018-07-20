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
        increaseState: function (progressBar, value, type) {
            pet.increaseLevel(value, type);
            pet.changeProgressUI(progressBar, pet[type].progress);
        },
        increaseLevel: function (value, type) {
            if (value > 20 && value < 35) {
                displayMessages(PET_MESSAGES[type].warning, 'warning');
            } else if ((value > 90) && (value <= 100)) {
                displayMessages(PET_MESSAGES[type].info, 'info')
            } else if (value > 100) {
                value = 100;
                displayMessages(PET_MESSAGES[type].info, 'info')
            }
            pet[type].progress += pet[type].step;
            if (pet[type].progress > 100) {
                pet[type].progress = 100;
            }
        },
        changeProgressUI: function (progressBar, value) {
            // for (let i = 0; i < progressBar.length; i++) {
            if (value < 40) {
                progressBar.className = "progress state--danger";
            }
            else if (value < 70) {
                progressBar.className = "progress state--warning";
            }
            else if (value < 100) {
                progressBar.className = "progress state--success";
            }
            else if (value >= 100) {
                value = 100;
                progressBar.className = "progress state--success";
            }
            progressBar.style.width = value + "%";
        },
        decreaseState: function (progressBar, value, type) {
            pet.decreaseLevel(type);
            pet.changeProgressUI(progressBar, pet[type].progress);
        },
        decreaseLevel: function (type) {
            pet[type].progress -= pet[type].step;
            if (pet[type].progress <= 10) {
                pet[type].progress = 10;
            }
        },
        decreaseStateFood: function () {
            return pet.decreaseState(meters[pet.name].foodMeter, pet.hunger.progress, 'hunger');
        },
        decreaseStateJoy: function () {
            return pet.decreaseState(meters[pet.name].playMeter, pet.hapiness.progress, 'hapiness');
        },
        decreaseStateRest: function () {
            return pet.decreaseState(meters[pet.name].sleepMeter, pet.rest.progress, 'rest');
        },
        idInterval: setInterval(function () {
            pet.decreaseStateFood();
            pet.decreaseStateJoy();
            pet.decreaseStateRest();
            pet.isAlive();
        }, 5000),
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
        changeProgressFood: function () {
            return pet.changeProgressUI(meters[pet.name].foodMeter, pet.hunger.progress);
        },
        changeProgressJoy: function () {
            return pet.changeProgressUI(meters[pet.name].playMeter, pet.hapiness.progress);
        },
        changeProgressRest: function () {
            return pet.changeProgressUI(meters[pet.name].sleepMeter, pet.rest.progress);
        },
        feed: function () {
            console.log('feed');
            return pet.increaseState(meters[pet.name].foodMeter, pet.hunger.progress, 'hunger');
        },
        play: function () {
            return pet.increaseState(meters[pet.name].playMeter, pet.hapiness.progress, 'hapiness');
        },
        sleep: function () {
            return pet.increaseState(meters[pet.name].sleepMeter, pet.rest.progress, 'rest');
        },
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
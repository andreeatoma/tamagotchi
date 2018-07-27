function createListPets(PetsModel, onDeleteCb, onFeedCb, onPlayCb, onSleepCb) {
    let div = document.createElement('div');

    div.addEventListener('click', function (event) {
        let currentPet = event.target;
        console.log(currentPet);

        if (currentPet.dataset["name"]) {
            onDeleteCb(currentPet.dataset["name"]);
        }


    });

    div.notify = function (petsList) {
        div.innerHTML = null;
        petsList.forEach(function (pet, name) {

            div.appendChild(displayName(pet));
            div.appendChild(createStatsUI(pet, PetsModel, onFeedCb, onPlayCb, onSleepCb));

            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("data-name", pet.name);
            deleteBtn.classList.add("btn", "btn--delete");
            deleteBtn.innerText = "Delete pet";


            div.appendChild(deleteBtn);

            return {
                increaseState: function (progressBar, value, type) {
                    return pet.increaseLevel(value, type);
                    return pet.changeProgressUI(progressBar, pet[type].progress);
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
                    return pet.decreaseLevel(type);
                    return pet.changeProgressUI(progressBar, pet[type].progress);
                },
                decreaseLevel: function (type) {
                    return pet[type].progress -= pet[type].step;
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
                    return pet.increaseState(meters[pet.name].foodMeter, pet.hunger.progress, 'hunger');
                },
                play: function () {
                    return pet.increaseState(meters[pet.name].playMeter, pet.hapiness.progress, 'hapiness');
                },
                sleep: function () {
                    return pet.increaseState(meters[pet.name].sleepMeter, pet.rest.progress, 'rest');
                }
            }
        });
    }
    PetsModel.subscribe(div);
    return div;
}
function displayName(pet) {
    let wrapper_name = document.createElement('div');
    wrapper_name.classList.add('pet-name');
    let paragraph_name = document.createElement('p');
    paragraph_name.textContent = `Welcome ${pet.name} :)`;
    wrapper_name.appendChild(paragraph_name);

    return wrapper_name;
}
function createStatsButton() {
    let button = document.createElement('button');
    button.classList.add('btn', 'btn--large');
    return button;
}
function createMeters() {
    let container_meter = document.createElement('div');
    let meter = document.createElement('meter');
    container_meter.appendChild(meter);
    return container_meter;
}
function createStatsUI(pet, PetsModel, onFeedCb, onPlayCb, onSleepCb) {
    displayName(pet);
    let container_pet = document.createElement('div');
    container_pet.setAttribute('class', 'pet__box');

    let feedBtn = createStatsButton();
    let playBtn = createStatsButton();
    playBtn.classList.add('btn--play');
    let sleepBtn = createStatsButton();
    sleepBtn.classList.add('btn--sleep');


    let foodMeterContainer = createMeters();
    let playMeterContainer = createMeters();
    let sleepMeterContainer = createMeters();

    container_pet.appendChild(feedBtn);
    container_pet.appendChild(playBtn);
    container_pet.appendChild(sleepBtn);
    container_pet.appendChild(foodMeterContainer);
    container_pet.appendChild(playMeterContainer);
    container_pet.appendChild(sleepMeterContainer);

    feedBtn.addEventListener("click", () => {
        onFeedCb(pet);
    });
    playBtn.addEventListener("click", () => {
        onPlayCb(pet);
    });
    sleepBtn.addEventListener("click", () => {
        onSleepCb(pet);
    });

    meters[pet.name] = {};
    meters[pet.name].foodMeter = foodMeterContainer.querySelector("meter");
    meters[pet.name].playMeter = playMeterContainer.querySelector("meter");
    meters[pet.name].sleepMeter = sleepMeterContainer.querySelector("meter");

    return container_pet
}

function displayMessages(textMessage, typeOfMessage) {
    let wrapper_messages = document.getElementsByClassName("wrapper-messages")[0];
    let container_messages = document.createElement('div');
    container_messages.setAttribute('class', 'message__box');
    wrapper_messages.appendChild(container_messages);

    let message = document.createElement('p');
    message.textContent = textMessage;
    container_messages.appendChild(message);

    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'x';
    container_messages.appendChild(closeBtn);

    closeBtn.addEventListener('click', function (event) {
        event.target.parentNode.parentNode.removeChild(container_messages);
    });
    switch (typeOfMessage) {
        case 'warning':
            container_messages.classList.add('bg--warning');
            break;
        case 'info':
            container_messages.classList.add('bg--info');
            break;
        default:
            container_messages.classList.add('bg--default');
    }
    // remove the message after 3 seconds
    setTimeout(function () {
        if (container_messages) {
            container_messages.parentNode.removeChild(container_messages);
        }
    }, 3000);
}

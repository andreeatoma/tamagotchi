'use strict';

function createListPets(PetsModel, onDeleteCb, onFeedCb, onPlayCb, onSleepCb) {
    var div = document.createElement('div');

    div.addEventListener('click', function (event) {
        var currentPet = event.target;
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

            var deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("data-name", pet.name);
            deleteBtn.classList.add("btn", "btn--delete");
            deleteBtn.innerText = "Delete pet";

            div.appendChild(deleteBtn);
        });
    };
    PetsModel.subscribe(div);
    return div;
}
function displayName(pet) {
    var wrapper_name = document.createElement('div');
    wrapper_name.classList.add('pet-name');
    var paragraph_name = document.createElement('p');
    paragraph_name.textContent = 'Welcome ' + pet.name + ' :)';
    wrapper_name.appendChild(paragraph_name);

    return wrapper_name;
}
function createStatsButton() {
    var button = document.createElement('button');
    button.classList.add('btn', 'btn--large');
    return button;
}
function createMeters(value) {
    var container_meter = document.createElement('div');
    var meter = document.createElement('meter');
    meter.value = value;
    meter.min = 0;
    meter.max = 100;
    container_meter.appendChild(meter);
    return container_meter;
}
function createStatsUI(pet, PetsModel, onFeedCb, onPlayCb, onSleepCb) {
    displayName(pet);
    var container_pet = document.createElement('div');
    container_pet.setAttribute('class', 'pet__box');

    var feedBtn = createStatsButton();
    var playBtn = createStatsButton();
    playBtn.classList.add('btn--play');
    var sleepBtn = createStatsButton();
    sleepBtn.classList.add('btn--sleep');

    var foodMeterContainer = createMeters(pet.getFood());
    var playMeterContainer = createMeters(pet.getHappiness());
    var sleepMeterContainer = createMeters(pet.getRest());

    container_pet.appendChild(feedBtn);
    container_pet.appendChild(playBtn);
    container_pet.appendChild(sleepBtn);
    container_pet.appendChild(foodMeterContainer);
    container_pet.appendChild(playMeterContainer);
    container_pet.appendChild(sleepMeterContainer);

    feedBtn.addEventListener("click", function () {
        onFeedCb(pet.name);
    });
    playBtn.addEventListener("click", function () {
        onPlayCb(pet.name);
    });
    sleepBtn.addEventListener("click", function () {
        onSleepCb(pet.name);
    });

    return container_pet;
}

function displayMessages(PetsModel, textMessage, typeOfMessage) {
    var container_messages = document.createElement('div');
    container_messages.setAttribute('class', 'message__box');
    // wrapper_messages.appendChild(container_messages);

    container_messages.notify = function (messagesList) {
        container_messages.innerHTML = null;
        messagesList.forEach(function () {

            var message = document.createElement('p');
            message.textContent = textMessage;
            container_messages.appendChild(message);

            var closeBtn = document.createElement('button');
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
        });
    };

    PetsModel.subscribe(container_messages);
    return container_messages;
}
function createListPets(PetsModel, onDeleteCb, onFeedCb, onPlayCb, onSleepCb) {
    let div = document.createElement('div');

    div.addEventListener('click', (event) => {
        let currentPet = event.target;
        // console.log(currentPet);

        if (currentPet.dataset["name"]) {
            onDeleteCb(currentPet.dataset["name"]);
        }
    });

    div.notify = function (petsList) {
        div.innerHTML = null;
        petsList.forEach((pet, name) => {

            div.appendChild(displayName(pet));
            div.appendChild(createStatsUI(pet, PetsModel, onFeedCb, onPlayCb, onSleepCb));

            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("data-name", pet.name);
            deleteBtn.classList.add("btn", "btn--delete");
            deleteBtn.innerText = "Delete pet";

            div.appendChild(deleteBtn);

        });
    }
    PetsModel.subscribe(div);
    return div;
}
function displayName(pet) {
    let wrapperName = document.createElement('div');
    wrapperName.classList.add('pet-name');
    let paragraphName = document.createElement('p');
    paragraphName.textContent = `Welcome ${pet.name} :)`;
    wrapperName.appendChild(paragraphName);

    return wrapperName;
}
function createStatsButton() {
    let button = document.createElement('button');
    button.classList.add('btn', 'btn--large');
    return button;
}
function createMeters(value) {
    let containerMeter = document.createElement('div');
    let meter = document.createElement('meter');
    meter.value = value;
    meter.min = 0;
    meter.max = 100;
    containerMeter.appendChild(meter);
    return containerMeter;
}
function createStatsUI(pet, PetsModel, onFeedCb, onPlayCb, onSleepCb) {
    displayName(pet);
    let containerPet = document.createElement('div');
    containerPet.setAttribute('class', 'pet__box');

    let feedBtn = createStatsButton();
    let playBtn = createStatsButton();
    playBtn.classList.add('btn--play');
    let sleepBtn = createStatsButton();
    sleepBtn.classList.add('btn--sleep');


    let foodMeterContainer = createMeters(pet.getFood());
    let playMeterContainer = createMeters(pet.getHappiness());
    let sleepMeterContainer = createMeters(pet.getRest());

    containerPet.appendChild(feedBtn);
    containerPet.appendChild(playBtn);
    containerPet.appendChild(sleepBtn);
    containerPet.appendChild(foodMeterContainer);
    containerPet.appendChild(playMeterContainer);
    containerPet.appendChild(sleepMeterContainer);

    feedBtn.addEventListener("click", () => {
        onFeedCb(pet.name);
    });
    playBtn.addEventListener("click", () => {
        onPlayCb(pet.name);
    });
    sleepBtn.addEventListener("click", () => {
        onSleepCb(pet.name);
    });

    return containerPet;
}

function displayMessages(PetsModel, textMessage, typeOfMessage) {
    let containerMessages = document.createElement('div');
    containerMessages.setAttribute('class', 'message__box');
    // wrapper_messages.appendChild(containerMessages);

    containerMessages.notify = function (messagesList) {
        containerMessages.innerHTML = null;
        messagesList.forEach(() => {

            let message = document.createElement('p');
            message.textContent = textMessage;
            containerMessages.appendChild(message);

            let closeBtn = document.createElement('button');
            closeBtn.textContent = 'x';
            containerMessages.appendChild(closeBtn);

            closeBtn.addEventListener('click', (event) => {
                event.target.parentNode.parentNode.removeChild(containerMessages);
            });
            switch (typeOfMessage) {
                case 'warning':
                    containerMessages.classList.add('bg--warning');
                    break;
                case 'info':
                    containerMessages.classList.add('bg--info');
                    break;
                default:
                    containerMessages.classList.add('bg--default');
            }
            // remove the message after 3 seconds
            setTimeout(() => {
                if (containerMessages) {
                    containerMessages.parentNode.removeChild(containerMessages);
                }
            }, 3000);

        });
    }

    PetsModel.subscribe(containerMessages);
    return containerMessages;

}


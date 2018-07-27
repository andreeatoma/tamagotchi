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
function createMeters(value) {
    let container_meter = document.createElement('div');
    let meter = document.createElement('meter');
    meter.value = value;
    meter.min = 0;
    meter.max = 100;
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


    let foodMeterContainer = createMeters(pet.getFood());
    let playMeterContainer = createMeters(pet.getHappiness());
    let sleepMeterContainer = createMeters(pet.getRest());

    container_pet.appendChild(feedBtn);
    container_pet.appendChild(playBtn);
    container_pet.appendChild(sleepBtn);
    container_pet.appendChild(foodMeterContainer);
    container_pet.appendChild(playMeterContainer);
    container_pet.appendChild(sleepMeterContainer);

    feedBtn.addEventListener("click", () => {
        onFeedCb(pet.name);
    });
    playBtn.addEventListener("click", () => {
        onPlayCb(pet.name);
    });
    sleepBtn.addEventListener("click", () => {
        onSleepCb(pet.name);
    });

    return container_pet;
}

function displayMessages(PetsModel, textMessage, typeOfMessage) {
    let container_messages = document.createElement('div');
    container_messages.setAttribute('class', 'message__box');
    // wrapper_messages.appendChild(container_messages);

    container_messages.notify = function (messagesList) {
        container_messages.innerHTML = null;
        messagesList.forEach(function () {

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

        });
    }

    PetsModel.subscribe(container_messages);
    return container_messages;

}


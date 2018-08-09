let addNewPet = document.getElementById("add-new-pet");
let wrapperPet = document.getElementById('pet-interaction');
let configPet = document.getElementsByClassName('pet-configuration')[0];
let wrapperMessages = document.getElementsByClassName("wrapper-messages")[0];

const PET_MESSAGES = {
    hunger: {
        info: 'I\'m fullfill!!!',
        warning: 'Feed me human!'
    },
    hapiness: {
        info: 'Happy!!! I don\'t want to play now!',
        warning: 'I\'m so sad! PLay with me!'
    },
    rest: {
        info: `ZZZZZZZZZZZZZZZZZZZZZ!`,
        warning: `I want to sleep!`,
    },
    dead: {
        warning: `I'm dead!`
    }
}

let petInput = document.querySelector('[name=myPet]');

let petView = createListPets(PetsModel, onDelete, onFeed, onPlay, onSleep);
wrapperPet.appendChild(petView);



addNewPet.addEventListener("click",  () => {
    let newPet = PetsModel.addPet(petInput.value);
    petInput.value = "";
    // if () {
      // wrapperMessages.appendChild(displayMessages(PetsModel, PET_MESSAGES.dead.warning, 'warning'));
    // }
});
function onDelete(petToDelete) {
    PetsModel.removePet(petToDelete);
}
function onFeed(petName) {
    PetsModel.feed(petName);
}
function onPlay(petName) {
    PetsModel.play(petName);
}
function onSleep(petName) {
    PetsModel.sleep(petName);
}




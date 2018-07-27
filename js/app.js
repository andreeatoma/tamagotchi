let meters = {};
let addNewPet = document.getElementById("add-new-pet");
let wrapper_pet = document.getElementById('pet-interaction');
let config_pet = document.getElementsByClassName('pet-configuration')[0];

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
    }
}

let petInput = document.querySelector('[name=myPet]');

let petView = createListPets(PetsModel, onDelete, onFeed, onPlay, onSleep);
wrapper_pet.appendChild(petView);

addNewPet.addEventListener("click", function () {
    let newPet = PetsModel.addPet(petInput.value);
    petInput.value = "";
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




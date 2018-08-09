'use strict';

var addNewPet = document.getElementById("add-new-pet");
var wrapper_pet = document.getElementById('pet-interaction');
var config_pet = document.getElementsByClassName('pet-configuration')[0];
var wrapper_messages = document.getElementsByClassName("wrapper-messages")[0];

var PET_MESSAGES = {
    hunger: {
        info: 'I\'m fullfill!!!',
        warning: 'Feed me human!'
    },
    hapiness: {
        info: 'Happy!!! I don\'t want to play now!',
        warning: 'I\'m so sad! PLay with me!'
    },
    rest: {
        info: 'ZZZZZZZZZZZZZZZZZZZZZ!',
        warning: 'I want to sleep!'
    },
    dead: {
        warning: 'I\'m dead!'
    }
};

var petInput = document.querySelector('[name=myPet]');

var petView = createListPets(PetsModel, onDelete, onFeed, onPlay, onSleep);
wrapper_pet.appendChild(petView);

addNewPet.addEventListener("click", function () {
    var newPet = PetsModel.addPet(petInput.value);
    petInput.value = "";
    // if () {
    // wrapper_messages.appendChild(displayMessages(PetsModel, PET_MESSAGES.dead.warning, 'warning'));
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
let meters = {};
let formAddPet = document.getElementById("form-add-pet");
let wrapper_pet = document.getElementsByClassName('pet-interaction')[0];
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
let myPets = [];

window.addEventListener('load', function () {
    // petsData e array-ul din localStorage care e insa diferit de array-ul de obiecte de tip pet
    let petsData = JSON.parse(localStorage.getItem("pets") || "[]");
    petsData.forEach(petData => {
        let newPet = createPet(petData.name);
        createStatsUI(newPet);
        myPets.push(newPet);
        newPet.changeProgressFood();
        newPet.changeProgressJoy();
        newPet.changeProgressRest();
    });
});

formAddPet.addEventListener('submit', addPet);

function addPet(e) {
    e.preventDefault();

    let name = this.querySelector('[name=myPet]').value;
    let pet = createPet(name);
    console.log(pet);

    myPets.push(pet.serialize());

    localStorage.setItem("pets", JSON.stringify(myPets));

    let petUI = createStatsUI(pet);
    wrapper_pet.appendChild(petUI);

    pet.changeProgressFood();
    pet.changeProgressJoy();
    pet.changeProgressRest();

    this.reset();
}
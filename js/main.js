let formEl = document.getElementById('setup_form');
let characterInfo = document.getElementsByClassName('character-info')[0];
let storeInfo = JSON.parse(localStorage.getItem('info')) || [];
let main = document.getElementsByTagName('main')[0];
let pictureInput = document.getElementById('chooseImg');
let inputFile = document.getElementById("chooseImg");
let formNewPet = document.getElementById("add-pet");
let selectPet = document.getElementById("myPet");

formEl.addEventListener('submit', addCharacterDetails);
showCharacterDetails(storeInfo, characterInfo);
pictureInput.addEventListener('change', showFile);
pictureInput.addEventListener('change', displayImage);
formNewPet.addEventListener('submit', addNewPet);

showInfo();

function addNewPet(e) {
    e.preventDefault();
    newName = this.querySelector('[name="myPet"]').value;
    myPet = createPet(newName, 100, 100, 100);
    initNewPet();
    localStorage.removeItem('info');
    //removeCharacterDetails(storeInfo, characterInfo);
    formEl.classList.remove('hidden');
    showCharacterDetails(storeInfo, characterInfo);
    // initGlobal();
};

function showInfo() {
    if (storeInfo.length === 0) {
        formEl.classList.remove('hidden');
    } else {
        formEl.classList.add('hidden');
    }
}
function addCharacterDetails(e) {
    e.preventDefault();
    let config = {
        name: this.querySelector('[name=myPet]').value,
        birthday: this.querySelector('[name=birthday]').value,
        image: this.querySelector('[name=image]').files[0].name,
        //name: this.querySelector('[name=myPet]').value,
        congratsMessage: `Congrats, your new Pet was created and got some life!
        Use the buttons above to interact!`
    }
    storeInfo.push(config);
    localStorage.setItem('info', JSON.stringify(storeInfo));
    showCharacterDetails(storeInfo, characterInfo);
    this.reset();
    formEl.classList.add('hidden');
    showInfo();
}
function showCharacterDetails(details = [], detailsList) {
    detailsList.innerHTML = details.map((detail) => {
        return `
        <ul class="character-details">
            <li class="detail_li">${detail.name}<img src="images/${detail.image}" alt="" class="round_img"></li>
            <li class="detail_li">${detail.birthday}</li>
        </ul>
        <div class="congrats_message"><p>${detail.congratsMessage}</p></div>
      `;
    }).join('');
}
function removeCharacterDetails(details = [], detailsList) {
    detailsList.parentNode.removeChild(detailsList);
}
function showFile(e) {
    let pictureLabel = inputFile.nextElementSibling;
    let labelVal = pictureLabel.innerHTML;
    let fileName = '';
    if (this.files && this.files.length > 1)
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
    else
        fileName = e.target.value.split('\\').pop();

    if (fileName)
        pictureLabel.getElementsByClassName('span')[0].innerHTML = fileName;
    else
        pictureLabel.innerHTML = labelVal;
}
function displayImage() {
    let create_pet = document.getElementsByClassName('character-info')[0];
    let firstFile = inputFile.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let image = document.createElement("img");
        image.src = e.target.result;
        image.classList.add("round_img");
        create_pet.appendChild(image);
    }
    reader.readAsDataURL(firstFile);
}

// get references for my actions
let feedBtn = document.getElementById('feed');
let playBtn = document.getElementById('play');
let sleepBtn = document.getElementById('sleep');

// module Pattern
function createPet(petName, progressHunger, progressHapiness, progressRest, awake = false, step = 10, age = 0, isPet = true) {
    let pet = {
        petName,
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
        isPet,
        increaseState: function (progressBar, value, type) {
            this.increaseLevel(value, type);
            this.changeProgressUI(progressBar, this[type].progress);
            this.saveMyPetInfo();
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
            this[type].progress += this[type].step;
            if (this[type].progress > 100) {
                this[type].progress = 100;
            }
        },
        changeProgressUI: function (progressBar, value) {
            if (value < 40) {
                progressBar.className = "progress state_danger";
            }
            else if (value < 70) {
                progressBar.className = "progress state_warning";
            }
            else if (value < 100) {
                progressBar.className = "progress state_success";
            }
            else if (value >= 100) {
                value = 100;
                progressBar.className = "progress state_success";
            }
            progressBar.style.width = value + "%";
            console.log(value);
        },
        decreaseState: function (progressBar, value, type) {
            this.decreaseLevel(type);
            this.changeProgressUI(progressBar, this[type].progress);
            this.saveMyPetInfo();
        },
        decreaseLevel: function (type) {
            this[type].progress -= this[type].step;
            if (this[type].progress <= 10) {
                this[type].progress = 10;
            }
        },
        saveMyPetInfo: function () {
            let localStor = JSON.stringify(pet);
            localStorage.setItem(petName, localStor);
        }
    }
    return {
        feed: function () {
            return pet.increaseState(food, pet.hunger.progress, 'hunger');
        },
        play: function () {
            return pet.increaseState(joy, pet.hapiness.progress, 'hapiness');
        },
        sleep: function () {
            return pet.increaseState(rest, pet.rest.progress, 'rest');
        },
        isAlive: function () {
            if ((pet.rest.progress === 10) || (pet.hunger.progress === 10) || (pet.hapiness.progress === 10) || this.age === 15) {
                clearInterval(idInterval);
                feedBtn.removeEventListener('click', myPet.feed);
                playBtn.removeEventListener('click', myPet.play);
                sleepBtn.removeEventListener('click', myPet.sleep);
                displayMessages(`SORRY, YOUR PET IS DEAD!`, 'warning');
                main.appendChild(createRestartButton());
                return false;
            } else {
                return true;
            };
        },
        changeProgressFood: function () {
            return pet.changeProgressUI(food, pet.hunger.progress);
        },
        changeProgressJoy: function () {
            return pet.changeProgressUI(joy, pet.hapiness.progress);
        },
        changeProgressRest: function () {
            return pet.changeProgressUI(rest, pet.rest.progress);
        },
        decreaseStateFood: function () {
            return pet.decreaseState(food, pet.hunger.progress, 'hunger');
        },
        decreaseStateJoy: function () {
            return pet.decreaseState(joy, pet.hapiness.progress, 'hapiness');
        },
        decreaseStateRest: function () {
            return pet.decreaseState(rest, pet.rest.progress, 'rest');
        },
        getMyPetInfo: function () {
            if (localStorage.getItem(petName) === null) {
                pet.saveMyPetInfo();
            } else {
                let petInfo = JSON.parse(localStorage.getItem(petName));
                pet.hunger.progress = petInfo.hunger.progress;
                pet.hapiness.progress = petInfo.hapiness.progress;
                pet.rest.progress = petInfo.rest.progress;
                pet.age.progress = petInfo.age.progress;
            }
        }
    }
};
let myPets = [];

let storedPets = JSON.parse(localStorage.getItem("pets") || "[]");

storedPets.forEach(petInfo => {
    myPets.push(createPet(petInfo.name, petInfo.progressHunger, petInfo.progressHapiness, petInfo.progressRest));
});
let myPet = createPet("MyFirstPet", 100, 100, 100);
function initGlobal() {
    Object.keys(localStorage).forEach(function (key) {
        pet = JSON.parse(localStorage.getItem(key));
        if (pet["isPet"]) {
            //populez select-ul cu pet-urile mele in options
            selectPet.options[selectPet.options.length] = new Option(key, key);
            selectPet.addEventListener('change', function () {
                initNewPet();
            })
        }
    });
}



feedBtn.addEventListener('click', myPet.feed);
playBtn.addEventListener('click', myPet.play);
sleepBtn.addEventListener('click', myPet.sleep);
myPet.getMyPetInfo();
function initNewPet() {
    myPet.changeProgressFood();
    myPet.changeProgressJoy();
    myPet.changeProgressRest();
    myPet.isAlive();
}
window.addEventListener("load", function () {
    initNewPet();
    initGlobal();
});
idInterval = setInterval(function () {
    myPet.decreaseStateFood();
    myPet.decreaseStateJoy();
    myPet.decreaseStateRest();
    myPet.isAlive();
}, 10000);

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
function displayMessages(textMessage, typeOfMessage) {
    let wrapper_messages = document.getElementsByClassName("wrapper_messages")[0];
    let container_messages = document.createElement('div');
    container_messages.setAttribute('class', 'messageBox');
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
    //remove the message after 3 seconds
    setTimeout(function () {
        if (container_messages) {
            container_messages.parentNode.removeChild(container_messages);
        }
    }, 3000);
}
function createRestartButton() {
    let restartBtn = document.createElement('button');
    restartBtn.textContent = "RESTART GAME";
    restartBtn.classList.add('btn');
    restartBtn.classList.add('btn--restart');
    restartBtn.addEventListener("click", restartGame);
    return restartBtn;
}
function restartGame(event) {
    feedBtn.addEventListener('click', myPet.feed);
    playBtn.addEventListener('click', myPet.play);
    sleepBtn.addEventListener('click', myPet.sleep);
    displayMessages(`USE THE ACTION BUTTONS TO INCREASE THE STATE OF YOUR PET`, 'info');
    let targetEL = event.target;
    targetEL.parentNode.removeChild(targetEL);

    idInterval = setInterval(function () {
        myPet.decreaseStateFood();
        myPet.decreaseStateJoy();
        myPet.decreaseStateRest();
        myPet.isAlive();
    }, 10000);
}


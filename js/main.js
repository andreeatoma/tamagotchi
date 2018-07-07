/** configuration stuff */
let configCharacter = document.querySelector('.character_details');
let detailsConfig = document.querySelector('.configured_character_details');
let storeConfig = JSON.parse(localStorage.getItem('info')) || [];

configCharacter.addEventListener('submit', addCharacterDetails);
showCharacterDetails(storeConfig, detailsConfig);
showInfo();

// get references for my actions and myPet
let submitBtn = document.querySelector('button[type="submit"]');
let feedBtn = document.getElementById('feed');
let playBtn = document.getElementById('play');
let sleepBtn = document.getElementById('sleep');
let myPet = createPet(10, 20, 30);
let myPetMessages = {
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

window.addEventListener("load", function () {
    getMyPetInfo();
    changeProgressUI(food, myPet.hunger.progress);
    changeProgressUI(joy, myPet.hapiness.progress);
    changeProgressUI(rest, myPet.rest.progress);
    isPetAlive();
});
feedBtn.addEventListener('click', function () {
    myPet.increaseState(food, myPet.hunger.progress, 'hunger');
});
playBtn.addEventListener('click', function () {
    myPet.increaseState(joy, myPet.hapiness.progress, 'hapiness');
});
sleepBtn.addEventListener('click', function () {
    myPet.increaseState(rest, myPet.rest.progress, 'rest');
});
idInterval = setInterval(function () {
    myPet.decreaseState(food, myPet.hunger.progress, 'hunger');
    myPet.decreaseState(joy, myPet.hapiness.progress, 'hapiness');
    myPet.decreaseState(rest, myPet.rest.progress, 'rest');
    isPetAlive();
}, 10000);

let pictureInput = document.getElementById('chooseImg');

pictureInput.addEventListener('change', showFile);
pictureInput.addEventListener('change', displayImage);

function showInfo() {
    if (storeConfig.length === 0) {
        configCharacter.classList.remove('hidden');
    } else {
        configCharacter.classList.add('hidden');
    }
}
function addCharacterDetails(e) {
    e.preventDefault();
    let config = {
        name: this.querySelector('[name=name]').value,
        birthday: this.querySelector('[name=birthday]').value,
        image: this.querySelector('[name=image]').files[0].name,
        chosenPet: this.querySelector('[name=myPet]').value,
        congratsMessage: `Congrats, your new Pet was created and got some life!
        Use the buttons above to interact!`
    }
    storeConfig.push(config);
    localStorage.setItem('info', JSON.stringify(storeConfig));
    showCharacterDetails(storeConfig, detailsConfig);
    this.reset();
    submitBtn.classList.add('hidden');
    showInfo();
}
function showCharacterDetails(detail, detailsList) {
    // detailsList.innerHTML = details.map((detail) => {


        return detailsList.innerHTML =`
        <ul class="configured_character_ul">
            <li class="detail_li">${detail[0].name}<img src="images/${detail[0].image}" alt="" class="round_img"></li>
            <li class="detail_li">${detail[0].birthday}</li>
            <li class="detail_li">I am a: ${detail[0].chosenPet} owner</li>
        </ul>
        <div class="congrats_message"><p>${detail[0].congratsMessage}</p></div>
      `;
    // }).join('');
}
let inputFile = document.getElementById("chooseImg");
function displayImage() {
    let create_pet = document.querySelector('.character_details');
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
function createPet(progressHunger, progressHapiness, progressRest, awake = false, step = 10, age = 0) {
    return {
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
        isAlive: function () {
            if ((this.rest.progress === 10) || (this.hunger.progress === 10) || (this.hapiness.progress === 10) || this.age === 15) {
                displayMessages(`SORRY, YOUR PET IS DEAD!`, 'warning');
            } else {
                return true;
            };
        },
        increaseState: function (idProgress, value, type) {
            increaseLevel(value, type);
            changeProgressUI(idProgress, myPet[type].progress);
            saveMyPetInfo();
        },
        decreaseState: function (idProgress, value, type) {
            decreaseLevel(type);
            changeProgressUI(idProgress, myPet[type].progress);
            saveMyPetInfo();
        }
    }
}
function displayMessages(textMessage, typeOfMessage) {
    let wrapper_messages = document.querySelector(".wrapper_messages");
    let container_messages = document.createElement('div');
    container_messages.setAttribute('class', 'messageBox');
    wrapper_messages.appendChild(container_messages);

    let message = document.createElement('p');
    message.textContent = textMessage;
    container_messages.appendChild(message);

    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'x';
    container_messages.appendChild(closeBtn);

    closeBtn.onclick = function () {
        container_messages.parentNode.removeChild(container_messages);
    }
    if (typeOfMessage === 'warning') {
        container_messages.classList.add('bg--warning');
    }
    else if
    (typeOfMessage === 'info') {
        container_messages.classList.add('bg--info');
    } else {
        container_messages.classList.add('bg--default');
    }
    //remove the message after 3 seconds
    setTimeout(function () {
        container_messages.parentNode.removeChild(container_messages);
    }, 3000); //  
}
function increaseLevel(value, type) {
    if (value > 20 && value < 35) {
        displayMessages(myPetMessages[type].warning, 'warning');
    } else if ((value > 90) && (value <= 100)) {
        displayMessages(myPetMessages[type].info, 'info')
    } else if (value > 100) {
        value = 100;
        displayMessages(myPetMessages[type].info, 'info')
    }
    myPet[type].progress += myPet[type].step;
    if (myPet[type].progress > 100) {
        myPet[type].progress = 100;
    }
}
function changeProgressUI(idProgress, value) {
    if (value < 40) {
        idProgress.className = "progress state_danger";
    }
    else if (value < 70) {
        idProgress.className = "progress state_warning";
    }
    else if (value < 100) {
        idProgress.className = "progress state_success";
    }
    else if (value >= 100) {
        value = 100;
        idProgress.className = "progress state_success";
    }
    idProgress.style.width = value + "%";
    console.log(value);
}
function saveMyPetInfo() {
    let localStor = JSON.stringify(myPet);
    localStorage.setItem('myPetObj', localStor);
}
function getMyPetInfo() {
    if (localStorage.getItem('myPetObj') === null) {
        saveMyPetInfo();
    } else {
        let localStor = JSON.parse(localStorage.getItem('myPetObj'));
        myPet.hunger.progress = localStor.hunger.progress;
        myPet.hapiness.progress = localStor.hapiness.progress;
        myPet.rest.progress = localStor.rest.progress;
        myPet.age.progress = localStor.age.progress;
    }
};
// function initUI(myPetObj, idProgress, type) {
//     changeProgressUI(idProgress, myPetObj[type].progress);
// }
function isPetAlive() {
    if (!myPet.isAlive()) {
        clearInterval(idInterval);
    }
}
function decreaseLevel(type) {
    myPet[type].progress -= myPet[type].step;
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
        pictureLabel.querySelector('span').innerHTML = fileName;
    else
        pictureLabel.innerHTML = labelVal;
}

/** configuration stuff */
let configCharacter = document.querySelector('.character_details');
let detailsConfig = document.querySelector('.configured_character_details');
let storeConfig = JSON.parse(localStorage.getItem('info')) || [];

function showInfo() {
    if (storeConfig.length === 0) {
        $(configCharacter).show();
    } else {
        $(configCharacter).hide();
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
    $(this).hide();
    showInfo();
}
/** invoke this function to hide the form after is completed and reset */
function $(selector) {
    let resultObject = {
        hide: function () {
            selector.style.display = "none";
        },
        show: function () {
            selector.style.display = "block";
        }
    };
    return resultObject;
}
function showCharacterDetails(details = [], detailsList) {
    detailsList.innerHTML = details.map((detail) => {
        return `
        <ul class="configured_character_ul">
            <li class="detail_li">${detail.name}<img src="images/${detail.image}" alt="" class="round_img"></li>
            <li class="detail_li">${detail.birthday}</li>
            <li class="detail_li">I am a: ${detail.chosenPet} owner</li>
        </ul>
        <div class="congrats_message"><p>${detail.congratsMessage}</p></div>
      `;
    }).join('');
}
function displayImage() {
    let create_pet = document.querySelector('.character_details');
    let file = document.getElementById("chooseImg");
    let firstFile = file.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let image = document.createElement("img");
        image.src = e.target.result;
        image.classList.add("round_img");
        create_pet.appendChild(image);
    }
    reader.readAsDataURL(firstFile);
}
showInfo();
configCharacter.addEventListener('submit', addCharacterDetails);
showCharacterDetails(storeConfig, detailsConfig);


/** create the html for warnings */
let myPet = {
    foodList: ['pizza', 'pasta', 'shrimp'],
    hunger: {
        progress: 10,
        step: 10,
        messages: {
            info: 'I\'m fullfill!!!',
            warning: 'Feed me human!'
        }
    },
    hapiness: {
        progress: 20,
        step: 10,
        messages: {
            info: 'Happy!!! I don\'t want to play now!',
            warning: 'I\'m so sad! PLay with me!'
        }
    },
    awake: false,
    rest: {
        progress: 30,
        step: 10,
        messages: {
            info: `ZZZZZZZZZZZZZZZZZZZZZ!`,
            warning: `I want to sleep!`,

        }
    },
    age: {
        progress: 0,
        oldData: Math.round(new Date().getTime() / 1000)
    },
    // cu astea inca nu fac nimic asa ca le-am comentat pt moment
    // feed: function () {
    //     if (this.hunger.progress < 35) {
    //         this.getSad();
    //     }
    // },
    // getSad() {
    //     if (this.hapiness.progress > 0) {
    //         return this.HAPINESS > PROGRESS--;
    //     }
    // },
    // sleep: function () {
    //     if (this.awake) {
    //         this.awake = false;
    //         this.getSad();
    //     }
    // },
    // play: function () {
    //     if (this.hapiness.progress > 20) {
    //         this.hapiness.progress--;
    //     }
    // },
    
    isAlive: function () {
        if ((this.rest.progress === 0) || (this.hunger.progress === 0) || (this.hapiness.progress === 0) || this.AGE === 15) {
            displayMessages(`SORRY, YOUR PET IS DEAD!`, 'warning');
        } else {
            return true;
        };
    }
}


// get references for my actions
let feedBtn = document.getElementById('feed');
let playBtn = document.getElementById('play');
let sleepBtn = document.getElementById('sleep');

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
        container_messages.style.backgroundColor = '#dc3545';
    }
    else if
    (typeOfMessage === 'info') {
        container_messages.style.backgroundColor = '#e85cde';
    } else {
        container_messages.style.backgroundColor = '#6c757d';
    }
    //hide the message after 3 seconds
    setTimeout(function () {
        container_messages.style.display = 'none';
    }, 3000); //  
}

function increaseState(idProgress, value, type) {
    increaseLevel(value, type);
    changeColor(idProgress, myPet[type].progress);
    saveMyPetInfo();
}
function increaseLevel(value, type) {
    if (value > 20 && value < 35) {
        displayMessages(myPet[type].messages.warning, 'warning');
    } else if ((value > 90) && (value <= 100)) {
        displayMessages(myPet[type].messages.info, 'info')
    } else if (value > 100) {
        value = 100;
        displayMessages(myPet[type].messages.info, 'info')
    }
    myPet[type].progress += myPet[type].step;
    if (myPet[type].progress > 100) {
        myPet[type].progress = 100;
    }
}
function changeColor(idProgress, value) {
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
function initUI(myPetObj, idProgress, type) {
    changeColor(idProgress, myPetObj[type].progress);
}
idInterval = setInterval(function () {
    decreaseState(food, myPet.hunger.progress, 'hunger');
    decreaseState(joy, myPet.hapiness.progress, 'hapiness');
    decreaseState(rest, myPet.rest.progress, 'rest');
    isPetAlive();
}, 500000);

function isPetAlive() {
    if (!myPet.isAlive()) {
        clearInterval(idInterval);
    }
}
function decreaseState(idProgress, value, type) {
    saveMyPetInfo();
    decreaseLevel(type);
    changeColor(idProgress, myPet[type].progress);
}
function decreaseLevel(type) {
    myPet[type].progress -= myPet[type].step;
}
feedBtn.addEventListener('click', function () {
    increaseState(food, myPet.hunger.progress, 'hunger');
});
playBtn.addEventListener('click', function () {
    increaseState(joy, myPet.hapiness.progress, 'hapiness');
});
sleepBtn.addEventListener('click', function () {
    increaseState(rest, myPet.rest.progress, 'rest');
});

window.addEventListener("load", function () {
    getMyPetInfo();
    initUI(myPet, food, 'hunger');
    initUI(myPet, joy, 'hapiness');
    initUI(myPet, rest, 'rest');
    isPetAlive();
});


function displayName(pet) {
    let wrapper_name = document.createElement('div');
    wrapper_name.classList.add('pet-name');
    let paragraph_name = document.createElement('p');
    wrapper_name.appendChild(paragraph_name);

    paragraph_name.textContent = `Welcome ${pet.name} :)`;
    config_pet.appendChild(wrapper_name);
    return config_pet;
}
function createStatsButton() {
    let button = document.createElement('button');
    button.classList.add('btn', 'btn--large');
    return button;
}
function createSpansForMeters() {
    let span = document.createElement('span');
    span.classList.add('state__level');
    return span;
}
function createMeters() {
    let container_meter = document.createElement('div');
    
    let meter = document.createElement('meter');

    let spanLevelFood = createSpansForMeters();
    spanLevelFood.textContent = 'Hunger level';

    let spanLevelJoy = createSpansForMeters();
    spanLevelJoy.textContent = 'Hapiness level';

    let spanLevelRest = createSpansForMeters();    
    spanLevelRest.textContent = 'Rest level';

    container_meter.appendChild(meter);

    let meters = document.getElementsByTagName('meter');

    return container_meter;
}
function createStatsUI(pet) {
    displayName(pet);
    let container_pet = document.createElement('div');
    container_pet.setAttribute('class', 'pet__box');
    wrapper_pet.appendChild(container_pet);

    let feedBtn = createStatsButton();
    let playBtn = createStatsButton();
    playBtn.classList.add('btn--play');
    let sleepBtn = createStatsButton();
    sleepBtn.classList.add('btn--sleep');


    let foodMeterContainer = createMeters();
    let playMeterContainer = createMeters();
    let sleepMeterContainer = createMeters();

    container_pet.appendChild(feedBtn);
    container_pet.appendChild(playBtn);
    container_pet.appendChild(sleepBtn);
    container_pet.appendChild(foodMeterContainer);
    container_pet.appendChild(playMeterContainer);
    container_pet.appendChild(sleepMeterContainer);


    feedBtn.addEventListener("click", function () {
        pet.feed();
    });
    playBtn.addEventListener("click", function () {
        pet.play();
    });
    sleepBtn.addEventListener("click", function () {
        pet.sleep();
    });

    meters[pet.name] = {};
    meters[pet.name].foodMeter = foodMeterContainer.querySelector("meter");
    meters[pet.name].playMeter = playMeterContainer.querySelector("meter");
    meters[pet.name].sleepMeter = sleepMeterContainer.querySelector("meter");

    return container_pet;


}
function displayMessages(textMessage, typeOfMessage) {
    let wrapper_messages = document.getElementsByClassName("wrapper-messages")[0];
    let container_messages = document.createElement('div');
    container_messages.setAttribute('class', 'message__box');
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
    // remove the message after 3 seconds
    setTimeout(function () {
        if (container_messages) {
            container_messages.parentNode.removeChild(container_messages);
        }
    }, 3000);
}
function createRestartButton() {
    let restartBtn = document.createElement('button');
    restartBtn.textContent = "RESTART GAME";
    restartBtn.classList.add('btn', 'btn--restart');
    restartBtn.addEventListener("click", restartGame);
    return restartBtn;
}
function restartGame(event) {
    displayMessages(`USE THE ACTION BUTTONS TO INCREASE THE STATE OF YOUR PET`, 'info');
    let targetEL = event.target;
    targetEL.parentNode.removeChild(targetEL);
}





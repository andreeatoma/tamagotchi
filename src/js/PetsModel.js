function createPet(
  name,
  onUpdateCb,
  progressHunger = 80,
  progressHapiness = 90,
  progressRest = 100,
  awake = false,
  step = 10,
  age = 0,
  idInterval
) {
  let pet = {
    name,
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
    isAlive() {
      if (
        pet.rest.progress <= 10 ||
        pet.hunger.progress <= 20 ||
        pet.hapiness.progress <= 20 ||
        pet.age === 15
      ) {
        clearInterval(pet.idInterval);
        return false;
      } else {
        return true;
      }
    },
    decreaseStateFood() {
      pet.hunger.progress -= pet.hunger.step;
    },
    decreaseStateJoy() {
      pet.hapiness.progress -= pet.hapiness.step;
    },
    decreaseStateRest() {
      pet.rest.progress -= pet.rest.step;
    },
    idInterval: setInterval(() => {
      pet.decreaseStateFood();
      pet.decreaseStateJoy();
      pet.decreaseStateRest();
      onUpdateCb();
      pet.isAlive();
    }, 5000)
  };
  let publicAPI = {
    name,
    getName() {
      return pet.name;
    },
    serialize() {
      return {
        name,
        hunger: pet.hunger.progress,
        happy: pet.hapiness.progress,
        sleep: pet.rest.progress
      };
    },
    // es6
    getFood() {
      return pet.hunger.progress;
    },
    getHappiness() {
      return pet.hapiness.progress;
    },
    getRest() {
      return pet.rest.progress;
    },
    giveFood() {
      pet.hunger.progress += pet.hunger.step;
    },
    play() {
      pet.hapiness.progress += pet.hapiness.step;
    },
    sleep() {
      pet.rest.progress += pet.rest.step;
    }
  };
  return publicAPI;
}

let PetsModel = (function() {
  let myPets = [];
  let myObservers = [];

  let petsData = JSON.parse(localStorage.getItem('pets') || '[]');
  petsData.forEach(petData => {
    let newPet = createPet(
      petData.name,
      notifySubscribers,
      petData.hunger,
      petData.happy,
      petData.sleep
    );
    myPets.push(newPet);
  });

  function updateLocalStorage() {
    let serializedPets = myPets.map(petData => petData.serialize());
    localStorage.setItem('pets', JSON.stringify(serializedPets));
  }
  function notifySubscribers() {
    myObservers.forEach(observer => {
      if (typeof observer.notify === 'function') {
        observer.notify(myPets);
      }
    });
    updateLocalStorage();
  }
  return {
    addPet(name, hunger, happy, rest) {
      let newPet = createPet(name, notifySubscribers, hunger, happy, rest);
      myPets.push(newPet);
      notifySubscribers();
      return newPet;
    },
    removePet() {
      myPets.forEach(el => {
        myPets.splice(el, 1);
      });
      notifySubscribers();
    },
    subscribe(observer) {
      myObservers.push(observer);
      notifySubscribers();
    },
    feed(petName) {
      let myPet = myPets.find(el => {
        if (el.name === petName) {
          return true;
        }
        return false;
      });
      myPet.giveFood();
      notifySubscribers();
    },
    play(petName) {
      let myPet = myPets.find(el => {
        if (el.name === petName) {
          return true;
        }
        return false;
      });
      myPet.play();
      notifySubscribers();
    },
    sleep(petName) {
      let myPet = myPets.find(el => {
        if (el.name === petName) {
          return true;
        }
        return false;
      });
      myPet.sleep();
      notifySubscribers();
    }
  };
})();

// pet subiectul si PetsModel e observer-ul

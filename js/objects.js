let person = {
    name: 'Tyron',
    age: 40,
    weekendAlarm: 'No alarms needed',
    weekAlarm: 'Alarm set to 7AM',

    sayHello: function () {
        return `Hello, my name is ${this.name}`;
    },

    sayGoodbye() {
        return 'Goodbye!';
    }
};


let friend = {
    name: 'Lebron'
};

friend.sayHello = person.sayHello;

console.log(friend.sayHello());
console.log(person.sayHello());

person.hobbies = ['Basketball', 'Coaching'];
person.hobbies = ['Basketball'];
console.log(person.hobbies);


console.log(person['name']);
console.log(person['age']);

let day = 'Tuesday';
let alarm;

if (day === 'Saturday' || day === 'Sunday') {
    alarm = 'weekendAlarm';
} else {
    alarm = 'weekAlarm';
}

console.log(person[alarm]);

/** OBJECTS
Review: Objects
Way to go! Let's review what we learned in this lesson:

Objects store key-value pairs and let us represent real-world things in JavaScript.
Properties in objects are separated by commas. Key-value pairs are always separated by a colon.
You can add or edit a property within an object with dot notation.
A method is a function in an object.
this helps us with scope inside of object methods. this is a dynamic variable that can change depending on the object that is calling the method.
Getter and setter methods allow you to process data before accessing or setting property values. */

let halley = {
    _name: 'Halley',
    _behavior: 0,

    get name() {
        return this._name;
    },

    get behavior() {
        return this._behavior;
    },

    incrementBehavior() {
        this._behavior++;
    }
}

/** CLASSES */
class Dog {
    constructor(name) {
        this._name = name;
        this._behavior = 0;
    }

    get name() {
        return this._name;
    }
    get behavior() {
        return this._behavior;
    }

    incrementBehavior() {
        this._behavior++;
    }
}

// const halley = new Dog('Halley');
console.log(halley.name); // Print name value to console
console.log(halley.behavior); // Print behavior value to console
halley.incrementBehavior(); // Add one to behavior
console.log(halley.name); // Print name value to console
console.log(halley.behavior); // Print behavior value to console


// Although you may see similarities between class and object syntax, there is one important method that sets them apart. It's called the constructor method. JavaScript calls the constructor() method EVERY TIME it creates a NEW INSTANCE of a class.

// class Dog {
//     constructor(name) {
//         this.name = name;
//         this.behavior = 0;
//     }
// }
/** Dog is the name of our class. By convention, we capitalize and CamelCase class names.
JavaScript will invoke the constructor() method every time we create a new instance of our Dog class.
This constructor() method accepts one argument, name.
Inside of the constructor() method, we use the this keyword. In the context of a class, this refers to an instance of that class. In the Dog class, we use this to set the value of the Dog instance's name property to the name argument.
Under this.name, we create a property called behavior, which will keep track of the number of times a dog misbehaves. The behavior property is always initialized to zero. */

/** An instance is an object that contains the property names and methods of a class, but with unique property values. Let's look at our Dog class example. */

// class Dog {
//     constructor(name) {
//         this.name = name;
//         this.behavior = 0;
//     }
// }

// const halley = new Dog('Halley'); // Create new Dog instance

/** We create a new variable named halley that will store an instance of our Dog class.
We use the new keyword to generate a new instance of the Dog class. The new keyword calls the constructor(), runs the code inside of it, and then returns the new instance.
We pass the 'Halley' string to the Dog constructor, which sets the name property to 'Halley'. */

class Surgeon {
    constructor(name, department) {
        this._name = name;
        this._department = department;
        this._remainingVacationDays = 20;
    }

    get name() {
        return this._name;
    }

    get department() {
        return this._department;
    }

    get remainingVacationDays() {
        return this._remainingVacationDays;
    }

    takeVacationDays(daysOff) {
        this._remainingVacationDays -= daysOff;
    }
}

const surgeonCurry = new Surgeon('Curry', 'Cardiovascular');
const surgeonDurant = new Surgeon('Durant', 'Orthopedics');

console.log(surgeonCurry.name);
surgeonCurry.takeVacationDays(3);
console.log(surgeonCurry.remainingVacationDays);

/** cat class */
class Cat {
    constructor(name, usesLitter) {
        this._name = name;
        this._usesLitter = usesLitter;
        this._behavior = 0;
    }

    get name() {
        return this._name;
    }

    get usesLitter() {
        return this._usesLitter;
    }

    get behavior() {
        return this._behavior;
    }

    incrementBehavior() {
        this._behavior++;
    }
}

/**
In the example above, we create a Cat class. It shares a couple of properties (_name and _behavior) and a method (.incrementBehavior()) with the Dog class from earlier exercises. The Cat class also contains one additional property (_usesLitter), that holds a boolean value to indicate whether a cat can use their litter box.

When multiple classes share properties or methods, they become candidates for INHERITANCE — a tool developers use to decrease the amount of code they need to write.

With inheritance, you can create a PARENT CLASS (also known as a SUPERCLASS) with properties and methods that multiple child classes (also known as subclasses) share. The child classes inherit the properties and methods from their parent class.
 */

class Animal {
    constructor(name) {
        this._name = name;
        this._behavior = 0;
    }

    get name() {
        return this._name;
    }

    get behavior() {
        return this._behavior;
    }

    incrementBehavior() {
        this._behavior++;
    }
}

/**Now that we have these shared properties and methods in the parent Animal class, we can extend them to the subclass, Cat. */
// class Cat extends Animal {
//     constructor(name, usesLitter) {
//         super(name);
//         this._usesLitter = usesLitter;
//     }
// }

/** In the example above, we create a new class named Cat that extends the Animal class. Let's pay special attention to our new keywords: extends and super.

The extends keyword makes the methods of the animal class available inside the cat class.
The constructor, called when you create a new Cat object, accepts two arguments, name and usesLitter.
The super keyword calls the constructor of the parent class. In this case, super(name) passes the name argument of the Cat class to the constructor of the Animal class. When the Animal constructor runs, it sets this._name = name; for new Cat instances. _usesLitter is a new property that is unique to the Cat class, so we set it in the Cat constructor. 
Notice, we call super on the first line of our constructor(), then set the usesLitter property on the second line. In a constructor(), you must always call the super method before you can use the this keyword — if you do not, JavaScript will throw a reference error. To avoid reference errors, it is best practice to call super on the first line of subclass constructors.*/
// class HospitalEmployee {
//     constructor(name) {
//         this._name = name;
//         this._remainingVacationDays = 20;
//     }

//     get name() {
//         return this._name;
//     }

//     get remainingVacationDays() {
//         return this._remainingVacationDays;
//     }

//     takeVacationDays(daysOff) {
//         this._remainingVacationDays -= daysOff;
//     }
// }

// class Nurse extends HospitalEmployee {
//     constructor(name, certifications) {
//         super(name);
//         this._certifications = certifications;
//     }
// }

// const nurseOlynyk = new Nurse('Olynyk', ['Trauma', 'Pediatrics']);

/** In the example above, our Cat class extends Animal. As a result, the Cat class has access to the Animal getters and the .incrementBehavior() method.

Also in the code above, we create a Cat instance named bryceCat. Because bryceCat has access to the name getter, the code below logs 'Bryce' to the console.

console.log(bryceCat.name);
Since the extends keyword brings all of the parent's getters and methods into the child class, bryceCat.name accesses the name getter and returns the value saved to the name property.

Now consider a more involved example and try to answer the following question: What will the code below log to the console?

bryceCat.incrementBehavior(); // Call .incrementBehavior() on Cat instance 
console.log(bryceCat.behavior); // Log value saved to behavior
The correct answer is 1. But why?

The Cat class inherits the _behavior property, behavior getter, and the .incrementBehavior() method from the Animal class.
When we created the bryceCat instance, the Animal constructor set the _behavior property to zero.
The first line of code calls the inherited .incrementBehavior() method, which increases the bryceCat _behavior value from zero to one.
The second line of code calls the behavior getter and logs the value saved to _behavior (1).
 */

/** In addition to the inherited features, child classes can contain their own properties, getters, setters, and methods.

Below, we will add a usesLitter getter. The syntax for creating getters, setters, and methods is the same as it is in any other class. */

// class Cat extends Animal {
//     constructor(name, usesLitter) {
//         super(name);
//         this._usesLitter = usesLitter;
//     }

//     get usesLitter() {
//         return this._usesLitter;
//     }
// }

class HospitalEmployee {
    constructor(name) {
      this._name = name;
      this._remainingVacationDays = 20;
    }
    
    get name() {
      return this._name;
    }
    
    get remainingVacationDays() {
      return this._remainingVacationDays;
    }
    
    takeVacationDays(daysOff) {
      this._remainingVacationDays -= daysOff;
    }
  }
  
  class Nurse extends HospitalEmployee {
    constructor(name, certifications) {
      super(name);
      this._certifications = certifications;
    } 
    
    get certifications() {
      return this._certifications;
    }
    
    addCertification(newCertification) {
      this._certifications.push(newCertification);
    }
  }
  
  const nurseOlynyk = new Nurse('Olynyk', ['Trauma','Pediatrics']);
  nurseOlynyk.takeVacationDays(5);
  console.log(nurseOlynyk.remainingVacationDays);
  nurseOlynyk.addCertification('Genetics');
  console.log(nurseOlynyk.certifications);

  /** Review: Classes
Way to go! Let's review what you learned.

Classes are templates for objects.
Javascript calls a constructor method when we create a new instance of a class.
Inheritance is when we create a parent class with properties and methods that we can extend to child classes.
We use the extends keyword to create a subclass.
The super keyword calls the constructor() of a parent class.
Static methods are called on the class, but not on instances of the class.
In completing this lesson, you've taken one step closer to writing efficient, production-level JavaScript. Good luck as you continue to develop your skills and move into intermediate-level concepts. */


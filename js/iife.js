//IIFE - immediately invoked function expression

//function definition

function sayHello() {
    console.log('Hello!');
} // 

sayHello();

//function expression

let hello = function() {
    console.log('Hello');
} // anonymous function expression

hello();

// IIFE (Immediately Invoked Function Expression) e o functie care ruleaza imediat ce a fost definita.

(function() {
    // statements
})();

// este un design pattern care se mai numeste si SELF EXECUTING ANONYMOUS FUNCTION si contine doua parti importante. primul set de paranteze
// () ce contin functia, permit accesarea variabilelor definite in cadrul functiei, doar din interiorul functiei si impiedica astfel poluare mediului global.

//al doilea set de paranteze executa functia imediat

(function() {
    let name = 'Bob';
})();
// Variable name is not accessible from the outside scope
name // throws "Uncaught ReferenceError: aName is not defined"


//Assigning the IIFE to a variable does not store it but its result.
let name = (function() {
    let name = 'Bob';
    return name;
})(); // Bob
      ---------------part-3-------------

 1. Scope --  Global → everywhere
           Functional → inside function
           Block → inside { }

           note ------- var behaves like global scope in block scope


2. function execution context - Every time a function called, JS creates a new execution context. 
After function finishes →It is removed.

// there are two phase -- memory creation, execution phase


3. lexical scoping vs dynamic scoping
Lexical → depends on where variable or function are physically available ✅ (JS uses this)

4. “A returned inner function that uses outer variables and remembers them after outer function finishes is called closure.”

function countForMe(){
    let c = 0;
    return function(){
        c++;
        console.log(c); 
    }
}
let myFnc = countForMe()
myFnc()
myFnc()

[[envirement]]


5. encapsulation------------------>
wrapping the data in one unit and restricting the data from direct access.

6. this keyword------------------>
spacial keyword, change its value or nature in different use cases.

a. gloabal scope - window
b. fnc - window
c. method with es5 fnc - obj
   method with arrow fnc - window
   es5 fnc inside es5 method - window
   arrow fnc inside es5 method - obj
       NOTE--> arrow fnc always take there value from parent.
d. event handler - element
e. class - blank obj


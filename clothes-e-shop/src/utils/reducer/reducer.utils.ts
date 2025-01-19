import {AnyAction} from 'redux';
import { fetchCategoriesStart } from '../../store/categories-slice-old/category.action';

// we will implement Type predicate function for our reducer , but first understand basic for it.
type Alien = {
  fly:() => void
}
type Human = {
  speak:() => void
}
// Type predicate function
function isHuman(entity:Human | Alien): entity is Human{
  return (entity as Human).speak() !== undefined
}

const alien:Alien = {
  fly:() => console.log("Flying")
}

const human:Human = {
  speak:() => console.log("speaking")
}

function identify(entity: Human | Alien) {
  if(isHuman(entity)){
      // Here, `entity` is known to be a `Human`

    entity.speak(); // TypeScript now knows `entity` is Human
  }else {
    entity.fly();   // TypeScript now knows `entity` is Alien
  }
}
//identify(alien); // "Flying"
//identify(human); // "Speaking"



/*1. Types:
Alien: Represents an object with a fly method (e.g., flying aliens).
Human: Represents an object with a speak method (e.g., humans can speak).
2. Union Type:
The function accepts entity: Human | Alien, which means the entity can either be a Human or an Alien.
3. Type Predicate Function:
The isHuman function is a type guard.
It uses the entity is Human syntax to inform TypeScript that this function determines whether the entity is of type Human.
4. Type Assertion (as):
(entity as Human): Temporarily tells TypeScript to treat entity as a Human so that you can check if the speak method exists.
5. Check:
It checks if the speak method on entity is not undefined:
(entity as Human).speak() !== undefined
If the speak method exists, it concludes that entity is a Human.


This code demonstrates how to use a type predicate to differentiate between types (Human and Alien) in a union. The isHuman function acts as a custom type guard, enabling safe and clear handling of mixed types.

Key Points
1. Type Guard (isHuman)
The isHuman function narrows down the type from Human | Alien to just Human:

if (isHuman(entity)) {
  // Here, `entity` is known to be a `Human`
}
Without this function, TypeScript would not know whether entity is a Human or an Alien, leading to type errors when accessing speak or flt.

2. Why Use (entity as Human)?
The type Human | Alien does not guarantee that the speak method exists. By asserting (entity as Human), you're explicitly telling TypeScript, "Treat this as a Human for now."

3. Type Predicate Syntax:
The return type entity is Human is what makes this function a type guard. It tells TypeScript:

If the function returns true, the entity is of type Human.
If the function returns false, the entity is of type Alien.

*/
//AC like action creator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type']; // Extracts the `type` from the action object
  match(action: AnyAction): action is ReturnType<AC>; // Type guard for matching actions
  /*This utility type enhances an action creator (AC) by:

  Attaching a type property (from the action it creates).
  A match method to check if an action matches the type of that action creator.
  */
}

//withMatcher(fetchCategoriesStart) , without parameter
export function withMatcher<AC extends () => AnyAction & {type:string}>(actionCreator:AC):Matchable<AC>

//withMatcher(fetchCategoriesSuccess),withMatcher(fetchCategoriesError), with parameter
export function withMatcher<AC extends (...args:any[]) => AnyAction & {type:string}>(actionCreator:AC):Matchable<AC> 

//implement actual implementation

export function withMatcher(actionCreator:Function){
  const type = actionCreator().type; // Get the `type` of the action
  return Object.assign(actionCreator,{
    type,
    match(action:AnyAction) {
      return action.type === type; // Check if the action's type matches
    }
  })
  /*The withMatcher function wraps an action creator:
    Adds a type property to the function.
    Adds a match method for type-safe action matching.
  */
}

export type ActionWithPayload<T,P> = {
  type:T,
  payload: P
}

//action with only type,not payload
export type Action<T> = {
  type:T
}

//function overloading We provide flexibility for different kinds of actions (with or without payloads).


export function createAction<T extends string,P>(type:T,payload:P):ActionWithPayload<T,P>;

//The second parameter is void, meaning no payload is provided.
export function createAction<T extends string>(type:T,payload:void):Action<T>;


//The implementation of createAction combines the above two use cases into a single function.

export function createAction<T extends string,P>(type:T,payload:P) {
  return {type,payload}
}
//Note:
//The T extends string in TypeScript means that the type parameter T is constrained to be a string or a more specific subtype of string. It ensures that only string types can be passed to T.
//So, T can be any specific string (e.g., 'ADD_TODO') or a string type in general. However, it cannot be a number, boolean, or any other type.



//Without T extends string (No Constraint):

// function createAction<T>(type: T, payload: any) {
//   return { type, payload };
// }

// This will allow invalid types for `type`:
//createAction(123, 'payload'); // No error, but logically incorrect



//With T extends string:
// Now only string types are allowed for `type`:
//createAction('ADD_TODO', 'payload'); // ✅ Allowed
//createAction(123, 'payload');        // ❌ Error: Type 'number' is not assignable to type 'string'




/*Example Without Overloads:
function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

const action1 = createAction('RESET', undefined); 
// TypeScript infers:
// action1: { type: string; payload: undefined } 
// Less strict than desired.

const action2 = createAction('ADD_TODO', { id: 1, title: 'Learn TS' });
// TypeScript infers:
// action2: { type: string; payload: { id: number; title: string } }
// Still correct, but more permissive than needed.*/

/*--------------------------------*/

/*Example With Overloads:
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

const action1 = createAction('RESET', undefined);
// action1: { type: 'RESET'; payload: undefined } (strictly typed as `Action<T>`)

const action2 = createAction('ADD_TODO', { id: 1, title: 'Learn TS' });
// action2: { type: 'ADD_TODO'; payload: { id: number; title: string } } (strictly typed as `ActionWithPayload<T, P>`)*/




/*** Return type utiity */

type myFun = () => number;
type value = ReturnType<myFun>;


/*** 
 * Basic example to understand export function withMatcher(actionCreator:Function){
 * how it works let us start
 * 
 * function selectFruit(fruit:string) {
 *    return { type:'SELECT_FRUIT',payload: fruit}
 * }
 * selectFruit('apple') // {type:'SELECT_FRUIT',payload:'apple'}
 * 
 * Now. Enhanced Action Creator
  Now we want to enhance this selectFruit action creator by:
    Adding a static type property ("SELECT_FRUIT").
    Adding a match method to check if a given action matches this type.

    const enhancedSelectFruit = Object.assign(
          selectFruit, // Start with the original action creator,
      {
        type:'SELECT_FRUIT',
        match(action:{type:string}):action is ReturnType<typeof selectFruit>{
          return action.type === "SELECT_FRUIT"; // Check if the action's type matches
        }    
      }
    )

    // 1. Use the enhanced action creator to create an action
        const action = enhancedSelectFruit("Banana");
        console.log(action); 
      // Output: { type: "SELECT_FRUIT", payload: "Banana" }

      // 2. Use the `type` property
        console.log(enhancedSelectFruit.type); 
      // Output: "SELECT_FRUIT"

      // 3. Use the `match` method
      console.log(enhancedSelectFruit.match(action)); 
      // Output: true


      // Example with a different action
      const anotherAction = { type: "ADD_FRUIT", payload: "Apple" };
      console.log(enhancedSelectFruit.match(anotherAction)); 
      // Output: false

 */

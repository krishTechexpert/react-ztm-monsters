import {AnyAction} from 'redux';

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

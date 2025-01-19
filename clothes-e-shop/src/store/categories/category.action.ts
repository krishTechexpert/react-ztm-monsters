import {CATEGORY_ACTION_TYPES,Category} from "./category.types";
import { createAction,Action,ActionWithPayload,withMatcher } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START> // it will return {type:'category/FETCH_CATEGORIES_START'}

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,Category[]> //it will return {type:'category/FETCH_CATEGORIES_SUCCESS',payload:[]}

export type FetchCategoriesError = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error> // {type:'category/FETCH_CATEGORIES_FAILED',payload:'error message'}

//esko used kerny per problem hogi if action is different so we create some generic solution 
//export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesError;


export const fetchCategoriesStart = withMatcher(():FetchCategoriesStart => {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
  //return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START}
})

export const fetchCategoriesSuccess = withMatcher((categoriesArray:Category[]):FetchCategoriesSuccess => {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesArray)
  //return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArray}
})

export const fetchCategoriesError = withMatcher((error:Error):FetchCategoriesError => {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error)
  //return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,payload:error}
})

/*
export const categoriesReducer = (state=CATEGORIES_INITIAL_STATE,action={} as AnyAction):CategoriesState => {
  if(fetchCategoriesStart.match(action)){
   return {...state,isLoading:true}
  }
  if(fetchCategoriesSuccess.match(action)){
    return {...state,categories:action.payload,isLoading:false}
  }
  if(fetchCategoriesError.match(action)){
    return {...state,error:action.payload,isLoading:false}
  }
  return state
}


Explanation of the Code
This code implements a type-safe Redux action system using TypeScript. The focus is on:

Creating action creators (functions that return action objects).
Wrapping those action creators with a utility (withMatcher) to:
Attach a type property to the action creator.
Add a match method to check if a given action matches the type of the action creator.

Advantages
1.) Type Safety

Using withMatcher ensures that only actions with the correct type and payload structure are processed.

2.)Cleaner Reducer Logic

Instead of a switch statement, the match method simplifies action handling.

3.) Reusable Utility

The withMatcher function can be applied to any action creator for consistent behavior.


*/


/*** Basic Analogy */
/**
 * Imagine you have multiple tickets for different events (e.g., Concert, Movie,dance ticket). Each ticket has:
   A type (e.g., "Concert Ticket", "Movie Ticket").
   A way to verify the ticket (e.g., barcode scanner).

  Here:

actionCreator is like the ticket issuer.
withMatcher adds a barcode scanner (match method) to each ticket so you can easily verify which ticket matches the event.

A] Types
type Action = { type: string; payload?: any }; // Each action has a `type` property and optionally a `payload` property.

type StartAction = { type: "START"; payload?: never }; // This action only has a `type` and does not include a `payload`.

type SuccessAction = { type: "SUCCESS"; payload: string }; // This action has a `type` and includes a `payload` (a string).


// Utility type to enhance an action creator (`AC`) with additional features:
// 1. Attach the `type` property from the returned action to the action creator.
// 2. Add a `match` method to check if an action matches the type of the action creator.

type Matchable<AC extends () => Action> = AC & {
  type: ReturnType<AC>['type']; // Extracts the `type` from the action the creator returns.
  match(action: Action): action is ReturnType<AC>; // Adds a `match` method for type-safe checking.
};

B] Utility

// `withMatcher` wraps an action creator with additional functionality.
// The generic type `AC` represents the action creator, which:
// 1. Takes any number of arguments (`...args: any[]`).
// 2. Returns an `Action` with a `type` property.


function withMatcher<AC extends (...args: any[]) => Action>(actionCreator: AC): Matchable<AC> {
    // Call the action creator to retrieve the action object and extract its `type`.
  const type = actionCreator().type;

    // Use `Object.assign` to combine the action creator with additional properties:
  // 1. Attach the `type` property.
  // 2. Add a `match` method to check if an action matches the `type`.


  return Object.assign(actionCreator, {
    type,
    match(action: Action) {
      return action.type === type; // Return true if the action's type matches the creator's type.
    },
  });
}

C.] Usage
  // Create an action creator for the "START" action.
// `withMatcher` adds a `type` property and `match` method to this action creator.
  const startAction = withMatcher((): StartAction => ({ type: "START" }));

// Create an action creator for the "SUCCESS" action.
// This creator accepts a `data` parameter to set the `payload`.

const successAction = withMatcher((data: string): SuccessAction => ({ type: "SUCCESS", payload: data }));


// Reducer function to handle actions and log output.
// Accepts an `action` of type `Action` (can be any action in the system).


function reducer(action: Action) {

  // Use the `match` method to check if the action matches `startAction`.
  startAction.match(action): Checks if the action is { type: "START" }.

  if (startAction.match(action)) {
    console.log("Start Action!"); // Logs when the action is of type "START".
  }

    // Use the `match` method to check if the action matches `successAction`.
  successAction.match(action): Checks if the action is { type: "SUCCESS", payload: string }.

  if (successAction.match(action)) {
    console.log("Success Action:", action.payload);
  }
}

// Call the reducer with the `startAction` to simulate handling a "START" action.

reducer(startAction()); // "Start Action!"
Calls the startAction creator to generate { type: "START" }.
Passes this action to the reducer.
Logs: "Start Action!".




// Call the reducer with the `successAction` to simulate handling a "SUCCESS" action.

reducer(successAction("Data loaded!")); // "Success Action: Data loaded!"
Calls the successAction creator with "Data loaded!" to generate: { type: "SUCCESS", payload: "Data loaded!" }
Passes this action to the reducer.
Logs: "Success Action: Data loaded!".


This shows how withMatcher improves type safety and simplifies action handling!


*/

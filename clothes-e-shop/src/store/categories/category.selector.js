// problem before without reselect
// export const selectCategoriesMap = (state) => {
//     // ❌ WARNING: this logic _always_ returns a new reference, so it will _always_ re-render shopcategory and CategoriesPreview component!
//   // if content is same but we are returning always new object here..
//    //Similarly, this below logic will re-run after every dispatched action. 
//    // so we need to used here reSelect libraray ..selectCategoriesMap run only when categories change,otherwise not run


//   console.log('selector fired; selectCategoriesMap')
// return  state.categories.categories.reduce((acc,category) => {
//   const {title,items} = category;
//   acc[title.toLowerCase()]=items
//   return acc;
// },{})
// }

// const state = {
//   categories: {
//     categories: [
//       { title: "Hats", items: [/* ... */] },
//       { title: "Jackets", items: [/* ... */] },
//     ],
//   },
// };


//with reselect 
import {createSelector} from 'reselect'

// So create selector does that with selectors.

// It memorizes them, assuming that as long as the inputs have not changed, then your output should always  be the same.




//it will take categories from store (as our store contains {user,categories)

//If state.categories doesn’t change, selectCategories and selectCategoriesMap return cached results.

// Step 1: Input selector to access the `categories` slice from the Redux state

const selectCategoryReducer = (state) => {
  console.log('selector 1 fired')
 return state.categories // which points to categoriesReducer which return categories:[...]
}
// it will memoized categories array if state.categories is same
//for extracting the required data (categories).
// Step 2: Memoized selector to get the `categories` array

export const selectCategories = createSelector(
  [selectCategoryReducer],//input if change
//resultFn 
 (categoriesSlice) => {
  console.log('memoized selector 2 fired...')
  return categoriesSlice.categories
} // which return categories:[value]

)
//selectCategories don't change then don't run categories.reduce code
//for transforming the data
// Step 3: Memoized selector to generate a categories map object

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>{
    console.log('selector 3 fired')
    return categories.reduce((acc,category) => {
      const {title,items} = category;
      acc[title.toLowerCase()]=items
      return acc;
    },{})
  }
)



/**
 * The Reselect library in Redux is used to create memoized selectors that derive and compute data efficiently from the Redux state. Without Reselect, accessing and transforming the Redux state in a performant way can be challenging. 
 * 
 * Problems Solved by Reselect
  Avoiding Unnecessary Recomputations

Problem:
If you derive data from the Redux state (e.g., filtering or transforming data), the derived value might be recomputed on every useSelector call, even if the relevant parts of the state haven't changed.
Solution:
Reselect memoizes the derived data. It recalculates the derived value only when the state it depends on changes.


Example Without Reselect:

const selectFilteredItems = (state) => {
  console.log("Computing filtered items...");
  return state.items.filter(item => item.active);
};

const filteredItems = useSelector(selectFilteredItems); // Runs every time!


example with Reselect

import { createSelector } from "reselect";

const selectItems = (state) => state.items;

const selectFilteredItems = createSelector(
  [selectItems],
  (items) => {
    console.log("Computing filtered items...");
    return items.filter(item => item.active);
  }
);

const filteredItems = useSelector(selectFilteredItems); // Only recomputes when `state.items` changes.


Example2: If you are calculating a total price for a shopping cart:

const selectTotalPrice = createSelector(
  [state => state.cart.items],
  (items) => items.reduce((total, item) => total + item.price, 0)
);

const totalPrice = useSelector(selectTotalPrice); // Computation is skipped if `state.cart.items` doesn't change.


Example 3:
const selectItems = (state) => state.items;
const selectSearchTerm = (state) => state.searchTerm;

const selectFilteredItems = createSelector(
  [selectItems, selectSearchTerm],
  (items, searchTerm) => items.filter(item => item.name.includes(searchTerm))
);

const visibleItems = useSelector(selectFilteredItems); // Efficient composition of selectors.


Benefits of Reselect
Memoization: Avoids unnecessary recomputation of derived data.
Performance: Optimizes expensive computations and improves rendering performance.
Reusability: Centralizes state derivation logic, making it reusable across components.
Composability: Allows creating complex selectors by composing smaller ones.
Scalability: Helps manage performance and maintainability in large applications.


Key Principle: Reselect Uses Shallow Equality for Memoization
Shallow Equality Check:
Reselect checks if the input values of the selector (state.items in this case) are the same as the previous ones using shallow equality (===).
If the reference hasn't changed, Reselect skips recomputing the derived data and returns the memoized result from the previous call.


 */

/** step by step explanation with example 3 above
 * 
 * // 1. Define a basic input selector to get the `items` from the Redux state.
const selectItems = (state) => state.items; 
// - `state.items` represents the full list of items stored in the Redux store.
// - This is a simple function that extracts the `items` slice of the state.


// 2. Define another basic input selector to get the `searchTerm` from the Redux state.
  const selectSearchTerm = (state) => state.searchTerm;
// - `state.searchTerm` is the current user input or filter criteria used to search items.
// - This selector retrieves the search term from the Redux state.


// 3. Use `createSelector` from the `reselect` library to create a **memoized selector**.
const selectFilteredItems = createSelector(
  [selectItems, selectSearchTerm], // Dependencies (input selectors)
  (items, searchTerm) => items.filter(item => item.name.includes(searchTerm)) // Output logic
);
// **What is happening here:**
// - `[selectItems, selectSearchTerm]`: These are input selectors, which provide the data needed for computation.
//   - `selectItems(state)` provides `items`.
//   - `selectSearchTerm(state)` provides `searchTerm`.
// - `(items, searchTerm) => items.filter(...)`: This is the computation logic.
//   - It takes the `items` array and filters it to only include items where `item.name` contains the `searchTerm` string.
//   - The result is a filtered array of items matching the search term.
// - **Memoization:**
//   - If neither `state.items` nor `state.searchTerm` changes, the selector does not recompute the filtered array.
//   - Instead, it returns the previously cached result, improving performance by avoiding unnecessary calculations.


// 4. Use the memoized selector in a React component with the `useSelector` hook.
const visibleItems = useSelector(selectFilteredItems); 
// **What happens here:**
// - `useSelector(selectFilteredItems)` subscribes the component to the Redux store.
// - Whenever the Redux state updates, `useSelector` calls `selectFilteredItems`.
// - If the input selectors (`selectItems` and `selectSearchTerm`) return the same values as before:
//   - The memoized result of `selectFilteredItems` is reused, and no recomputation occurs.
// - If `state.items` or `state.searchTerm` changes:
//   - The `selectFilteredItems` function recomputes the filtered array using the updated values.
// - The `visibleItems` variable will hold the filtered list of items.


 * 
 * Flow Breakdown
Initial State Access:

state.items (array of items) and state.searchTerm (filter string) are read using the two input selectors: selectItems and selectSearchTerm.
Memoization with createSelector:

createSelector ensures that the filtering logic runs only if either state.items or state.searchTerm changes.
On the first call, the filtering logic computes the filtered list and caches the result.
Using useSelector in the Component:

useSelector evaluates selectFilteredItems when the component renders or when the Redux state updates.
If the inputs (state.items or state.searchTerm) haven’t changed, selectFilteredItems skips recomputation, and the previous filtered result is returned.
Filtered Data in the Component:

The visibleItems variable contains the filtered array of items matching the searchTerm.
This array can then be used to render the filtered list in the UI.

 * 
 */


/* when to used reselect library
Reselect, at its core, is a library for creating memoized selectors .
Therefore, when deciding whether to use a plain selector or use createSelector A good question to ask is: Will the reference of this object, array or function that is returned by the selector be different each time it is executed?


const getSelectedItems = state => state.items.filter(i => i.selected)
Would result in a different array each time the selector is called.

Whereas:

const getFullName = createSelector(
  state => state.items,
  items => items.filter(i => i.selected)
)
Would only return a new array if the items array changed.


/** let us undertsand with basic example
 * 
 * Example Scenario

  Redux State
 * const state = {
  items: [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ],
  searchTerm: "Ap",
};

1. First Render:

state.items: [ { id: 1, name: "Apple" }, { id: 2, name: "Banana" }, { id: 3, name: "Cherry" } ]
state.searchTerm: "Ap"
Result of selectFilteredItems: [ { id: 1, name: "Apple" } ]
Component renders with visibleItems = [ { id: 1, name: "Apple" } ].

2. State Update (No Change):

If neither state.items nor state.searchTerm changes, selectFilteredItems skips recomputation.


3. State Update (Change):

If state.searchTerm changes to "Ba", selectFilteredItems recomputes:
New result: [ { id: 2, name: "Banana" } ].
Component re-renders with the updated visibleItems.


 * 
 */




import { AnyAction } from "redux-saga";
import {Category} from "./category.types";
import { fetchCategoriesStart,fetchCategoriesSuccess,fetchCategoriesError } from "./category.action";

export type CategoriesState = {
  readonly categories:Category[];
  readonly isLoading:boolean;
  readonly error:Error | null;
}

export const CATEGORIES_INITIAL_STATE:CategoriesState={
  categories:[],
  isLoading:true,
  error:null
}

export const categoriesReducer = (state=CATEGORIES_INITIAL_STATE,action:AnyAction):CategoriesState => {
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


//CategoryAction is a TypeScript type union that describes all possible actions the reducer can handle:

// export const categoriesReducer = (state=CATEGORIES_INITIAL_STATE,action={} as CategoryAction) => {
//   switch(action.type) {
//     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return {...state,isLoading:true}
//     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return {...state,categories:action.payload,isLoading:false}
//     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//       return {...state,error:action.payload,isLoading:false}
//     default:
//       return state;
//   }
// }
// there are lots of drawback if we using action={} as CategoryAction
//1. Using action = {} as CategoryAction Bypasses Type Safety
/*TypeScript will not warn you if action is malformed or missing required properties like type or payload.
If a developer mistakenly dispatches an incorrect action:
dispatch({ randomProp: 'unexpected value' }); // No compile-time error!
At runtime, accessing action.type or action.payload will cause an error.*/

//2. Union Discrimination Not Properly Leveraged
//TypeScript cannot infer the type of action.payload for each case, leading to potential misuse.
//case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//  console.log(action.payload.length); // No error, but might fail at runtime if `payload` is not an array.

//3. Missing Type Guard for action.payload
/*Without proper type guards, invalid payload values can propagate through the reducer, leading to unexpected behavior.
If dispatch sends an action with an unexpected payload type:
dispatch({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: "Not an array" });
This will cause a runtime error or result in inconsistent state.*/
//4. Default State Returned without Warning


/*Basic example
type Color = 'red' | 'green' | 'blue';
A switch statement working with Color should handle all three cases: 'red', 'green', and 'blue'. If you miss one, never will let you know at compile time.

type Color = "red" | "blue" | "green";

function getColorMessage(color: Color): string {
  switch (color) {
    case 'red':
      return 'The color is red.';
    case 'green':
      return 'The color is green.';
    default:
      const exhaustiveCheck: never = color; // This ensures all cases are handled
      throw new Error(`Unhandled color: ${color}`);
  }
}

console.log(getColorMessage("red1"))


exhaustiveCheck: never:

The color variable is assigned to exhaustiveCheck, which has a type of never.
In TypeScript, the never type represents a value that should never exist. It means "this code should be unreachable."


If a Case Is Missed:

If you add a new value to Color (e.g., 'yellow') and forget to handle it in the switch, TypeScript will throw an error because color cannot be assigned to never.


What Happens When You Add a New Case?
type Color = 'red' | 'green' | 'blue' | 'yellow';
Without updating the switch, TypeScript will show an error:

Type 'yellow' is not assignable to type 'never'.
This forces you to update the switch to handle 'yellow'.
*/






import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

//user state in store
// state = {
//   user: {
//     currentUser:null,
//      isLoading:false,
//        error:null
//   },
//cart: {
  //     cartItems:[],
  //      isCartOpen:false
  //   }

// }

//we have not defined type of state so we used here any which is not recommend

export const selectUserReducer = (state:any):UserState => state.user

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
)

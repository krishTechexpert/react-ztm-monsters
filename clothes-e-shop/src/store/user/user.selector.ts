import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";

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


export const selectUserReducer = (state:RootState):UserState => state.user

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
)

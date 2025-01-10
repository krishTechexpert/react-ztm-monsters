import {call,all} from 'redux-saga/effects'
import {categoriesSaga} from "./categories/category.saga"
import {userSagas} from "./user/user.saga"

/** step to flow of data categories list
 *1. to get categories list, react first send this action to middleware(if you used any other middleware such as reux-logger, but not send to saga middleware) after that goes to specied reducer according to action, (hit reducer first (categoriesReducer))
 * useEffect(() => {
  dispatch(fetchCategoriesStart())
},[])
 * 
2. activate this line sagaMiddleware.run(rootSaga)

3. saga watcher/listen to action and fires all saga acton whenver generator function has not completed its execution
 */

export function* rootSaga(){
  yield all([call(categoriesSaga),call(userSagas)]) // it contains different-2 saga call krege yh ay then usky baad individaula saga ko activate krega such as userSagas inside user.saga.js
}


/** step to flow of data user 
 *1. to get user, first below action hits
 
 useEffect(() => {
  dispatch(checkUserSession())
},[dispatch])

which will hit this one below

export function* userSagas(){
  yield all([call(onCheckUserSession)])
**/


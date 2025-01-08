import {call,all} from 'redux-saga/effects'
import {categoriesSaga} from "./categories/category.saga"

/**
 *1. to get categories list, react first send this action to reducer first (categoriesReducer)
 * useEffect(() => {
  dispatch(fetchCategoriesStart())
},[])
 * 
2. activate this line sagaMiddleware.run(rootSaga)

3. saga watcher/listen to action and fires all saga acton whenver generator function has not completed its execution
 */

export function* rootSaga(){
  yield all([call(categoriesSaga)])
}
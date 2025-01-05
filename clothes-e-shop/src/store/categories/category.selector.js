export const selectCategoriesMap = (state) => {
    // ❌ WARNING: this logic _always_ returns a new reference, so it will _always_ re-render!
  // if content is same but we are returning always new object here..
   //Similarly, this below logic will re-run after every dispatched action. 
   // so we need to used here reSelect libraray ..selectCategoriesMap run only when categories change,otherwise not run


  console.log('selector fired; selectCategoriesMap')
return  state.categories.categories.reduce((acc,category) => {
  const {title,items} = category;
  acc[title.toLowerCase()]=items
  return acc;
},{})
}



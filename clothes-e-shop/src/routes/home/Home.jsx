import Product from '../../components/Product'
import { Outlet } from 'react-router-dom';
function Home() {

  const categories=[
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]

  return (
    <>
    {/* The child route's content will render here */}
    {/* The Outlet is like an empty box/placeholder in the parent route, and it gets filled with the content of whichever child route is active. This is especially useful for building pages with shared layouts and dynamic content. */}
      <Outlet/>
    <Product categories={categories} />
    </>
  )
}

export default Home;
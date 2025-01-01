import {Routes,Route} from 'react-router-dom';
import Home from "./routes/home/Home"
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';
import CategoryPreview from './components/category-preview/CategoryPreview';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Child routes */}
        {/* index means "When someone visits the main route (/), show this component by default.(Home)" */}
        <Route index element={<Home />} />
        {/* shop nesting routing */}
        <Route path="shop/*" element={<Shop/>} /> 
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout/>} />
      </Route>
    </Routes>
  )
}

export default App

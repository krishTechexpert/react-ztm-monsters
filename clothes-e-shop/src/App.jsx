import {Routes,Route} from 'react-router-dom';
import Home from "./routes/home/Home"
import Navigation from './routes/navigation/Navigation';
import SignIn from './routes/sign-in/SignIn';
const Shop = () => {
  return "I am shop page"
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Child routes */}
        {/* index means "When someone visits the main route (/), show this component by default.(Home)" */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop/>} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App

import "react-toastify/dist/ReactToastify.css";
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />

      </Route>
    </Routes>
    <ToastContainer />
    </>    
  );
}

export default App;

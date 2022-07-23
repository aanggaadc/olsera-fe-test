import "react-toastify/dist/ReactToastify.css";
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Admin from "./pages/admin/Admin";
import LikedPosts from './pages/like_post/LikedPosts'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='admin' element={<Admin />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
      </Route>
    </Routes>
    <ToastContainer />
    </>    
  );
}

export default App;

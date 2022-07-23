import "react-toastify/dist/ReactToastify.css"
import { useLayoutEffect } from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Admin from "./pages/admin/Admin"
import LikedPosts from './pages/like_post/LikedPosts'
import PrivateRoutes from './routes/PrivateRoutes'
import {ToastContainer} from 'react-toastify'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "./store/index"

function App() {
  const dispatch = useDispatch();
  const { fillUser } = bindActionCreators(actionCreators, dispatch);
  
  useLayoutEffect(() => {
    if(localStorage.getItem("authData")) {
      fillUser(JSON.parse(localStorage.getItem("authData")))
    }
  })
  
  return (
    <>
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='admin' element={<Admin />} />
        </Route>        
        <Route path="/liked-posts" element={<LikedPosts />} />
      </Route>
    </Routes>
    <ToastContainer />
    </>    
  );
}

export default App;

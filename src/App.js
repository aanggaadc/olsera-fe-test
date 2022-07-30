import "react-toastify/dist/ReactToastify.css"
import { useLayoutEffect } from "react"
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Admin from "./pages/admin/Admin"
import ModalPost from "./components/ModalPost"
import ModalView from './components/ModalView'
import LikedPosts from './pages/like_post/LikedPosts'
import PrivateRoutes from './routes/PrivateRoutes'
import {ToastContainer} from 'react-toastify'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "./store/index"
import Axios from 'axios'

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const { fillUser, setCommentData } = bindActionCreators(actionCreators, dispatch);

  const getComment = (id) => {
    Axios.get(`comments?postId=${id}`)
        .then(response => {
            setCommentData(response.data)
        })
  }
  
  useLayoutEffect(() => {
    if(localStorage.getItem("authData")) {
      fillUser(JSON.parse(localStorage.getItem("authData")))
    }
  })

  return (
    <>
    <Routes location={background || location}>
      <Route path='/'>
        <Route index element={<Home getComment={getComment} />} />
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='admin'>
            <Route index element={<Admin getComment={getComment} />} />
          </Route>
        </Route>        
        <Route path="/liked-posts" element={<LikedPosts getComment={getComment} />} />
      </Route>
    </Routes>
    {background && (
        <Routes>
          <Route path="/posts/:id" element={<ModalView />} />
          <Route path="/admin/create" element={<ModalPost />} />
          <Route path="/admin/posts/:id/edit" element={<ModalPost />} />
        </Routes>
      )}
    <ToastContainer />
    </>    
  );
}

export default App;

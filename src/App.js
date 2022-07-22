import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />

      </Route>
    </Routes>
  );
}

export default App;

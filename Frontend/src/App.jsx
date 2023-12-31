import { useContext } from 'react';
import './App.scss'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
  
} from "react-router-dom";
import { AuthContext } from './Context/AuthContext';

function App() {


  const{currentUser}=useContext(AuthContext);
  // console.log(currentUser);
  const ProtectedRoute =({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  

  return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route index element={
                <ProtectedRoute> 
                  <Home/>
                </ProtectedRoute>
                }/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </>
  )
}

export default App

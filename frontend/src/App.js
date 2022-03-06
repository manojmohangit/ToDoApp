import React from 'react';
import ToDoApp from './Components/ToDoApp';
import Login from './Components/auth/Login';
import LandingPage from './Components/LandingPage';
import './style.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./Context";
import PrivateRoute from './Components/PrivateRoute';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" 
            element={
              <PrivateRoute isPrivate={false}>
                <Login/>
              </PrivateRoute>}
          />
          <Route path="/todo/" 
            element={
              <PrivateRoute isPrivate={true}>
                <ToDoApp/>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

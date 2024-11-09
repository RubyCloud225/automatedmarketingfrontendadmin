import './App.css';
import React, { useContext } from 'react';
import LoginModal from './LoginModel'
import { ApiContext } from './apicontext';

function App() {

  const { user } = useContext(ApiContext);
  return (
    <div className="App">
      { user ? (
        <p>Logged in as User ID: {user}</p>
      ) : (
        <LoginModal />
      )}
    </div>
  );
}

export default App;

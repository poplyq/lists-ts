import React, { useEffect } from 'react';
import Desk from './components/Desk/Desk';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegistrationForm } from './components/RegistrationForm/registrationForm';
import { useUserActions } from './hooks/useActions';

function App() {
  const { checkAuth } = useUserActions();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/desk" element={<Desk />} />
      </Routes>
    </div>
  );
}
export default App;

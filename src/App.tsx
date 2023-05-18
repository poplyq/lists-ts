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
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="*" element={<LoginForm />} />
        <Route path="/desk" element={<Desk />} />
      </Routes>
    </div>
  );
}
export default App;

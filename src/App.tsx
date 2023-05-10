import React from 'react';
import Desk from './components/Desk/Desk';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
 
      <Routes>
{/* <Route path="/" element={<MainTheme />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} /> */}
<Route path="/desk" element={<Desk />} />
</Routes>
    </div>
  );
}
export default App;


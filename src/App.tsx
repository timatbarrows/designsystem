import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import FormElements from './pages/FormElements';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='forms' element={<FormElements />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;

// src/pages/Home.tsx
import React from 'react';
import Navigation from '../components/snippets/Navigation';
import ModalDoc from './ModalDoc';

const Home: React.FC = () => {
  return (
    <div>
       
        <Navigation />
        <div id="modals" className="scroll-mt-[85px]">
            <ModalDoc />
        </div>
    </div>
  );
};

export default Home;

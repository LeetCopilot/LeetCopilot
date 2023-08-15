import React from 'react';
import { styles } from '../styles';
import { Button } from './ui/button';

const NavBar = () => {
  return (
    <nav className="mb-2 flex items-center justify-between">
      <h3 className="text-2xl font-black">
        Leet
        <span className="text-orange-400">Copilot</span>
      </h3>
      <div className="flex items-center gap-4">
        <Button variant="default" className="h-8 w-8 rounded-full bg-orange-400">
          ☕︎
        </Button>
        <Button variant="default" className="h-8 w-8 rounded-full bg-gray-400">
          ☰
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;

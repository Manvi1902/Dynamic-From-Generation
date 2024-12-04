//import React from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-red-400 w-full text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Form Generator</h1>
        <div className="flex items-center space-x-4">
    
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="bg-teal-50 p-2 rounded hover:bg-red-300 text-black"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

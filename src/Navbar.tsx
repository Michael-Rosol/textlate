import React, { useState, useRef, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-black px-4 py-2 border-b-2 border-black">
      <div className="ml-5 text-2xl font-bold">Textlate</div>
      <div className="relative" ref={dropdownRef}>
        {isDropdownOpen && (
          <div className="absolute right-0.5 mt-12 w-48 bg-black text-white rounded-md shadow-lg">
            <ul className="py-1">
              <li>
                <a href="speech" className="block px-4 py-2 text-sm hover:bg-gray-700">Text to Speech</a>
              </li>
              <li>
                <a href="/" className="block px-4 py-2 text-sm hover:bg-gray-700">Translate</a>
              </li>
            </ul>
          </div>
        )}
        
        <button className="text-white focus:outline-none" onClick={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

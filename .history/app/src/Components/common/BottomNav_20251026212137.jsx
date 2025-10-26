// src/Components/common/BottomNav.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  CalendarMonth, 
  SelfImprovement, 
  Person, 
  FitnessCenter, 
  MenuBook, 
  WaterDrop 
} from '@mui/icons-material';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <Home fontSize="small" />, path: 'dashboard' },
    { label: 'Water', icon: <WaterDrop fontSize="small" />, path: 'water' },
    { label: 'Exercise', icon: <FitnessCenter fontSize="small" />, path: 'exercise' },
    { label: 'Journal', icon: <MenuBook fontSize="small" />, path: 'journal' },
    { label: 'Habits', icon: <SelfImprovement fontSize="small" />, path: 'habits' },
    { label: 'Calendar', icon: <CalendarMonth fontSize="small" />, path: 'calendar' },
    { label: 'Profile', icon: <Person fontSize="small" />, path: 'profile' },
  ];

  const activeIndex = navItems.findIndex(item => 
    location.pathname === `/${item.path}` || location.pathname.endsWith(item.path)
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg sm:hidden">
      <div className="flex justify-between">
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.path}
              onClick={() => navigate(`/${item.path}`)}
              className={`flex flex-col items-center justify-center py-2 w-full 
                ${isActive ? 'text-blue-600' : 'text-gray-500'} 
                hover:text-blue-500 transition-colors duration-200`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
